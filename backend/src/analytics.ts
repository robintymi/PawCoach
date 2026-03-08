import { supabase } from './db';

// ──────────────────────────────────────────
// Chat-Analytics: Fragen tracken, Zufriedenheit messen
// ──────────────────────────────────────────

export interface ChatLog {
  id?: number;
  user_question: string;
  assistant_response: string;
  categories_used: string[];
  response_length: number;
  rating?: number; // 1-5 Sterne (null = nicht bewertet)
  feedback?: string; // Optionaler Freitext
  source: 'app' | 'web' | 'whatsapp';
  created_at?: string;
}

// Speichert eine Chat-Interaktion
export const logChat = async (
  userQuestion: string,
  assistantResponse: string,
  categoriesUsed: string[],
  source: 'app' | 'web' | 'whatsapp' = 'web',
  ipAddress?: string
): Promise<number | null> => {
  const insertData: Record<string, unknown> = {
    user_question: userQuestion.substring(0, 2000),
    assistant_response: assistantResponse.substring(0, 5000),
    categories_used: categoriesUsed,
    response_length: assistantResponse.length,
    source,
  };
  if (ipAddress) insertData.ip_address = ipAddress;

  const { data, error } = await supabase
    .from('chat_analytics')
    .insert(insertData)
    .select('id')
    .single();

  if (error) {
    console.error('Analytics logChat Fehler:', error.message);
    return null;
  }
  return data?.id || null;
};

// Speichert eine Bewertung zu einer Chat-Interaktion
export const rateChat = async (
  chatId: number,
  rating: number,
  feedback?: string
): Promise<boolean> => {
  const { error } = await supabase
    .from('chat_analytics')
    .update({ rating, feedback })
    .eq('id', chatId);

  if (error) {
    console.error('Analytics rateChat Fehler:', error.message);
    return false;
  }
  return true;
};

// ──────────────────────────────────────────
// Analytics-Abfragen für Admin-Dashboard
// ──────────────────────────────────────────

// Häufigste Fragen (gruppiert nach Ähnlichkeit)
export const getTopQuestions = async (limit = 50): Promise<any[]> => {
  const { data, error } = await supabase
    .from('chat_analytics')
    .select('user_question, created_at, rating, source')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Analytics getTopQuestions Fehler:', error.message);
    return [];
  }
  return data || [];
};

// Durchschnittliche Bewertung
export const getAverageRating = async (): Promise<{ avg: number; count: number }> => {
  const { data, error } = await supabase
    .from('chat_analytics')
    .select('rating')
    .not('rating', 'is', null);

  if (error || !data) return { avg: 0, count: 0 };

  const ratings = data.map(d => d.rating).filter(r => r != null);
  if (ratings.length === 0) return { avg: 0, count: 0 };
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return { avg: Math.round(avg * 10) / 10, count: ratings.length };
};

// Schlecht bewertete Antworten (zum Optimieren)
export const getLowRatedChats = async (maxRating = 2, limit = 20): Promise<any[]> => {
  const { data, error } = await supabase
    .from('chat_analytics')
    .select('*')
    .lte('rating', maxRating)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return [];
  return data || [];
};

// Unbewertete Chats (Hinweis: Kunden die nicht bewerten könnten unzufrieden sein)
export const getUnratedChats = async (limit = 30): Promise<any[]> => {
  const { data, error } = await supabase
    .from('chat_analytics')
    .select('user_question, assistant_response, source, created_at')
    .is('rating', null)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return [];
  return data || [];
};

// Statistiken pro Tag
export const getDailyStats = async (days = 30): Promise<any[]> => {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from('chat_analytics')
    .select('created_at, rating, source')
    .gte('created_at', since.toISOString())
    .order('created_at', { ascending: true });

  if (error || !data) return [];

  // Gruppiere nach Tag
  const byDay: Record<string, { total: number; rated: number; avgRating: number; sources: Record<string, number> }> = {};
  for (const row of data) {
    const day = row.created_at.substring(0, 10);
    if (!byDay[day]) byDay[day] = { total: 0, rated: 0, avgRating: 0, sources: {} };
    byDay[day].total++;
    if (row.rating) {
      byDay[day].rated++;
      byDay[day].avgRating += row.rating;
    }
    byDay[day].sources[row.source] = (byDay[day].sources[row.source] || 0) + 1;
  }

  return Object.entries(byDay).map(([day, stats]) => ({
    day,
    total: stats.total,
    rated: stats.rated,
    avgRating: stats.rated > 0 ? Math.round((stats.avgRating / stats.rated) * 10) / 10 : null,
    sources: stats.sources,
  }));
};

// Welche Kategorien werden am häufigsten gebraucht?
export const getCategoryUsage = async (): Promise<Record<string, number>> => {
  const { data, error } = await supabase
    .from('chat_analytics')
    .select('categories_used');

  if (error || !data) return {};

  const counts: Record<string, number> = {};
  for (const row of data) {
    if (row.categories_used) {
      for (const cat of row.categories_used) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    }
  }
  return counts;
};

// Free-Tier: Zaehlt Fragen pro IP heute
export const getUsageToday = async (ipAddress: string): Promise<{ used: number; limit: number; remaining: number }> => {
  const limit = parseInt(process.env.FREE_DAILY_LIMIT || '3');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from('chat_analytics')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ipAddress)
    .gte('created_at', today.toISOString());

  const used = error ? 0 : (count || 0);
  return { used, limit, remaining: Math.max(0, limit - used) };
};

// Gesamtübersicht für Admin-Dashboard
export const getAnalyticsSummary = async () => {
  const [topQuestions, avgRating, lowRated, dailyStats, categoryUsage] = await Promise.all([
    getTopQuestions(30),
    getAverageRating(),
    getLowRatedChats(2, 10),
    getDailyStats(14),
    getCategoryUsage(),
  ]);

  // Sortiere Kategorien nach Nutzung
  const sortedCategories = Object.entries(categoryUsage)
    .sort((a, b) => b[1] - a[1]);

  return {
    overview: {
      totalChats: topQuestions.length,
      averageRating: avgRating,
      lowRatedCount: lowRated.length,
    },
    recentQuestions: topQuestions.slice(0, 20),
    lowRatedChats: lowRated,
    dailyStats,
    categoryUsage: sortedCategories,
  };
};

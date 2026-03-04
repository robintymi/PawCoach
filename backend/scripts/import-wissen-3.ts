import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Einträge aus Sektionen 15-20 (kundenrelevant, aus Wissenslandkarte abgeleitet)
// Sektion 17 (Coaching) und 20 (App-Features) sind trainer-intern bzw. Feature-Ideen → übersprungen
const entries: { category: string; title: string; content: string }[] = [
  // ENRICHMENT & WOHLBEFINDEN (Sektion 15)
  {
    category: 'Beschäftigung & Auslastung',
    title: 'Environmental Enrichment – Arten und Umsetzung',
    content: 'Enrichment bereichert das Hundeleben auf fünf Ebenen: Sensorisch (neue Gerüche, Texturen, Geräusche erkunden lassen), Fütterung (Suchspiele, Kong, Schnüffelteppich, Lickimat statt Napf), Kognitiv (Denkaufgaben, Puzzle-Spielzeug, Shaping-Spiele), Sozial (Hundekontakte und Menschenkontakte in angemessenem Maß) und Physisch (Klettern, Balancieren, Schwimmen, neue Untergründe). Novel Objects – neue Gegenstände zum Erkunden – sind einfach umzusetzen und hocheffektiv. Enrichment sollte zum Hund passen: Ein ängstlicher Hund braucht andere Angebote als ein selbstbewusster.',
  },
  {
    category: 'Beschäftigung & Auslastung',
    title: 'Stressreduktion und Entspannungstechniken',
    content: 'Konditionierte Entspannung: Ein Ruhesignal (z.B. Decke + Wort "Ruhe") wird systematisch mit Entspannung verknüpft – Relaxation Protocol nach Karen Overall ist dafür ideal. Schnüffeln senkt den Cortisolspiegel nachweislich – 15 Minuten Schnüffelspaziergang wirkt beruhigender als 30 Minuten Joggen. Kauen baut Stress ab (Kauartikel, Kong). TTouch (Tellington Touch) sind kreisende Berührungen, die Körperbewusstsein und Entspannung fördern. Thundershirt/Anxiety Wrap erzeugt sanften Druck, der bei manchen Hunden beruhigend wirkt. Adaptil-Pheromone können unterstützend wirken. Musik mit langsamen Tempi (Through a Dog\'s Ear) kann die Herzfrequenz senken.',
  },
  {
    category: 'Philosophie & Trainingsansatz',
    title: 'Die 5 Freiheiten und das Five Domains Model',
    content: 'Die 5 Freiheiten der Tierhaltung sind der Goldstandard für Tierwohl: 1) Freiheit von Hunger und Durst, 2) Freiheit von Unbehagen (angemessene Umgebung), 3) Freiheit von Schmerz, Verletzung und Krankheit, 4) Freiheit zum Ausleben normalen Verhaltens (ausreichend Platz, Artgenossen), 5) Freiheit von Angst und Leiden. Das modernere Five Domains Model erweitert dies um: Nutrition, Environment, Health, Behavioural Interactions und Mental State – wobei der mentale Zustand das zentrale Ziel ist. Ein Hund, der alle Freiheiten genießt, zeigt weniger Verhaltensprobleme.',
  },

  // WISSENSCHAFT & FORSCHUNG (Sektion 16) – kundenrelevant vereinfacht
  {
    category: 'Philosophie & Trainingsansatz',
    title: 'Evidenzbasiertes Hundetraining',
    content: 'Modernes Hundetraining basiert auf wissenschaftlicher Forschung, nicht auf Mythen oder Traditionen. Wichtige Erkenntnisse: Die Alpha-/Dominanztheorie ist wissenschaftlich widerlegt – Hunde bilden keine starren Hierarchien. Positive Verstärkung führt nachweislich zu besseren langfristigen Ergebnissen als Strafe. Strafbasiertes Training erhöht das Risiko für Angst und Aggression signifikant. Führende Forscher wie Patricia McConnell, Karen Pryor, Jean Donaldson und Sophia Yin haben den modernen, wissenschaftsbasierten Ansatz maßgeblich geprägt. Bei Trainingsmethoden sollte man immer fragen: Gibt es Studien dazu? Anekdotische Evidenz ("bei mir hat es funktioniert") ist kein Beweis.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Aktuelle Erkenntnisse der Hundeforschung',
    content: 'Die Kognitionsforschung zeigt: Hunde verstehen menschliche Gesten und Gesichtsausdrücke besser als jedes andere Tier. Oxytocin-Studien belegen, dass Blickkontakt zwischen Hund und Mensch bei beiden Seiten das Bindungshormon Oxytocin erhöht. Die Darm-Hirn-Achse (Gut-Brain-Axis) ist ein neues Forschungsfeld: Die Darmflora beeinflusst Verhalten und Stimmung des Hundes. Epigenetik zeigt, dass Stress der Mutter während der Trächtigkeit das Verhalten der Welpen dauerhaft beeinflusst. Genetik bestimmt Verhaltensdispositionen, aber Umwelt und Training können diese modulieren.',
  },

  // COACHING-KOMPETENZEN (Sektion 17) – nur Halter-Probleme sind kundenrelevant
  {
    category: 'Mensch-Hund-Beziehung',
    title: 'Häufige Missverständnisse zwischen Mensch und Hund',
    content: '"Der will nur spielen" ist eine der häufigsten Fehlinterpretationen – oft zeigt der Hund Stresssignale oder Überforderung, die als Spielfreude gedeutet werden. Vermenschlichung führt zu Problemen: Der Hund, der schuldig guckt, zeigt Beschwichtigung, nicht Reue. Inkonsequenz in der Familie verwirrt den Hund – alle Familienmitglieder sollten die gleichen Regeln anwenden. Unrealistische Erwartungen ("Der sollte das doch schon können") erzeugen Frustration bei Mensch und Hund. Social-Media-Vergleiche sind gefährlich – jeder Hund ist ein Individuum mit eigenem Tempo. Der Vergleich mit anderen Hunden setzt unnötig unter Druck.',
  },

  // ASSISTENZ- & THERAPIEHUNDE (Sektion 18)
  {
    category: 'Alltagssituationen & Management',
    title: 'Assistenzhunde – Typen und rechtliche Grundlagen',
    content: 'Assistenzhunde sind speziell ausgebildete Hunde für Menschen mit Behinderung: Blindenführhunde, Signalhunde für Gehörlose, Diabetikerwarnhunde (riechen Blutzuckerabfall), Epilepsie-Warnhunde, PTBS-Assistenzhunde, Autismus-Begleithunde und Mobilitäts-Assistenzhunde. Seit dem Teilhabestärkungsgesetz haben Assistenzhunde in Deutschland Zugangsrechte zu öffentlichen Gebäuden, Geschäften und Verkehrsmitteln. Die Ausbildung dauert 1,5-2,5 Jahre und erfordert zertifizierte Ausbildungsstätten. Nicht jeder Hund eignet sich – Temperament, Gesundheit und Lernfreude sind entscheidend.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Therapie- und Besuchshunde',
    content: 'Tiergestützte Therapie (AAT) wird von Therapeuten mit ausgebildetem Hund durchgeführt und hat messbare therapeutische Ziele. Tiergestützte Aktivitäten (AAA) sind Besuchsdienste in Pflegeheimen oder Krankenhäusern zur Steigerung des Wohlbefindens. Tiergestützte Pädagogik (AAP) setzt Schulhunde oder Lesehunde ein – Kinder lesen einem Hund vor, was Leseangst reduziert. Wichtig: Der Hund muss für diese Arbeit geeignet sein (Eignungstest), Hygieneanforderungen müssen erfüllt werden, und die Belastungsgrenzen des Hundes müssen respektiert werden. Ein gestresster Therapiehund ist kontraproduktiv.',
  },

  // NOTFALL & KRISENSITUATIONEN (Sektion 19) – sehr kundenrelevant
  {
    category: 'Alltagssituationen & Management',
    title: 'Sofortmaßnahmen bei Beißvorfällen',
    content: 'Nach einem Beißvorfall: 1) Ruhe bewahren, Hunde trennen (NICHT dazwischen greifen!). 2) Verletzungen versorgen, bei tiefen Bissen Arzt aufsuchen. 3) Dokumentation: Fotos der Verletzung, Ort, Zeitpunkt, Zeugen, Umstände – wichtig für eventuelle behördliche Maßnahmen. 4) Je nach Schwere: Ordnungsamt melden (Meldepflicht variiert nach Bundesland). 5) Wesenstest kann angeordnet werden – dafür professionelle Vorbereitung suchen. 6) Trainingsplan erstellen mit qualifiziertem Trainer. 7) Psychologische Unterstützung für Opfer UND Halter nicht vergessen – ein Beißvorfall ist für alle Beteiligten traumatisch.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Entlaufene Hunde – Prävention und Suche',
    content: 'Prävention: Sicheres Geschirr (Panikgeschirr für ängstliche Hunde), GPS-Tracker, zuverlässiger Rückruf, Schleppleine in unsicheren Situationen. Bei Entlaufen: Sofort handeln! Letzte Sichtungsstelle markieren. Tasso und Findefix benachrichtigen, Tierheime informieren. Suchplakate aufhängen, lokale Facebook-Gruppen für entlaufene Hunde nutzen. Bei ängstlichen Hunden: NICHT hinterherlaufen! Stattdessen Futterstelle einrichten und Lebendfalle aufstellen. Viele Hunde bleiben in einem Radius von 1-2 km. Duftspuren (eigene Kleidung, Decke) am letzten Sichtungsort auslegen.',
  },
  {
    category: 'Ernährung & Gesundheit',
    title: 'Vergiftungen und Giftköder – Erkennung und Schutz',
    content: 'Häufige Giftstoffe: Schokolade (Theobromin), Weintrauben/Rosinen, Xylit (Birkenzucker), Rattengift, Schneckenkorn, Frostschutzmittel (schmeckt süß!), Zwiebeln, Avocado, Macadamia-Nüsse. Symptome einer Vergiftung: Erbrechen, Durchfall, Zittern, Krämpfe, Speicheln, Apathie, blasse Schleimhäute. Sofortmaßnahme: Sofort zum Tierarzt! Wenn möglich, Gift identifizieren und mitnehmen. Anti-Giftköder-Training bringt dem Hund bei, nichts vom Boden aufzunehmen – basiert auf "Anzeigen statt Fressen" (Hund zeigt Fund an und wird dafür belohnt). Apps wie "Giftköder-Radar" warnen vor gemeldeten Giftködern in der Umgebung.',
  },
];

async function importEntries() {
  console.log(`${entries.length} Einträge zum Import.`);

  // Check for duplicates
  const { data: existing } = await supabase.from('knowledge').select('content');
  const existingContents = new Set((existing || []).map(e => e.content.substring(0, 50)));

  let inserted = 0;
  let skipped = 0;

  for (const entry of entries) {
    const fullContent = `${entry.title}: ${entry.content}`;
    if (existingContents.has(fullContent.substring(0, 50))) {
      skipped++;
      continue;
    }

    const { error } = await supabase.from('knowledge').insert({
      category: entry.category,
      content: fullContent,
    });

    if (error) {
      console.error(`Fehler bei "${entry.title}":`, error.message);
    } else {
      console.log(`  [${entry.category}] ${entry.title}`);
      inserted++;
    }
  }

  console.log(`\nFertig: ${inserted} eingefügt, ${skipped} übersprungen.`);

  // Category stats
  const { data: all } = await supabase.from('knowledge').select('category');
  if (all) {
    const counts: Record<string, number> = {};
    all.forEach(e => { counts[e.category] = (counts[e.category] || 0) + 1; });
    console.log('\nKategorie-Verteilung:');
    Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
      console.log(`  ${count}x ${cat}`);
    });
    console.log(`\nGesamt: ${all.length} Einträge`);
  }
}

importEntries();

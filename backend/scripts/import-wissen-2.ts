import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Einträge aus Sektionen 10-14 (nur kundenrelevant, Business-Einträge übersprungen)
const entries: { category: string; title: string; content: string }[] = [
  // TIERSCHUTZ
  {
    category: 'Angst & Unsicherheit',
    title: 'Trauma-Erkennung bei Tierschutzhunden',
    content: 'Typische Traumasymptome sind Freezing-Reaktionen, ausgeprägtes Meideverhalten, Ressourcenaggression und Berührungsempfindlichkeit. Unterscheidung wichtig: Ein traumatisierter Hund zeigt situativ variable Reaktionen (mal zutrauend, mal panisch), während ein genetisch schüchterner Hund konsistenter zurückhaltend reagiert. Traumahunde zeigen Überreaktionen auf harmlose Reize und haben Phasen der Überaktivität gefolgt von Zusammenbruch. Bei der Arbeit mit traumatisierten Hunden ist Geduld und eine nicht-konfrontative Herangehensweise essentiell – erzwungene Situationen verstärken das Trauma.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Eingewöhnung Tierschutzhund - Die 3-3-3-Regel',
    content: 'Erste 3 Tage: Shock und Desorientierung – ruhiger Rückzugsort, minimale Besucher, geduldige Gewöhnung ohne Druck. Verstecken, nicht fressen, Tremor ist NORMAL. Nächste 3 Wochen: Gewöhnungsphase, erste Routinen, erste echte Persönlichkeitszüge aber auch alte Ängste. Training minimalistisch – kurze positive Interaktionen, Sicherheit durch Vorhersagbarkeit. Nach 3 Monaten: Volle Persönlichkeit zeigt sich, Vertrauen aufgebaut, erst dann echte Trainingsziele. Dieser Prozess lässt sich nicht beschleunigen.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Auslandstierschutz - Besondere Herausforderungen',
    content: 'Auslandshunde bringen oft Mittelmeerkrankheiten (Leishmaniose) mit, die Verhaltensveränderungen auslösen können – Blutprofil vor Trainingsstart essentiell. Straßenhunde haben möglicherweise nie ein Zuhause erlebt, keine Haushaltsgeräusche gehört, keine Treppen gesehen. Sie brauchen sanfte Desensibilisierung auf alltägliche Reize. Balance zwischen Reizarmut und Reizüberflutung finden. Strukturierter Alltag mit klaren Routinen hilft, da Unvorhersehbarkeit Angst verstärkt.',
  },
  {
    category: 'Mensch-Hund-Beziehung',
    title: 'Vertrauensaufbau bei traumatisierten Hunden',
    content: 'Vertrauen wird durch Vorhersagbarkeit aufgebaut. Konsistente Routinen und vorhersehbare Konsequenzen sind fundamentaler als intensive emotionale Bindung. Dem Hund die Kontrolle geben: Er entscheidet, wie nah er kommt und wie schnell es vorangeht. Kontaktaufnahme über Ressourcen (hochwertiges Futter) ist nicht-bedrohlich. Clicker-Training kann transformativ sein – präzise Kommunikation ohne Frustration. Maulkorb-Training (positiv konditioniert) kann Vertrauen stärken. 6-12 Monate für echte Fortschritte einplanen.',
  },
  {
    category: 'Sozialverhalten & Hundebegegnungen',
    title: 'Zweithund als Sozialpartner für Tierschutzhunde',
    content: 'Ein souveräner, entspannter Ersthund kann als Vorbild dienen und dem neuen Hund zeigen: Hier ist es sicher. Das Match ist entscheidend: Ängstlicher Tierschutzhund + hochenergetischer Zweithund führt zu Konflikten. Ideal: entspannter, älterer Hund mit hoher Individualdistanz. Erste Integration auf neutralem Terrain. Häufiger Fehler: Besitzer denken, der Tierschutzhund braucht nur einen Freund. Ein Zweithund ist zusätzliche Verantwortung, nicht eine Lösung.',
  },
  // SENIOREN
  {
    category: 'Ernährung & Gesundheit',
    title: 'Kognitive Dysfunktion beim Hund (CCD)',
    content: 'Canine Cognitive Dysfunction tritt bei bis zu 68% der Hunde über 15 Jahren auf. Symptome: Desorientierung, veränderte soziale Interaktion, gestörte Schlaf-Wach-Zyklen, Unsauberkeit. Unterschied zu Schmerz: Schmerzzeichen sind lokal, CCD zeigt diffuse Veränderungen. Management: Umweltanpassungen (Nachtlichter), Medikation (Selegilin), antioxidantienreiche Ernährung, mentale Stimulation. Ein Hund mit CCD will nicht unordentlich sein – sein Gehirn funktioniert nicht mehr normal.',
  },
  {
    category: 'Ernährung & Gesundheit',
    title: 'Schmerzmanagement und Training bei Senioren',
    content: 'Subtile Schmerzzeichen: exzessives Hecheln ohne Anstrengung, Tremor, häufige Positionswechsel, exzessives Lecken, Muskelatrophie, plötzliche Aggression bei Berührung. Training anpassen: weiche Untergrundbeläge, 5-10 Minuten Einheiten, kleine hochwertige Belohnungen, keine Sprünge oder Wendungen. Nasenarbeit, langsames Laufen, mentale Puzzles als Alternative. Leistungsrückgang ist medizinisch, nicht verhaltensbezogen. Regelmäßiger Tierarzt-Kontakt für Schmerzmanagement.',
  },
  {
    category: 'Beschäftigung & Auslastung',
    title: 'Beschäftigung für ältere Hunde',
    content: 'Nasenarbeit ist ideal für Senioren: körperlich gering, mental aktivierend. 15 Minuten Schnüffel-Spaziergang kann einen Senior für Stunden entspannen. Denkspiele und Puzzle-Feeder fördern neuronale Plastizität. Spaziergänge kurz (20-30 Min), häufig (3x täglich), mit Pausen – lieber 3x15 als 1x45 Minuten. Einfach zusammen auf der Couch sein ist für Seniorenhunde oft mehr Beschäftigung als Aktivität. Ein stimuliertes Gehirn ist ein glückliches Gehirn.',
  },
  {
    category: 'Ernährung & Gesundheit',
    title: 'Ernährung und Kognition bei Senioren',
    content: 'Omega-3-Fettsäuren (EPA, DHA) sind kritisch für Gehirngesundheit. B-Vitamine, besonders B12, oft bei älteren Hunden mangelhaft – Supplementation kann dramatische Verbesserung bringen. Antioxidantien schützen das alternde Gehirn. Drei kleinere Mahlzeiten statt zwei große können Magen-Darm-Problemen vorbeugen. Reizbarkeit, Angst und Desorientierung können durch Mangelerscheinungen getrieben sein. Bluttest zur Nährstoffstatus-Beurteilung empfohlen.',
  },
  // EQUIPMENT
  {
    category: 'Leinenführigkeit & Freilauf',
    title: 'Geschirr vs. Halsband – Wann was?',
    content: 'Halsband konzentriert Zugkraft auf Trachea – bei Trachealkollaps, Schilddrüsenproblemen oder Husten kontraindiziert. Y-Geschirr verteilt Kraft über Brust und Schultern, schont Wirbelsäule. Halsband sinnvoll für: etablierte Hunde mit guter Konditionierung, leichte Führung als Signal. Problematisch bei: Welpen (Halswirbelsäule unvollständig), älteren Hunden (Nacken-Arthritis), aktivem Ziehverhalten. Pragmatisch: Im Frühtraining Geschirr, Halsband nur als Backup.',
  },
  {
    category: 'Leinenführigkeit & Freilauf',
    title: 'Schleppleine richtig einsetzen',
    content: '3m für Hausumgebung, 5m für Garten/Park, 10m für Feldarbeit, 15m für Distanztraining. Biothane besser als Nylon (sanfter, weniger Verbrennungen). IMMER am Geschirr befestigen, nie am Halsband – Verletzungs-/Strangulationsgefahr. Nicht zum Strafen nutzen: kein Ziehen, Rucken oder Festhalten aus Frustration. Rückruf-Training mit Schleppleine basiert auf positiver Verstärkung – locken, nicht ziehen.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Belohnungsbeutel, Clicker und Target-Stick',
    content: 'Treat Pouch: separate Fächer für verschiedene Belohnungsklassen, waschbar. Clicker: präzises Markersignal im Moment des gewünschten Verhaltens, muss erst konditioniert werden (Klick = Belohnung folgt). Target-Stick: zum Lehren von Positionierungen und Körperbewusstsein, rein verstärkungsbasiert – Hund berührt Stick freiwillig mit Nase und wird belohnt. Kann zu Dutzenden komplexen Verhaltensweisen führen.',
  },
  {
    category: 'Philosophie & Trainingsansatz',
    title: 'Warum aversive Tools kontraproduktiv sind',
    content: 'Stachelhalsbänder verursachen chronische Nackentrauma und psychologische Angst. Sprühhalsbänder führen zu falschen Assoziationen und PTBS-ähnlichen Reaktionen. E-Collars verursachen Angst und können zu Aggression führen. Die Wissenschaft ist eindeutig: Kurzfristig mögen sie wirken, langfristig massive Nebenwirkungen. In Deutschland sind E-Collars in vielen Bundesländern verboten. Das Tierschutzgesetz §3 verbietet Zufügung erheblicher Schmerzen. Positive Verstärkung dauert möglicherweise länger, aber Ergebnisse sind dauerhaft und die Beziehung bleibt intakt.',
  },
  // RECHT (kundenrelevant)
  {
    category: 'Alltagssituationen & Management',
    title: 'Hundegesetze in Deutschland',
    content: 'Hundegesetzgebung ist föderalistisch – jedes Bundesland hat eigene Regeln. Rasselisten variieren: Pitbull-Rassen in Bayern und NRW stark reguliert, andere Bundesländer haben keine Rasselisten. Leinenpflicht variiert ebenfalls. Sachkundenachweis ist in einigen Regionen für bestimmte Rassen erforderlich. Hundesteuersatzungen sind kommunal. Hundehalterhaftpflichtversicherung dringend empfohlen (min. 1 Mio EUR Deckung).',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Haftung bei Beißvorfällen',
    content: 'Nach einem Beißvorfall kann das Ordnungsamt einen Wesenstest anordnen. Ein Hund wird nicht automatisch als gefährlich klassifiziert – Kontext ist entscheidend. Unauffälliger Wesenstest = Freigabe, auffälliger = Auflagen (Maulkorbpflicht, Leinenpflicht, Training). Strafrechtlich können Fahrlässigkeit und Körperverletzung relevant sein. Schadensersatz kann erheblich sein. Dokumentation nach Beißvorfall ist wichtig. Eine gute Haftpflichtversicherung ist essentiell.',
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

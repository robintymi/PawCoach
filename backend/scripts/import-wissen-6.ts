import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Teil 4: Rassen, Gesundheit & Welpen – 17 Einträge (R01-R05, G01-G04, W01-W07)
const entries: { category: string; title: string; content: string }[] = [
  {
    category: 'Rassebesonderheiten',
    title: 'FCI-Gruppen – warum die Rassegruppe so viel über deinen Hund verrät',
    content: 'Die FCI (Fédération Cynologique Internationale) teilt alle anerkannten Rassen in 10 Gruppen ein, die auf dem ursprünglichen Verwendungszweck basieren. Gruppe 1 (Hüte- und Treibhunde): Border Collie, Australian Shepherd, Deutscher Schäferhund – brauchen geistige Arbeit, sind reizempfindlich, extrem lernwillig. Gruppe 2 (Pinscher, Schnauzer, Molosser): Rottweiler, Boxer, Berner Sennenhund – oft territorial, brauchen klare Führung und Sozialisierung. Gruppe 3 (Terrier): Jack Russell, Bull Terrier – eigenständig, erregbar, starker Beutetrieb. Gruppe 4 (Dachshunde): Selbstständig, jagdlich ambitioniert, mutig trotz kleiner Größe. Gruppe 5 (Spitze und Urtyp): Husky, Akita, Shiba Inu – unabhängig, starker Jagdtrieb, oft kein zuverlässiger Freilauf möglich. Gruppe 6-8 (Jagdhunde verschiedener Art): Beagle, Labrador, Weimaraner – Nasenarbeit und Auslastung sind entscheidend. Gruppe 9 (Gesellschaftshunde): Malteser, Cavalier – gezüchtet für Nähe zum Menschen, oft anhänglicher. Gruppe 10 (Windhunde): Greyhound, Whippet – Hetzjäger auf Sicht, extrem schnell, oft ruhig im Haus. Das Wissen um die Rassegruppe hilft enorm bei der Trainingsplanung.',
  },
  {
    category: 'Rassebesonderheiten',
    title: 'Arbeitslinien vs. Showlinien – ein großer Unterschied',
    content: 'Innerhalb derselben Rasse gibt es oft massive Unterschiede zwischen Arbeitslinien und Showlinien. Arbeitslinien werden auf Leistung selektiert: Trieb, Ausdauer, Arbeitsmotivation, Erregbarkeit. Showlinien werden auf Aussehen und oft ruhigeres Temperament selektiert. Beispiel Border Collie: Ein Arbeitslinie-Border Collie aus Schafherdenzucht hat einen extrem hohen Arbeitswillen, ist hochsensibel, braucht täglich echte geistige Aufgaben – ohne wird er „verrückt." Ein Showlinie-Border Collie ist oft deutlich ruhiger und einfacher im Familienalltag. Beispiel Labrador: Arbeitslinie aus der Jagdhundzucht: schlank, extrem triebig, braucht echte Aufgaben. Showlinie: schwerer, ruhiger, einfacher als Familienhund. Beispiel Deutscher Schäferhund: Arbeitslinie (Hochzucht/Leistungszucht): erregbarer, mehr Trieb, weniger Gelassenheit. SV-Showlinie: oft ruhiger, aber mehr gesundheitliche Probleme (Rücken). Die Wahl der richtigen Linie ist für den Hundekäufer mindestens so wichtig wie die Wahl der Rasse.',
  },
  {
    category: 'Rassebesonderheiten',
    title: 'Qualzucht und ihre Auswirkungen auf Verhalten',
    content: 'Qualzucht betrifft nicht nur die Gesundheit, sondern auch das Verhalten und die Kommunikation von Hunden. Brachyzephale Rassen (Mops, Französische Bulldogge, English Bulldog): Die verkürzte Nase führt nicht nur zu Atemproblemen, sondern beeinträchtigt auch die Geruchswahrnehmung – der wichtigste Sinn des Hundes. Das flache Gesicht erschwert die Mimik-Kommunikation mit anderen Hunden, was zu Missverständnissen und Konflikten führen kann. Chronischer Sauerstoffmangel durch Atemprobleme kann zu Reizbarkeit und eingeschränkter Belastbarkeit führen. Hunde mit extremer Merle-Färbung können Seh- und Hörprobleme haben, was zu Unsicherheit und Angstverhalten führt. Riesenrassen mit extremem Größenwachstum haben häufig Schmerzen durch Gelenkprobleme, was das Verhalten beeinflusst. Als Trainer müssen wir diese rassebedingten Einschränkungen kennen und das Training entsprechend anpassen: Kürzere Trainingseinheiten für Brachyzephale, Schmerzmanagement berücksichtigen, Kommunikationsdefizite durch gezieltes Sozialtraining kompensieren.',
  },
  {
    category: 'Rassebesonderheiten',
    title: 'Epigenetik und pränataler Stress beim Hund',
    content: 'Epigenetik zeigt uns, dass nicht nur die Gene, sondern auch die Umwelt die Verhaltensentwicklung beeinflusst – und das sogar schon VOR der Geburt. Wenn eine trächtige Hündin unter chronischem Stress steht (Tierschutzsituation, schlechte Haltung, Krankheit), werden Stresshormone über die Plazenta an die Welpen weitergegeben. Diese Welpen zeigen später häufiger: erhöhte Stressreaktivität, geringere Frustrationstoleranz, mehr Angstverhalten, schwierigere Sozialisation. Das bedeutet: Welpen aus stressigen Zuchtbedingungen (Vermehrerstationen, Tierschutz-Hündinnen) starten mit einem Nachteil, der NICHT durch ihre eigenen Erfahrungen verursacht wurde. Das erklärt auch, warum manche Welpen trotz guter Sozialisierung ängstlich bleiben. Epigenetische Veränderungen können über Generationen weitergegeben werden. Für Trainer bedeutet das: Realistische Erwartungen setzen, den individuellen Hund sehen, und akzeptieren dass manche Hunde von Geburt an sensibler sind – nicht weil der Halter „Fehler" gemacht hat, sondern weil die biologische Grundlage anders ist.',
  },
  {
    category: 'Rassebesonderheiten',
    title: 'Listenhunde – Fakten statt Vorurteile',
    content: 'Rasselisten existieren in vielen Bundesländern und kategorisieren bestimmte Rassen als „gefährlich" – meist American Staffordshire Terrier, Staffordshire Bull Terrier, Pitbull und Bull Terrier, teilweise auch Rottweiler, Dobermann und andere. Wissenschaftlich sind Rasselisten NICHT haltbar: Studien zeigen keinen Zusammenhang zwischen Rasse und Beißhäufigkeit, wenn man für Halterverhalten, Sozialisation und Haltungsbedingungen kontrolliert. In Niedersachsen wurde die Rasseliste 2003 abgeschafft – die Beißstatistik hat sich NICHT verschlechtert. Die Auflagen variieren stark nach Bundesland: Wesenstest, Sachkundenachweis, Maulkorb- und Leinenpflicht, erhöhte Hundesteuer, manchmal Haltungsverbote. Für betroffene Halter: Den Wesenstest gut vorbereiten (ein kompetenter Trainer kann helfen), alle Auflagen einhalten, Sachkundenachweis machen, und den Hund als das behandeln was er ist: ein Individuum. Viele „Listenhunde" sind hervorragende Familienhunde, die unter der Stigmatisierung und den daraus folgenden Einschränkungen (weniger Freilauf, weniger Sozialkontakt) mehr leiden als nötig.',
  },
  {
    category: 'Hundeverhalten & Körpersprache',
    title: 'Sinnesorgane des Hundes – die Welt anders wahrnehmen',
    content: 'Hunde erleben die Welt fundamental anders als wir. RIECHEN: Mit 200-300 Millionen Riechzellen (Mensch: 6 Mio) und dem Jacobson\'schen Organ (nimmt Pheromone wahr) ist der Geruchssinn dominant. Hunde können einzelne Moleküle riechen, Krankheiten erschnüffeln und Zeitverläufe über Geruch wahrnehmen (wer war wann hier?). HÖREN: Hunde hören Frequenzen bis 65.000 Hz (Mensch: 20.000 Hz) und sind viel empfindlicher für Lautstärke. Deshalb reagieren viele Hunde empfindlich auf Gewitter, Feuerwerk oder hohe Töne. SEHEN: Hunde sehen in einem bläulich-gelben Farbspektrum (kein Rot/Grün-Unterscheidung), dafür haben sie ein breiteres Gesichtsfeld (250° vs. 180°) und eine viel bessere Bewegungserkennung – ein stilles Reh auf 100m Entfernung sehen sie vielleicht nicht, aber sobald es sich bewegt, haben sie es. TASTEN: Vibrissen (Tasthaare) an Schnauze, Augenbrauen und Kinn sind hochsensibel – nie abschneiden! Propriozeption (Körpergefühl) spielt eine wichtige Rolle bei Balance und Koordination. Dieses Wissen erklärt viele Verhaltensweisen und hilft beim Training.',
  },
  {
    category: 'Ernährung & Gesundheit',
    title: 'Schilddrüsenstörungen und Verhalten',
    content: 'Die Schilddrüse ist ein unterschätzter Faktor bei Verhaltensproblemen. Eine Schilddrüsenunterfunktion (Hypothyreose) kann folgende Verhaltensänderungen verursachen: Lethargie und Antriebslosigkeit, ABER auch unerklärliche Aggression, erhöhte Ängstlichkeit, Reizbarkeit, kognitive Veränderungen (Hund wirkt „verwirrt"), verminderte Lernfähigkeit. Dazu kommen körperliche Symptome: Gewichtszunahme trotz normalem Futter, Fellprobleme (dünnes, stumpfes Fell, Haarverlust besonders an der Rute – „Rattenschwanz"), Kälteinempfindlichkeit, Ohrinfektionen. Diagnose: Blutuntersuchung beim Tierarzt, ABER: Die Referenzwerte für T4 und fT4 sind oft zu weit gefasst. Ein Wert im „Normalbereich" kann für diesen individuellen Hund trotzdem zu niedrig sein. Breed-Panels berücksichtigen rassespezifische Unterschiede. Behandlung: Schilddrüsenhormone (L-Thyroxin), lebenslang, mit regelmäßiger Kontrolle. Viele Hundehalter berichten von dramatischen Verbesserungen im Verhalten nach Einstellung der Medikation. WICHTIG: Bei JEDER unerklärlichen Verhaltensänderung auch die Schilddrüse testen lassen.',
  },
  {
    category: 'Ernährung & Gesundheit',
    title: 'Ernährung und Verhaltenszusammenhänge',
    content: 'Die Ernährung beeinflusst das Verhalten mehr als viele denken. Tryptophan ist eine Aminosäure, die der Körper zu Serotonin (dem „Wohlfühl-Neurotransmitter") umbaut. Studien zeigen, dass eine tryptophanreiche Ernährung Angst und Aggression reduzieren kann. Gute Quellen: Truthahn, Huhn, Fisch, Eier, Kürbiskerne. Der Mythos „Hoher Proteingehalt macht Hunde aggressiv" ist so nicht richtig. Die QUALITÄT des Proteins ist entscheidend, nicht die Menge. Schlechtverdauliches Protein kann zu Unwohlsein und damit Reizbarkeit führen. Hochwertiges Protein ist unbedenklich. Darm-Hirn-Achse: Neue Forschung zeigt, dass das Darmmikrobiom das Verhalten beeinflusst. Ein gesunder Darm = bessere Stimmung. Probiotika können bei ängstlichen Hunden unterstützend wirken. Übergewicht macht Hunde nicht nur krank, sondern auch mürrisch – chronische Entzündungen, Gelenkschmerzen und eingeschränkte Bewegung beeinflussen das Wohlbefinden. Futterbelohnung im Training: Hochwertig, in kleine Stücke (erbsengroß reicht!), Allergien beachten, und die Futtermenge der Mahlzeiten entsprechend reduzieren.',
  },
  {
    category: 'Ernährung & Gesundheit',
    title: 'Wann zum Tierarzt versus Verhaltensmediziner',
    content: 'Die Abgrenzung ist wichtig: Der Tierarzt ist zuständig für: alle medizinischen Untersuchungen, Blutbilder, Schmerzdiagnostik, Medikamentenverschreibung, körperliche Ursachen von Verhaltensproblemen. Der Tierarzt mit Zusatzbezeichnung Verhaltensmedizin (oder Fachtierarzt für Verhaltenskunde) kombiniert medizinisches Wissen mit Verhaltensexpertise. Er kann: Verhaltensmedikamente verschreiben und überwachen, medizinische von verhaltensbedingten Ursachen differenzieren, komplexe Fälle diagnostizieren (Zwangsverhalten, schwere Angststörungen, idiopathische Aggression). Der Hundetrainer ist zuständig für: Alltagstraining, Grundgehorsam, moderate Verhaltensprobleme, Beratung und Anleitung des Halters. Red Flags, bei denen IMMER zuerst der Tierarzt aufgesucht werden sollte: Plötzliche Verhaltensänderung (war vorher anders), Aggression die aus dem Nichts kommt, plötzliche Unsauberkeit, vermehrte Unruhe oder Apathie, Verhaltensänderung nach medizinischem Eingriff. Die beste Lösung: Ein Netzwerk aus Trainer, Tierarzt und ggf. Verhaltensmediziner, die zusammenarbeiten.',
  },
  {
    category: 'Welpen & Junghunde',
    title: 'Seriöse Züchter erkennen',
    content: 'Die Wahl des Züchters beeinflusst das ganze Hundeleben. Merkmale eines seriösen Züchters: Welpen wachsen IM Haus auf (nicht im Zwinger), Mutter und idealerweise Vater können besucht werden. Der Züchter stellt FRAGEN an dich (Wohnsituation, Erfahrung, Zeitbudget) – ein Züchter der jeden Welpen an jeden verkauft, ist kein guter Züchter. Gesundheitsuntersuchungen der Elterntiere (HD-Röntgen, Augenuntersuchung, Gentests je nach Rasse) werden vorgezeigt. Welpen sind bereits an Alltagsgeräusche, verschiedene Untergründe und sanftes Handling gewöhnt (Early Neurological Stimulation). Der Züchter bietet lebenslange Rücknahmegarantie. Es gibt einen Kaufvertrag und eine Ahnentafel. WARNSIGNALE: Welpen verschiedener Rassen verfügbar, Welpen können sofort mitgenommen werden (vor der 8. Woche!), kein Besuch vor Ort möglich, Übergabe auf Parkplätzen, keine Gesundheitsnachweise, zu günstiger Preis. Welpen aus dem illegalen Welpenhandel haben oft fehlende Sozialisation, gesundheitliche Probleme und eine gestresste Mutter – die Folgekosten für Tierarzt und Trainer übersteigen die „Ersparnis" beim Kauf bei weitem.',
  },
  {
    category: 'Welpen & Junghunde',
    title: 'Sozialisierungsplan erstellen – Checkliste',
    content: 'Ein strukturierter Sozialisierungsplan verhindert, dass wichtige Erfahrungen vergessen werden. Die Checkliste für Welpen (3.-16. Woche): MENSCHEN: Männer, Frauen, Kinder verschiedener Altersgruppen, Menschen mit Bart, Brille, Hut, Rollstuhl, Regenschirm, Uniform. Verschiedene Hautfarben und Körpergrößen. HUNDE: Verschiedene Rassen, Größen und Altersgruppen. Erwachsene, souveräne Hunde sind die besten „Lehrer" für Welpen. ANDERE TIERE: Katzen, Pferde, Hühner, Schafe – je nach Lebensumfeld. GERÄUSCHE: Staubsauger, Föhn, Mixer, Türklingel, Hupen, Sirenen, Gewitter (Audio-CDs in geringer Lautstärke). UNTERGRÜNDE: Gras, Asphalt, Sand, Kies, Wasser (flach!), Gitterroste, Wippe, Plastikplane, Laub. ORTE: Innenstadt, Wald, Strand, Geschäfte, Restaurant, Fahrstuhl, Treppen, verschiedene Räume. FAHRZEUGE: Auto (kurze, positive Fahrten), Bus, Straßenbahn, Fahrräder, Rollscooter. HANDLING: Pfoten anfassen, Ohren anschauen, Maul öffnen, Fell bürsten, Krallen berühren. Bei ALLEM gilt: Positive Verknüpfung! Leckerli, ruhige Stimme, kein Zwang. Wenn der Welpe Angst zeigt → mehr Abstand, langsamer, Belohnung. NIEMALS überfordern.',
  },
  {
    category: 'Welpen & Junghunde',
    title: 'Beißhemmung aufbauen – die wichtigste Welpenlektion',
    content: 'Beißhemmung ist die Fähigkeit deines Hundes, die Kraft seines Bisses zu kontrollieren. Sie wird hauptsächlich im Welpenalter gelernt – im Spiel mit Geschwistern und durch Feedback des Menschen. Wenn ein Welpe einen Geschwisterwelpen zu fest beißt, quietscht der andere und bricht das Spiel ab. So lernt der Welpe: zu fest = Spiel vorbei. Du machst es genauso: Welpe beißt zu fest → kurzer Schmerzlaut „Aua!" → Spiel sofort unterbrechen (aufstehen, wegdrehen, 10 Sekunden Pause) → Spiel wieder aufnehmen. Der Welpe lernt: Zähne an der Haut = Spielende. Zunächst nur die HARTEN Bisse „bestrafen" (mit Spielabbruch). Dann die Schwelle senken: Auch mittlere Bisse → Abbruch. Schließlich: Auch leichte Zähne an der Haut → Abbruch. FEHLER: Schnauze zuhalten (einschüchternd, Vertrauensbruch), auf den Rücken drehen (Dominanzquatsch), anschreien. Auch nicht die Hände komplett vom Welpen fernhalten – der Welpe MUSS lernen, dass menschliche Haut empfindlich ist, und das lernt er nur durch Feedback im Spiel. Beißhemmung ist KEIN Beißverbot – es ist die Fähigkeit, die Kraft zu dosieren, und das ist im Ernstfall lebensrettend.',
  },
  {
    category: 'Welpen & Junghunde',
    title: 'Stubenreinheit – Schritt für Schritt ohne Stress',
    content: 'Stubenreinheit erfordert Geduld und System, keine Strafe. Welpen haben eine winzige Blase und müssen SEHR häufig raus: nach jedem Aufwachen, nach jedem Fressen, nach jedem Spielen, und mindestens alle 2 Stunden. Immer zum GLEICHEN Platz draußen gehen. Sobald der Welpe sich löst: Begeistert loben und Leckerli geben! Das Lösen draußen wird zur absolut positiven Erfahrung. Drinnen: Unfälle passieren. Wenn du den Welpen WÄHREND des Lösens erwischst: Ruhig „Ah!" sagen, sofort nach draußen tragen (nicht schimpfen!), draußen fertig machen lassen und belohnen. Wenn du eine Pfütze FINDEST (Welpe ist längst wo anders): Kommentarlos aufwischen. Jede Reaktion ist sinnlos, weil der Welpe den Zusammenhang nicht mehr herstellen kann. NIEMALS: Nase reinstufen (alter Mythos, funktioniert nicht, traumatisiert den Welpen), bestrafen (der Welpe versteht nicht WARUM und lernt nur, sich zu verstecken zum Lösen), über Nacht im Käfig einsperren ohne Möglichkeit rauszugehen. Ein Tagebuch hilft: Notiere wann der Welpe trinkt, frisst und sich löst. So erkennst du Muster und kannst vorausplanen.',
  },
  {
    category: 'Welpen & Junghunde',
    title: 'Welpenschule – worauf du achten solltest',
    content: 'Nicht jede Welpenschule ist gut. Qualitätsmerkmale: Gruppen nach Alter und Größe getrennt (ein 8-Wochen-Chihuahua gehört nicht in die gleiche Gruppe wie ein 16-Wochen-Schäferhund). Der Trainer greift ein, wenn ein Welpe gemobbt wird oder überfordert ist. Es gibt NICHT nur Freispiel, sondern auch Übungen, Erkundung, Entspannung. Der Trainer erklärt Körpersprache und zeigt den Haltern, was gerade zwischen den Welpen passiert. Positive Verstärkung ist die Trainingsbasis. Die Umgebung ist sicher (eingezäunt, sauberer Boden, keine Gefahren). WARNZEICHEN: „Die regeln das unter sich" (nein, Mobbing ist kein Lerneffekt), alle Welpen in einer Gruppe egal wie groß, die Welpen sind permanent im Freispiel (Übererregung!), aversive Methoden (Leinenruck, Anschreien, Runterdrücken), dreckige oder unsichere Umgebung. Eine gute Welpenstunde hat: 1/3 Freispiel (mit Intervention bei Problemen), 1/3 Übungen (Grundsignale, Handling), 1/3 Erkundung und Umweltgewöhnung (verschiedene Untergründe, Geräusche, Objekte). Und: Der Halter LERNT, seinen Welpen zu lesen und zu unterstützen.',
  },
  {
    category: 'Welpen & Junghunde',
    title: 'Alleinbleiben von Anfang an aufbauen',
    content: 'Alleinbleiben ist keine Selbstverständlichkeit – es muss von Anfang an in Minischritten geübt werden. Fehler: Die ersten 2 Wochen 24/7 beim Welpen sein und dann plötzlich 4 Stunden weg. Richtiger Aufbau: Ab der ersten Woche kurze Trennungsmomente einbauen. In einen anderen Raum gehen für 10 Sekunden, zurückkommen, kein Drama machen. Langsam steigern: 30 Sekunden, 1 Minute, 3 Minuten, 5 Minuten. NICHT linear – variiere die Zeiten (5 Min, dann 2 Min, dann 8 Min, dann 3 Min). Vor dem Alleinsein: Hund ist satt, hat sich gelöst, hatte Bewegung, ist müde. Einen Kauartikel oder gefüllten Kong geben. Kein großes Abschiedsritual – einfach gehen, leise Tür zu. Beim Zurückkommen: Erst ignorieren bis der Hund ruhig ist, DANN ruhig begrüßen. Wenn der Welpe beim Alleinsein weint: Du bist zu schnell vorgegangen. Geh zurück zu einer Dauer, die funktioniert. Kamera aufstellen, um zu sehen wie der Welpe wirklich reagiert. Manche Welpen weinen 30 Sekunden und schlafen dann ein – das ist okay. Dauerhaftes Weinen, Hecheln, Sabbern oder Zerstörung sind Stresszeichen.',
  },
  {
    category: 'Welpen & Junghunde',
    title: 'Handling und Cooperative Care beim Welpen',
    content: 'Von Anfang an sollte dein Welpe lernen, dass Anfassen überall am Körper etwas Positives ist. Das erleichtert später alles: Tierarztbesuche, Krallenschneiden, Fellpflege, Zecken entfernen. Aufbau: Streichle den Welpen und gib dabei Leckerli. Dann: Pfoten berühren → Leckerli. Ohren anfassen → Leckerli. Maul sanft öffnen → Leckerli. Rute anfassen → Leckerli. Immer in der Reihenfolge: Erst berühren, dann belohnen. So verknüpft der Welpe das Anfassen mit etwas Positivem. Wenn der Welpe sich entzieht oder unwohl wirkt: NICHT festhalten! Stattdessen: Einfacher machen (nur kurz berühren statt halten), höherwertige Belohnung, langsamerer Aufbau. Das ist der Grundstein für Cooperative Care. Auch Tierarzt-Simulation üben: Auf den Tisch heben (bei kleinen Hunden), Thermometer zeigen, mit dem Stethoskop spielen, Ohren anschauen, in den Mund gucken. Wenn all das im Welpenalter positiv verknüpft wird, hast du einen Hund der Tierarztbesuche gelassen nimmt statt in Panik zu verfallen.',
  },
];

async function importEntries() {
  console.log(`${entries.length} Einträge zum Import (Rassen R01-R05, Gesundheit G01-G04, Welpen W01-W07).`);

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

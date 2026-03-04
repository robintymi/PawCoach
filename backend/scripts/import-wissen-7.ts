import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Teil 5: Spezialtraining, Mehrhundehaltung, Alltag – 13 Einträge (S01-S05, M01-M02, A01-A06)
const entries: { category: string; title: string; content: string }[] = [
  {
    category: 'Leinenführigkeit & Freilauf',
    title: 'Schleppleinentraining – Freiheit mit Sicherheitsnetz',
    content: 'Die Schleppleine (5-15 Meter) ist das wichtigste Tool für Hunde, die noch keinen zuverlässigen Freilauf haben. Material: Biothane ist ideal – leicht, wasserabweisend, trocknet schnell. Nylon saugt sich voll und brennt in den Händen bei Zug. Leder ist schwer. IMMER am Brustgeschirr befestigen, NIE am Halsband (Verletzungsgefahr am Nacken bei plötzlichem Stopp). Handling: Die Leine schleift locker am Boden. Du hältst sie NICHT permanent fest, sondern trittst drauf oder greifst ein, BEVOR der Hund am Ende der Leine ankommt. Die Leine aufwickeln, wenn der Hund nah ist, locker lassen wenn er entfernt ist. Nie die Leine nutzen, um den Hund zu dir zu ZIEHEN – das zerstört den Rückruf. Die Leine verhindert nur, dass er wegrennt. Der Rückruf wird trotzdem über Belohnung aufgebaut. Schleppleine + Clicker/Marker + hochwertige Belohnung = Die Kombination für zuverlässigen Rückruf. Die Leine gibt dir Sicherheit, dass der Hund keine Fehler machen kann, während du das richtige Verhalten belohnst. Vorsicht: Schleppleine nie am Geschirr lassen wenn der Hund mit anderen Hunden spielt (Verhedderns- und Verletzungsgefahr).',
  },
  {
    category: 'Beschäftigung & Auslastung',
    title: 'Tricktraining – warum es viel mehr als Spaß ist',
    content: 'Tricktraining ist nicht nur Unterhaltung, sondern eines der wertvollsten Trainingstools überhaupt. Es fördert: Kreativität und Problemlösung beim Hund, die Kommunikation zwischen Mensch und Hund, Kooperation und Teamwork, Körperbewusstsein und Koordination, Selbstvertrauen (besonders bei ängstlichen Hunden), und die Frustrationstoleranz. Einfache Tricks zum Starten: Pfote geben (Hund stößt natürlich gegen geschlossene Futterfaust → Marker + Belohnung), Drehen (mit Leckerli im Kreis führen → fading zum Handzeichen), Männchen (aus Sitz, Leckerli langsam hochführen), Verbeugen (Leckerli unter dem Bauch durchführen). Fortgeschrittene Tricks: Aufräumen (Spielzeug in eine Kiste bringen – Chaining!), Licht an/aus (Pfotentarget auf Schalter), Tür schließen (Nasentarget auf Tür), Schäm dich (Pfote über die Nase). 101 Things to Do with a Box: Stelle einen Karton hin und belohne ALLES was der Hund damit tut. Das fördert die Kreativität enorm und ist die Basis für Shaping. Für ängstliche Hunde: Tricks geben Erfolgserlebnisse und Kontrolle über die Situation – beides baut Selbstvertrauen auf.',
  },
  {
    category: 'Beschäftigung & Auslastung',
    title: 'Hundesport-Überblick – die richtige Sportart für deinen Hund',
    content: 'Nicht jeder Sport passt zu jedem Hund. Agility: Parcours mit Hürden, Tunnel, Slalom, Wippe. Gut für: aktive, wendige Hunde mit gutem Körperbewusstsein. Nicht gut für: Hunde mit Gelenkproblemen, sehr schwere Rassen, Welpen (Gelenke noch nicht ausgewachsen!). Rally Obedience: Parcours mit Übungsstationen (Sitz, Platz, Slalom etc.) in der Reihenfolge abarbeiten. Gut für: Anfänger, ältere Hunde, als Einstieg in den Hundesport. Mantrailing: Personensuche anhand der individuellen Geruchsspur. Gut für: JEDEN Hund, auch ängstliche, alte oder körperlich eingeschränkte. Fördert Selbstbewusstsein. Treibball: Hund treibt große Gymnastikbälle in ein Tor. Gut für: Hütehunde, die eine Alternative zum Hüten brauchen. Canicross: Joggen mit dem Hund, der vorne im Zuggeschirr läuft. Gut für: lauffreudige Rassen mit gutem Grundgehorsam. Hoopers: Ähnlich wie Agility, aber ohne Sprünge – Bögen, Tunnel, Fässer. Gut für: Senioren, große Rassen, Hunde mit Gelenkproblemen. Degility: Sanftere Variante von Agility mit Balancier- und Kletterelementen. Gut für: Körperbewusstsein, Selbstvertrauen.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Autofahren trainieren – stressfrei unterwegs',
    content: 'Viele Hunde haben Probleme beim Autofahren: Stress, Übelkeit, Bellen, oder sie weigern sich einzusteigen. Training: LANGSAM aufbauen. Schritt 1: Zum Auto gehen, Leckerli am Auto. Schritt 2: Auto öffnen, Leckerli im Auto. Schritt 3: Hund steigt ein (oder wird reingehoben), Leckerli, wieder raus. Schritt 4: Motor an, stehen bleiben, Leckerli. Schritt 5: Kurze Fahrt (50 Meter!), an schönem Ort ankommen. Langsam steigern. Reiseübelkeit: Häufig bei Welpen, wächst sich oft raus. Hilft: Auf leeren Magen fahren, frische Luft, geradeaus fahren statt Serpentinen. Ingwer-Tabletten (mit Tierarzt besprechen) oder Cerenia (Tierarzt-Medikament) gegen Übelkeit. Sicherung: Transportbox (am sichersten, Crashtest-geprüft), Hundeautogurt (besser als nichts), Trenngitter (verhindert Schleudern). Ein ungesicherter Hund ist ein Geschoss bei einem Unfall – und je nach Bundesland bußgeldpflichtig. Hunde die im Auto bellen (an Spaziergängern, anderen Hunden): Sichtschutz an den Fenstern, Boxentraining, oder Desensibilisierung (im geparkten Auto langsam an Ablenkung gewöhnen).',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Reisen mit Hund – Öffentliche Verkehrsmittel und Flug',
    content: 'Öffentliche Verkehrsmittel: In Deutschland dürfen Hunde in Bussen und Bahnen mitfahren, oft mit Maulkorbpflicht und Leinenpflicht (variiert nach Verkehrsverbund). Training: Erst leere Haltestelle besuchen, dann kurze Strecken fahren, langsam steigern. Kleiner Hund in der Transportbox ist einfacher. Große Hunde: Maulkorbtraining vorher abschließen, ruhiges Platz auf engem Raum üben, Stoßzeiten meiden. Flugreisen: Kleine Hunde (meist bis 8kg) dürfen in der Kabine in einer Transporttasche mitfliegen. Große Hunde müssen in den Frachtraum – das ist stressig und potenziell gefährlich (Temperatur, Lärm, Druckveränderungen). Stumpfnasige Rassen (Brachyzephale) dürfen bei vielen Airlines NICHT fliegen (Atemprobleme!). Vorbereitung: Transportbox als sicheren Ruheplatz aufbauen (Wochen vorher!), Tierarzt-Check, ggf. leichte Beruhigungsmittel besprechen (KEINE Sedierung – bei Druckveränderungen gefährlich!). Grundsätzlich: Wenn möglich, Flugreisen mit Hund vermeiden. Auto oder Bahn ist für den Hund deutlich stressärmer.',
  },
  {
    category: 'Sozialverhalten & Hundebegegnungen',
    title: 'Konflikte zwischen Hunden im Haushalt analysieren',
    content: 'Wenn Hunde im selben Haushalt streiten, ist schnelles und genaues Analysieren wichtig. Ursachen: Ressourcenkonkurrenz (Futter, Spielzeug, Liegeplatz, Aufmerksamkeit des Menschen), mangelhaftes Management (Hunde werden in Situationen gebracht, die sie überfordern), Persönlichkeitsinkompatibilität (manche Hunde passen einfach nicht zusammen), medizinische Ursachen (Schmerzen bei einem Hund machen ihn reizbar), soziale Reife (mit 1-3 Jahren verändert sich das Sozialverhalten, der einst verträgliche Junghund kann als Erwachsener schwieriger werden). Analyse: Wann passieren die Konflikte? Bei Futter, an Engstellen, wenn der Besitzer nach Hause kommt, bei Erregung? Wer eskaliert zuerst? Gibt es Vorwarnsignale? Wie schnell beruhigen sich die Hunde? Trainingsansätze: Getrennt füttern, Engstellen entschärfen, Ressourcen großzügig anbieten, jeden Hund einzeln trainieren und beschäftigen, Ruheinseln schaffen. Bei ernsthaften Verletzungen: Sofort trennen und professionelle Hilfe suchen. Manchmal ist die ehrliche Antwort: Diese beiden Hunde können nicht sicher zusammenleben, und eine Trennung ist der beste Weg.',
  },
  {
    category: 'Sozialverhalten & Hundebegegnungen',
    title: 'Der Zweithund – Entscheidungshilfe und Eingewöhnung',
    content: 'Die Entscheidung für einen Zweithund sollte gut überlegt sein. Fragen vorab: Warum willst du einen zweiten Hund? (Falsche Gründe: „Damit der erste nicht allein ist" – ein unsicherer Hund wird mit einem Zweithund nicht sicherer, und der Zweithund übernimmt möglicherweise die Unsicherheit). Hat dein erster Hund ein solides Training? Zweit-hund-Training mit zwei untrainierten Hunden ist doppelt schwer. Verträgt sich dein Hund mit anderen? Nicht jeder Hund will einen Mitbewohner. Hast du genug Zeit, Geld und Platz für zwei? Gute Kombinationen: Unterschiedliches Geschlecht (Rüde + Hündin) ist oft einfacher. Ähnliche Größe und Aktivitätslevel. Der Zweithund sollte NICHT der gleichen Rasse und dem gleichen Geschlecht sein wie der Erste (höchstes Konfliktpotential: zwei gleichgeschlechtliche Hunde derselben Rasse im ähnlichen Alter). Eingewöhnung: Erst auf neutralem Terrain treffen. Parallelspaziergänge. Zu Hause: Jeder hat seinen eigenen Bereich. Getrennt füttern. Kauartikel getrennt. In den ersten Wochen nie unbeaufsichtigt zusammen lassen. Und ganz wichtig: Der Ersthund verliert KEINE Privilegien durch den Neuen.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Hund und andere Haustiere – Zusammenleben mit Katzen',
    content: 'Hund und Katze können beste Freunde werden, aber es braucht sorgfältige Einführung. Grundregeln: Die KATZE bestimmt das Tempo. Sie braucht Fluchtmöglichkeiten (erhöhte Plätze, Katzentüren die der Hund nicht passieren kann). Der Hund muss unter Kontrolle sein (Leine/Geschirr im Haus). Aufbau: Phase 1: Geruch austauschen (Decken zwischen den Räumen tauschen). Phase 2: Durch geschlossene Tür riechen und hören lassen. Phase 3: Sichtbar, aber getrennt (Babygitter). Phase 4: Kurze gemeinsame Momente, Hund an der Leine, Katze hat Fluchtweg. Immer belohnen wenn der Hund die Katze ruhig anschaut oder ignoriert. WICHTIG: Manche Hunde (besonders solche mit starkem Jagdtrieb) können NIEMALS sicher mit Katzen leben. Ein Hund der fixiert, steif wird und sich nicht abrufen lässt wenn er die Katze sieht, zeigt Jagdverhalten – nicht Spielinteresse. Predatory Drift ist real und kann tödlich enden. Katzenfutter und Katzenklo: Für den Hund unzugänglich machen (erhöht stellen, Katzenklappe zum Katzenklo). Hunde lieben Katzenkot und Katzenfutter – Management ist einfacher als Training.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Hund im Büro – Tipps für den Bürohund',
    content: 'Bürohunde werden immer beliebter, aber nicht jeder Hund ist dafür geeignet. Voraussetzungen: Der Hund muss mehrere Stunden ruhig liegen können. Er darf nicht auf jedes Geräusch oder jeden Besucher reagieren. Er muss stubenrein sein und mit Menschenmengen klarkommen. Vorbereitung: Decken-/Platztraining perfektionieren – der Hund muss auf seiner Decke bleiben können. Geräuschgewöhnung (Drucker, Telefon, Gespräche). Aufzugtraining wenn nötig. Begegnung mit vielen Menschen üben. Im Büro: Fester Platz mit Decke und Wassernapf unter dem Schreibtisch. Kauartikel für Beschäftigung. Regelmäßige Pausen (alle 2-3 Stunden raus). Regeln für Kollegen: Nicht ungefragt füttern, nicht stören wenn der Hund schläft, Signale des Hundes respektieren. Nicht geeignet: Hunde mit Angstproblemen (gestresst durch die Umgebung), stark reaktive Hunde, Hunde mit Trennungsstress (paradoxerweise – der Hund ist zwar beim Besitzer, aber die fremde Umgebung kann stressen). Start: Erstmal für 2-3 Stunden mitnehmen und schauen wie der Hund reagiert, bevor du auf volle Tage gehst.',
  },
  {
    category: 'Beschäftigung & Auslastung',
    title: 'Spazierganggestaltung – mehr als nur Gassi gehen',
    content: 'Ein Spaziergang ist nicht gleich ein Spaziergang. Variiere bewusst zwischen verschiedenen Typen: Die SCHNÜFFELRUNDE: Der Hund bestimmt Tempo und Richtung. Er darf ausgiebig schnüffeln, markieren, die Welt mit der Nase erkunden. Das ist geistige Auslastung und Stressabbau. Mindestens ein Spaziergang pro Tag sollte so sein. Die TRAININGSRUNDE: Hier baust du Übungen ein – Sitz an der Kreuzung, Bleib mit Ablenkung, Rückruf üben, Leinenführigkeit trainieren. Kurze Trainingseinheiten (3-5 Minuten), dann wieder Freizeit. Die ABENTEUERRUNDE: Neue Orte, neue Gerüche, neue Untergründe. Stadt, Wald, Feld, Strand. Neue Erfahrungen in positivem Kontext. Die SOZIALRUNDE: Gemeinsam mit Hundefreunden unterwegs. Kontrollierte Sozialkontakte, Parallelgehen, kurzes Spielen. Die RUHIGE RUNDE: Abends kurz raus, lösen lassen, ruhig wieder rein. Kein Abenteuer, keine Aufregung. Was du vermeiden solltest: Jeden Tag die gleiche Route zur gleichen Zeit (langweilig!), nur Ballwerfen (Erregung hoch, kein Denken), den Hund nie schnüffeln lassen (frustrierend), und 3-Stunden-Wanderungen die den Hund überfordern statt zufriedenzustellen.',
  },
  {
    category: 'Angst & Unsicherheit',
    title: 'Silvester und Geräuschphobien vorbereiten',
    content: 'Silvester ist für Millionen Hunde die schlimmste Nacht des Jahres. Vorbereitung beginnt MONATE vorher: Geräuschdesensibilisierung: Audio-Aufnahmen von Feuerwerk bei sehr geringer Lautstärke abspielen, dabei normal agieren und den Hund mit Leckerlis oder Spielzeug belohnen. Über Wochen minimal lauter werden. NIE lauter drehen als der Hund entspannt bleiben kann. Sicherer Rückzugsort: Innerer Raum ohne Fenster, abgedunkelt, mit Hundedecke und Musik/weißem Rauschen. Am Silvesterabend: Fenster und Rollläden schließen. Fernseher oder Musik laufen lassen. Den Hund NICHT trösten wenn er Angst hat (verstärkt die Angst) – aber auch NICHT ignorieren. Ruhig und normal verhalten, Präsenz zeigen. Kauartikel, Schnüffelspiele, gefüllter Kong als Ablenkung BEVOR der Stress beginnt. Medikamente: Mit dem Tierarzt besprechen (Trazodone, Gabapentin, Sileo – mindestens 2 Wochen vorher testen!). Adaptil-Verdampfer aufstellen (eine Woche vorher starten). Thundershirt kann helfen. An Silvester den Hund NICHT mit rausnehmen. Letzter Spaziergang vor Einbruch der Dunkelheit. Doppelte Sicherung (Geschirr + Halsband), falls der Hund doch mal raus muss – geräuschphobische Hunde rennen in Panik weg.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Hund und ältere Menschen – besondere Bedürfnisse',
    content: 'Hunde für ältere Menschen können ein Segen sein: Struktur im Alltag, Bewegungsanreiz, Gesellschaft, sinkender Blutdruck. Aber die Wahl des Hundes ist entscheidend: Geeignet: Ruhigere Rassen und ältere Hunde (ab 3-4 Jahren). Gesellschaftshunde (Gruppe 9), ältere Retriever oder Cavalier King Charles sind oft ideal. Hunde aus dem Tierschutz ab 5+ Jahren können perfekte Begleiter sein. Weniger geeignet: Sehr aktive Rassen (Border Collie, Malamute, Weimaraner), große schwere Rassen (schwer zu halten bei Zug, schwer zu pflegen), Welpen (zu anstrengend, Sturzgefahr). Trainingsanpassung: Signale die im Sitzen gegeben werden können. Leinenführigkeit als oberste Priorität (Sturzgefahr!). Klare Routinen die leicht einzuhalten sind. Kurze, häufige Spaziergänge statt langer Wanderungen. Vorsorge: Wer kümmert sich um den Hund bei Krankheit oder Krankenhausaufenthalt? Diese Frage VORHER klären. Viele Tierschutzorganisationen bieten Patenschaften oder Pflegestellen an, die im Notfall einspringen.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Stadthund – besondere Herausforderungen',
    content: 'Das Leben in der Stadt stellt Hunde vor besondere Herausforderungen: Reizüberflutung (Autos, Menschen, Geräusche, andere Hunde, Gerüche – alles auf engstem Raum), enge Wege (Hundebegegnungen auf dem Bürgersteig ohne Ausweichmöglichkeit), wenig Freilaufflächen, und ständiger Menschenkontakt. Training für den Stadthund: Leinenführigkeit ist absolut essentiell – der Hund MUSS an lockerer Leine laufen können. Hundebegegnungen auf engem Raum managen: U-Turn, Straßenseite wechseln, Aufmerksamkeitssignal. „Schau" oder „Touch" als Umlenkung. Entspannungstraining in belebter Umgebung: Decke in Cafe, Liegen vor dem Supermarkt. Reizgewöhnung von Anfang an: Straßenbahn, Menschenmenge, Ampeln, Fahrräder, E-Scooter. Der Stadthund braucht MEHR Ruhe als der Landhund, nicht weniger, weil die Reizbelastung höher ist. Ein guter Stadthund ist nicht der, der „alles mitmacht", sondern der, der gelernt hat, Reize gelassen zu ignorieren.',
  },
];

async function importEntries() {
  console.log(`${entries.length} Einträge zum Import (Spezialtraining S01-S05, Mehrhund M01-M02, Alltag A01-A06).`);

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

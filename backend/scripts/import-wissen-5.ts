import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Teil 3: Verhaltensprobleme & Therapie (Vertiefung) – 17 Einträge (V01-V17)
const entries: { category: string; title: string; content: string }[] = [
  {
    category: 'Aggression & Reaktivität',
    title: 'Angstaggression im Detail',
    content: 'Angstaggression ist die häufigste Form von Aggression beim Hund. Der Hund greift nicht an, weil er „böse" ist, sondern weil er keinen anderen Ausweg sieht. Typische Anzeichen: Der Hund zeigt zuerst defensives Verhalten (Rückzug, Meiden, Calming Signals), und WENN das nicht funktioniert (weil er an der Leine ist, in der Ecke steht, oder die Signale ignoriert werden), wechselt er in den Angriff. Körpersprache: Gewicht nach hinten verlagert, Ohren angelegt, Rute eingezogen, Körper duckt sich – aber die Zähne blitzen. Das ist der „Ich will hier weg, aber wenn du nicht aufhörst, dann beiße ich"-Hund. Training: Mehr Abstand zum Trigger, dem Hund immer einen Fluchtweg lassen, Vertrauen aufbauen dass DU die Situation managst (sodass der Hund nicht selbst „handeln" muss). Desensibilisierung und Gegenkonditionierung auf Distanz. NIEMALS den Hund zwingen, sich dem Angstauslöser zu stellen – das bestätigt seine Angst und verschlimmert alles. Bei schweren Fällen kann medikamentöse Unterstützung (SSRIs) den Hund in einen Zustand bringen, in dem Training überhaupt erst möglich ist.',
  },
  {
    category: 'Aggression & Reaktivität',
    title: 'Territoriale Aggression und Ressourcenverteidigung im Vergleich',
    content: 'Territoriale Aggression und Ressourcenverteidigung werden oft verwechselt, sind aber unterschiedlich. Territoriale Aggression richtet sich gegen „Eindringlinge" im wahrgenommenen Revier – Haus, Garten, Auto, Stammspazierweg. Der Hund wird aktiv, BEVOR der Auslöser nah an einer spezifischen Ressource ist. Typisch: Bellen am Zaun, Aggression an der Haustür, Aufregung im Auto wenn jemand vorbeigeht. Ressourcenverteidigung dagegen ist an eine spezifische Ressource geknüpft – Futter, Knochen, Spielzeug, Liegeplatz, manchmal eine Person. Der Hund verteidigt das, was er HAT. Training bei territorialer Aggression: Management (Sichtschutz, kein Zugang zum Fenster), Alternativverhalten aufbauen (auf Platz gehen bei Klingel), Besucher positiv verknüpfen. Training bei Ressourcenverteidigung: Tauschen statt wegnehmen, Annäherung in Minischritten positiv verknüpfen, Wert des „Aufgebens" erhöhen. Bei beiden: Nie konfrontativ vorgehen, nie abstrafen – das eskaliert.',
  },
  {
    category: 'Aggression & Reaktivität',
    title: 'Umgerichtete Aggression – wenn es den Falschen trifft',
    content: 'Umgerichtete Aggression (Redirected Aggression) ist ein häufiges und oft missverstandenes Phänomen. Der Hund ist hocherregt durch einen Trigger (z.B. ein anderer Hund hinter einem Zaun), kann den Trigger aber nicht erreichen. Die aufgestaute Erregung entlädt sich am nächstbesten Ziel – das kann der eigene Besitzer sein, der Zweithund an der Leine, oder ein unbeteiligter Passant. Typische Situation: Zwei Hunde stehen zusammen am Zaun und bellen den Nachbarhund an. Die Erregung steigt, einer dreht sich um und geht auf den anderen los – obwohl die beiden sonst beste Freunde sind. Oder: Du hältst deinen Hund an der Leine fest, weil ein anderer Hund kommt, dein Hund kann nicht hin und beißt in die Leine oder in deine Hand. Prävention: Erregungslevel managen. Situation BEVOR die Erregung kippt, entschärfen. Abstand schaffen. Hunde nicht gemeinsam an Zäunen bellen lassen. Wenn ein Hund bereits hocherregt ist: Nicht anfassen, nicht festhalten (wenn möglich), sondern ruhig Abstand schaffen und warten bis er runterkommt.',
  },
  {
    category: 'Aggression & Reaktivität',
    title: 'Prädatorische Aggression versus Jagdverhalten',
    content: 'Es ist wichtig, zwischen echtem Jagdverhalten und prädatorischer Aggression zu unterscheiden. Normales Jagdverhalten: Der Hund fixiert Wild, Katzen oder Eichhörnchen, will hinterherhetzen, zeigt die typische Jagdsequenz. Das ist natürliches Hundeverhalten und keine „Aggression" im sozialen Sinne. Prädatorische Aggression wird es, wenn ein Hund andere Hunde (besonders kleine) oder Kleintiere als Beute behandelt – ein plötzlicher Wechsel aus dem Spiel in die volle Jagdsequenz inklusive Packen und Schütteln. Das nennt man auch „Predatory Drift" und ist extrem gefährlich. Warnsignale: Ein großer Hund, der im Spiel plötzlich „einfriert" und den kleinen Hund fixiert, Spielgeräusche aufhören, die Bewegungen werden leise und kontrolliert statt laut und clownesk. Das Risiko ist besonders hoch bei: großem Größenunterschied zwischen den Hunden, Hunden mit starker Jagdmotivation, und wenn kleine Hunde quietschen und rennen (löst Beutefangverhalten aus). Management ist hier entscheidend: Ungleiche Paare nur unter Aufsicht, Spielgruppen nach Größe trennen.',
  },
  {
    category: 'Aggression & Reaktivität',
    title: 'Idiopathische Aggression',
    content: 'Idiopathische Aggression – manchmal auch „Rage-Syndrom" genannt – ist eine seltene Form von Aggression, die scheinbar ohne erkennbaren Auslöser und ohne Vorwarnung auftritt. Der Hund kann in einer Sekunde friedlich sein und in der nächsten heftig zubeißen, oft ohne die üblichen Eskalationsstufen. Nach dem Vorfall scheint der Hund oft verwirrt oder desorientiert. WICHTIG: Diese Diagnose wird VIEL zu häufig gestellt. In den meisten Fällen gibt es doch einen Auslöser – er wurde nur nicht erkannt. Echte idiopathische Aggression ist extrem selten und hat möglicherweise neurologische Ursachen (epileptiforme Störungen). Bestimmte Rassen scheinen häufiger betroffen zu sein (z.B. Englische Cocker Spaniel, Springer Spaniel). Bei Verdacht: Gründliche tierärztliche und neurologische Abklärung, Videoaufnahmen der Vorfälle sammeln, detailliertes Protokoll führen. Leider sind die Behandlungsmöglichkeiten begrenzt – Verhaltensmedikamente können helfen, aber Management und Sicherheit stehen an erster Stelle.',
  },
  {
    category: 'Aggression & Reaktivität',
    title: 'Bissbewertung nach der Dunbar-Skala',
    content: 'Ian Dunbar hat eine Skala zur Bewertung der Schwere von Bissen entwickelt, die für die Einschätzung und Prognose sehr hilfreich ist. Level 1: Schnappen ohne Hautkontakt (Luftschnappen). Der Hund hat bewusst verfehlt – das ist eine Warnung, keine Attacke. Level 2: Hautkontakt, aber keine Perforation. Kratzer, Druckstellen oder leichte Hautabschürfungen. Level 3: Ein bis vier flache Einstiche, kein Einstich tiefer als die Hälfte der Eckzahnlänge. Level 4: Ein bis vier tiefe Einstiche mit oder ohne Quetschungen. Der Hund hat zugepackt und/oder geschüttelt. Level 5: Mehrfache Level-4-Bisse oder Angriff auf mehrere Personen. Level 6: Tödlicher Angriff. Die Prognose verschlechtert sich mit jedem Level dramatisch. Level 1-2: Gute Prognose mit Training. Level 3: Kann mit professioneller Hilfe und Management bearbeitet werden. Level 4+: Schwierige bis schlechte Prognose, intensive Verhaltenstherapie nötig, ggf. Medikamente. Die meisten Hundebisse sind Level 1-2 – der Hund zeigt Beißhemmung und will nur warnen. Das ist eigentlich ein gutes Zeichen.',
  },
  {
    category: 'Angst & Unsicherheit',
    title: 'Trennungsstress – das stufenweise Absenztraining',
    content: 'Das Absenztraining ist der Kern der Trennungsstress-Behandlung. Es basiert auf dem Prinzip: Wir bauen die Abwesenheit in so winzigen Schritten auf, dass der Hund UNTERHALB seiner Angstschwelle bleibt. Das Protokoll: Schritt 1: Kamera aufstellen, um den Hund zu beobachten. Schritt 2: Pre-Departure Cues desensibilisieren – Schlüssel nehmen und wieder hinlegen, Jacke anziehen und wieder ausziehen, zur Tür gehen und zurückkommen. So oft, bis diese Handlungen keine Reaktion mehr auslösen. Schritt 3: Tür aufmachen und sofort wieder zumachen. Dann: Tür auf, einen Schritt raus, zurück. Dann: 5 Sekunden draußen. 10 Sekunden. 30 Sekunden. 1 Minute. NICHT linear steigern – immer wieder kürzere Abwesenheiten einbauen (5 Min, dann 2 Min, dann 7 Min, dann 3 Min). Das verhindert, dass der Hund „die Uhr mitzählt." Safety Cues einführen: Bestimmte Musik, ein Kong, eine Duftkerze – Dinge die NUR bei geplanten Kurzabwesenheiten vorkommen und signalisieren: „Ich komme bald wieder." KRITISCH: Während des Trainings darf der Hund NICHT über seine Schwelle gebracht werden. Keine erzwungenen langen Abwesenheiten. Das braucht Organisation, lohnt sich aber langfristig enorm.',
  },
  {
    category: 'Ernährung & Gesundheit',
    title: 'Zwangsverhalten beim Hund erkennen',
    content: 'Kompulsive Verhaltensweisen beim Hund ähneln Zwangsstörungen beim Menschen. Typische Formen: Schwanzjagen (dreht sich pausenlos im Kreis), Fliegenschnappen (schnappt nach nicht vorhandenen Fliegen), Schattenjagen/Lichtjagen (fixiert Schatten oder Lichtreflexe zwanghaft), Flankensaugen (saugt an der eigenen Flanke, häufig bei Dobermann), exzessives Lecken an den Pfoten oder Beinen (kann zu Acral Lick Granuloma führen – offene, nicht heilende Wunden), Pacing (läuft stereotyp dieselbe Route). WICHTIG: Zuerst medizinische Ursachen ausschließen! Schwanzjagen kann durch Analbeutelprobleme verursacht werden, Fliegenschnappen durch neurologische Störungen, exzessives Lecken durch Allergien oder Schmerzen. Wenn medizinisch nichts gefunden wird: Diese Verhaltensweisen sind oft stressinduziert. Sie treten verstärkt auf bei Langeweile, Frustration, Reizarmut oder chronischem Stress. Behandlung: Stressreduktion, Enrichment, körperliche und geistige Auslastung, und in vielen Fällen Verhaltensmedikamente (SSRIs). Das Verhalten NICHT bestrafen und auch nicht verstärken – stattdessen BEVOR es auftritt umlenken und Alternativen anbieten.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Unerwünschtes Anspringen abtrainieren',
    content: 'Anspringen ist eines der häufigsten Alltagsprobleme. Der Hund springt hoch, weil er Aufmerksamkeit will – und bekommt sie auch (selbst Schimpfen ist Aufmerksamkeit!). Die Lösung basiert auf zwei Säulen: 1. Anspringen wird NICHT belohnt: Wenn der Hund hochspringt, drehst du dich wortlos ab, verschränkst die Arme, kein Blickkontakt. Kein „Nein!", kein Wegschieben (das ist für den Hund ein Spiel). Erst wenn alle vier Pfoten am Boden sind, gibt es Aufmerksamkeit. 2. Alternatives Verhalten wird belohnt: Bringe dem Hund bei, dass Sitz die bessere Strategie ist. Hund kommt angerannt → du sagst „Sitz" → Hund setzt sich → JACKPOT an Aufmerksamkeit, Streicheln, Leckerli. Der Sitz wird zum neuen „Ich will Aufmerksamkeit"-Verhalten. ALLE Personen im Haushalt und Besucher müssen mitmachen. Ein einziger Mensch, der Anspringen belohnt, macht das Training kaputt (variable Verstärkung!). Für große Hunde oder Kinder im Haushalt: Zusätzlich Management – Hund an der Leine wenn Besuch kommt, Absperrgitter bis er sich beruhigt hat.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Übermäßiges Bellen – Ursachen differenzieren',
    content: 'Bellen ist normale Hundekommunikation – problematisch wird es, wenn es übermäßig auftritt. Die Lösung hängt IMMER von der Ursache ab: Territorialbellen (Postbote, Spaziergänger): Sichtschutz, Management, Alternativverhalten (auf Platz gehen). Frustrationsbellen (will zu anderen Hunden, will spielen, ist eingesperrt): Frustrationstoleranz trainieren, Bedürfnisse besser erfüllen. Angstbellen (vor Geräuschen, fremden Menschen): Desensibilisierung und Gegenkonditionierung, kein Zwang. Aufmerksamkeitsbellen (schaut dich an und bellt): Konsequent ignorieren (Achtung: Extinction Burst – wird erst schlimmer, bevor es besser wird!), ruhiges Verhalten belohnen. Langeweilebellen (allein im Garten): Mehr Beschäftigung, nicht allein in den Garten stellen. Aufregungsbellen (beim Spielen, vor dem Spaziergang): Erregungsmanagement, nur bei Ruhe weitermachen. FEHLER: Das Bellen generell bestrafen. Sprühhalsbänder, Ultraschall, Schimpfen unterdrücken nur das Symptom und erzeugen zusätzlichen Stress. Die Ursache muss behoben werden.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Koprophagie – Kotfressen verstehen und managen',
    content: 'Kotfressen (Koprophagie) ist für Menschen ekelhaft, für Hunde aber ein relativ häufiges Verhalten. Ursachen: Bei Welpen ist es normales Erkundungsverhalten (die Welt wird mit dem Maul erkundet). Hündinnen fressen den Kot ihrer Welpen – Brutpflegeverhalten. Manche Hunde fressen Kot anderer Tiere (Pferde, Kaninchen, Katzen) weil er Nährstoffe oder anziehende Gerüche enthält. Medizinische Ursachen: Enzymmangel, Malabsorption, Diabetes, Schilddrüsenprobleme – immer tierärztlich abklären! Verhaltensursachen: Langeweile, Stress, erlerntes Verhalten (Hund wurde für Unsauberkeit bestraft und versucht „Beweise" zu beseitigen). Training: Zuverlässiges „Aus!" oder „Lass es!" aufbauen. Sofort nach dem Lösen belohnen und weggehen (so hat der Hund keine Gelegenheit). Kot im Garten sofort aufsammeln. Katzentoilette unzugänglich machen. Nahrungsergänzungsmittel die den Kot unattraktiv machen können helfen, aber die Ergebnisse sind gemischt. Management ist hier oft wichtiger als Training.',
  },
  {
    category: 'Rückruf & Impulskontrolle',
    title: 'Jagdverhalten managen – Anti-Jagd-Training',
    content: 'Jagdverhalten ist einer der stärksten angeborenen Instinkte beim Hund und kann durch Training NICHT vollständig gelöscht werden – aber es kann gemanagt werden. Die drei Säulen des Anti-Jagd-Trainings: 1. Management: Schleppleine in jagdlich relevanten Gebieten, Überblick über die Umgebung behalten, GPS-Tracker als Sicherheitsnetz. 2. Impulskontrolle: Der Hund lernt, bei Auslösern (Rehe, Hasen, Katzen) nicht sofort loszurennen, sondern innezuhalten. Das braucht monatelanges Training mit langsamer Steigerung. 3. Jagdersatztraining: Dem Hund eine kontrollierte Alternative bieten – Futterdummy-Suche, Reizangel, Mantrailing. Der Jagdinstinkt wird UMGELENKT, nicht unterdrückt. Der Rückruf vom Wild erfordert höchste Belohnungsqualität und jahrelange Übung. Für viele Hunde (besonders Jagdhundrassen) ist ein zuverlässiger Freilauf in der Nähe von Wild schlicht nicht erreichbar – und das ist OKAY. Schleppleine ist kein Versagen, sondern verantwortungsvolles Management. Anti-Giftköder-Training und Stopp-Signal auf Distanz ergänzen das Programm.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Unruhe im Haus und Betteln abgewöhnen',
    content: 'Viele Hunde kommen im Haus nicht zur Ruhe: Sie laufen hin und her, winseln, stupsen ihren Menschen an, können sich nicht hinlegen. Ursachen: Zu wenig oder zu viel Bewegung (ja, Überstimulation erzeugt Unruhe!), keine gelernten Ruherituale, medizinische Probleme (Schmerzen, Juckreiz), oder der Hund hat nie gelernt, sich selbst zu beruhigen. Lösung: Das Relaxation Protocol nach Karen Overall aufbauen – 15 Tage systematisches Entspannungstraining auf einer Decke. Konditionierte Entspannung: Immer wenn der Hund ruhig liegt, leise „Fein" sagen und ein Leckerli hinlegen. Ruhe wird zur belohnten Verhaltensweise. Betteln am Esstisch: Konsequent NIEMALS vom Tisch füttern – eine einzige Ausnahme und der Hund versucht es wieder (variable Verstärkung!). Alternative: Kauartikel oder gefüllter Kong auf dem Hundeplatz während der Mahlzeit. Fütterung VOR dem eigenen Essen, dann ist der Hund satt und weniger motiviert. Platzdeckentraining: Hund lernt, auf seiner Decke zu liegen während die Familie isst.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'ABC-Analyse – Verhalten systematisch verstehen',
    content: 'Die ABC-Analyse ist das wichtigste diagnostische Werkzeug der Verhaltensanalyse. A = Antecedent (Vorauslöser): Was passiert BEVOR das Verhalten auftritt? Wo? Wann? Wer ist anwesend? Was hat der Hund vorher gemacht? Setting Events spielen auch eine Rolle (Schlafmangel, Schmerz, vorangegangene Aufreger). B = Behavior (Verhalten): Was genau tut der Hund? Beschreibe beobachtbar und messbar – nicht „Der Hund ist aggressiv", sondern „Der Hund knurrt, zeigt die Zähne und lungt nach vorne." C = Consequence (Konsequenz): Was passiert NACH dem Verhalten? Und was ist die FUNKTION? Der andere Hund geht weg (negative Verstärkung), der Besitzer gibt Aufmerksamkeit (positive Verstärkung), der Hund bekommt die Ressource (positive Verstärkung). Motivating Operations: Was macht die Konsequenz gerade besonders wirksam? Ein hungriger Hund wird mehr für Futter tun. Ein einsamer Hund wird mehr für Aufmerksamkeit tun. Die ABC-Analyse hilft dir zu verstehen, WARUM dein Hund das tut – und daraus ergibt sich der Trainingsplan.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Differential Reinforcement – Alternativen verstärken',
    content: 'Differential Reinforcement ist eine elegante Methode, unerwünschtes Verhalten zu reduzieren, indem du alternatives Verhalten gezielt belohnst. Vier Formen: DRI (Differential Reinforcement of Incompatible Behavior): Verstärke ein Verhalten, das physisch nicht gleichzeitig mit dem Problemverhalten ausgeführt werden kann. Hund springt Besucher an → Sitz belohnen (sitzen und springen geht nicht gleichzeitig). DRA (Differential Reinforcement of Alternative Behavior): Verstärke ein alternatives, akzeptables Verhalten. Hund bellt am Zaun → Spielzeug bringen belohnen. DRO (Differential Reinforcement of Other Behavior): Verstärke das NICHT-Zeigen des Problemverhaltens. Hund bellt 30 Sekunden nicht → Belohnung. DRL (Differential Reinforcement of Low Rate): Verstärke das Verhalten nur, wenn es selten auftritt. Hund bellt einmal (statt zehnmal) → Belohnung. Diese Techniken sind humaner und langfristig wirksamer als Strafe, weil der Hund lernt, WAS er tun soll – nicht nur, was er NICHT tun soll.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Extinction – Löschung und der gefürchtete Extinction Burst',
    content: 'Extinction (Löschung) bedeutet: Ein Verhalten, das nicht mehr verstärkt wird, nimmt mit der Zeit ab und verschwindet. Klingt einfach, ist aber tricky. Der Extinction Burst: BEVOR ein Verhalten abnimmt, nimmt es erst KURZFRISTIG ZU – intensiver, lauter, häufiger. Der Hund denkt: „Das hat doch immer funktioniert! Ich muss es nur mehr/stärker machen!" Beispiel: Hund bellt für Aufmerksamkeit, du ignorierst ihn. Er bellt LAUTER, LÄNGER, INTENSIVER. Wenn du JETZT nachgibst, hast du ein noch schlimmeres Problem – der Hund hat gelernt, dass MEHR Bellen zum Erfolg führt. Durchhalten ist entscheidend. Spontaneous Recovery: Auch nach erfolgreicher Löschung kann das Verhalten nach Tagen oder Wochen plötzlich wieder auftauchen. Das ist normal und kein Rückschlag – wenn du weiterhin nicht verstärkst, verschwindet es wieder schneller. WICHTIG: Löschung funktioniert NUR, wenn du ALLE Verstärkung kontrollieren kannst. Bellen am Zaun → Postbote geht weg? Das kannst du nicht kontrollieren, also funktioniert Löschung hier nicht. Nutze dann andere Methoden.',
  },
  {
    category: 'Ernährung & Gesundheit',
    title: 'Verhaltensmedikamente – wann und warum sie sinnvoll sind',
    content: 'Medikamente in der Verhaltenstherapie sind KEIN Zeichen von Versagen und „betäuben" den Hund auch nicht. Sie funktionieren wie eine Brille: Sie korrigieren ein chemisches Ungleichgewicht, sodass der Hund überhaupt lernfähig wird. SSRIs (z.B. Fluoxetin): Erhöhen den Serotoninspiegel. Brauchen 4-6 Wochen bis zur vollen Wirkung. Helfen bei Angst, Zwangsverhalten, Aggression. TCAs (z.B. Clomipramin): Ähnlich wie SSRIs, oft bei Trennungsangst und Zwangsverhalten. Trazodon: Angstlösend, schneller wirksam, gut als Bedarfsmedikament (Silvester, Tierarzt). Gabapentin: Bei Angst und Schmerzen, oft in Kombination. Benzodiazepine (z.B. Diazepam): Schnell wirksam, aber Abhängigkeitspotential, eher für akute Situationen. Nutraceuticals: L-Theanin (beruhigend ohne sedierend), Alpha-Casozepin (aus Milchprotein), CBD-Öl (Evidenzlage noch dünn, aber vielversprechend). Adaptil (Pheromone): Synthetisches Beruhigungspheromon, als Verdampfer, Halsband oder Spray. Medikamente ERSETZEN kein Training, sondern ERMÖGLICHEN es. Der Hund wird nicht sediert, sondern in einen Zustand gebracht, in dem sein Gehirn neue Verknüpfungen bilden kann. IMMER nur in Zusammenarbeit mit dem Tierarzt.',
  },
];

async function importEntries() {
  console.log(`${entries.length} Einträge zum Import (Verhaltensprobleme V01-V17).`);

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

import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Teil 2: Trainingsmethoden & Techniken (Vertiefung) – 16 Einträge (T01-T16)
const entries: { category: string; title: string; content: string }[] = [
  {
    category: 'Philosophie & Trainingsansatz',
    title: 'Belohnungsbasiertes Training – Force-Free im Detail',
    content: 'Force-Free Training bedeutet, dass wir komplett auf körperlichen Zwang, Einschüchterung und absichtliche Schmerzreize verzichten. Das heißt NICHT, dass es keine Grenzen gibt – es heißt, dass Grenzen über Management und negative Strafe (Entzug von Privilegien) gesetzt werden, nicht über Schmerz oder Angst. Die wissenschaftliche Basis: Studien zeigen, dass Hunde, die mit positiver Verstärkung trainiert werden, weniger Stresszeichen zeigen, besser lernen, eine stärkere Bindung zum Menschen aufbauen und weniger Verhaltensprobleme entwickeln als Hunde, die mit aversiven Methoden trainiert werden. Eine Studie von Vieira de Castro et al. (2020) zeigte, dass aversiv trainierte Hunde höhere Cortisolwerte hatten und mehr Stresssignale zeigten. Force-Free ist nicht „weich" oder „permissiv" – es ist präzise, strukturierte Arbeit, die vom Trainer mehr Kompetenz und Timing verlangt als einfach nur zu strafen.',
  },
  {
    category: 'Philosophie & Trainingsansatz',
    title: 'LIMA-Prinzip in der Praxis',
    content: 'LIMA steht für „Least Intrusive, Minimally Aversive" – immer die am wenigsten invasive und am wenigsten unangenehme Methode wählen, die zum Ziel führt. Die Hierarchie von Susan Friedman gibt die Reihenfolge vor: 1. Gesundheit und Ernährung überprüfen (medizinische Ursachen ausschließen), 2. Umgebung anpassen (Management), 3. Positive Verstärkung (R+) einsetzen, 4. Differential Reinforcement (alternatives Verhalten verstärken), 5. Negative Strafe (P-: etwas Angenehmes entziehen), 6. Negative Verstärkung (R-) und Positive Strafe (P+) nur als allerletzte Option und nur unter professioneller Aufsicht. In der Praxis bedeutet das: Bevor du am Verhalten trainierst, frage: Ist der Hund gesund? Hat er genug Schlaf, Bewegung, Auslastung? Ist die Umgebung angemessen? Erst wenn die Grundbedürfnisse gedeckt sind, ist Training sinnvoll. Und dann immer mit der sanftesten wirksamen Methode beginnen.',
  },
  {
    category: 'Aggression & Reaktivität',
    title: 'BAT 2.0 – Behavior Adjustment Training nach Grisha Stewart',
    content: 'BAT 2.0 ist ein Ansatz speziell für Hunde mit Angst und Reaktivität. Der Kern: Der Hund bekommt die Kontrolle über die Situation zurück. Statt den Hund klassisch gegenzukonditionieren (Trigger → Leckerli), lässt man den Hund SELBST entscheiden, wie er mit dem Trigger umgeht. Der Ablauf: Du bist mit dem Hund auf genügend Abstand zum Trigger, sodass der Hund ihn wahrnimmt, aber nicht über seinen Schwellenwert kommt. Dann wartest du. Der Hund darf den Trigger anschauen, schnüffeln, die Umgebung erkunden. Sobald er ein Calming Signal zeigt oder sich vom Trigger abwendet, markst du und ihr entfernt euch zusammen (die Entfernung vom Trigger ist die funktionale Belohnung). Der Hund lernt: „Ich kann selbst entscheiden, mich zu entfernen, und mein Mensch unterstützt mich dabei." Das baut echte Bewältigungsstrategien auf, nicht nur eine Leckerli-Verknüpfung. BAT 2.0 unterscheidet sich vom alten BAT 1.0 dadurch, dass der Hund mehr Freiheit hat (lange Leine, 15-20m) und die Annäherung an den Trigger durch den Hund selbst gesteuert wird.',
  },
  {
    category: 'Aggression & Reaktivität',
    title: 'CAT – Constructional Aggression Treatment',
    content: 'CAT (Constructional Aggression Treatment) ist ein spezifisches Protokoll für aggressive oder reaktive Hunde. Das Prinzip: Der Hund wird dem Trigger auf Distanz präsentiert. Solange der Hund aggressives/defensives Verhalten zeigt, bleibt der Trigger (z.B. ein Decoy-Hund) auf Position. Sobald der Hund entspanntes Verhalten zeigt (wegschauen, sich schütteln, schnüffeln), wird der Trigger entfernt – die Entfernung des Triggers ist die Belohnung (negative Verstärkung). Über viele Wiederholungen lernt der Hund, dass entspanntes Verhalten den Trigger verlässig verschwinden lässt, und beginnt schneller sozialverträgliches Verhalten zu zeigen. WICHTIG: CAT muss von erfahrenen Trainern durchgeführt werden, weil es ein schmaler Grat ist zwischen therapeutischem Arbeiten und Flooding (Reizüberflutung). Ohne genaue Kenntnis der Schwellenwerte und Stresssignale kann CAT kontraproduktiv sein. Es wird oft in Kombination mit Management und klassischer Gegenkonditionierung eingesetzt.',
  },
  {
    category: 'Grundgehorsam & Signale',
    title: 'Sitz, Platz, Steh – Grundsignale richtig aufbauen',
    content: 'Grundsignale bilden das Fundament der Kommunikation zwischen dir und deinem Hund. SITZ: Leckerli über die Nase führen, Kopf geht hoch → Po geht runter. Marker + Belohnung. Erst wenn der Hund zuverlässig sitzt, das Wortsignal „Sitz" einführen (immer VOR der Handbewegung). PLATZ: Aus dem Sitz Leckerli zwischen die Vorderbeine zum Boden führen, dann leicht nach vorne. Viele Hunde brauchen Geduld – nicht runterdrücken! STEH: Aus dem Sitz oder Platz Leckerli waagerecht nach vorne führen, sodass der Hund aufsteht ohne vorwärts zu gehen. Hilfreich für Tierarzt, Bürsten, Abtrocknen. Alle Signale zuerst mit Handzeichen, dann verbales Signal hinzufügen. Wortsignal immer VOR dem Handzeichen geben, damit der Hund lernt, auf das Wort zu reagieren. Steh ist das am meisten vernachlässigte Signal, aber extrem nützlich. Und ganz wichtig: Das Auflösesignal! Der Hund muss wissen, wann er fertig ist – „Frei!", „Okay!", „Lauf!" signalisiert: Du darfst dich wieder bewegen.',
  },
  {
    category: 'Grundgehorsam & Signale',
    title: 'Bleib und Warte – der Unterschied und der Aufbau',
    content: 'Viele Trainer unterscheiden zwischen „Bleib" (bleib in der Position, bis ich zurückkomme) und „Warte" (halte kurz inne, gleich geht\'s weiter – z.B. vor Straßen, Türen). Aufbau von Bleib: Der Hund ist im Sitz oder Platz. 1 Sekunde warten → Marker → Belohnung IN der Position (nicht der Hund kommt zu dir!). Langsam auf 5, 10, 30 Sekunden steigern. DANN erst einen Schritt zurücktreten. DANN erst Ablenkung dazu. Nie alles gleichzeitig steigern (3D-Modell!). Häufige Fehler: Zu schnell zu weit weg gehen, zu lange verlangen, den Hund erst belohnen wenn man zurück ist (dann lernt der Hund: Aufstehen und zum Menschen kommen bringt Belohnung). Stattdessen: Mehrfach zur Position zurückkehren und DORT belohnen. Warte an Türen: Tür öffnen, Hund wartet. Erst wenn er ruhig ist, kommt das „Okay" und er darf durch. Tür geht zu, wenn er vorprescht. Der Hund lernt: Geduld = Tür geht auf, Drängeln = Tür geht zu.',
  },
  {
    category: 'Alltagssituationen & Management',
    title: 'Stationsarbeit – Decke, Box und Platz',
    content: 'Stationsarbeit bedeutet, dass dein Hund lernt, auf Aufforderung zu einem bestimmten Ort zu gehen und dort zu bleiben. Das ist extrem nützlich im Alltag: Hund geht auf seine Decke wenn Besuch kommt, Hund liegt in der Box im Restaurant, Hund bleibt auf seinem Platz während du kochst. Aufbau: Decke auf den Boden legen. Hund geht hin oder draufsteigen lassen mit Leckerli → Marker → Belohnung AUF der Decke. Dann Signal einführen: „Decke!" oder „Platz!". Langsam Dauer steigern. Dann Ablenkung (Türklingel, Essen auf dem Tisch). Box-Training: Box offen hinstellen, nie den Hund reinzwingen. Leckerlis reinwerfen. Kauartikel in der Box geben. Tür erst schließen, wenn der Hund freiwillig und gerne reingeht. Box = sicherer Rückzugsort, nie als Strafe nutzen! Ein Hund, der gerne in seine Box geht, hat einen Ort, an dem er sich sicher fühlt – beim Tierarzt, im Hotel, bei Reisen, bei Besuch.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Touch und Target – vielseitige Grundübungen',
    content: 'Touch (Nasentarget an die Hand) und Targeting (Berühren eines Zielobjekts) sind unglaublich vielseitige Übungen. Touch-Aufbau: Halte deine flache Hand neben den Hund. Die meisten Hunde stupsen instinktiv hin → Marker + Belohnung. Signal „Touch!" einführen. Einsatzmöglichkeiten: Hund vom Trigger weglenken, an der Seite halten (statt Leinenziehen), in Positionen führen ohne anzufassen, beim Tierarzt auf die Waage locken, am Straßenrand orientieren. Target-Stick: Der Hund lernt, die Spitze eines Sticks mit der Nase zu berühren. Damit kannst du ihn durch Parcours führen, an Orte dirigieren, Tricks aufbauen, oder komplexe Bewegungen trainieren. Pfotentarget: Hund lernt, die Pfote auf einen Gegenstand zu setzen – Basis für Lichtschalter betätigen, Schubladen schließen, auf der Waage stehen, Klingeln drücken (für Stubenreinheitstraining). Kinn-Target: Basis für Cooperative Care (Kinnauflage) und Medical Training.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Signalkontrolle und Cue vs. Kommando',
    content: 'Echte Signalkontrolle (Stimulus Control) bedeutet: Der Hund zeigt das Verhalten NUR auf das Signal hin, nicht spontan. Das erfordert vier Kriterien: 1. Der Hund zeigt das Verhalten sofort nach dem Signal, 2. Der Hund zeigt es NICHT ohne Signal, 3. Der Hund zeigt es NICHT auf ein anderes Signal, 4. Der Hund zeigt KEIN anderes Verhalten auf dieses Signal. Die Unterscheidung zwischen Cue und Kommando ist wichtig: Ein Cue (Signal) ist eine Information – „Wenn du jetzt Sitz machst, gibt es eine Belohnung." Ein Kommando impliziert eine Drohung – „Sitz, oder es gibt Ärger." Im modernen Training nutzen wir Cues: freundlich, informativ, ohne Druck. Handzeichen werden von Hunden generell schneller gelernt als verbale Signale, weil Hunde visuelle Kommunikatoren sind. Der häufigste Fehler: Das Signal zu früh einführen. Erst wenn das Verhalten zuverlässig angeboten wird, kommt das Signal dazu. Sonst verknüpft der Hund das Wort mit einem halbfertigen Verhalten. Fading von Hilfen: Wenn du mit Luring angefangen hast, muss die Futterhand schrittweise kleiner und unauffälliger werden, bis nur noch das Signal übrig bleibt.',
  },
  {
    category: 'Rückruf & Impulskontrolle',
    title: 'Erregungsmanagement – Arousal Up und Down',
    content: 'Erregungsmanagement ist eine der wichtigsten Fähigkeiten für jeden Hund. Erregung (Arousal) ist der allgemeine Aktivierungslevel – ein hoch erregter Hund kann nicht mehr klar denken, genau wie ein aufgeregter Mensch schlechte Entscheidungen trifft. Übung Arousal Up/Down: Kurz Spielen (Erregung hoch) → auf Signal ruhig werden (Erregung runter) → wieder Spielen → wieder runter. So lernt der Hund, sich selbst zu regulieren, und du lernst, seine Erregungslevel zu lesen und zu steuern. Anzeichen für zu hohe Erregung: Hund hört nicht mehr, fiept, springt, schnappt nach Leckerlis, kann Signale nicht mehr ausführen, zieht extrem an der Leine, hechelt stark, zeigt erweiterte Pupillen. Die Lösung ist NICHT Strafe (erhöht die Erregung noch), sondern: Reize reduzieren, Abstand schaffen, ruhig werden, ggf. den Hund einfach mal schnüffeln lassen. Schnüffeln senkt nachweislich den Erregungslevel. Einige Hunde brauchen aktives Runterfahren nach aufregenden Erlebnissen – eine ruhige Schnüffelrunde nach dem Hundeplatz, ein Kauartikel nach dem Spaziergang.',
  },
  {
    category: 'Rückruf & Impulskontrolle',
    title: 'Selbstkontrolle versus Fremdkontrolle',
    content: 'Ein fundamentaler Unterschied im Training: Fremdkontrolle bedeutet, der Hund wartet, weil DU es ihm sagst. Selbstkontrolle bedeutet, der Hund entscheidet SELBST, sich zurückzuhalten, weil er gelernt hat, dass es sich lohnt. Fremdkontrolle braucht immer dein Signal – wenn du nicht da bist oder abgelenkt, macht der Hund was er will. Selbstkontrolle funktioniert auch ohne dich. „It\'s Yer Choice" (Susan Garrett) ist das perfekte Spiel dafür: Futter auf offener Hand. Hund versucht ranzukommen → Hand schließt sich. Hund wendet sich ab → Hand öffnet sich und Hund bekommt Futter aus der anderen Hand. Der Hund lernt: Mein eigenes Zurückhalten bewirkt, dass die guten Dinge kommen. Weitere Übungen: Futter auf dem Boden, Hund schaut es an → nichts passiert. Hund schaut DICH an → Marker + anderes Futter. Keks auf der Pfote, Hund wartet, bis du das Signal gibst. All diese Übungen fördern die Fähigkeit, Impulsen zu widerstehen – eine Lebenskompetenz, die in hunderten Alltagssituationen gebraucht wird.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Verschiedene Markertypen im Detail',
    content: 'Im professionellen Training unterscheiden wir verschiedene Markertypen: Der TERMINATION MARKER (z.B. „Yep!" oder Clicker-Click) sagt: „Das war richtig, das Verhalten ist beendet, komm zur Belohnung." Der Hund darf die Position verlassen. Ideal für Tricks, Rückruf, aktive Verhaltensweisen. Der CONTINUATION MARKER (z.B. „Braaav" oder „Gut so") sagt: „Du machst es richtig, mach weiter, die Belohnung kommt zu dir." Ideal für Bleib, Leinenführigkeit, Cooperative Care. Der INTERMEDIATE BRIDGE (z.B. „Ja...ja...ja...") sagt: „Du bist auf dem richtigen Weg, gleich kommt der richtige Marker." Hilfreich bei komplexen Shaping-Aufgaben. Der NO-REWARD-MARKER (z.B. „Nope") ist kontrovers – er sagt „Das war nicht richtig, versuch\'s nochmal." Manche Hunde profitieren davon, andere werden frustriert. Wenn, dann nur bei robusten, frustrationstoleranten Hunden einsetzen und nie scharf oder laut. Das Timing ist bei allen Markern entscheidend: Der Marker muss EXAKT in dem Moment kommen, in dem das richtige Verhalten passiert – eine halbe Sekunde zu spät und du markierst das falsche Verhalten.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Belohnungslieferung – wo und wie du belohnst macht den Unterschied',
    content: 'Nicht nur WAS du als Belohnung gibst ist wichtig, sondern auch WO und WIE. Die Belohnungsposition beeinflusst das Training massiv: Beim Leinenführigkeitstraining: Belohnung an deinem Bein liefern, nicht vor der Hundenase – sonst läuft der Hund immer VOR dir. Beim Bleib: Belohnung IN der Position liefern (zum Hund hingehen), nicht den Hund zu dir rufen – sonst lernt er, dass Aufstehen belohnt wird. Beim Rückruf: Belohnung ZWISCHEN deinen Beinen oder hinter dir – so lernt der Hund, nah an dich ranzukommen, nicht 2 Meter vor dir stehen zu bleiben. Wurfbelohnung: Leckerli wegwerfen, um den Hund in Bewegung zu bringen und eine neue Wiederholung zu starten. Ideal bei Rückruf (werfen → Hund holt → kommt wieder) und bei Shaping. Futterbeutel-Position: Immer HINTER dem Rücken oder seitlich, nie vor der Brust – sonst starrt der Hund den Beutel an statt auf dich zu achten. Belohnungsqualität muss zum Schwierigkeitsgrad passen: Trockenfutter für einfache Übungen, Wurst oder Käse für schwierige Ablenkungssituationen, Superjackpot (ganzes Stück Fleischwurst) für herausragenden Rückruf.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Jackpots – Mythos oder hilfreich?',
    content: 'Der Jackpot – eine extra-große Belohnung für besonders gute Leistung – ist in der Trainerwelt umstritten. Die wissenschaftliche Evidenz ist dünn: Studien konnten keinen konsistenten „Jackpot-Effekt" nachweisen, der das Lernverhalten signifikant verbessert. Hunde scheinen keinen Unterschied zu machen zwischen „5 Leckerlis auf einmal" und „5 Leckerlis nacheinander." ABER: In der Praxis hat der Jackpot trotzdem seinen Platz, allerdings anders als oft gedacht. Statt 10 Leckerlis auf einmal: Lieber eine qualitativ ANDERE, hochwertigere Belohnung. Der Rückruf vom Reh? Statt 10x Trockenfutter gibt es ein Stück Leberwurst, die der Hund sonst nie bekommt. Der Überraschungseffekt und die Qualitätsänderung scheinen wirksamer zu sein als die reine Menge. Funktionale Jackpots (der Hund darf etwas tun, was er liebt – z.B. nach dem Rückruf weiterlaufen und schnüffeln) sind oft wertvoller als Futterjackpots. Der wichtigste „Jackpot" ist: Unvorhersehbarkeit und Variation in der Belohnung halten die Motivation hoch.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Splitting vs. Lumping – Trainingskriterien richtig aufbauen',
    content: 'Der häufigste Trainingsfehler ist „Lumping" – zu viele Kriterien gleichzeitig steigern. Splitting bedeutet, jedes Training in winzige Schritte zu zerlegen und nur EINE Sache gleichzeitig zu verändern. Beispiel: Du willst, dass dein Hund 30 Sekunden Platz macht, 5 Meter entfernt, in einem belebten Park. Lumping: „Platz! Bleib!" → du gehst 5 Meter weg im Park → Hund steht nach 3 Sekunden auf → Frustration. Splitting: Erst 30 Sekunden Platz direkt neben dir in der Wohnung. Dann 30 Sekunden mit 1 Schritt Abstand. Dann 2 Schritte. Dann im Garten, dafür wieder direkt daneben. Dann im ruhigen Park. Immer nur EINE Variable verändern. Die 80/20-Regel hilft: Dein Hund sollte in mindestens 80% der Versuche Erfolg haben. Liegt er darunter, war der Schritt zu groß – geh zurück und mach den Schritt kleiner. „Keep the dog in the game" bedeutet: Der Hund soll GEWINNEN, nicht scheitern. Erfolg motiviert, Misserfolg frustriert.',
  },
  {
    category: 'Lerntheorie & Trainingsmethoden',
    title: 'Trainingsprotokoll führen und Fortschritte messen',
    content: 'Ein Trainingstagebuch ist eines der wertvollsten Werkzeuge und wird von den meisten Hundehaltern unterschätzt. Notiere nach jeder Trainingseinheit: Datum, Uhrzeit, Ort. Was wurde geübt? Wie war der Erregungslevel des Hundes? Wie waren die Umgebungsbedingungen? Wie viele Wiederholungen? Wie war die Erfolgsquote? Was lief gut? Was muss angepasst werden? Was ist der nächste Schritt? Fortschritte messen: Nutze konkrete Metriken. Beispiel Reaktivität: Bei welcher Distanz reagiert der Hund? Vor zwei Wochen: 20 Meter. Heute: 12 Meter. Das ist messbarer Fortschritt! Beispiel Bleib: Wie lange hält der Hund? Vor einer Woche: 15 Sekunden. Heute: 45 Sekunden. Videoaufnahmen sind Gold wert: Filme deinen Hund regelmäßig in den gleichen Situationen. Der Vergleich nach 4 Wochen zeigt Fortschritte, die du im Alltag vielleicht gar nicht bemerkst. Regression (Rückschritte) sind normal und kein Versagen – notiere sie, damit du Muster erkennst (z.B. immer nach dem Hundeplatz, immer bei Regen, immer montags).',
  },
];

async function importEntries() {
  console.log(`${entries.length} Einträge zum Import (Trainingsmethoden T01-T16).`);

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

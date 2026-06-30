#import "setup.typ": *;
#import "glossary.typ": *;
// #import "@preview/glossy:0.9.1": *
#import "../vendor/glossy 0.9.1/lib.typ": *

#let date = datetime.today();

#set document(
  title: "Climbing Campus - Unsere Post Climb Dokumentation ",
  author: ("Tim Ruland", "Marc Obst"),
  date: date,
  description: [Im Zuge unseres Themas "Climbing Campus" haben wir das tägliche „Auf und Ab“ am Campus der THI im Bezug zu Mobilität und Barrierefreiheit untersucht und dies mit objektiven und subjektiven Daten in Form einer SinglePage-Webseite aufgearbeitet und aufbereitet.],
  keywords: (
    "InfoVis",
    "Information",
    "Visualisierung",
    "Informations Visualisierung",
    "Climbing Campus",
    "Dokumentation",
    "Stufen",
    "THI",
    "Accessibility",
    "Technische Hochschule Ingolstadt",
  ),
)
#set page(
  paper: "a4",
  numbering: "1",
)

#show: setup(myGlossary)

/*
 Text boxes from < https://www.infyways.com/tools/text-box-generator/ >
 ╔══════════════════════════════════ Section ═══════════════════════════════════╗
 ║                                                                              ║
 ║                                Document Start                                ║
 ║                                                                              ║
 ╚══════════════════════════════════════════════════════════════════════════════╝
*/

#figure(image("../assets/Icons/Climbing Campus/Komposition=Combined, Theme=light.svg"), caption: "Logo")

#text(hyphenate: false, align(center)[
  #title()
])

#set heading(numbering: none)
= Abstrakt
Im Zuge unseres Themas "Climbing Campus" haben wir das tägliche „Auf und Ab“ am Campus der THI im Bezug zu Mobilität und Barrierefreiheit untersucht und dies mit objektiven und subjektiven Daten in Form einer Single-Page-Webseite aufgearbeitet und aufbereitet.

#outline(depth: 3)
#pagebreak(weak: true)

#glossary(
  title: "Glossar",
  sort: true,
)
#set heading(numbering: norm_numbering)

#pagebreak(weak: true)

= Aufgabe <Aufgabe>
Für das Wahlpflichtfach Informationsvisualisierung sollten wir zum Semesterthema „Ups and Downs“ ein visuelles Konzept gestalten, präsentieren und dokumentieren.
Genauer umfasste dies eine Visualisierung im Medium unserer Wahl sowie eine ca. 10- bis 15-minütige Präsentation und diese Dokumentation.

Wie das Inhaltsverzeichnis bereits vorweggenommen hat, befinden sich in diesem DIN ISO A4 Dokument #context [#{ counter(page).at(label("ListOfFigures")).at(0) - counter(page).at(label("Aufgabe")).at(0) }]  von 8-12 im Richtwert beschriebenen Inhaltsseiten, welche unsere Gedankengänge und Zwischenergebnisse (hoffentlich) logisch und intuitiv darstellen.
// HAHA hab's jetzt raus-gerechnet, aber auch abzurechnende Titel und andere Post-/Preamble beinhalten
.

// #figure(image("../Aufgabe/Folie mit Aufgabe.png"), caption: "Aufgabenstellung 24.März")

= Idee
Bei unserer anfänglichen Exploration sind uns 2 vorstellbare Ideen gekommen.
Diese umfassten folgendes:
#enum(indent: 10pt)[
  Analyse der Luftqualität in der Uni
][
  Analyse der Mobilität am Campus in der Uni
]

// Erklärung Luftqualität
Zum Thema "Luftqualität in der THI" hat uns unser InfoVis-Zimmers - leider negativ - inspiriert (K-Gebäude 👎🏻). Die Idee war hier, das extreme Schwingen der Luftschwüle in Relation zum Lüften gegen den "Aufenthaltsnebel" als Ups und Downs darzustellen.\
Dafür hätten wir nach unserem Plan @hygrometer:cap als statische Datenquelle benutzt und für die Umfrage subjektiv nach Luftqualität im Zusammenhang mit Campus-Gebäuden und Zeiteinheiten erfragt.

// Erklärung Treppen
Das Thema der Mobilität und des Treppensteigens am Campus der THI ist von der Idee her sehr ähnlich, beleuchtet jedoch einen anderen Aspekt des Aufenthalts an der THI. Genauer handelte diese Idee von den Wegstrecken, Treppen und Inklusionshürden, die man an der THI bewältigen muss. Diese sollten auch hier erst statisch gemessen und schließlich mit subjektiven Daten gegenübergestellt werden.

Dieses Thema kristallisierte sich schließlich als unser Favorit heraus, da die sehr direkte und bildliche Assoziation zu "Oben und Unten" sich für uns origineller anfühlte. Die weitergeführte Idee beinhaltet detaillierter die Analyse von Stundenplänen der Studierenden des Studiengangs User Experience Design sowie der Treppenanzahl als objektive Daten,um diese subjektiver Akzeptanz und Barrierefreiheit gegenüberzustellen. Da das Feedback aus dem Kurs gegenüber dieses Themas zusätzlich sehr gut ausfiel, fiel unsere finale Themenwahl schließlich hierauf.

#figure(image("../assets/archive/InfoVis Ideas.png"), caption: "Bildschirmfoto der Ideen aus FigJam")


= Vorgehen
== Vorbereitungen
Nachdem wir uns nun auf unsere Grundidee geeinigt hatten, fingen wir zunächst damit an, die Logistik und Planung genauer zu betrachten. Dabei haben wir uns folgende Struktur überlegt: Eine Aufteilung in statische Daten, dynamische Daten und die finale Visualisierung.

=== Statische Daten
Mit statischen Daten meinen wir Daten, die sich ändern und objektiv aufnehmen lassen.
In unserem Beispiel sind das konkret die tatsächlichen physikalischen Gebäude, deren Treppenhäuser und Treppenzahl, die Verbindungswege der THI sowie die festgelegten Stundenpläne, welche sich auf der Primuss-Stundenplanplattform befinden.

==== Treppenzahlen und mehr begehbares
Da es logischerweise keine einsichtbare Übersicht über die Stufenanzahlen und Distanzen innerhalb und zwischen den Gebäuden an der THI gibt, mussten wir diesbezüglich selbst Hand anpacken. Konkreter sind wir alle (Haupt-) Gebäude und Treppenhäuser des THI Campus' abgegangen, um Stufen und Distanzen manuell abzuzählen und abzumessen. Zur Fehlervermeidung führten wir hierbei beide einzeln unabhängig voneinander individuelle Zählungen durch und verglichen diese im Anschluss miteinander, um Messfehlern entgegenzuwirken. Nachdem wir somit alle Daten manuell erhoben hatten, haben wir dann die gewonnen Werte in einer Tabelle festgehalten.

#figure(
  image("../assets/archive/sheets/Stufen - Treppenstufen nach Gebäude - Google Sheets.png"),
  caption: "Tabelle mit gesammelten Daten zu Stufen und Strecken",
)


==== Stundenplan
Um Daten innerhalb der Stundenpläne z.B. über übliche Routen zu erhalten, haben wir das @primuss:cap\-Stundenplan-System analysiert und herausgefunden, wie die Stundenpläne dort geladen werden.
Mit diesem Wissen haben wir ein @nodejs:long:cap\-Skript geschrieben, welches diese Daten unter Input eines validen @sessiontoken\s aus der Datenbank extrahiert und als @csv\-Datei exportiert. Somit konnten wir die Stundenpläne in einem maschinenlesbaren Format erhalten, um diese später für unsere Visualisierung zu nutzen.

#pagebreak(weak: true)

=== Umfrage
Da uns bewusst war, dass unsere Umfrage etwas umfangreicher sein würde, haben wir uns dazu entschieden, die Umfrage zuerst in @FigJam grob auszulegen, um schnelles Abändern des Umfragelayouts unkompliziert zu ermöglichen. @FigJam eignet sich hierfür perfekt, da es viele Templates beinhaltet und simples Drag and Drop Editing nutzt (@SurveyDraft).
Unser finales Layout umfasste schließlich folgendes:

#enum(indent: 10pt)[
  Einen Startteil, welcher eine Einverständniserklärung und Demographie-Daten abfragt
][
  einen Hauptteil A mit generellen Fragen zur Gesamterfahrung am Campus der THI
][
  Hauptteil B mit Fragen zur Einschätzung des eigenen Stundenplans sowie dessen subjektiven Wahrnehmung
][
  Hauptteil C über die Emotionale Komponente der Bewältigung von Stufen und gegenüber der allgemeinen Infrastruktur am Campus
][
  Und Teile D und E, in denen die Barrierefreiheit, Chancengleichheit und generelle Akzeptanz pro Gebäude abgefragt werden
]

Mit dieser konzipierten Grundstruktur galt es nun, eine geeignete Plattform für deren Umsetzung zu finden. Dabei war insbesondere ein Branching-Logik-System entscheidend, mit dem sich abhängig von den gegebenen Antworten unterschiedliche Fragepfade definieren lassen. Dies war notwendig, da Studierende und Angestellte unterschiedliche Fragen beantworten sollten. Letztendlich fiel unsere Wahl auf @tally:cap, da die Plattform kostenlos nutzbar ist, die benötigten Funktionen bietet und darüber hinaus umfangreiche Gestaltungsmöglichkeiten bereitstellt. Dadurch konnten wir die Umfrage auch optisch an unseren gewünschten Stil anpassen.

#grid(
  columns: (auto, auto),
  gutter: 2em,
  align: center + bottom,
  [
    #figure(
      image("../assets/archive/Umfrage Draft.png"),
      caption: "Screenshot des FigJam-Umfragelayouts",
    )<SurveyDraft>
  ],
  [
    #figure(
      image("../assets/archive/tally.png"),
      caption: "Screenshot der Umfrage auf Tally",
    )<StairSheet>
  ],
)

#pagebreak(weak: true)

=== Visuals
Als wichtigste Frage vor dem Start der eigentlichen Ausarbeitung der Visualisierung, versuchten wir zu identifizierten, was die Hauptfaktoren für eine gelungene Visualisierung sind. Schließlich identifizierten wir nach einem kurzen Brainstorming Konsistenz, Ästhetik und Readability.
Um uns diesem Idealzustand in einem einheitlichen Konzept anzunähern und dieses visuell festzuhalten, entschlossen wir uns, ein Moodboard (@Moodboard) zu erstellen, welches später zusätzlich Wiederverwendung in der Präsentation der Zwischenergebnisse fand.
Es beinhaltet eine Ansammlung an zum Teil gefundenen und zum Teil selbst erstellten Kacheln, welche versuchen, eine konstante und visuell ansprechende Bildsprache zu definieren.
Genauer soll der Inhalt unseres Moodboard vermitteln, dass wir uns stilistisch stark in einem 3-dimensionalen Raum bewegen, in der Objekte und andere @UI\-Elemente in einem neumorphistischen Kontext existieren. Zur weiteren Stilisierung soll zudem die Materialität dieser Objekte veranschaulicht werden, welche sich als leicht glänzend und glatt (glossy) beschreiben lässt.

#figure(
  image("../assets/Moodboard_ Bild- & Grafikstil und Farben.png", width: 100%),
  caption: "Moodboard",
)<Moodboard>
#pagebreak(weak: true)
Insgesamt legten wir beim Moodboard ein besonderes Augenmerk auf Konsistenz, wodurch dieses Vorgehen stark dem Gestalten eines Brand-Styleguides ähnelte. Hierzu definierten wir eine zwar etwas weniger strikte Farbpalette, dafür aber desto mehr festgelegte Typografie, für welche Schriftgrößen und Variableneinstellungen eindeutig bestimmten Use Cases zugeschrieben wurden.
Konkret entschieden wir uns hierbei für zwei primäre Schriftarten:

#enum(indent: 10pt)[
  #link("https://fonts.google.com/specimen/Mozilla+Text?preview.script=Latn", "Mozilla Text"): Für Überschriften, bzw. allgemeine Textinhalte im Fokus sowie wichtige KPIs
][
  #link("https://fonts.google.com/specimen/Google+Sans+Flex?preview.script=Latn", "Google Sans Flex"): Für Textinhalte im Hintergrund, die textlich unterstützend fungieren sollen und deshalb eine geringere Schriftbreite und einen dünneren Schriftschnitt aufweisen
]
Zudem gibt es eine weitere Schriftart, _Coda_, welche jedoch ausschließlich Anwendung in der Wortmarke "_Climbing Campus_" unseres eigens erstellten Logos (@LogoKomponente) findet.
Dieses wird mit einer Bildmarke kombiniert, welche eine abstrakte Treppe darstellt und absichtlich visuell 2-dimensional und flach wirkt, um sich vom restlichen Inhalt der Visualisierung zu unterscheiden. Damit sollte später als zentrales Erkennungsmerkmal in der Visualisierung auftauchen und die Identität des Projekts weiter stärken.
Insgesamt schufen wir somit eine klare Identität, die sich später durch unsere Visualisierung durchziehen würde.


Zur weiteren Ausarbeitung haben wir 3D Modelle in @blender:cap in dem zuvor im Moodboard ausgearbeitetem Stil erstellt.
Diese folgen genauer einem @Hard-Surface\-Ansatz mit klar definierten Kanten und präzisen, technischen Formen, um den stark geometrischen Charakter noch einmal zusätzlich zu verstärken.
Durch den gezielten Einsatz von Materialien, Licht und Reflexionen unterstützen sie die angestrebte visuelle Wirkung und verstärken die im Moodboard definierte Gloss- und Specular-Ästhetik (@BlenderRender).


#grid(
  columns: (auto, auto),
  gutter: 0.5em,
  align: center + top,
  // [
  //   #figure(
  //     image("../assets/Moodboard_ Bild- & Grafikstil und Farben.png", height: 6.5cm),
  //     caption: "Moodboard",
  //   )<Moodboard>
  // ],
  [
    #figure(
      image("../assets/icons/Climbing Campus/image.png", height: 6.5cm),
      caption: "Logo Komponente",
    )<LogoKomponente>
  ],

  [
    #figure(
      image("../assets/Blender Output/imgs/accessibility-dude.png", height: 6.5cm),
      caption: "Blender Render",
    )<BlenderRender>
  ],
)
#pagebreak(weak: true)

== Umsetzung


=== Durchführung der Umfrage

Als Grundlage für die spätere Visualisierung benötigten wir zunächst die entsprechenden Daten. Dafür mussten wir die Umfrage zunächst auf einer geeigneten Plattform umsetzen. Bei der Auswahl war insbesondere ein Branching-Logik-System entscheidend, mit dem sich abhängig von den gegebenen Antworten unterschiedliche Fragepfade definieren lassen. Dies war notwendig, da Studierende und Angestellte unterschiedliche Fragen beantworten sollten. Letztendlich fiel die Wahl auf @tally:cap, da die Plattform kostenlos nutzbar ist, die benötigten Funktionen bietet und darüber hinaus umfangreiche Gestaltungsmöglichkeiten bereitstellt. Dadurch konnten wir die Umfrage auch optisch an unseren gewünschten Stil anpassen.

Nach dem Übertragen der Frageblöcke auf @tally:cap haben eine Pilot-Durchführung mit einer Person durchgeführt. Diese wies uns auf einige Unschönheiten und Fehler innerhalb des Aufbaus um, sodass wir diese beheben konnten, bevor wir die Umfrage in einem größeren Rahmen ausspielten.
Nachdem die Ergebnisse letztenendes erhoben wurden, ließen sich diese ganz einfach als @csv Datei ausgeben, was uns die anschließende Auswertung per Excel sehr vereinfachte.


Anschließend begann die Verteilung der Umfrage. Zunächst verschickten wir sie über die uns zugänglichen Verteiler, insbesondere verschiedene WhatsApp-Gruppen. Dabei baten wir die Teilnehmenden, die Umfrage nach dem Ausfüllen im Sinne eines Schneeball-Systems weiterzuleiten. In der Praxis erwies sich dieses Konzept jedoch als Wunschdenken, da wir nach etwa zwei Wochen lediglich sieben Teilnehmende erreicht hatten. Daher passten wir unsere Strategie an und sprachen gezielt einzelne Personen direkt an, um sie für die Teilnahme zu gewinnen. Dies geschah sowohl bei Studierenden als auch bei Angestellten der THI.




#figure(
  image("../assets/archive/tally insights.png", width: 100%),

  caption: [Tally Ergebnisse],
)


=== Programmierung der Visualisierung
Mit der nun bestehenden konzeptionellen Grundlage konnten wir jetzt schließlich mit der konkreten technischen Ausarbeitung beginnen. Hierzu legten wir zunächst ein Github-Repository an, um ein zentralisiertes Speichersystem sowie eine Historie an Änderungen gut verwalten zu können. Der nächste Schritt war nun das initiale technische Layouting der HTML-Datei. Wir überlegten uns also konkret, welche Sektionen die finale Ausarbeitung umfassen sollte und legten diese im Anschluss an.
Da wir wie erwähnt mit einem 3d-Framework arbeiten, mussten wir dieses zusätzlich richtig einbinden und einige Vorbereitung in diesem Kontext anstellen. Dies umfasst vor allem das Aufsetzen eines Animations-Systems, welches wir selbst geschrieben haben. Dieses wird benötigt, um den einzelnen Objekte Abläufe zuzuschreiben, d.h. jeweils eine Eingangsanimation wenn das Objekt erscheint, eine Idle-Animation beim bloßen Verweilen des Objekts und eine Exit-Animation sobald es wieder verschwindet. Diese lassen sich auch je nach dem, in welcher Sektion sie sich befinden abwandeln. Somit haben wir volle Kontrolle über alle visuellen Geschehnisse, die beim Scrollen über die Website aufkommen.

#figure(
  block(
    fill: purple.darken(95%),
    inset: 1em,
    width: 100%,
  )[
    #image("../assets/archive/Storyboard Sketches.png", width: 90%)
  ],
  caption: [Storyboard Sketches],
)

#grid(
  columns: (auto, auto),
  gutter: 0.5em,
  align: center + horizon,

  [
    #figure(
      image("../assets/archive/Animation System.png", width: 100%),
      caption: [Animations-System],
    )
  ],

  [
    #figure(
      image("../assets/archive/CSS.png", width: 100%),

      caption: [CSS Rules],
    )
  ],
)

Nachdem dieses Grundgerüst bestand, machten wir uns an das genauere Ausarbeiten der Inhalte. Dies betraf zum einen die konkreten Inhalt selbst, die wir in die vorher definierten Sektionen, bzw. Abschnitte einfügten, zum anderen jedoch auch das Styling. Dieses wurde durch feste Style-Definitionen per CSS und stets im Bezug zum festgelegten Styleguide realisiert.

==== Models
Wie bereits erwähnt sieht unsere stilistische Ausrichtung eine harmonische Einbindung von 3d-Objekten innerhalb unserer Visualisierung vor. Da Konsistenz für uns von besonderer Bedeutung war, entschieden wir uns strikt dagegen, 3d-Assets aus dem Web extern zu beziehen, da diese sich nur sehr begrenzt stilistisch angleichen lassen. Folglich war eine unserer Kernaufgaben, alle benötigten 3d-Objekte in @blender:cap zu modellieren. Im nächsten Schritt wurden alle Objekte mit einem einheitlichen Material versehen, welches, wie im Styleguide definiert, eine einfarbige und glänzende Anmutung definiert. Somit erhielten wir letztenendes ein Set aus 24 glb-Dateien, von denen die meisten am Ende in unserer finalen Visualisierung Anwendung fanden.

==== JS

Da wir die nun 3d-Objekte nicht nur schlicht ein- und ausblenden, sondern im Sinne einer visuell ansprechenden Darstellung dynamisch im Raum animieren wollten, mussten wir uns um ein Animationssystem kümmern. Wir entschieden uns hierbei, dieses selbst mittels JavaScript zu schreiben, um bessere Kontrolle über die Animationen zu haben und es im Allgemeinen an unseren Use Case anpassen zu können. Somit konnten wir für jedes importierte 3d-Objekt festlegen, wie es sich beim Erscheinen, Verweilen und schließlich beim Verschwinden animationstechnisch verhält. Dafür legten wir bestimmte Transformationen wie Skalierung, Translation und Rotation für das jeweilige Verhalten fest.
Um die Objekte einer bestimmten Sektion innerhalb der Single Page Application zuzuweisen zu können, mussten wir die vertikale Scroll-Position des Nutzers mit Anfang und Ende der jeweiligen Abschnitte abgleichen, um bei Übereinstimmung die Animationen starten zu können. Leider gab es hier eine größere Limitation, da wir zunächst diese vertikale Positionen mit Gleitkommazahlen (floats) verglichen haben. Diese besitzen ihre Eigenheiten und sind nicht gut für direktes Vergleichen geeignet, was in Kombination mit Scroll Snapping dazu führte, dass bestimmte Animationen gar nicht oder im falschen Abschnitt geschahen. Dieses Problem lösten wir schließlich, indem wir quasi nur die Ganzzahl vor den Nullstellen verglichen (delta von 1), um sicherzustellen, dass alles korrekt abläuft.
Aber nicht nur das, dass währe ja in der Entwicklung sofort aufgefallen. Das zweite Level tücke wurde durch den Browser hinzugefügt, da er das Problem versteckte. Genauer kam der Gleitkommazahl-Rundungsfehler nur bei einem Reload --- dem vollen neu laden einer Webseite meist mit "STRG"+"SHIFT"+R --- auf und wurde mit Refreshes --- dem normalen neuladen, bei einmaliegen drücken des Neuladenknopfes oder durch Entwicklungsumgebungen --- magisch behoben.
Unsere beste Theorie, ist das der Browser bei Reloads die Positionen der Sections von neuem ausrechnet und bei Reloads von einem Cache weiter rechnet. Dabei würde ein winziger Fehlerwert ($lt.eq 0.01$px), welcher aufgrund seiner Größe von unter einem Pixel nie für Probleme sorgen würde, außer man nutzt unsaubere Gleitkommazahlen vergleiche und springt mit ScrollSnap immer an die gleiche Stelle.

Animationssystem:\

=== Gestaltung der Access Points

Nachdem wir eine rein digitale Informationsvisualisierung entwickeln, stoßen wir automatisch auf die Frage, wie man für den Betrachter sichtbar wird. Hierbei entschieden wir als Lösung für diese Problematik, eine Vielzahl an Stickern als Access Point zu gestalten. Diese zeigen eine leicht provokative, und folglich anregende Headline sowie einen kleinen Teaser-Text mit passendem 3d-Objekt. Zusätzlich, und von zentraler Wichtigkeit, befindet sich ganz links ein QR-Code, welcher auf unsere Website verlinken würde.
Für diese Sticker entwarfen wir mehrere Designs, um genug Abwechslung zu schaffen und die Access Points in zwei Sprachen (Deutsch und Englisch) im Sinne der Inklusion zugänglich zu machen.

#pad(top: 1cm, grid(
  columns: (auto, auto),
  rows: 6cm,
  gutter: 0.5em,
  align: center + top,
  [
    #figure(
      image("../assets/archive/stickers.png", width: 100%),
      caption: [Screenshot der Sticker aus Figma],
    )
  ],

  [
    #figure(
      image("../assets/archive/sticker-on-stairs.png", height:  100%),
      caption: [Sticker MockUp],
    )
  ],
))

#pagebreak(weak: true)

= Ergebnis

#figure(
  image("../assets/archive/example-screen.png", width: 100%),

  caption: [Example Screenshot],
)
https://lptimey.github.io/Climbing-Campus/


Zum Abschluss haben wir eine Single-Page-Website entwickelt, die mithilfe von Three.js 3D-Modelle zur Datenvisualisierung der Treppen und Stundenpläne an der THI integriert.

Der finale Aufbau beginnt mit unserem Branddesign und den zentralen 3D-Objekten. Anschließend werden allgemeine Informationen über Studierende und Mitarbeitende an der THI präsentiert, darunter die Gesamtanzahl der Personen sowie die Anzahl der Treppenstufen, die sich auf dem Campus „verstecken“ --- zumindest im Rahmen der Zählung und innerhalb für Studierende zugänglicher Bereiche wie Treppenhäusern.

Im Hauptteil folgt eine teaserartige Gliederung, die die im Rahmen der Studie aufbereiteten Daten strukturiert zusammenfasst:

== User Experience am Campus
Die allgemeine Nutzererfahrung am Campus der THI wurde mit einer gemittelten Bewertung von 2.9 bewertet, welche damit leicht unter dem akzeptablen Wert liegt. Wir haben dies über eine ähnliche Skala visualisiert wie dieser Wert auch in unserer Umfrage abgefragt wurde.

== Terminkalender der UXD
Da wir sehr schlecht die komplexen Terminkalender, bzw. Stundenpläne ohne große Komplexität abbilden können, entschlossen wir uns, das genaue Gegenteil zu tun. Wir stellten also nur das Wichtigste dar: Die absoluten Zeiten, welche die einzelnen User Experience Studiengänge wöchentlich bewältigen. Dies unterstrichen wir durch Einbindung einer 3d-Uhr, wessen Zeiger dynamisch der Maus folgt und die einzelnen Datenpunkte weiter betont.

== Wünsche an den Campus
Da Wünsche an sich schwer numerisch darzustellen sind, entschieden wir uns, die genannten Maßnahmen zur Verbesserung der Infrastruktur an der THI mit rein qualitativ kodierten Daten in Form einer Word Cloud darzustellen. Diese veranschaulicht die Relationen bzgl. der Häufigkeit an Nennungen der einzelnen Aspekte, während hier besonders auch unsere Typografie im Vordergrund steht und eine Bühne bekommt.

== Bewertung der Gebäude
Die sehr komplexen Zahlenwerte der Gebäudewertungen am Campus war ein besonders schwieriger Punkte, da wir viele verschiedene Daten auf einmal darstellen mussten. Dies lösten wir, indem wir die Daten filterten und nur ein Gebäude und dessen Datenpunkte auf einmal anzeigen ließen. Somit wurde Übersicht und Verständnis dieses Visualisierungsabschnitts bewahrt.

== Barrierefreiheit am Campus
Die abgefragten Problempunkte bezüglich der Barrierefreiheit und Inklusion an der THI sollte ausschließlich Kategorien und deren Häufigkeit an Nennung darstellen. Zwar hätte sich auch hier eine Word Cloud angeboten, jedoch wollten wir solch eine Dopplung innerhalb unserer Informationsvisualisierung vermeiden. Wir entschieden und also, die Reihenfolge anders darzustellen und nutzten das eingebundene 3d-Objekt, einen Fahrstuhl, wessen Türen sicher mit jedem Datenpunkt mehr oder weniger öffnen. Somit lassen sich die Unterschiede gut nachvollziehen, was zusätzlich durch eine Nummerierung der Liste unterstützt wird.

#outline(target: figure, title: "Bilderverzeichnis") <ListOfFigures>
#bibliography("Dokumentation.bib", style: "iso-690-numeric")

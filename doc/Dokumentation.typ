#import "setup.typ": *;
#import "glossary.typ": *;
// #import "@preview/glossy:0.9.1": *
#import "../vendor/glossy 0.9.1/lib.typ": *

#let date = datetime.today();

#set document(
  title: "Climbing Campus - Unsere Post Climb Dokumentation ",
  author: ("Tim Ruland", "Marc Obst"),
  date: date,
  description: "//TODO: description",
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
Im Zuge unseres Themas "Climbing Campus" haben wir das tägliche „Auf und Ab“ am Campus der THI im Bezug zu Mobilität und Barrierefreiheit untersucht und dies mit objektiven und subjektiven Daten in Form einer SinglePage-Webseite aufgearbeitet und aufbereitet.

#outline(depth: 3)
#pagebreak(weak: true)

#glossary(
  title: "Glossar",
  sort: true,
)
#set heading(numbering: norm_numbering)

#pagebreak(weak: true)

= Aufgabe <Aufgabe>
Für das Wahlpflichtfach Informationsvisualisierung sollten wir zum Semester-Thema „Ups and Downs“ ein visuelles Konzept gestalten, präsentieren und dokumentieren.
Genauer heißt dass, eine Visualisierung im Medium unserer Wahl, eine ca. 10 minütige Presentation und diese Dokumentation.

Wie das Inhaltsverzeichnis bereits gespoilert hat befinden sich in diesem DIN ISO A4 Dokument #context [#{counter(page).at(label("ListOfFigures")).at(0) - counter(page).at(label("Aufgabe")).at(0)}] der verlangten 8-12 Inhaltsseiten, welche unsere Gedankengänge und Zwischenergebnisse (hoffentlich) logisch und intuitiv darstellen
// HAHA hab's jetzt raus-gerechnet, aber auch abzurechnende Titel und andere Post-/Preamble beinhalten
.

// #figure(image("../Aufgabe/Folie mit Aufgabe.png"), caption: "Aufgabenstellung 24.März")

= Idee
Als Exploration sind uns 2 vorstellbare Ideen gekommen.

Die Ideen umfassten folgendes:
- Analyse der Wegstrecken in der Uni (Treppen)
- Analyse der Luftqualität in der Uni

// Erklärung Luftqualität
Auf das Thema "Luftqualität in der THI" sind wir aufgrund des InfoVis-Zimmers gekommen (K-Gebäude 👎🏻) und sollte das Schwingen der Luftschwüle in relation zu Lüften gegen Aufenthaltsnebel als Ups und Downs darstellen.\
Dafür hätten wir @hygrometer:cap als statische Datenquelle benutzt und für die Umfrage subjektiv nach Luftqualität pro Gebäude und Zeiteinheit gefragt.

// Erklärung Treppen
Das Thema Treppensteigen war unser Favorit, da die sehr direkte und bildliche Assoziation zu Oben und Unten einen doch hochwertigen Reiz auslöst. Die weitergeführte Idee beinhaltet die Stundenpläne und Treppenanzahl als objektive Daten und stellt subjektiv Akzeptanz und Barrierefreiheit zur (Um-)Frage.

#figure(image("../assets/archive/InfoVis Ideas.png"), caption: "Bildschirmfoto der Ideen aus FigJam")

Nach genauerer Analyse des Überthemas "Ups and Downs" haben wir uns entschieden das Thema spaßeshalber wörtlich zu nehmen /*TODO: write*/(sagen unseriös sein wollen und so).

Nach der Besprechung und deswegen haben wir uns für das Treppensteigen als finale Idee entschieden

= Vorgehen
== Vorbereitungen
Nachdem wir uns auf unsere Grundidee geeinigt haben, haben wir angefangen, die Logistik und Planung genauer zu betrachten. Dabei haben wir uns folgende Struktur überlegt: eine Aufteilung in statische Daten, dynamische Daten und die finale Visualisierung.

=== Statische Daten
Statische Daten sind Daten die sich ändern und objektiv aufnehmen lassen.
// TODO: add Barrierefreiheit wie Aufzüge und Rampen
In unserem Beispiel sind das die tatsächlichen physikalischen Gebäude, deren Treppenhäuser und Treppenzahl und die Verbindungswege der THI, sowie die festgelegten Stundenpläne, welche sich aus Primuss(-Stundenplan) ziehen lassen.

==== Treppenzahlen und mehr begehbares
Um diese Daten zu erheben sind wir alle (Haupt-) Gebäude des und sind alle Treppenhäuser THI Campus' abgegangen. Zur Fehlervermeidung haben wir hierbei beide einzeln unabhängig voneinander die Treppenzählungen durchgeführt und im Anschluss diese miteinander abgeglichen. Zudem haben wir eine Liste aller Gebäudeverbindungen erstellt (@StairSheet).


==== Stundenplan
Um Daten zu den Stundenplänen für z.B: übliche Routen zu ziehen, haben wir das Primuss-Stundenplan-System analysiert und herausgefunden, wie die Stundenpläne geladen werden.
Mit diesem Wissen haben wir ein @nodejs:long:cap\-Skript geschrieben, welches diese Daten unter Input eines validen @sessiontoken\s aus der Datenbank extrahiert und als @csv\-Datei exportiert.

=== Umfrage
Für schnelles Iterieren haben wir uns dazu entschieden die Umfrage zuerst in FigJam grob auszulegen, da FigJam viele Templates beinhaltet und simples Drag and Drop Editing nutzt (@SurveyDraft).
Der Plan für die Umfrage umfasst den Start, welcher eine Zustimmung und Demographie-Daten beinhaltet, dem Hauptteil A mit generellen Fragen zur Campus-Gesamterfahrung, B mit Fragen zum Stundenplan, dem Stufen und Infrastruktur Teil C, und als letztes, aber nicht als das letzte, Teile D und E in denen die Barrierefreiheit, Chancengleichheit und generelle Akzeptanz pro Gebäude abgefragt werden.
Da die Umfrage sich wohl an Stundenten als auch Angestelle an der THI richtet, mussten wir eine Entsprechende Logik innerhalb der Umfrage integrieren, sodass Angestellte etwa nicht die Frage nach dem Studiengang beantworten mussten.

#grid(
  columns: (auto, auto),
  gutter: 2em,
  align: center + bottom,
  [
    #figure(
      image("../assets/archive/sheets/Stufen - Treppenstufen nach Gebäude - Google Sheets.png"),
      caption: "Screenshot der Google Sheets Datei",
    )<StairSheet>
  ],
  [
    #figure(image("../assets/archive/Umfrage Draft.png"), caption: "Screenshot des Drafts der Umfrage aus FigJam")<SurveyDraft>
  ],
)


=== Visualisierung
Eine gute Visualisierung lebt von vielen Dingen, Themen, Sachen, und Teilen.
Dazu gehören Konsistenz, Appeal und Readability.
Um uns eine klarere Übersicht und gemeinsame Vorstellung zu schaffen, haben wir angefangen ein Moodboard (@Moodboard) zu erstellen.
Es beinhaltet eine Ansammlung an zum Teil gefundenen und zum Teil selbst gemachten Kacheln, welche versuchen, eine konstante und visuell ansprechende Bildsprache zu definieren.
// TODO: Better machen
Genauer soll der Inhalt unseres Moodboard vermitteln, dass wir uns stilistisch stark in einem 3-dimensionalen Raum bewegen, in der Objekte und andere UI-Elemente in einem neumorphistischen Kontext existieren. Zur weiteren Stilisierung soll zudem die Materialität dieser Objekte veranschaulicht werden, welche man als leicht glänzend und glatt (glossy) beschreiben kann. 

Insgesamt legten wir beim Moodboard ein besonderes Augenmerk auf Konsistenz, womit dieses Vorgehen stark dem Gestalten eines Brand Styleguides ähnelte. Hierzu definierten wir eine zwar etwas weniger stringente Farbpalette, dafür aber desto mehr festgelegte Typografie, für welche Schriftgrößen und Variableneinstellungen klar einem bestimmten Use Case zugeschrieben wurden.

Konkret entschieden wir uns hierbei für 3 Schriftarten --- Coda, Mozilla Text und GoogleSansFlex --- wobei nur die letzten beiden wirklich konstante Anwendung fanden, da Coda nur für das Logo unserer Informationsvisualierung verwendet wurde (@LogoKomponente). Mozilla Text fungierte dahingegen als unsere Font für Inhalte, die im Fokus stehen sollten, beispielsweise Überschriften oder wichtige KPIs, die besonders hervorgehoben werden sollten. Dies soll dann durch Textinhalte in GoogleSansFlex unterstützt werden, die wir in einem dünneren Schriftschnitt sowie einer geringeren Schriftbreite darstellen.
Wir kreierten somit ein einheitliches visuelles Bild und klarere Hierarchien, um den visuellen Flow des Betrachter zu unterstützen.

Zur weiteren Ausarbeitung haben wir 3D Modelle in @blender:cap in diesem zuvor ausgearbeitetem Stil erstellt.
Diese folgen zusätzlich / genauer einem Hard-Surface-Ansatz mit klar definierten Kanten und präzisen, technischen Formen, um den stark geometrischen Charakter noch einmal zusätzlich zu verstärken.
Durch den gezielten Einsatz von Materialien, Licht und Reflexionen unterstützen sie die angestrebte visuelle Wirkung und verstärken die im Moodboard definierte Gloss- und Specular-Ästhetik (@BlenderRender).

#figure(
  image("../assets/Moodboard_ Bild- & Grafikstil und Farben.png", height: 10cm),
  caption: "Moodboard",
)<Moodboard>

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
Als Grundlage für die konkrete Umsetzung benötigten wir zunächst die grundlegenden Daten, auf denen die Visualisierung später Aufbauen würde. Hierzu entschieden wir uns zunächst, die Umfrage in die uns zugänglichen Verteiler, also diverse WhatsApp-Gruppen, zu schicken. Hierbei galt stets die Bitte, die Umfrage nach der Bearbeitung per Schneeball-System weiterzuleiten. Leider stellte sich dieses Konzept in der Realität mehr als Wunschdenken heraus, da wir nach etwa 2 Wochen lediglich 7 Teilnehmer gesammelt hatten.
Wir mussten also unsere Strategie anpassen, weshalb wir gezielt auf einzelne Personen zugekommen sind und diese persönlich für unsere Umfrage rekrutiert haben. Dies geschah sowohl mit Stundenten als auch mit Angestellten der THI.\
Auswertung der Umfrage per @csv\-Export-Funktion von @tally:cap

#figure(
  block(
    fill: purple.darken(95%),
    inset: 1em,
    width: 100%,
  )[
    #image("../assets/archive/Storyboard Sketches.png", width: 100%)
  ],
  caption: [Storyboard Sketches],
)

=== Visualisierung
Mit der nun bestehenden konzeptionellen Grundlage konnten wir jetzt schließlich mit der konkreten technischen Ausarbeitung beginnen. Hierzu legten wir zunächst ein Github-Repository an, um ein zentralisiertes Speichersystem sowie eine Historie an Änderungen gut verwalten zu können. Der nächste Schritt war nun das initiale technische Layouting der HTML-Datei. Wir überlegten uns also konkret, welche Sektionen die finale Ausarbeitung umfassen sollte und legten diese im Anschluss an.
Da wir wie erwähnt mit einem 3d-Framework arbeiten, mussten wir dieses zusätzlich richtig einbinden und einige Vorbereitung in diesem Kontext anstellen. Dies umfasst vor allem das Aufsetzen eines Animations-Systems, welches wir selbst geschrieben haben. Dieses wird benötigt, um den einzelnen Objekte Abläufe zuzuschreiben, d.h. jeweils eine Eingangsanimation wenn das Objekt erscheint, eine Idle-Animation beim bloßen Verweilen des Objekts und eine Exit-Animation sobald es wieder verschwindet. Diese lassen sich auch je nach dem, in welcher Sektion sie sich befinden abwandeln. Somit haben wir volle Kontrolle über alle visuellen Geschehnisse, die beim Scrollen über die Website aufkommen. //TODO: Screenshot Animation System
Nachdem dieses Grundgerüst bestand, machten wir uns an das genauere Ausarbeiten der Inhalte. Dies betraf zum einen die konkreten Inhalt selbst, die wir in die vorher definierten Sektionen, bzw. Abschnitte einfügten, zum anderen jedoch auch das Styling. Dieses wurde durch feste Style-Definitionen per CSS und stets im Bezug zum festgelegten Styleguide realisiert. //TODO: CSS Screenshot

=== Umfrage
Um die Umfrage entsprechend unseres erstellten Layouts umzusetzen, mussten wir uns erst einmal auf die Suche nach einer geeigneten Plattform machen. Konkret musste diese vor allem ein Branching-Logik-System, mit dem man konditionelle Abzweigungen je nach Antwort einstellen kann, beinhalten. Dies ist deshalb wichtig, da, wie bereits oben erwähnt, Studierende und Angestellte unterschiedliche Antworten ausfüllen sollen.
Letztenendes fiel die Wahl auf @tally, da diese Plattform kostenlos nutzbar ist und die gewünschten Features implementiert. Zusätzlich besteht die Möglichkeit, die Umfrage sehr detailliert zu stylen, wodurch wir schließlich auch die Umfrage in unseren Style gestalten konnten. //TODO: Screenshot von Tally-Umfrage
Nach dem Übertragen der Frageblöcke auf @tally haben eine Pilot-Durchführung mit einer Person durchgeführt. Diese wies uns auf einige Unschönheiten und Fehler innerhalb des Aufbaus um, sodass wir diese beheben konnten, bevor wir die Umfrage in einem größeren Rahmen ausspielten.
Nachdem die Ergebnisse letztenendes erhoben wurden, ließen sich diese ganz einfach als @csv Datei ausgeben, was uns die anschließende Auswertung per Excel sehr vereinfachte.

= Ergebnis

#outline(target: figure, title: "Bilderverzeichnis") <ListOfFigures>
#bibliography("Dokumentation.bib", style: "iso-690-numeric")

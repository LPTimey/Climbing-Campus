#import "setup.typ": *;
#import "glossary.typ": *;
// #import "@preview/glossy:0.9.1": *
#import "vendor/glossy 0.9.1/lib.typ": *

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

#figure(image("assets/Icons/Climbing Campus/Komposition=Combined, Theme=light.svg"), caption: "Logo")

#text(hyphenate: false, align(center)[
  #title()
])

#heading(numbering: none)[Abstrakt]
Im Zuge unseres Themas "Climbing Campus" haben wir das tägliche „Auf und Ab“ am Campus der THI im Bezug zu Mobilität und Barrierefreiheit untersucht und dies mit objektiven und subjektiven Daten in Form einer SinglePage-Webseite aufgearbeitet und aufbereitet.

#outline(depth: 3)

#glossary(
  title: "Glossar",
  theme: theme-academic,
  sort: true,
  show-all: false,
)

#pagebreak(weak: true)

= Aufgabe
Für das Wahlpflichtfach Informationsvisualisierung sollten wir zum Semesterthema „Ups and Downs“ ein visuelles Konzept gestalten, präsentieren und dokumentieren.
Genauer heißt dass, eine Visualisierung im Medium unserer Wahl, eine ca. 10 minütige Presentation und diese Dokumentation.

Wie das Inhaltsverzeichnis bereits gespoilert hat befinden sich in diesem DIN ISO A4 Dokument #context [#counter(page).final().at(0)] Seiten, welche unsere Gedankengänge und Zwischenergebnisse (hoffentlich) logisch und intuitiv darstellen.

#figure(image("Aufgabe/Folie mit Aufgabe.png"), caption: "Aufgabenstellung 24.März")

= Idee
Als Exploration sind uns 2 vorstellbare Ideen gekommen.

Die Ideen umfassten folgendes:
- Analyse der Wegstrecken in der Uni (Treppen)
- Analyse der Luftqualität in der Uni

// Erklärung Luftqualität
Auf das Thema "Luftqualität in der THI" sind wir aufgrund des InfoVis-Zimmers gekommen (K-Gebäude 👎🏻) und sollte das Schwingen der Luftschwüle aufgrund von Lüften vs. Aufenthaltsnebel als Ups und Downs darstellen.\
Dafür hätten wir @hygrometer:cap als statische Datenquelle benutzt und für die Umfrage subjektiv nach Luftqualität pro Gebäude und Zeiteinheit gefragt.

// Erklärung Treppen
Das Thema Treppensteigen war unser Favorit, da die sehr direkte und bildliche Assoziation zu Oben und Unten einen doch hochwertigen Reiz auslöst. Die weitergeführte Idee beinhaltet die Stundenpläne und Treppenanzahl als objektive Daten und stellt subjektiv Akzeptanz und Barrierefreiheit zur (Um-)Frage.

#figure(image("assets/archive/InfoVis Ideas.png"), caption: "Bildschirmfoto der Ideen aus FigJam")

Nach genauerer Analyse des Überthemas "Ups and Downs" haben wir uns entschieden das Thema spaßeshalber wörtlich zu nehmen /*TODO: write*/(sagen unseriös sein wollen und so).

Nach der Besprechung und deswegen haben wir uns für das Treppensteigen als finale Idee entschieden

= Vorgehen
== Vorbereitungen
Nachdem wir uns auf unsere Grundidee geeinigt haben, haben wir angefangen, die Logistik und Planung genauer zu betrachten. Dabei haben wir uns folgende Struktur überlegt: eine Aufteilung in statische Daten, dynamische Daten und die finale Visualisierung.

=== Statische Daten
Statische Daten sind Daten die sich ändern und Objektiv aufnehmen lassen.
// TODO: add Barrierefreiheit wie Aufzüge und Rampen
In unserem Beispiel sind das die tatsächlichen physikalischen Gebäude, deren Treppenhäuser und Treppenzahl und die Verbindungswege der THI, sowie die festgelegten Stundenpläne, welche sich aus Primuss(-Stundenplan) ziehen lassen.

==== Treppenzahlen und mehr begehbares
Um diese Daten zu erheben sind wir alle (Haupt-) Gebäude abgegangen und sind alle Treppenhäuser abgegangen und haben beide /* TODO: übersetzten*/ "independently" die stufen gezählt und Ergebnisse verglichen. Außerdem haben wir eine Liste aller Gebäudeverbindungen erstellt.

#figure(
  image("assets/archive/sheets/Stufen - Treppenstufen nach Gebäude - Google Sheets.png"),
  caption: "Screenshot der Google Sheets Datei",
)

==== Stundenplan
Um Daten zu den Stundenplänen für z.B: übliche Routen zu ziehen, haben wir das Primuss-Stundenplan-System Analysiert und herausgefunden wie die Stundenpläne geladen werden.
Mit diesem Wissen haben wir ein @nodejs:long:cap\-Skript geschrieben, welches diese Daten mit input eines Validen Sessiontokens die Daten extrahiert und als CSV-Datei exportiert.\

Export als CSV\

=== Umfrage
Konzipierung des Fragebogens\
Umsetzung der Umfrage mit Tally (Screenshot)\
#figure(image("assets/archive/Umfrage Draft.png"), caption: "Screenshot des Drafts der Umfrage aus FigJam")

=== Visualisierung
Blender 3D-Objekte angefertigt\
Konzipieren einer Farbpalette\
Branding-Sachen\

#figure(
  image("assets/Blender Output/imgs/accessibility-dude.png"),
  caption: "TODO: set Caption",
)

== Umsetzung
Finden von Umfrageteilnehmern per Schneeball-System\
Auswertung der Umfrage per CVS-Export-Funktion von Tally

=== Visualisierung
Programmierung der Web-Anwendung unter Einbindung der erstellten 3D-Elemente\
Gestaltung wie in grobem Styleguide definiert\

=== Umfrage
Ausführung der Umfrage\
Export der Ergebnisse als CSV\
Verwendung dieser Ergebnisse für die Visualisierung

#outline(target: figure, title: "Bilderverzeichnis")
#bibliography(title: none, "Dokumentation.bib", style: "iso-690-numeric")

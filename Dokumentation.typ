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
#set text(
  lang: "de",
  region: "DE",
  number-width: "tabular",
  slashed-zero: true,
  overhang: true,
  font: "Mozilla Text",
)
#show raw: it => text(font: "JetBrainsMono NF")[#it]
#set par(justify: true)
#set par.line(numbering: line => text(fill: red, size: 8pt)[#line])
// Number equations and list them as figures
#show figure.where(kind: "equation"): it => block[
  #grid(
    columns: (1fr, auto),
    align: center,

    it.body,
    align(right)[
      (#context counter(figure.where(kind: "equation")).display())
    ],
  )

  #it.caption
]
#show math.equation.where(block: true): it => figure(kind: "equation", supplement: "Equation", it)
#set heading(numbering: "1.1.a.I")

#figure(image("assets/Icons/Climbing Campus/Komposition=Combined, Theme=light.svg"), caption: "Logo")

#text(hyphenate: false, align(center)[
  #title()
])

#heading(numbering: none)[Abstrakt]
#lorem(50)

#outline(depth: 3)
#pagebreak(weak: true)

= Aufgabe
Für das Wahlpflichtfach Informationsvisualisierung sollten wir zum Semesterthema „Ups and Downs“ ein visuelles Konzept gestalten, präsentieren und dokumentieren.
Genauer heißt dass, eine Visualisierung im Medium unserer Wahl, eine ca. 10 minütige Presentation und diese Dokumentation.

Wie das Inhaltsverzeichnis bereits gespoilert hat befinden sich in diesem DIN ISO A4 Dokument #context [#counter(page).final().at(0)] Seiten, welche unsere Gedankengänge und Zwischenergebnisse (hoffentlich) logisch und intuitiv darstellen.

/*
+ Visualisierung
  - Plakat, Flyer oder Ähnliches erstellen
  - Medium frei wählbar (auch analog <-> digital)
+ Präsentation
  - ca. 10 Minuten
+ Dokumentation
  - ~ A4, 8-12 Seiten
  - Texte und Bilder
  - als pdf am Ende abgeben
  - am besten schon nebenbei erstellen

  - Semester-Thema: "UPS AND DOWNS"
  - Bearbeitung in Teams ()
  - 14. April: Vorstellung des gewählten Themas
    - Warum relevant / interessant?
    - Funktioniert es als Umfrage? (Common Thema / Wissen)
    - gibt es Pre-studies / externe Literatur?
*/

#figure(image("Aufgabe/Folie mit Aufgabe.png"), caption: "Aufgabenstellung 24.März")

= Idee
Als Exploration sind uns 2 vorstellbare Ideen gekommen.
/* TODO: ausformulieren*/\* mit einem Klaren Favoriten

Die Ideen umfassten folgendes:
- Analyse der Wegstrecken in der Uni (Treppen)
- Analyse der Luftqualität in der Uni

// Erklärung Luftqualität
Auf das Thema "Luftqualität in der THI" sind wir aufgrund des InfoVis-Zimmers gekommen (K-Gebäude 👎🏻) und sollte das Schwingen der Luftschwüle aufgrund von Lüften vs. Aufenthaltsnebel als Ups und Downs darstellen.\
Dafür hätten wir als statische Daten Hygrometer benutzt und für die Umfrage subjektiv nach Luftqualität pro Gebäude und Zeiteinheit gefragt.

// Erklärung Treppen
Das Thema Treppensteigen war unser Favorit, da die sehr direkte und bildliche Assoziation zu Oben und Unten einen doch hochwertigen Reiz auslöst. Die weitergeführte Idee beinhaltet die Stundenpläne und Treppenanzahl als objektive Daten und stellt subjektiv Akzeptanz und Barrierefreiheit zur (Um-)Frage.

#figure(image("assets/archive/InfoVis Ideas.png"), caption: "Bildschirmfoto der Ideen aus FigJam")

Nach genauerer Analyse des Überthemas "Ups and Downs" haben wir uns entschieden das Thema spaßeshalber wörtlich zu nehmen /*TODO: write*/(sagen unseriös sein wollen und so).

Nach der Besprechung und deswegen haben wir uns für das Treppensteigen als finale Idee entschieden
= Vorgehen
#lorem(40)
== Vorbereitungen
#lorem(20)
=== Statische Daten
==== Treppenzählen
Treppen am ganzen Campus zählen\
Excel Tabelle Screenshot\
Split in Stufen und Wegstrecken / Verbindungen\
Export als CSV
==== Stundenplan
Stundenpläne aus Primuss-Stundenplan extrahiert\
NodeJS-Skript\
Export als CSV\
=== Visualisierung
Blender 3D-Objekte angefertigt\
Konzipieren einer Farbpalette\
Branding-Sachen\

#figure(image("assets/Blender Output/imgs/accessibility-dude.png"))
=== Umfrage
Konzipierung des Fragebogens\
Umsetzung der Umfrage mit Tally (Screenshot)\
#figure(image("assets/archive/Umfrage Draft.png"))
== Umsetzung
Finden von Umfrageteilnehmern per Schneeball-System\
Auswertung der Umfrage per CVS-Export-Funktion von Tally
=== Visualisierung
Programmierung der Web-Anwendung unter Einbindung der erstellten 3D-Elemente\
Gestaltung wie in grobem Styleguide definiert\
=== Umfrage
Ausführung der Umfrage\
Export der Ergebnisse als CSV\
Verwendung dieser Ergebnisse für die Visualiserung

// TODO: make doc

#outline(target: figure, title: "Bilderverzeichnis")
#bibliography(title: none, "Dokumentation.bib", style: "iso-690-numeric")

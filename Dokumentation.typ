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

#text(font: "Coda", hyphenate: false, align(center)[
  #title()
])

#heading(numbering: none)[Abstrakt]
#lorem(50)

#outline(depth: 3)

#set page(columns: 2)

= Aufgabe
1) Visualisierung
• Plakat, Flyer oder Ähnliches erstellen
• Medium frei wählbar (auch analog <-> digital)
2) Präsentation
• ca. 10 Minuten
3) Dokumentation
• ~ A4, 8-12 Seiten
• Texte und Bilder
• als pdf am Ende abgeben
• am besten schon nebenbei erstellen

- Semester-Thema: "UPS AND DOWNS"
- Bearbeitung in Teams ()
- 14. April: Vorstellung des gewählten Themas
  • Warum relevant / interessant?
  • Funktioniert es als Umfrage? (Common Thema / Wissen)
  • gibt es Pre-studies / externe Literatur?

  #figure(image("Aufgabe/Folie mit Aufgabe.png"))

= Idee
zwei Ideen\
Erklärung beider
#figure(image("assets/archive/InfoVis Ideas.png"))


Treppensteigen als finale Idee
= Vorgehen
== Vorbereitungen
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

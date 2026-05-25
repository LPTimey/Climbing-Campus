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

= Idee
= Konzept
= Vorgehen
== Vorbereitungen
=== Statische Daten
==== Treppenzählen
==== Stundenplan
=== Visualisierung
=== Umfrage
== Umsetzung
=== Visualisierung
=== Umfrage


// TODO: make doc

#outline(target: figure, title: "Bilderverzeichnis")
#bibliography(title: none, "Dokumentation.bib", style: "iso-690-numeric")

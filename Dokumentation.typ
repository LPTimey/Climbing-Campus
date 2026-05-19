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
    "Technische Hochschule Ingolstadt",
  ),
)
#set page(
  paper: "a4",
  columns: 2
)
#set text(
  lang: "de",
  font: ("Mozilla Text"),
)

// TODO: make doc

#bibliography(title: none, "Dokumentation.bib", style: "iso-690-numeric")

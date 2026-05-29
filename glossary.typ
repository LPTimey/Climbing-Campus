/*
 ╔══════════════════════════════════ Section ═══════════════════════════════════╗
 ║                                                                              ║
 ║                              Glossary Definition                             ║
 ║                                                                              ║
 ╚══════════════════════════════════════════════════════════════════════════════╝
*/

#let myGlossary = (
  html: (
    short: "HTML",
    long: "Hypertext Markup Language",
    description: "A standard language for creating web pages",
    group: "Web",
  ),
  css: (
    short: "CSS",
    long: "Cascading Style Sheets",
    description: "A stylesheet language used for describing the presentation of a document",
    group: "Web",
  ),
  js: (
    short: "JS",
    long: "JavaScript",
    description: "todo",
    group: "Web",
  ),
  nodejs: (
    short: "node",
    long: "nodeJs",
    description: [
      Ein spezielles Programm, welches Javascript Programmcode außerhalb eines Browsers direkt auf dem System ausführt.
    ],
  ),
  WWW: "World Wide Web", // concise entry with only short: long
  hygrometer: (
    short: "hygrometer",
    description: quote()[
      Das Hygrometer (von altgriechisch ὑγρός hygrós ‚feucht‘, ‚nass‘ und μέτρον métron ‚Maß‘, ‚Maßstab‘) ist ein Messinstrument zur Bestimmung der relativen Luftfeuchtigkeit. Mit der Lufttemperatur kann man aus der Luftfeuchtigkeit den Wasserdampfgehalt der Luft bestimmen.
    ],
    reference: (
      key: "hygrometer_wiki",
    ),
  ),
  // tps: (
  //   short: "TPS",
  //   long: "test procedure specification",
  //   description: "A formal document describing test steps and expected results",
  //   // Optional: Override automatic pluralization
  //   plural: "TPSes",
  //   longplural: "test procedure specifications",
  //   reference: (
  //     key: "doe2025",
  //     supplement: "p. 42", // Supplement is optional
  //   ),
  // ),
)

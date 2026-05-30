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
      // TODO: npm und so ja auch
    ],
    group: "Web",
  ),
  sessiontoken: (
    short: "Session Token",
    description: [
      Ein eindeutiger Wert, der nach einer erfolgreichen Anmeldung erzeugt wird und einen Benutzer während einer Sitzung identifiziert. Der Token wird typischerweise vom Client gespeichert und bei weiteren Anfragen an den Server übermittelt, sodass der Benutzer nicht bei jeder Anfrage erneut seine Anmeldedaten angeben muss.
    ],
    group: "Web",
  ),
  threejs: (
    short: "Three.js",
    description: [
      Eine JavaScript-Bibliothek zur Erstellung und Darstellung von 3D-Grafiken direkt im Webbrowser.
    ],
    group: "Web",
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
    group: "Messtechnik",
  ),
  tally: (
    short: "tally",
    description: [
      Eine Website für Umfragen Generierung und Durchführung. In Idee ähnlich zu Google Forms.
    ],
    group: "Messtechnik",
  ),
  csv: (
    short: "CSV",
    long: "Comma Separated Values",
    description: [
      Ein textbasiertes Dateiformat zur Speicherung tabellarischer Daten. Die einzelnen Werte einer Zeile werden durch ein Trennzeichen (häufig ein Komma, Semikolon oder Tabulator) voneinander getrennt. CSV-Dateien werden häufig für den Datenaustausch zwischen verschiedenen Programmen wie Tabellenkalkulationen, Datenbanken oder anderen Anwendungen verwendet.
    ],
    group: "Data",
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

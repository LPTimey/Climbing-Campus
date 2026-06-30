/*
 ╔══════════════════════════════════ Section ═══════════════════════════════════╗
 ║                                                                              ║
 ║                              Glossary Definition                             ║
 ║                                                                              ║
 ╚══════════════════════════════════════════════════════════════════════════════╝
*/

#let myGlossary = (
  UI: "User Interface",
  WWW: "World Wide Web", // concise entry with only short: long
  hard_surf: (
    short: "Hard Surf",
    long: "Hard Surface Model(ling)",
    description: [
    
    ],
  ),
  spa: (
    short: "SPA",
    long: "Single Page Application",
    description: "Eine Art Webseite, welche ihren ganzen Inhalt auf einer Page hat und nicht mit Hyperlinks in andere Pfaded navigiert.",
    group: "Web",
  ),
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
    group: "Werkzeug",
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
  hygrometer: (
    short: "hygrometer",
    description: quote()[
      Das Hygrometer (von altgriechisch ὑγρός hygrós ‚feucht‘, ‚nass‘ und μέτρον métron ‚Maß‘, ‚Maßstab‘) ist ein Messinstrument zur Bestimmung der relativen Luftfeuchtigkeit. Mit der Lufttemperatur kann man aus der Luftfeuchtigkeit den Wasserdampfgehalt der Luft bestimmen.
    ],
    reference: (
      key: "hygrometer_wiki",
    ),
    group: "Werkzeug",
  ),
  tally: (
    short: "tally",
    description: [
      Eine Website für Umfragen Generierung und Durchführung. In Idee ähnlich zu Google Forms.
    ],
    group: "Werkzeug",
  ),
  json: (
    short: "JSON",
    long: "JavaScriptObjectNotation",
    description: [Ein Datenformat welches of im Web benutzt wird um Daten in einem Menschen leserlichen und leicht in @js übersetzbarem format zu übertragen.],
    group: "Data",
  ),
  csv: (
    short: "CSV",
    long: "Comma Separated Values",
    description: [
      Ein textbasiertes Dateiformat zur Speicherung tabellarischer Daten. Die einzelnen Werte einer Zeile werden durch ein Trennzeichen (häufig ein Komma, Semikolon oder Tabulator) voneinander getrennt. CSV-Dateien werden häufig für den Datenaustausch zwischen verschiedenen Programmen wie Tabellenkalkulationen, Datenbanken oder anderen Anwendungen verwendet.
    ],
    group: "Data",
  ),
  glb:(
    short:"GLTF Binary",
    long: "Graphics Library Transmission Format Binary",
    description: [],
    group: "Data",
  ),
  primuss: (
    short: "Primuss",
    long: "Primuss-Studienverwaltung",
    description: [
      Ein Verwaltungstool welches von der Hochschule benutzt wird um z.B. (für uns wichtig) die Stundenpläne an die Studenten zu verteilen.
    ],
    group: "Werkzeug",
  ),
  blender: (
    short: "blender",
    description: [
      Ein Programm zur Erstellung von 3D Modellen aus Punkten, Kanten und Flächen.
    ],
    group: "Werkzeug",
  ),
  excel: (
    short: "Excel",
    long: "Microsoft 356 Copilot App Excel",
    description: [
      Ein Programm zur Erstellung von hauptsächlich Tabellen, Graphen und anderen Zell basierten Zwecken.
    ],
    group: "Werkzeug",
  ),
  figma: (
    short: "Figma",
    description: [
    ],
    group: "Werkzeug",
  ),
  figjam: (
    short: "FigJam",
    long: "Figma Jamboard",
    description: [
    ],
    group: "Werkzeug",
  ),
  github:(
    short: "GitHub",
    description: [],
    group: "Werkzeug"
  )
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

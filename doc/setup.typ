#let appendix_numbering = (..numbers) => {
  let numbers = numbers.pos().rev()

  let _ = numbers.pop()
  let alpha = numbers.pop()

  let base = str.to-unicode("A")
  let alpha = str.from-unicode(base + alpha - 1)

  let rest = numbers.rev().map(str)

  if rest.len() == 0 {
    alpha
  } else {
    alpha + "." + rest.join(".")
  }
}
#let no_numbering = (..num) => ""
#let norm_numbering = "1.1.a.I"

#let setup = entry-list => {
  body => [
    /// from https://typst.app/universe/package/glossy
    // #import "@preview/glossy:0.9.1": *
    #import "../vendor/glossy 0.9.1/lib.typ": *

    // text settings
    #set text(
      lang: "de",
      region: "DE",
      number-width: "tabular",
      // slashed-zero: false,
      slashed-zero: true,
      overhang: true,
      font: "Mozilla Text",
      size: 10pt,
    )
    #set par(justify: true)
    // Add line numbers
    #set par.line(numbering: line => text(fill: oklch(34.752%, 0.19503, 287.949deg), size: 8pt)[#line])

    // set Code font
    #show raw: it => text(font: "JetBrainsMono NF")[#it]


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

    // set heading numbering-scheme
    #set heading(numbering: norm_numbering)

    #show: init-glossary.with(entry-list, term-links: true)

    // Color Links
    #show link: it => {
      if type(it.dest) == str {
        text(
          underline([#it], stroke: stroke(
            thickness: 0.05em,
            dash: "solid",
            paint: blue.darken(75%),
          )),
          fill: blue.darken(75%),
        )
      } else if type(it.dest) == label {
        text(
          underline([#it], stroke: stroke(
            thickness: 0.05em,
            dash: "dashed",
            paint: black.transparentize(50%),
          )),
          fill: black,
        )
      } else if type(it.dest) == location {
        text(
          underline([#it], stroke: stroke(
            thickness: 0.05em,
            dash: "solid",
            paint: black,
          )),
          fill: black,
        )
      } else {
        it
        // [#it (unknown dest type = #type(it.dest))]
      }
    }
    #show ref: it => {
      if it.element == none or it.element.func() == metadata {
        return it
      }
      text(
        underline(it),
        fill: black,
      )
    }

    #body
  ]
}

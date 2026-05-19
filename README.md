# Climbing Campus

![Logo](assets/temp/landing-dark.svg)

- [Climbing Campus](#climbing-campus)
  - [German / Deutsch](#german--deutsch)
    - [Aufgabe / Mission](#aufgabe--mission)
    - [Umfrage](#umfrage)
    - [Seite](#seite)
  - [English](#english)
    - [Mission](#mission)
    - [Survey](#survey)
    - [Website](#website)
  - [How To Run](#how-to-run)
    - [Download](#download)
      - [With git](#with-git)
      - [With Github Desktop](#with-github-desktop)
      - [As .zip](#as-zip)
    - [Install Dependencies](#install-dependencies)
    - [Run](#run)
      - [Development Server](#development-server)
      - [Production Server](#production-server)
      - [Build Site](#build-site)

## German / Deutsch

### Aufgabe / Mission

Im Rahmen des Wahlpflichtfachs *Informationsvisualisierung* erhielten wir das Oberthema **„Ups and Downs“**.  
Statt dieses abstrakt als Vor- Nachteile bzw. Wechseldynamiken zu interpretieren, haben wir uns bewusst für eine wörtliche und zugleich spielerische Umsetzung entschieden.

Der Campus der Technischen Hochschule Ingolstadt ist weitläufig und vor allem: voller Treppen, Ebenen und Höhenunterschiede.
Für Studierende bedeutet das täglich kleine „Aufstiege“ und „Abstiege“, sei es auf dem Weg zur Vorlesung, zur Mensa oder generell zwischen Gebäuden.

Mit **Climbing Campus** machen wir genau diese physischen „Ups and Downs“ sichtbar.

### Umfrage

Um ein besseres Verständnis für die Wahrnehmung der Studierenden zu gewinnen, haben wir eine Umfrage durchgeführt.

Dabei wollten wir unter anderem herausfinden:

- Wie anstrengend wird der Campus im Alltag empfunden?
- Welche Wege werden besonders häufig genutzt?
- Welche Orte gelten als „anstrengend“ oder „entspannt“ oder ...?
- TODO: mehr

Die Ergebnisse dieser Umfrage sind in unsere Visualisierung eingeflossen und bilden eine wichtige Grundlage für die Interpretation der Daten.

### Seite

## English

### Mission

### Survey

### Website

## How To Run

### Download

#### With [git](https://git-scm.com/)

1) Open a Terminal in the Directory in witch you want to save the project

2) run

```bash
git clone https://github.com/LPTimey/Up-and-Down-Stairs.git
```

#### With [Github Desktop](https://desktop.github.com/download/)

1) open the green "Code"-button dropdown

2) Be in the "Local" Tab

3) Press the "Open with GitHub Desktop"-button at the bottom of the dropdown

4) Accept the Pop-Up

#### As .zip

1) open the green "Code"-button dropdown

2) Be in the "Local" Tab

3) Press the "Download ZIP"-button at the bottom of the dropdown

### Install Dependencies

1) Have [Node.Js](https://nodejs.org/en) Installed
2) Open a Terminal in the Project directory
3) Install all dependencies

```bash
npm i
```

### Run

#### Development Server

```bash
npm run dev
```

#### Production Server

```bash
npm run build
npm run preview
```

#### Build Site

1) run

```bash
npm run build
```

2) Look at `./dist/index.html`

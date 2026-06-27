# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Was das ist

Statische Mehrseiten-Website für **MikaTec** (selbstständige Software-Entwicklung, Inhaber **Hasan Tepegöz**). Reines HTML/CSS/JS, **kein Build-Schritt, kein npm, kein Server**. Sprache durchgehend **Deutsch** (`lang="de"`).

- **Ansehen / testen:** `index.html` im Browser öffnen — kein Tooling nötig.
- **Bearbeiten:** HTML-Dateien direkt; das gesamte Aussehen liegt zentral in `style.css`.
- **Hosting:** GitHub Pages, Domain `mika-tec.com` (`CNAME`, `.nojekyll`). Was committet und gepusht wird, geht live.

## Architektur

Es gibt **kein Templating**. Jede Seite (`index`, `leistungen`, `projekte`, `ueber`, `kontakt`, `impressum`, `datenschutz`) ist eine eigenständige HTML-Datei, die `<header class="nav">` und `<footer>` **wortgleich dupliziert**. Eine Änderung an Navigation oder Footer muss in **allen 7 Seiten** identisch nachgezogen werden.

- **`style.css`** — eine Datei für alles. Designwerte stehen als CSS-Variablen in `:root` (Farben, `--accent-grad`, `--radius`, `--maxw: 1800px`, Schatten). Heller Modus über `[data-theme="light"]`-Überschreibungen; Dunkel ist Standard.
- **`theme.js`** — zwei Aufgaben: (1) liest `localStorage['mt-theme']` und setzt `data-theme` **vor** dem Rendern (kein Flackern), injiziert den 🌙/☀️-Button in `.nav-links`; (2) `IntersectionObserver` blendet Elemente mit Klassen `.card .step .tl-item .factbar .faq details` beim Scrollen ein (vergibt `.reveal` → `.in`). Neue scrollbare Komponenten brauchen eine dieser Klassen, um animiert zu werden.
- **Cache-Busting:** CSS/JS werden mit `?v=N` eingebunden (aktuell `?v=3`). Bei Änderung an `style.css` oder `theme.js` die Versionsnummer in **allen** Seiten gemeinsam hochzählen, sonst sehen Besucher alte Dateien.
- **Logo:** aktiv ist `logos/mikatec-L4.svg` (Kopf, Footer, Favicon, OG-Image). Weitere Varianten `mikatec-A…L`, `L1…L4` liegen daneben.
- **SEO:** jede Seite hat eigene `<meta name="description">` + Open-Graph-Tags. Neue Seiten zusätzlich in `sitemap.xml` eintragen.

## Konventionen

- **Ton:** sachlich, nüchtern, professionell — **kein Werbe-Sprech**, keine KI-Behauptungen. Ansprache per **„du"**. (Siehe Git-Historie: Texte wurden bewusst entwerblicht.)
- **Prinzip:** Symmetrie, Struktur, schlicht.
- **`entwurf/`** gehört **nicht** zur Website — nur Logo-Entwürfe und `generate-logos.js`. Nicht verlinken, nicht deployen.
- `.gitignore` hält `*.log`, `_pruefen.html` (lokales Prüf-Werkzeug) und `vendor/` aus dem Repo.

## Projekt-Skills (für Routine-Aufgaben)

- **`/lernseite`** — neue HTML-Seite im Standard-Design dieses Projekts anlegen.
- **`/doku`** — `.md`- und `.html`-Inhalte von Hand synchron halten.
- **`/schluss`** — Schluss-Ritual: speichern, Dokus aktualisieren, Stand merken.
- **`/standardisieren`** — erst Typ/Stack/Plattform klären, dann angleichen.

## Offene Punkte vor dem Online-Stellen (aus README)

- `impressum.html`: alle `[…]`-Platzhalter ausfüllen (Anschrift in DE Pflicht, Telefon, USt-IdNr. bzw. Kleinunternehmer-Hinweis).
- `datenschutz.html`: Anschrift + Hosting-Anbieter eintragen; Text gilt nur für eine Seite **ohne** Tracking/Google-Fonts/Formular.
- OG-Image langfristig auf eine absolute PNG/JPG-URL setzen (SVG wird nicht überall als Vorschau angezeigt).

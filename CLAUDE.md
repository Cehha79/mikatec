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
- **`theme.js`** — drei Aufgaben: (1) liest `localStorage['mt-theme']` und setzt `data-theme` **vor** dem Rendern (kein Flackern), injiziert den 🌙/☀️-Button in `.nav-links`; (2) `IntersectionObserver` blendet Elemente mit Klassen `.card .step .tl-item .faq details` beim Scrollen ein (vergibt `.reveal` → `.in`); (3) Knoten-Netz-Effekt (`.fx-net`-Canvas, ein gemeinsamer rAF-Loop) in `.contact-box, .card.pillar, .step`, theme-abhängige Palette wie im Hero. Neue scrollbare Komponenten brauchen eine der Reveal-Klassen, um animiert zu werden.
- **Cache-Busting:** CSS/JS werden mit `?v=N` eingebunden (aktuell `?v=118`). Bei Änderung an `style.css` oder `theme.js` die Versionsnummer in **allen** Seiten gemeinsam hochzählen, sonst sehen Besucher alte Dateien.
- **Logo:** aktiv ist `logos/mikatec-L4.svg` (Kopf, Footer, Favicon, OG-Image). Ältere Varianten (`mikatec-A…L3`) wurden am 05.07.2026 in den Papierkorb ausgelagert — nur noch `L4` liegt in `logos/`.
- **SEO:** jede Seite hat eigene `<meta name="description">` + Open-Graph-Tags. Neue Seiten zusätzlich in `sitemap.xml` eintragen.

## Konventionen

- **Ton:** sachlich, nüchtern, professionell — **kein Werbe-Sprech**, keine KI-Behauptungen. Ansprache per **„Sie"** (förmlich, für geschäftliche/internationale Kundschaft; Umstellung von „du"→„Sie" Juli 2026). Neue Texte immer in „Sie". (Siehe Git-Historie: Texte wurden bewusst entwerblicht.)
- **Prinzip:** Symmetrie, Struktur, schlicht. Jedes Layout am Raster ausgerichtet, ausgewogene Spalten.
- **Responsive:** mobiler/Tablet-Umbruch am Ende von `style.css` (Block „MOBILE RESPONSIVE") — Nav-Umbruch, Formular-Schrift 16px (kein iOS-Zoom), Tab-Scrollstreifen, engere Abstände. Geprüft: kein horizontales Überlaufen bei 390 px.
- **`entwurf/`** wurde am 05.07.2026 entfernt (war nur Logo-Entwürfe). Nicht wieder anlegen/deployen.
- `.gitignore` hält `*.log`, `_pruefen.html` (lokales Prüf-Werkzeug), `vendor/` und `.claude/` aus dem Repo.

## Projekt-Skills (für Routine-Aufgaben)

- **`/lernseite`** — neue HTML-Seite im Standard-Design dieses Projekts anlegen.
- **`/doku`** — `.md`- und `.html`-Inhalte von Hand synchron halten.
- **`/schluss`** — Schluss-Ritual: speichern, Dokus aktualisieren, Stand merken.
- **`/standardisieren`** — erst Typ/Stack/Plattform klären, dann angleichen.

## Rechtstexte (Impressum & Datenschutz)

- **Beide ausgefüllt** (Stand Juli 2026). Details + bewusste Entscheidungen + offene Vorbehalte stehen in **`README.md` → Abschnitt „Rechtstexte"**. Kurz:
  - Seite ist **cookie-/tracking-/analyse-/CDN-frei** (Hosting: GitHub Pages). Der Datenschutz sagt das ausdrücklich — **keine** Cookie-/Analytics-/Adobe-Fonts-/DSB-Abschnitte aus Fremd-Mustern übernehmen (wäre unwahr).
  - US-Datenweitergabe beschrieben (GitHub + FormSubmit). EU-OS-Plattform bewusst weggelassen (2025 eingestellt).
  - International: DSGVO als Mindeststandard (Datenschutz §7 + Impressum „Internationale Zusammenarbeit"). **Sprach-Pakete EN/TR: geplant, noch offen.**
  - Kein anwaltlicher Text → vor echtem Auslandsgeschäft juristisch gegenlesen; bei echten Daten/Tracking/Cookies Datenschutz nachziehen.

## Offene Punkte vor dem Online-Stellen

- OG-Image langfristig auf eine absolute PNG/JPG-URL setzen (SVG wird nicht überall als Vorschau angezeigt).
- Umbau läuft auf Branch **`neuaufbau`** — noch nicht live gepusht.

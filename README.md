# MikaTec — Firmen-Website

Öffentliche Firmen-Website von **MikaTec** — selbstständige Software- und IT-Dienstleistung von **Hasan Tepegöz** (Böblingen).
Live: **[mika-tec.com](https://mika-tec.com)**

> Statische Mehrseiten-Website in reinem HTML, CSS und JavaScript — kein Build-Schritt, kein Framework, kein Server.

---

## Technik

| | |
|---|---|
| **Stack** | HTML5 · CSS3 · Vanilla JavaScript (keine Abhängigkeiten, kein Build) |
| **Hosting** | GitHub Pages — Branch `main`, Auslieferung aus dem Repo-Root |
| **Domain** | `mika-tec.com` (Custom Domain via `CNAME`), HTTPS erzwungen |
| **Design** | responsiv (Smartphone · Tablet · Desktop), Hell-/Dunkelmodus |

## Lokal ansehen & bearbeiten

`index.html` im Browser öffnen — kein Server nötig. Das gesamte Erscheinungsbild liegt zentral in `style.css`; Inhalte stehen direkt in den jeweiligen HTML-Dateien.

## Projektstruktur

```text
mikatec/
├── index.html          Startseite — Hero, Kennzahlen, Leistungs-Überblick
├── leistungen.html     Leistungen — 2 Rundum-Pakete (IT-/Daten-Service, Web)
│                        + 12 Einzelleistungen, jeweils mit Detail-Ansicht
├── projekte.html       Projekt-Portfolio — Karten-Raster mit Detail-Ansichten
├── ueber.html          Über MikaTec / Hasan Tepegöz
├── kontakt.html        Kontakt + Anfrageformular
├── impressum.html      Impressum (§ 5 DDG, § 19 UStG)
├── datenschutz.html    Datenschutzerklärung (DSGVO)
├── style.css           komplettes Design — eine Datei, CSS-Variablen
├── theme.js            Hell-/Dunkel-Umschalter, Scroll-Einblendung, Canvas-Effekt
├── bilder/             Screenshots, Icons, Projekt-Bilder, OG-Vorschaubild
├── logos/              Marken-Logo (SVG)
├── CNAME               Custom Domain (mika-tec.com)
├── sitemap.xml         Sitemap für Suchmaschinen
└── robots.txt          Crawler-Regeln
```

## Design-System — „Grafit & Gold"

- **Farbwerte** als CSS-Variablen in `:root` (Dunkelmodus = Standard); Hellmodus über `[data-theme="light"]`.
- **Akzente:** Gold `#e3c178`, Türkis `#2aa39c` / `#35c2b9`.
- **Logo:** `logos/mikatec-L4.svg` (Achteck-Motiv) — in Kopf, Footer, Favicon und als Vorschaubild.
- **Cache-Busting:** `style.css` und `theme.js` werden mit `?v=N` eingebunden; bei jeder Design-Änderung gemeinsam hochgezählt.

## Architektur

Kein Templating: Jede Seite ist eigenständig, `<header>` und `<footer>` sind identisch dupliziert — Änderungen daran in allen sieben Seiten nachziehen. Die Detail-Ansichten auf `leistungen.html` und `projekte.html` sind per JavaScript gesteuerte Modals.

## SEO & Rechtliches

- Pro Seite: `<title>`, `meta description`, Open-Graph- und Twitter-Card-Tags, `canonical`.
- Einheitliches Vorschaubild `bilder/og-mikatec.png` (1200 × 630) für das Teilen von Links.
- `sitemap.xml`, `robots.txt` und Google-Search-Console-Verifikation eingerichtet.
- Impressum und Datenschutz ausgefüllt — **cookie-, tracking- und CDN-frei**.

## Deployment

Änderung committen → `main` pushen → GitHub Pages baut automatisch → live auf mika-tec.com.

---

*Gestaltungsprinzip: Symmetrie, Struktur, schlicht und professionell. Inhaber und Entwickler: Hasan Tepegöz.*

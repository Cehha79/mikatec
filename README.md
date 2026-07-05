# MikaTec — Firmen-Website

![Live](https://img.shields.io/badge/Live-mika--tec.com-2aa39c)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222)
![Zero Build](https://img.shields.io/badge/Build-none-success)
![Dependencies](https://img.shields.io/badge/Dependencies-0-success)

Öffentliche Unternehmens-Website von **MikaTec** — selbstständige Software- und IT-Dienstleistung von **Hasan Tepegöz** (Böblingen).
Live: **[mika-tec.com](https://mika-tec.com)**

> Handgeschriebene, **dependency-freie** Multi-Page-Website in **Vanilla HTML5, CSS3 und JavaScript** — ohne Build-Pipeline, ohne Framework, ohne Server-Backend.

---

## Überblick

Diese Website ist bewusst als **statische Site** umgesetzt: Alle Seiten werden als vorgefertigte HTML-Dokumente ausgeliefert, sämtliche Interaktivität läuft **client-seitig** in Vanilla JavaScript. Das Ergebnis ist eine schnelle, wartungsarme und angriffsarme Präsenz — ohne CMS, ohne Datenbank, ohne externe Laufzeit-Abhängigkeiten.

Gehostet über **GitHub Pages** mit **Continuous Deployment**: Jeder Push auf `main` löst automatisch einen Build- und Deploy-Lauf aus. Ausgeliefert wird unter der **Custom Domain** `mika-tec.com` mit erzwungenem **HTTPS**.

## Merkmale

- **Zero-Dependency & Build-less** — kein npm, kein Bundler, kein Transpiler; direkt auslieferbar.
- **Semantic HTML5** — `header`, `nav`, `main`, `section`, `footer`, `figure` für saubere Dokumentstruktur.
- **Design-Tokens** — zentrales Theming über **CSS Custom Properties** (`:root`), eine einzige Stylesheet-Quelle.
- **Responsive Design** — fließende Layouts mit **50+ Breakpoints** (CSS Grid & Flexbox), optimiert für Smartphone, Tablet und Desktop.
- **Dark-/Light-Mode** — umschaltbar, Auswahl **persistiert** über `localStorage`; Anwendung im `<head>` vor dem Rendern (kein Flash of Unstyled Content).
- **Barrierefreiheit (a11y)** — WCAG-orientiert: **ARIA-Rollen/-Attribute** (`role="dialog"`, `aria-modal`, `aria-label`, `aria-labelledby`, `aria-haspopup`), Tastatur-Bedienung (Enter/Escape), Respekt vor **`prefers-reduced-motion`**.
- **Performance** — **self-contained** (keine externen CDNs, Fonts oder Tracker), **Lazy Loading** von Bildern (`loading="lazy"`), minimaler Payload, **Cache-Busting** via Query-String-Versionierung (`?v=N`).
- **Progressive Enhancement** — Kerninhalte funktionieren ohne JavaScript; Interaktion (Modals, Effekte) wird darauf aufgesetzt.
- **SEO-ready** — Open Graph & Twitter Cards, `canonical`-URLs, `sitemap.xml`, `robots.txt`, Google-Search-Console-Verifikation.

## Tech-Stack

| Ebene | Umsetzung |
|---|---|
| **Markup** | HTML5, semantisch, ein Dokument je Seite |
| **Styling** | CSS3 — Custom Properties, Grid, Flexbox, `clamp()`-Fluid-Typografie, Media Queries |
| **Interaktion** | Vanilla JavaScript — `IntersectionObserver` (Scroll-Reveal), **Canvas API** + `requestAnimationFrame` (Knoten-Netz-Effekt), `localStorage` (Theme-Persistenz), Modal-Steuerung |
| **Formular** | Kontaktanfrage über **FormSubmit** (Drittanbieter-Endpoint, kein eigenes Backend) |
| **Hosting / CI-CD** | GitHub Pages (`pages-build-deployment`), Auslieferung aus dem Repo-Root |
| **Domain / TLS** | Custom Domain via `CNAME`, HTTPS erzwungen (Zertifikat automatisch bereitgestellt) |

## Projektstruktur

```text
mikatec/
├── index.html          Startseite — Hero, Kennzahlen, Leistungs-Überblick
├── leistungen.html     Leistungen — 2 Rundum-Pakete (IT-/Daten-Service, Web)
│                        + 12 Einzelleistungen, jeweils mit Detail-Modal
├── projekte.html       Projekt-Portfolio — Karten-Raster mit Detail-Modals
├── ueber.html          Über MikaTec / Hasan Tepegöz
├── kontakt.html        Kontakt + Anfrageformular (FormSubmit)
├── impressum.html      Impressum (§ 5 DDG, § 19 UStG)
├── datenschutz.html    Datenschutzerklärung (DSGVO)
├── style.css           gesamtes Design — Single Source of Truth, CSS Custom Properties
├── theme.js            Theme-Toggle, Scroll-Reveal (IntersectionObserver), Canvas-Effekt
├── bilder/             Rastergrafiken (Screenshots, Icons, Projektbilder, OG-Image)
├── logos/              Marken-Logo (SVG, vektoriell)
├── CNAME               Custom Domain (mika-tec.com)
├── .nojekyll           deaktiviert die Jekyll-Verarbeitung (reine Static-File-Auslieferung)
├── sitemap.xml         XML-Sitemap für Crawler
└── robots.txt          Crawler-Direktiven
```

## Architektur

Es gibt **kein Templating** und keinen Server-seitigen Include-Mechanismus: Jede Seite ist ein eigenständiges Dokument, `header` und `footer` sind **bewusst dupliziert** und müssen bei Änderungen in allen Seiten synchron gehalten werden — ein klassischer Trade-off statischer Sites zugunsten von Einfachheit und Auslieferungsgeschwindigkeit.

Die **Detail-Ansichten** auf `leistungen.html` und `projekte.html` sind als **client-seitige Modals** realisiert: Klick auf eine Karte öffnet einen Dialog (`role="dialog"`, `aria-modal`), dessen Inhalt aus dem DOM bzw. einem Daten-Objekt befüllt wird. Der **Knoten-Netz-Hintergrund** ist ein leichtgewichtiger Canvas-Renderer mit einer gemeinsamen `requestAnimationFrame`-Schleife, der bei `prefers-reduced-motion` still bleibt.

## Design-System — „Grafit & Gold"

- **Farbwelt** als CSS Custom Properties in `:root`; **Dark Mode** ist Standard, **Light Mode** überschreibt via `[data-theme="light"]`.
- **Akzente:** Gold `#e3c178`, Türkis `#2aa39c` / `#35c2b9`, Tiefen-Türkis `#16686b`.
- **Typografie:** system-nahe Schriftfamilie, fluide Skalierung über `clamp()`.
- **Logo:** `logos/mikatec-L4.svg` (Achteck-Motiv) — im Header, Footer, als Favicon und als Grundlage des OG-Vorschaubilds `bilder/og-mikatec.png` (1200 × 630).

## Barrierefreiheit & Performance

- **WCAG-orientiert:** Fokus-Reihenfolge, ausreichende Kontraste, sprechende `aria-label`, Modal-Semantik, vollständige Tastatur-Bedienung.
- **Bewegungsreduktion:** Animationen und der Canvas-Effekt respektieren `prefers-reduced-motion`.
- **Ladeverhalten:** keine Render-blockierenden Drittanbieter-Ressourcen, `loading="lazy"` für Bilder, deterministisches Caching über versionierte Assets.

## SEO

Pro Dokument: individueller `<title>`, `meta description`, **Open-Graph-** und **Twitter-Card-**Metadaten sowie `rel="canonical"`. Alle Seiten sind in `sitemap.xml` registriert; `robots.txt` verweist auf die Sitemap. Ein einheitliches, absolut referenziertes OG-Vorschaubild (PNG, 1200 × 630) sorgt für konsistente Link-Vorschauen in Messengern und sozialen Netzwerken.

## Sicherheit & Datenschutz

- **Minimale Angriffsfläche:** keine serverseitige Logik, keine Datenbank, kein CMS.
- **Datensparsam:** **keine Cookies, kein Tracking, keine Analyse-Tools, keine externen Schriften/CDNs**.
- **Sichere Verweise:** externe Links mit `rel="noopener"`.
- **Rechtstexte:** Impressum (§ 5 DDG, § 19 UStG) und DSGVO-Datenschutzerklärung integriert.

## Lokale Entwicklung

Kein Toolchain-Setup nötig:

```bash
# Repository klonen
git clone https://github.com/Cehha79/mikatec.git

# index.html im Browser öffnen — fertig.
```

Das gesamte Erscheinungsbild liegt zentral in `style.css`; Inhalte werden direkt in den HTML-Dokumenten gepflegt. Nach Änderungen an `style.css`/`theme.js` wird die Versionsnummer im Query-String (`?v=N`) in **allen** Seiten gemeinsam erhöht (Cache-Busting).

## Deployment

**Continuous Deployment über GitHub Pages:**

```
Commit  →  push origin main  →  pages-build-deployment  →  https://mika-tec.com
```

Jeder Push auf `main` triggert automatisch Build und Deploy. Die Auslieferung erfolgt aus dem Repo-Root; `CNAME` bindet die Custom Domain, HTTPS wird erzwungen.

---

<sub>Gestaltungsprinzip: Symmetrie, Struktur, schlicht und professionell. · Konzeption & Entwicklung: **Hasan Tepegöz** · © MikaTec</sub>

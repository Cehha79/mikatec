# MikaTec · Firmen-Website

![Live](https://img.shields.io/badge/Live-mika--tec.com-0e7c74)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222)
![Zero Build](https://img.shields.io/badge/Build-none-success)
![Dependencies](https://img.shields.io/badge/Dependencies-0-success)

Öffentliche Unternehmens-Website von **MikaTec**, der selbstständigen Software- und IT-Dienstleistung von **Hasan Tepegöz** (Böblingen).
Live: **[mika-tec.com](https://mika-tec.com)**

> Handgeschriebene, **dependency-freie** Multi-Page-Website in **Vanilla HTML5, CSS3 und JavaScript**: ohne Build-Pipeline, ohne Framework, ohne Server-Backend.

---

## Überblick

Diese Website ist bewusst als **statische Site** umgesetzt: Alle Seiten werden als vorgefertigte HTML-Dokumente ausgeliefert, sämtliche Interaktivität läuft **client-seitig** in Vanilla JavaScript. Das Ergebnis ist eine schnelle, wartungsarme und angriffsarme Präsenz, ohne CMS, ohne Datenbank und ohne externe Laufzeit-Abhängigkeiten.

Gehostet über **GitHub Pages** mit **Continuous Deployment**: Jeder Push auf `main` löst automatisch einen Build- und Deploy-Lauf aus. Ausgeliefert wird unter der **Custom Domain** `mika-tec.com` mit erzwungenem **HTTPS**.

## Merkmale

- **Zero-Dependency & Build-less**: kein npm, kein Bundler, kein Transpiler; direkt auslieferbar.
- **Semantic HTML5**: `header`, `nav`, `main`, `section`, `footer`, `figure` für saubere Dokumentstruktur.
- **Design-Tokens**: zentrales Theming über **CSS Custom Properties** (`:root`), eine einzige Stylesheet-Quelle.
- **Eigene Schrift, selbst gehostet**: **Instrument Sans** als variable WOFF2 aus `fonts/` (SIL Open Font License). Keine externen Font-CDNs, damit DSGVO-sauber.
- **Responsive Design**: fließende Layouts mit CSS Grid & Flexbox (u. a. asymmetrisches Bento-Raster), optimiert für Smartphone, Tablet und Desktop.
- **Light-/Dark-Mode**: **Light Mode ist der Standard**; ein Umschalten auf Dark ist jederzeit möglich und hält über Seitenwechsel (URL-Hash `#mt=dark`, bewusst speicherfrei und damit Safari-tauglich). Anwendung im `<head>` vor dem Rendern (kein Flash of Unstyled Content).
- **Dezente Motion**: Scroll-Reveals (IntersectionObserver), Zahlen-Count-up, Spotlight-Hover auf Karten, Cross-Document **View Transitions** beim Seitenwechsel. Alles unter Respekt von **`prefers-reduced-motion`**.
- **Barrierefreiheit (a11y)**: WCAG-orientiert, **ARIA-Rollen/-Attribute** (`role="dialog"`, `aria-modal`, `aria-label`), Tastatur-Bedienung (Enter/Escape).
- **Performance**: self-contained (lokale Schriften, keine CDNs; einzige externe Ressource ist das anonyme, cookiefreie Analyse-Skript **GoatCounter**), **Lazy Loading** von Bildern, minimaler Payload, **Cache-Busting** via Query-String-Versionierung (`?v=N`).
- **Progressive Enhancement**: Kerninhalte funktionieren ohne JavaScript; Interaktion (Modals, Effekte) wird darauf aufgesetzt.
- **SEO-ready**: Open Graph & Twitter Cards, `canonical`-URLs, `sitemap.xml`, `robots.txt`, Google-Search-Console-Verifikation.

## Tech-Stack

| Ebene | Umsetzung |
|---|---|
| **Markup** | HTML5, semantisch, ein Dokument je Seite |
| **Styling** | CSS3: Custom Properties, Grid, Flexbox, `clamp()`-Fluid-Typografie, Scroll-/View-Transition-Features mit Fallback |
| **Typografie** | Instrument Sans (variable WOFF2, self-hosted, SIL OFL) mit System-Font-Fallback |
| **Interaktion** | Vanilla JavaScript: `IntersectionObserver` (Scroll-Reveal, Count-up), Pointer-Events (Spotlight-Hover), Modal-Steuerung, Theme über URL-Hash + `sessionStorage` |
| **Formular** | Kontaktanfrage über **FormSubmit** (Drittanbieter-Endpoint, kein eigenes Backend) |
| **Hosting / CI-CD** | GitHub Pages (`pages-build-deployment`), Auslieferung aus dem Repo-Root |
| **Domain / TLS** | Custom Domain via `CNAME`, HTTPS erzwungen (Zertifikat automatisch bereitgestellt) |

## Projektstruktur

```text
mikatec/
├── index.html          Startseite: Hero mit echten App-Ansichten, Kennzahlen, Leistungs-Überblick
├── leistungen.html     Leistungen: 6 Kern-Leistungen, Ablauf, Werkzeugkasten, FAQ
├── projekte.html       Projekt-Portfolio: Karten-Raster mit Detail-Modals
├── ueber.html          Über MikaTec / Hasan Tepegöz
├── kontakt.html        Kontakt + Anfrageformular (FormSubmit)
├── impressum.html      Impressum (§ 5 DDG, § 19 UStG)
├── datenschutz.html    Datenschutzerklärung (DSGVO)
├── style.css           gesamtes Design: Single Source of Truth, CSS Custom Properties
├── theme.js            Theme-Toggle, Scroll-Reveal, Spotlight-Hover, Count-up, Modals
├── fonts/              Instrument Sans (variable WOFF2) + OFL-Lizenz
├── bilder/             Rastergrafiken (Screenshots, Icons, Projektbilder, OG-Image)
├── logos/              Marken-Logo
├── CNAME               Custom Domain (mika-tec.com)
├── .nojekyll           deaktiviert die Jekyll-Verarbeitung (reine Static-File-Auslieferung)
├── sitemap.xml         XML-Sitemap für Crawler
└── robots.txt          Crawler-Direktiven
```

## Architektur

Es gibt **kein Templating** und keinen Server-seitigen Include-Mechanismus: Jede Seite ist ein eigenständiges Dokument, `header` und `footer` sind **bewusst dupliziert** und werden bei Änderungen in allen Seiten synchron gehalten; ein klassischer Trade-off statischer Sites zugunsten von Einfachheit und Auslieferungsgeschwindigkeit.

Die **Projekt-Detailansichten** auf `projekte.html` sind als **client-seitige Modals** realisiert: Klick auf eine Kachel öffnet einen Dialog (`role="dialog"`, `aria-modal`), dessen Inhalt aus einem Daten-Objekt befüllt wird. Das Projekt-Modal enthält einen **Screenshot-Slider** (Blättern per Pfeil/Wischen/Pfeiltasten, `scroll-snap`) und eine **Vollbild-Galerie** (Lightbox mit Weiter/Zurück, Zähler, Tastatur-Steuerung). **Impressum** und **Datenschutz** öffnen als **Maske** (iframe-Modal), deren Hell-/Dunkel-Thema per URL-Hash mit der Seite synchronisiert wird; die eigenständigen Seiten bleiben als rechtssicherer Fallback erhalten.

## Design-System v4 „Ruhig & Hochwertig"

- **Light Mode als Basis**, Dark Mode überschreibt via `[data-theme="dark"]`; alle Farben als CSS Custom Properties in `:root`.
- **Eine Akzentfarbe:** Türkis `#0e7c74`; Primär-Aktionen in Ink `#101820`; neutrale Haarlinien statt sichtbarer Kastenrahmen.
- **Typografie:** Instrument Sans (variable), fluide Skalierung über `clamp()`, hoher Größenkontrast, linksbündige Abschnittsköpfe mit Eyebrow-Labels.
- **Layout:** asymmetrisches Bento-Raster, echte App-Screenshots in Fensterrahmen, dezente Blueprint-Raster- und Korn-Texturen (SVG als data-URI, keine Requests).
- **Logo:** `logos/mikatec-mt.png` im Header, anklickbar (hochauflösende Maske); Favicon `logos/mikatec-mt-favicon.png`; OG-Vorschaubild `bilder/og-mikatec.png` (1200 × 630).

## Barrierefreiheit & Performance

- **WCAG-orientiert:** Fokus-Reihenfolge, ausreichende Kontraste, sprechende `aria-label`, Modal-Semantik, vollständige Tastatur-Bedienung.
- **Bewegungsreduktion:** sämtliche Animationen respektieren `prefers-reduced-motion`.
- **Ladeverhalten:** keine Render-blockierenden Drittanbieter-Ressourcen, `loading="lazy"` für Bilder, deterministisches Caching über versionierte Assets.

## SEO

Pro Dokument: individueller `<title>`, `meta description`, **Open-Graph-** und **Twitter-Card-**Metadaten sowie `rel="canonical"`. Alle Seiten sind in `sitemap.xml` registriert; `robots.txt` verweist auf die Sitemap. Ein einheitliches, absolut referenziertes OG-Vorschaubild (PNG, 1200 × 630) sorgt für konsistente Link-Vorschauen in Messengern und sozialen Netzwerken.

## Sicherheit & Datenschutz

- **Minimale Angriffsfläche:** keine serverseitige Logik, keine Datenbank, kein CMS.
- **Datensparsam:** **keine Cookies, keine Werbung, lokale Schriften**; zur Reichweitenmessung ausschließlich das **cookiefreie, anonyme GoatCounter** (keine personenbezogenen Daten, kein Consent-Banner nötig).
- **Sichere Verweise:** externe Links mit `rel="noopener"`.
- **Rechtstexte:** Impressum (§ 5 DDG, § 19 UStG) und DSGVO-Datenschutzerklärung integriert.

## Lokale Entwicklung

Kein Toolchain-Setup nötig:

```bash
# Repository klonen
git clone https://github.com/Cehha79/mikatec.git

# index.html im Browser öffnen. Fertig.
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

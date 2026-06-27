# MikaTec — Firmen-Website

Statische Mehrseiten-Website für **MikaTec** (selbstständige Software-Entwicklung, Inhaber **Hasan Tepegöz**).
Der Firmenname ist nach dem Sohn **Mikail** benannt (Mika) + **Tec**(hnik).

> Reine HTML/CSS/JS-Seite ohne Build-Schritt. Einfach `index.html` im Browser öffnen.

---

## Schnellstart

- **Ansehen:** `index.html` doppelklicken (oder im Browser öffnen).
- **Bearbeiten:** HTML-Dateien direkt ändern; Aussehen zentral in `style.css`.
- Kein Server, kein npm nötig — alles läuft offline aus dem Ordner.

---

## Struktur

```
MikaTec/
├─ index.html          → Startseite (Hero, Zahlen-Band, „Warum MikaTec", Aufruf)
├─ leistungen.html     → Leistungen, Technologien, Ablauf, FAQ
├─ projekte.html       → 18 Projekte als Karten-Raster
├─ ueber.html          → Über mich, „Mein Weg", Arbeitsweise
├─ kontakt.html        → Kontakt + Ablauf nach der Anfrage
├─ impressum.html      → Impressum (PFLICHT-Platzhalter ausfüllen!)
├─ datenschutz.html    → Datenschutzerklärung (Platzhalter prüfen)
├─ style.css           → komplettes Design (eine Datei für alle Seiten)
├─ theme.js            → Hell-/Dunkel-Umschalter + Scroll-Animationen
├─ logos/              → fertige Logo-Dateien (SVG): mikatec-A … -L, L1 … L4
└─ entwurf/            → Entwürfe & Werkzeuge (nicht Teil der Website)
   ├─ generate-logos.js   → erzeugt die Logo-SVGs
   ├─ logo-muster.html    → 72 Muster-Varianten zur Auswahl
   └─ logo-*.html         → weitere Logo-Auswahlseiten
```

---

## Design-System

Alle Stilwerte stehen als CSS-Variablen oben in `style.css` (`:root`):

- **Akzent-Verlauf:** Blau `#5aa2ff` → Türkis `#6ee7d8`
- **Logo-Türkis (gedämpft):** `#16686b` / Mittel-Quadrat `#2aa39c`
- **Dunkler Modus:** Standard. **Heller Modus:** gedämpftes Grau (kein grelles Weiß), umschaltbar über 🌙/☀️ oben rechts (gespeichert im Browser).
- **Breite:** `--maxw: 1800px`, Inhalte zentriert (Symmetrie/Struktur).
- **Logo:** aktiv ist **`logos/mikatec-L4.svg`** (Achteck + Doppelquadrat-Stern, schwarze Mitte mit türkisem Quadrat). Eingebunden in Kopf, Fuß und als Favicon.

### Logo neu erzeugen
Im Ordner `entwurf/`:
```
cd entwurf
node generate-logos.js      # schreibt die SVGs nach ../logos? -> siehe Hinweis
```
Hinweis: Das Skript legt die Dateien neben sich in `logos/` an. Zum Aktualisieren der echten Logos die erzeugten Dateien nach `../logos/` kopieren, oder das Skript vorübergehend in die Wurzel legen. Farben/Form werden oben im Skript (Konstanten + `squares()`) geändert.

---

## Inhalt / Seiten

- **18 Projekte** auf `projekte.html` (echte Projekte aus `Projekte/In Arbeit/`).
- **Zahlen-Band** (Startseite): 18 Projekte · 3 Plattformen · 6 Leistungsfelder · 1 Ansprechpartner.
- **FAQ** (Leistungen): 6 Fragen als aufklappbare Akkordeons.
- **Open Graph** Meta-Tags je Seite für schöne Teilen-Vorschau (WhatsApp/LinkedIn).

---

## OFFEN / To-do (vor dem Online-Stellen)

1. **Impressum ausfüllen** (`impressum.html`) — alle `[…]`-Felder: Anschrift, Telefon, USt-IdNr. bzw. Kleinunternehmer-Hinweis. **Anschrift ist in DE Pflicht.**
2. **Datenschutz prüfen** (`datenschutz.html`) — Verantwortlicher/Hosting sind eingetragen. Enthält jetzt **Abschnitt 5 zum Kontaktformular (FormSubmit)**. Vor Online-Stellung rechtlich gegenlesen.
3. **Anfrageformular aktivieren** (`kontakt.html`) — nutzt **FormSubmit** (`action="https://formsubmit.co/info@mika-tec.com"`). **Beim allerersten Absenden** schickt FormSubmit eine Bestätigungs-Mail an `info@mika-tec.com`; erst nach Klick auf den Link werden Anfragen zugestellt. Funktioniert nur auf der **live gehosteten** Seite, nicht beim lokalen Öffnen.
4. **Texte gegenlesen** — besonders „Über mich" / „Mein Weg".
5. **Technologie-Liste prüfen** (`leistungen.html`) — enthält Technik, die noch nicht aktiv genutzt wird (z. B. React, Supabase, RAG, Docker, Tauri). Vor Online-Stellung ehrlich kürzen oder als „in Einarbeitung" kennzeichnen.
6. **Unsichere Projekt-Beschreibungen** verifizieren: App Studio vs. Komponenten-Studio, GEO, Simula, FID-Dokumentation, „Sensible Daten".
7. **Beispiel-Galerien (`leistungen.html`)** — die Vorschauen in den Leistungs-Masken („Beispiele — was möglich ist") sind aktuell **stilisierte Mockups** (`.web-examples` / `.ex-shot`), keine echten Screenshots. Später durch echte **Screenshot-PNGs** ersetzen.
8. **Demo-Downloads (später)** — echte eigene Apps als herunterladbare Demos einbinden (Download-Links/Installer in den jeweiligen Leistungs-Masken).
9. **Online stellen** — Hosting wählen und Dateien hochladen. Für Open-Graph-Bild später eine absolute URL auf ein PNG/JPG setzen (SVG wird nicht überall als Vorschaubild angezeigt).

---

## Notizen

- Erstellt: Juni 2026.
- Name korrekt: **Hasan Tepegöz** (frühere Notiz „Özel" war falsch).
- Prinzip der Seite: **Symmetrie, Struktur, schlicht & professionell.**

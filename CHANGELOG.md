# Changelog

Denne changeloggen bruker datoformat: `YYYY-MM-DD`.

## 2026-04-07

### Endret
- Fjernet påsketema og erstattet det med et roligere vårtema i UI.
- Oppdaterte toggle-tekst, dekorlinje og fargepalett til våruttrykk.
- Beholdt støtte for tidligere lagret temavalg, slik at eksisterende brukere migreres sømløst til vårtema.

### Testet
- `node --check app.js` kjørt uten feil.

### Oppdaterte filer
- `app.js`
- `index.html`
- `style.css`
- `CHANGELOG.md`

## 2026-04-04

### Endret
- Presiserte i UI at gammel modell i 2026 påvirker 2027 kun via beregnede feriepenger.
- Oppdaterte informasjonstekst i 2027-visningen for å forklare at koblingen går gjennom `fp27`, ikke direkte gjennom månedlig lønn i ny modell.

### Testet
- `node --check app.js` kjørt uten feil.

### Oppdaterte filer
- `app.js`
- `index.html`
- `CHANGELOG.md`

## 2026-04-03

### Endret
- La til påsketema med av/på-knapp i UI:
  - Eget fargetema med påskefarger for bakgrunn, kort, faner og infofelter.
  - Valg lagres i `localStorage` og gjenopprettes ved innlasting.
- Satt påsketema til standard `på` for nye brukere/sessioner uten lagret state.
- La til dekorlinje med påskeikoner og subtil animasjon.
- Dekorlinjen er nå robust på tvers av skjermstørrelser:
  - Bryter aldri til to linjer.
  - Klippes ved behov i stedet for å påvirke layout.
  - Fylles dynamisk basert på tilgjengelig bredde og oppdateres ved vindusstørrelse-endring.

### Oppdaterte filer
- `app.js`
- `index.html`
- `style.css`
- `CHANGELOG.md`

## 2026-04-02

### Endret
- Korrigerte utbetaling i gammel modell for juni (opptjening i mai), inkludert fastlønn:
  - Formelen håndterer nå juni-lønn som `månedslønn + feriepenger - 25 * ferietrekkDag`.
- Presiserte overgangsregelen for tillegg:
  - `tillegg` bortfaller fra og med mai 2026 (utbetales i juni), ikke fra juni-opptjening.
- Fjernet spesialmåned-markering i 2027-tabellen:
  - Ingen `★` i 2027 (spesialmåned gjelder kun 2026).
- Oppdatert hjelpetekst i UI:
  - Juni 2026 beskrives som spesiell pga. `1 mnd garantilønn på forskudd`, og teksten presiserer at dette ikke er en spesialmåned i 2027.
- KPI-kortene for 2026 viser nå også totalsummer `ekskl. feriepenger`:
  - La til en ekstra linje under både `Gammel modell` og `Ny modell`, slik at bruker enkelt kan sammenligne med/uten feriepenger.
- Avgrenset `Feriedager igjen 1. juni` til kun 2026:
  - Feltet påvirker ikke lenger beregningen av 2027-feriepenger.
  - 2027-feriepenger beregnes nå fra et nøytralt 2026-grunnlag uten denne justeringen.
- Oppdatert label i UI:
  - `Feriedager igjen 1. juni` → `Feriedager igjen 1. juni 2026`.

### Oppdaterte filer
- `app.js`
- `index.html`
- `CHANGELOG.md`

## 2026-04-01

### Endret
- Forbedret input på fanen `Ferie & fravær` for mobil:
  - Fraværsfeltene bruker nå `onchange` i stedet for `oninput`, slik at felt ikke mister fokus når man skriver flersifrede tall.
  - Numeriske felt har fått `inputmode="numeric"` (og `pattern="[0-9]*"`) for å trigge talltastatur på mobil.
- Fraværsregistrering er nå begrenset per måned:
  - `ferie + syk + uten oppdrag` kan ikke overstige antall arbeidsdager.
  - Dynamisk `max` per felt beregnes ut fra de andre feltene i samme måned.
  - Verdier clampes også ved innlasting av lagret state.
- Fraværstabellen har fått kolonnehandlinger og bedre header-oppsett:
  - `nullstill`-lenke for hver av kolonnene `Feriedager`, `Syk/sykt barn/permisjon` og `Dager uten oppdrag`.
  - Lange kolonneoverskrifter kan brytes over flere linjer.
  - Overskrift og `nullstill` er sentrert over kolonnen uansett skjermbredde.
- La til nytt inputfelt for `G pr 1.5.26` i UI, med `136000` som standard.
- Månedlig garantilønn beregnes nå live i appen og vises i eget felt (ikke manuelt input):
  - `6G / 12 × stillingsprosent × tilvalgsfaktor`
- Garantidagsats og sykekompensasjon beregnes nå fra samme grunnlag:
  - `6G / 260 × stillingsprosent × tilvalgsfaktor`
- Garantigulv ved ledighet styres av tilvalg:
  - standard = `1.0`
  - `+2 %` = `0.5`
  - `+4 %` = `0`
- Fri/ferie-logikk er justert slik at kun `ferie` reduserer månedlig garanti.
- `Dager uten fakturering` er tydeliggjort i UI som `Dager uten oppdrag`.

### Presisering av regler
- Sykdom reduserer ikke månedlig garantilønn direkte.
- Dager uten oppdrag behandles ikke som fri/ferie i garantitrekket.
- Ved kombinasjon av `syk + uten oppdrag` begrenses ny modell til maks månedlig garanti.

### Testet
- `node --check app.js` kjørt uten feil.
- Kjørt manuelle simuleringer for scenarioer med:
  - full fakturering
  - kun uten oppdrag
  - kun ferie
  - kun sykdom
  - kombinasjoner av ferie, sykdom og uten oppdrag

### Oppdaterte filer
- `app.js`
- `index.html`
- `style.css`
- `CHANGELOG.md`

## 2026-03-31

### Endret
- La til disclaimer og oppdaterte antagelser i lønnsmodellen.
- Tydeliggjorde tekst i fanen for ferie og fravær (at input er dager).
- Justerte mobilvisning for å skjule garantilønn-kolonne.
- La til lagring i `localStorage` slik at input beholdes ved refresh.
- La til forklaring for tilvalg `8,5G`.
- Oppdaterte `README.md`.

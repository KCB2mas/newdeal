# Changelog

## [Unreleased]

### Verifisert
- Gått gjennom modellen opp mot avklart logikk:
  - sykdom skal ikke redusere månedlig garantilønn
  - feriedager og dager uten oppdrag skal redusere garantilønn
  - sykekompensasjon skal være additiv
  - tilvalg for ledighet skal påvirke garantigulvet
  - stillingsprosent skal skalere månedlig garantilønn

### Rettet
- Korrigert grunnlaget for ikke-betalingsdager i `app.js` slik at reduksjon i garantilønn nå baseres på:
  - `ferie + uten`
  i stedet for:
  - `ferie + syk`

- Rettet for lav utbetaling i scenarier med sykdom ved å sikre at sykedager ikke lenger reduserer garantilønn.

### Endret
- Månedlig garantilønn skaleres nå med stillingsprosent.
- Garantigulvet oppdateres nå korrekt i tråd med valgte tilvalg:
  - standard = 100 %
  - `+2 %`-tilvalg = 50 %
  - `+4 %`-tilvalg = 0 %
- Sykekompensasjon forblir additiv og separat fra garantigulvet.
- Logikken er nå konsistent på tvers av kombinasjoner av:
  - sykdom
  - ferie
  - dager uten oppdrag
  - redusert stillingsprosent

### Testet
- Bekreftet at oppdatert kode kjører uten syntaksfeil.
- Kontrollert scenarier med:
  - kun sykdom
  - kun dager uten oppdrag
  - kombinasjon av sykdom og dager uten oppdrag
  - redusert stillingsprosent med ulike garanti-tilvalg

### Oppdaterte filer
- `app.js`
- `index.html`
- `style.css`

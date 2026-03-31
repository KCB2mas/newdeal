# Changelog

## [Unreleased]

### Endret
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
- `CHANGELOG.md`

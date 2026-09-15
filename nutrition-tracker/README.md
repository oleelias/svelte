# 🥗 NutriLogg

En enkel kostholds-app: fortell den hva du spiste, så loggfører den kaloriene og
makronæringsstoffene for deg. Bygget med Svelte 5 + Vite.

## Funksjoner

- **Loggfør mat med naturlig tekst** – skriv f.eks. «2 egg og en skive brød»,
  og appen tolker mengde og matvare via en innebygd næringsdatabase over
  vanlige matvarer. Ukjente matvarer kan du fylle inn manuelt, og appen husker
  dem til neste gang.
- **Dagsoversikt** – se kalorier, protein, karbohydrater og fett i dag, med
  fremdriftsbarer mot dine mål.
- **Egne mål** – still inn dine egne daglige mål for kalorier, protein,
  karbohydrater og fett når som helst under «Mål».
- **Historikk** – se tidligere dager du har logget.
- **Påminnelser** – legg til påminnelser for supplementer og kreatin, med eget
  klokkeslett per påminnelse. Viser nettleservarsler (og en påminnelse i
  appen) når tiden er inne, mens fanen er åpen.

All data lagres lokalt i nettleseren (`localStorage`) – det finnes ingen
backend eller konto.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne lenken som vises i terminalen (som regel http://localhost:5173).

### Bygg for produksjon

```bash
npm run build
npm run preview
```

## Merknad om påminnelser

Påminnelser bruker nettleserens `Notification`-API og en enkel intervalljekk
mens siden er åpen i en fane. De vil derfor ikke varsle deg dersom fanen/
appen er helt lukket – det krever en service worker med push-varsler og en
backend, noe denne enkle, lokale appen ikke har.

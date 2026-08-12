# Frostpunk-style

Prototip jucabil pentru un survival city-builder cooperativ într-o lume
înghețată: hub central cu Generator, clădiri plasabile, resurse care
curg în timp, și expediții spre 9 zone din jur.

## Ce face prototipul

- Hub central ("harta principală"), cu **Generator** la mijloc și rază
  de căldură vizibilă.
- 5 clădiri plasabile (mină de cărbune, gater, adăpost, atelier, casă
  familială) — click în meniul de jos, apoi click pe hartă lângă
  generator. Se construiesc vizibil (progres), apoi produc resurse pe
  tură.
- Simulare reală: ziua/ora, temperatura, cărbune/lemn — tick la ~2s.
  Ciclul zi/noapte al hărții e legat de ceasul real al simulării.
- Celelalte 9 zone sunt clickabile → panou de expediție (cost lemn,
  recompensă cărbune/lemn după câteva ture).
- Cameră liberă: pan + zoom (WASD/săgeți, click+drag, scroll pe PC;
  drag + pinch pe telefon), fullscreen, HUD minimal.
- Harta și toate clădirile sunt **artă vectorială desenată în cod**
  (`src/world/art/`, `src/game/art/`) — nu poze, deci nicio dependență
  de imagini externe, nicio problemă de încărcare, și claritate perfectă
  la orice nivel de zoom. Toate zonele împart aceeași paletă și aceeași
  sursă de lumină (jarul generatorului), ca lumea să pară un întreg, nu
  bucăți puse cap la cap.

## Structură

```
src/
  world/
    config/worldConfig.js     # zonele lumii, hub-ul principal, poziția generatorului
    hooks/useWorldCamera.js   # motorul camerei: pan/zoom/inerție/clamp/tap-detection
    hooks/useFullscreen.js
    art/
      HubMap.jsx              # arta vectorială a hub-ului central (crater, munți, drumuri)
      ZoneArt.jsx             # arta vectorială a celor 9 zone exterioare
    components/
      WorldMap.jsx            # compune totul: teren + joc + UI
      TerrainTile.jsx         # randează arta zonei potrivite pentru fiecare tile
      ZoneSeams.jsx           # ceață pe marginile comune dintre zone
      FrontierFog.jsx         # ceață radială peste frontieră, centrată pe hub
      Hud.jsx / FullscreenButton.jsx / SnowOverlay.jsx
  game/
    state/gameStore.js         # store extern minimal (resurse, timp, clădiri, expediții)
    logic/simulation.js        # tick-ul jocului, plasare clădiri, expediții
    config/buildings.js        # tipurile de clădiri (cost/producție)
    art/BuildingArt.jsx        # arta vectorială a celor 6 clădiri
    components/                # Generator, BuildingLayer, Smoke, ResourceBar, BuildMenu, ExpeditionPanel
  App.jsx
```

## Rulare locală

```bash
npm install
npm run dev
```

## Build & deploy pe Vercel

```bash
npm run build   # -> dist/
```

Proiectul are `vercel.json` (framework Vite, `npm run build`, output
`dist`) — pe [vercel.com](https://vercel.com) alegi "Import Project",
conectezi acest repo, și Vercel detectează automat totul.

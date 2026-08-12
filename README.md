# Frostpunk-style

Prototip jucabil pentru un survival city-builder cooperativ într-o lume
înghețată: hub central cu Generator, clădiri plasabile, resurse care
curg în timp, și expediții spre 9 zone din jur.

## Ce face prototipul

- Hub central ("harta principală") de 4000×4000 unități, cu **Generator**
  la mijloc și rază de căldură vizibilă.
- 4 clădiri plasabile (mină de cărbune, gater, cort, atelier) — click în
  meniul de jos, apoi click pe hartă lângă generator. Se construiesc
  vizibil (progres), apoi produc resurse pe tură.
- Simulare reală: ziua/ora, temperatura, cărbune/lemn — tick la ~2s.
- Celelalte 9 zone sunt clickabile → panou de expediție (cost lemn,
  recompensă cărbune/lemn după câteva ture).
- Cameră liberă: pan + zoom (WASD/săgeți, click+drag, scroll pe PC;
  drag + pinch pe telefon), fullscreen, HUD minimal.
- Harta principală se randează ca **piramidă de tile-uri** (tehnica de
  la Google Maps), nu ca o singură poză întinsă — vezi `DEEP_ZOOM.md`
  pentru cum aducem o imagine unică, de rezoluție mare, în loc de
  placeholder-ul curent.

## Structură

```
src/
  world/
    config/worldConfig.js     # zonele lumii, hub-ul principal, poziția generatorului
    hooks/useWorldCamera.js   # motorul camerei: pan/zoom/inerție/clamp/tap-detection
    hooks/useFullscreen.js
    components/
      WorldMap.jsx            # compune totul: teren + joc + UI
      DeepZoomLayer.jsx        # piramidă de tile-uri pentru hub-ul principal
      TerrainTile.jsx         # tile plat pentru cele 9 zone exterioare
      ZoneSeams.jsx           # ceață pe marginile comune dintre zone
      Hud.jsx / FullscreenButton.jsx
  game/
    state/gameStore.js         # store extern minimal (resurse, timp, clădiri, expediții)
    logic/simulation.js        # tick-ul jocului, plasare clădiri, expediții
    config/buildings.js        # tipurile de clădiri (cost/producție)
    components/                # Generator, BuildingLayer, ResourceBar, BuildMenu, ExpeditionPanel
  App.jsx
scripts/
  generate_deep_zoom.py       # taie o imagine mare în piramidă de tile-uri
```

## Imaginile de teren

Cele 9 zone exterioare sunt în `public/tiles/` — vezi `public/tiles/
README.md`. Harta principală e în `public/deep-map/` (piramidă de
tile-uri) — vezi `DEEP_ZOOM.md` pentru cum o înlocuim cu o imagine unică
de calitate.

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

# Frostpunk-style — Prototip de lume

Prototip vizual/tehnic pentru un survival city-builder cooperativ
într-o lume înghețată. **Nu conține încă mecanici de joc** — doar
fundația: o hartă mare, explorabilă, cu cameră liberă, gata de extins.

## Ce face prototipul

- Lume de 10.000 × 4.000 unități, formată din 10 zone/tile-uri (2000×2000
  fiecare) aranjate într-o grilă 5×2 continuă.
- Cameră liberă: pan + zoom, cu limite la marginea lumii.
- Controale PC: `WASD`/săgeți, click+drag, scroll pentru zoom.
- Controale telefon: drag cu un deget, pinch-to-zoom.
- Buton fullscreen (colț dreapta-sus).
- HUD minimal (colț stânga-jos): nivel de zoom + poziție aproximativă
  ("sector") a camerei.
- Atmosferă rece: vinietă, ceață discretă, tranziții line între zone.

## Structură

```
src/
  world/
    config/worldConfig.js     # grila de zone, dimensiuni, limite de zoom
    hooks/useWorldCamera.js   # motorul camerei: pan/zoom/inerție/clamp
    hooks/useFullscreen.js
    components/
      WorldMap.jsx            # viewport + lumea transformată + atmosferă
      TerrainTile.jsx         # un tile de teren (+ fallback dacă lipsește imaginea)
      Hud.jsx
      FullscreenButton.jsx
  App.jsx
```

Codul e organizat modular special ca peste el să se poată adăuga ulterior,
fără să se rescrie fundația: clădiri, personaje, resurse, vreme,
evenimente, AI, multiplayer, UI, salvare.

## Imaginile de teren

Sunt deja în `public/tiles/` (`01.jpg` … `10.jpg`, aduse din Drive și
optimizate pentru web — vezi `public/tiles/README.md` pentru mapare).
Dacă vreun fișier lipsește, zona respectivă revine automat la un
placeholder colorat cu numele ei, ca harta să rămână navigabilă oricum.

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

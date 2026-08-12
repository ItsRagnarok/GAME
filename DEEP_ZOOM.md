# Harta principală ca hartă unică (deep zoom)

Hub-ul central ("01 – teren înghețat principal") e randat ca o piramidă
de tile-uri (exact tehnica de la Google Maps: la orice nivel de zoom,
browserul încarcă doar bucăți mici de 256×256px, la rezoluția potrivită),
nu ca o singură imagine `<img>` întinsă pe hartă.

Sursa: `assets/source-maps/harta_upscaled_x4.jpg` (6144×4096px, o singură
scenă continuă). Piramida generată din ea e în `public/deep-map/`, 6
niveluri de rezoluție, ~7MB total.

## Cum regenerezi piramida

Dacă înlocuiești sursa cu o imagine nouă (rezoluție mai mare, altă
scenă etc.):

```bash
python3 scripts/generate_deep_zoom.py <imaginea_ta.jpg> public/deep-map
```

Dacă noua imagine are alt raport de aspect decât 3:2 (6144:4096),
actualizează și constanta `MAIN_HEIGHT` din
`src/world/config/worldConfig.js` (calculată din raportul lățime/înălțime
al sursei, ca imaginea să nu fie întinsă/deformată).

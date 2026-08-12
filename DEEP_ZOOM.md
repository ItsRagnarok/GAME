# Harta principală ca hartă unică (deep zoom)

Hub-ul central ("01 – teren înghețat principal") nu mai e o singură
imagine `<img>` întinsă pe hartă — e randat ca o piramidă de tile-uri
(exact tehnica de la Google Maps: la orice nivel de zoom, browserul
încarcă doar bucăți mici de 256×256px, la rezoluția potrivită, deci
harta rămâne clară oricât dai zoom, în loc să se întindă blurat o
singură poză).

Mecanismul e deja funcțional și testat (`src/world/components/
DeepZoomLayer.jsx` + `scripts/generate_deep_zoom.py`), dar deocamdată
rulează pe o sursă placeholder mică (`public/tiles/01.jpg`, 1536×1024px)
— de-asta la zoom mare terenul se vede în continuare pixelat, deși
generatorul și clădirile (desenate direct, nu poze) rămân clare.

## Ce am nevoie de la tine

**O singură imagine**, cât mai mare posibil:

- **Minimum 4096×4096px, ideal 8192×8192px sau mai mare** — cu cât mai
  mare, cu atât rămâne mai clară la zoom mare.
- **O singură scenă continuă**, fără nicio tăietură/îmbinare vizibilă —
  teren înghețat văzut de sus/isometric, în stilul celorlalte imagini
  deja generate (munți, gheață crăpată, zăpadă), fără text/watermark.
- Format `.png` sau `.jpg`.

## Cum mi-o trimiți

Atașeaz-o direct în conversație, sau pune-o pe Drive/link și spune-mi.

## Ce fac eu cu ea

```bash
python3 scripts/generate_deep_zoom.py <imaginea_ta.png> public/deep-map
```

Scriptul o taie automat în piramida de tile-uri (peste cea placeholder
existentă) — nu mai trebuie schimbat nimic altceva în cod, sistemul e
deja conectat.

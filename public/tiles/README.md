# Imagini de teren

Harta principală nu mai are un `01.jpg` aici — se randează ca piramidă
de tile-uri din `public/deep-map/`, generată din
`assets/source-maps/harta_upscaled_x4.jpg` (vezi `DEEP_ZOOM.md` în
rădăcina repo-ului).

Celelalte 9 zone folosesc câte o imagine plată, ca înainte:

| Fișier   | Zonă                             |
| -------- | --------------------------------- |
| `02.jpg` | Pădure înghețată                  |
| `03.jpg` | Zonă montană                      |
| `04.jpg` | Lac înghețat                      |
| `05.jpg` | Râu înghețat                      |
| `06.jpg` | Crater uriaș                      |
| `07.jpg` | Zonă industrială abandonată       |
| `08.jpg` | Ruinele unui oraș vechi           |
| `09.jpg` | Ghețar                            |
| `10.jpg` | Zonă vulcanică înghețată          |

Dacă înlocuiești vreo imagine dintre acestea, păstrează numele
(`02.jpg` … `10.jpg`) sau actualizează câmpul `file` din
`src/world/config/worldConfig.js`. Dacă un fișier lipsește temporar,
zona respectivă revine automat la un placeholder colorat cu numele ei,
ca harta să rămână navigabilă.

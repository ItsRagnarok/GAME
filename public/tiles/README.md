# Imagini de teren

`01.jpg` nu mai e folosit direct pe hartă — hub-ul principal se randează
acum ca piramidă de tile-uri din `public/deep-map/` (vezi rădăcina
repo-ului: `DEEP_ZOOM.md`). Fișierul a rămas doar ca sursă placeholder
pentru acea piramidă.

Celelalte 9 zone încă folosesc câte o imagine plată, ca înainte:

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

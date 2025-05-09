# 🐍 Super Mato – Matopeli

**Harjoitustyö, Web-sovellusten perusteet — Oulun ammattikorkeakoulu, kevät 2025**

---

## 📌 Kuvaus

**Super Mato** on selainpohjainen matopeli, joka on toteutettu HTML:n, CSS:n ja JavaScriptin avulla. Pelaaja ohjaa matoa nuolinäppäimillä, kerää pisteitä syömällä hedelmiä ja väistelee esteitä. Peli sisältää kolme vaikeustasoa, bonusherkkuja, esteitä sekä ääniä, ja tallentaa ennätyspisteet nimellä paikallisesti selaimen `localStorageen`.

---

## 🎯 Projektin tavoite

Projektin tarkoituksena on demonstroida web-sovelluksen rakentamista käyttäen seuraavia ominaisuuksia:

- Responsiivinen käyttöliittymä
- Sivunavigointi (useita HTML-sivuja)
- JavaScript-pohjainen sovelluslogiikka
- localStorage-pohjainen tallennus
- Pelillisyys ja ääniefektit
- Git-versionhallinta ja GitHub-julkaisu

---

## 📂 Rakenne

| Tiedosto              | Kuvaus                                            |
|-----------------------|---------------------------------------------------|
| `index.html`          | Etusivu: nimensyöttö ja vaikeustason valinta      |
| `game.html`           | Pelikenttä (canvas), matopeli                     |
| `highscores.html`     | Tulostaulu: parhaat pelaajat                      |
| `style.css`           | Ulkoasu ja responsiivinen asettelu                |
| `snake.js`            | Pelilogiikka, liike, törmäykset, äänet            |
| `storage.js`          | Ennätysten tallennus ja lataus                    |
| `sounds/`             | Kansiosta löytyvät ääniä: syönti, bonus, peli ohi |
| `README.md`           | Tämä tiedosto                                     |

---

## 🎮 Ohjeet pelaamiseen

1. Avaa `index.html` selaimessa tai käytä [Live Serveria](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Codessa
2. Syötä oma nimesi ja valitse vaikeustaso
3. Pelaa ohjaamalla matoa nuolinäppäimillä:
   - 🍏 Vihreä omena = +1 piste
   - 🌟 Kultainen tähti (bonus) = +5 pistettä (näkyy ajoittain)
   - 🧱 Harmaa este = vältä törmäämästä
4. Peli päättyy, jos mato törmää itseensä, seinään tai esteeseen
5. Pelin lopuksi pisteesi tallennetaan nimelläsi tulostauluun

---

## 🔈 Ääniefektit

- **eat.mp3** – Normaali omena
- **bonus.mp3** – Bonusherkku
- **gameover.mp3** – Peli ohi

Huom: varmista, että selaimesi sallii äänten toiston ja että `sounds/`-kansio on mukana projektissa.

---

## 💾 localStorage

Ennätystiedot tallennetaan selaimen `localStorage`:iin seuraavasti:

```json
[
  { "name": "Mikko", "score": 22 },
  { "name": "Anna", "score": 17 }
]


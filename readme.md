# De Sleutels van de Melkweg - Deel I: Grogu en de drie sleutels

Dit project levert een webframework om een kinderboek digitaal te publiceren met een cover en tien volledig uitgeschreven hoofdstukken. Elke scène krijgt een dynamische SVG-illustratie, zodat je later definitieve kunst kunt toevoegen zonder code te herschrijven.

## Features

- **Elf scènes**: een cover en tien opeenvolgende hoofdstukken met een ingebouwde inhoudsopgave.
- **Dynamische illustraties**: lichte SVG-placeholders worden in JavaScript gegenereerd totdat het definitieve beeldmateriaal klaarstaat.
- **Responsieve opmaak**: geschikt voor desktop, tablet en mobiel met een vaste navigatiekolom en comfortabele leestegel.
- **Voortgangsindicator**: een voortgangsbalk en vorige/volgende-knoppen helpen lezers eenvoudig verder te gaan waar ze gebleven waren.

## Aan de slag

Open `index.html` in je browser om het demoboek te verkennen. Gebruik de knop **Open het boek** of kies een hoofdstuk in de inhoudsopgave om direct naar dat deel te springen.

## Verhaal aanpassen

1. Bewerk `story.txt` met je eigen hoofdstukken. Houd voor elk hoofdstuk de kopregel `Hoofdstuk X – Titel` aan en scheid alinea’s met een lege regel.
2. Werk de `coverEntry`-paragrafen in `script.js` bij om de covertekst van jouw uitgave te tonen.
3. Voeg eigen illustraties toe door het meegeleverde `artwork.sample.json` te kopiëren naar `artwork.json` en per cover of hoofdstuk een afbeelding te definiëren (zie hieronder voor details).
4. Stem typografie, kleuren en layout in `styles.css` af op jouw huisstijl of de sfeer van het boek.

### Eigen afbeeldingen gebruiken

1. Plaats je afbeeldingen in de map `images/` (bijvoorbeeld `images/hoofdstuk-1.jpg`).
2. Kopieer `artwork.sample.json` naar `artwork.json` en pas de paden en alt-teksten aan. Een minimale configuratie ziet er als volgt uit:

   ```json
   {
     "cover": {
       "src": "images/cover.jpg",
       "alt": "Coverillustratie van jouw verhaal"
     },
     "chapters": {
       "1": {
         "src": "images/hoofdstuk-1.jpg",
         "alt": "Scènebeeld voor hoofdstuk 1"
       }
     }
   }
   ```

3. Laat velden weg of verwijder hoofdstukken waarvoor je (nog) geen beeld hebt; het framework gebruikt dan automatisch de zachte SVG-placeholders.
4. Wijzigingen aan `artwork.json` worden tijdens het laden opgepikt; een ontbrekend bestand resulteert automatisch in de standaardillustraties.

### Stap-voor-stap: afbeeldingen uploaden en koppelen

1. **Bestanden verzamelen** – exporteer je illustraties als `.jpg`, `.png` of `.webp` met een duidelijke naam (bijvoorbeeld `cover-grogu.png`).
2. **Map openen** – navigeer in je bestandsbeheerder of terminal naar de projectmap en vervolgens naar de submap `images/`.
3. **Afbeeldingen plaatsen** – kopieer of sleep je bestanden naar `images/`. Controleer dat de bestandsnamen exact overeenkomen met wat je straks in het manifest invult (hoofdletters tellen mee).
4. **Manifest aanmaken** – kopieer `artwork.sample.json` naar `artwork.json` (bijvoorbeeld met `cp artwork.sample.json artwork.json`). Het project leest alleen `artwork.json` in.
5. **Paden invullen** – open `artwork.json` in een teksteditor en vul per cover of hoofdstuk het juiste pad in, bijvoorbeeld `"1": { "src": "images/hoofdstuk-1.jpg", "alt": "Grogu onderzoekt de tuin" }`. Gebruik alleen forward slashes (`/`).
6. **Bestand opslaan** – sla `artwork.json` op. Laat hoofdstukken weg waarvoor je (nog) geen illustratie hebt; de standaard-SVG blijft dan actief.
7. **Pagina vernieuwen** – open `index.html` opnieuw in je browser of ververs de pagina. De reader haalt het manifest op en toont direct je nieuwe afbeeldingen.
8. **Veelvoorkomende fouten oplossen** – zie je nog steeds de SVG-placeholder? Controleer of de bestandsnaam klopt, het bestand daadwerkelijk in `images/` staat en er geen tikfout in het JSON-pad zit. Bekijk de browserconsole voor eventuele foutmeldingen over ontbrekende bestanden.

## Licentie

Dit project is bedoeld voor prototyping en demonstratie. Pas het gerust aan om je eigen kinderboek tot leven te brengen.

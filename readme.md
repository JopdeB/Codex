# De Sleutels van Balans - Interactief Kinderboek

Dit project levert een webframework om een kinderboek digitaal te publiceren met een cover en tien volledig uitgeschreven hoofdstukken. Elke scène krijgt een dynamische SVG-illustratie, zodat je later definitieve kunst kunt toevoegen zonder code te herschrijven.

## Features

- **Elf scènes**: een cover en tien opeenvolgende hoofdstukken met een ingebouwde inhoudsopgave.
- **Dynamische illustraties**: lichte SVG-placeholders worden in JavaScript gegenereerd totdat het definitieve beeldmateriaal klaarstaat.
- **Responsieve opmaak**: geschikt voor desktop, tablet en mobiel met een vaste navigatiekolom en comfortabele leestegel.
- **Voortgangsindicator**: een voortgangsbalk en vorige/volgende-knoppen helpen lezers eenvoudig verder te gaan waar ze gebleven waren.

## Aan de slag

Open `index.html` in je browser om het demoboek te verkennen. Gebruik de knop **Open het boek** of kies een hoofdstuk in de inhoudsopgave om direct naar dat deel te springen.

## Verhaal aanpassen

1. Pas de `story`-array in `script.js` aan met je eigen manuscripttekst. Elke entry gebruikt een `title`, `subtitle` en een array van alineateksten in `description`.
2. Vervang de gegenereerde SVG-placeholders door definitieve illustraties door de `illustration`-eigenschap na de `story`-array bij te werken.
3. Stem typografie, kleuren en layout in `styles.css` af op jouw huisstijl of de sfeer van het boek.

## Licentie

Dit project is bedoeld voor prototyping en demonstratie. Pas het gerust aan om je eigen kinderboek tot leven te brengen.

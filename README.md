# Gebruikershandleiding automatisch toevoegen medewerkers aan SuccessFactors via Playwright

## [Inleiding]()

Bij het ketentesten van de systemen van de Maastricht University loopt men tegen het feit aan dat men handmatig medewerkers dient toe te voegen aan de SuccessFactors systeem. Daarvoor is per in te voeren medewerker ongeveer 10 minuten voor nodig. Dat duurt te lang en is men weer een hele tijd verder voordat men de ingevoerde gegevens pas kan gaan controleren. Los van het feit dat er bij het handmatig invoeren de kans op fouten te maken heel groot is.

Dit tijdsverschillen willen we gaan reduceren middels het uitvoeren van zogenaamde scripts, die het werk voor ons een stuk makkelijker maken.

Omdat SuccessFactors een webapplicatie is, is er voor gekozen om gebruik te maken van Playwright als script tool en typescript als code taal. Playwright heeft als
grote voordelen dat het snel is, platform onafhankelijk is en met meerdere programmeer talen (C#, Python, typescript, Java en javascript) overweg kan. In onze opzet is gekozen voor typescript als code taal.

## [Benodigdheden]()

### [Toegang]()

Voor het automatisch uitvoeren van de scripts voor het toevoegen van medewerkers van de Maastricht University dient men als reeds aanwezige gebruiker toegang te hebben tot SuccessFactors en bovendien ook de rechten te hebben om nieuwe medewerkers te kunnen toevoegen aan het systeem.

### [Software]()

Er zijn een aantal pakketten nodig om alles automatisch te laten uitvoeren.

### [Node.js]()

Voor het werken met typescript is het nodig om op de laptop Node.js geïnstalleerd te hebben.

Node.js is een gratis, open-source, platformonafhankelijke JavaScript-runtimeomgeving waarmee
ontwikkelaars servers, web-apps, opdrachtregeltools en scripts kunnen maken.

Node.js kan hier gedownload worden: [https://nodejs.org/en/download](https://nodejs.org/en/download). Voor verdere installatie kan deze pagina
geraadpleegd worden: [https://www.geeksforgeeks.org/installation-guide/install-node-js-on-windows/](https://www.geeksforgeeks.org/installation-guide/install-node-js-on-windows/).

### [Visual Studio Code]()

Om de script code makkelijker te kunnen schrijven en aanpassen kan er gebruik gemaakt worden van de IDE editor Visual Studio Code. Deze editor kan gedownload worden via: [https://code.visualstudio.com/download](https://code.visualstudio.com/download). Installeer vervolgens het programma middels de
volgende stappen:

1. Open de browser en ga naar [https://code.visualstudio.com/download](https://code.visualstudio.com/download).
2. Druk op Window Windows 10, 11
3. Nadat het bestand gedownload is, kan het gestart worden. Het is te vinden in de download directory
4. Klik op ‘accept the agreement’
5. Klik op ‘Next’
6. In het volgende scherm kan de directory waar Visual Studio Code geïnstalleerd wordt eventueel aangepast worden
7. Klik op ‘Next’
8. Klik op ‘Next’
9. In het Select Additional Tasks deel kan een keuze gemaakt worden wat men eventueel wil
10. Klik op ‘Next’
11. Klik op ‘Install’
12. Klik op ‘Finish’

Visual Studio Code wordt automatisch gestart.

Wellicht kan deze link nog extra hulp bieden voor de installatie van Visual Studio Code: [https://www.youtube.com/watch?v=cu_ykIfBprI&amp;ab_channel=ProgrammingKnowledge](https://www.youtube.com/watch?v=cu_ykIfBprI&ab_channel=ProgrammingKnowledge)

### [Playwright]()

Playwright browseronafhankelijke tool die heden ten dage gebruikt wordt bij het testen van webapplicaties. Omdat Playwright heel goed overweg kan met webapplicaties en de Maastricht University gebruik maakt van vele webapplicatie, waaronder SuccessFactors, is besloten om voor het toevoegen van medewerkers voor de ketentesten ook gebruik te maken van Playwright.

Buiten het feit dat Playwright browser onafhankelijk is, is Playwrigth ook taalonafhankelijk. Zo kan men gebruik maken van de volgende script talen binnen Playwright:

1. Python
2. Javascript
3. Typescripts
4. .NET
5. Java

Voor de doeleinden van dit project (het automatisch toevoegen van medewerkers via SuccessFactors) wordt van Typescript gebruik gemaakt.

Playwright is een van de tools die de mogelijkheid heeft om de handelingen die verricht worden als script op te nemen middels de codegenerator. Deze opgenomen code kan dan vervolgens weer gebruikt worden voor het maken van de scripts.

#### Installatie

Nadat node.js op de betreffende machine is geïnstalleerd kan ook Playwrigt geïnstalleerd worden.

Deze installatie kan op 2 manieren:

1. Via de command prompt
2. Middels Visual Studio Code

##### Via de command prompt

Voer de volgende stappen uit

1. Open Visual Studio Code
2. Selecteer een directory of maak er een aan van waaruit gewerkt dient te worden
3. Open, indien nodig, de terminal
4. Type het volgende commando in: npm init playwright@latest
5. Druk vervolgens 4x op Enter

Alle benodigdheden worden geïnstalleerd en Playwright is klaar voor gebruik.

##### Middels Visual Studio Code

1. Druk op de Extentions icoon in het menu aan te linker kant van de applicatie
2. Type in de zoekbalk Playwright in
3. Selecteer vervolgens: Playwright Test for VSCode
4. Druk op Install en wacht totdat alles geïnstalleerd is
5. Druk op View in de menubalk bovenaan
6. Druk vervolgens op Command Palette…
7. Er verschijnt een zoekbalk
8. Type hier in: Install Playwright
9. Laat alles staan zoals het is en druk op OK

Alle benodigdheden worden geïnstalleerd en Playwright is klaar voor gebruik.

Voor het uitvoeren van onze zaken hebben we echter nog een aantal zaken te installeren via de command prompt (terminal). Type hier vervolgens de volgende regels in en sluit elke regel af met de Enter toets

```
npm install @dotenvx/dotenvx --save
npm install @types/convert-excel-to-json --save
npm install allure-playwright --save 
npm install base64-string --save
npm install ts-node --save
npm install typescript --save
npm install xlsx --save
npm install exceljs --save
npm install tsx --save
```

Indien het package.json bestand beschikbaar is en de modules zijn nog niet geïnstalleerd, dan kan men met het volgende commando zorgen dat alle benodigde modules geïnstalleerd worden:

```
npm install
```

#### Configuratie

Voor de uitvoer van het toevoegen dienen nog een aantal zaken aangepast te worden.

In de tests directory staat een bestand met de naam example.spec.ts. Dit kan verwijderd worden. Dit geld eveneens voor de directory test-explamples. Die kan helemaal weg.

Open vervolgens het volgende bestand: playwright.config.ts. Voeg de volgende code toe op regel 10:

```
require('@dotenvx/dotenvx').config()
```

en tussen

```
exportdefaultdefineConfig({
```

en

```
  testDir:'./tests',
```

voeg daar het volgende tussen:

```
timeout:120000,
```

Dit zorgt ervoor dat het script lang genoeg te tijd krijgt om de elementen te kunnen vinden. SuccessFactors controleert namelijk tijdens de invoer een heleboel zaken en dat kan even duren.

Vervang:

```
  reporter: 'html',
```

door:

```
 reporter: [["line"], ['html'], ["allure-playwright"], ['json', {  outputFile: 'test-results.json' }],['junit', { outputFile: 'results.xml' }], ['blob', { outputFile: `./blob-report/report.zip` }]],
```

Als laatste
kunnen we het stuk

```
   {
      name: 'firefox',
      //use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },  
```

ofwel weghalen of op commentaar zetten (//)

We gaan de scripts alleen uitvoeren met Chrome.

#### Elementherkenning

Middels het volgende commando:

`npx playwright codegen`

is het mogelijk dat de stappen die in de browser uitgevoerd worden als code op te slaan. Heel handing als men niet goed weet hoe men de afzonderlijke elementen dient te herkennen en er zeker van wil zijn dat deze ook altijd goed herkend worden.

Een andere optie is om via de TEST EXPLORER ![title](old_scripts/testExplorer.png) de optie Record new te gebruiken. Middels deze optie worden alle stappen die men zet meteen in een bestand gezet voor verder gebruik.

Meer informatie hierover is te vinden op: [https://playwright.dev/docs/codegen](https://playwright.dev/docs/codegen).

## [Bestanden]()

Om alles goed te laten draaien wordt er gebruik gemaakt van verschillende bestanden die aan elkaar gekoppeld dienen te worden, met andere woorden: de bestanden moeten 'weten' waar een ander bestand de vinden is om daar gebruik van de maken. Daarvoor is het belangrijk dat er een correcte 'directory-structuur'aanwezig is.

Een voorbeeld:

In het bestand 'playwright.config.js' staat het volgende aangegeven:

```
testDir: './tests',
```

Hiermee wordt aangegeven dat de aangemaakte testscripts direct onder het playwright.config.ts bestand gevonden kunnen worden. Wanneer daar dus geen testscripts is staan of wellicht in een andere directory te vinden zijn, dan kunnen de testen niet uitgevoerd worden.

![title](old_scripts/directorystructuur.png)

Er worden tijdens het scriptproces gebruik gemaakt van verschillende bestanden. De belangrijkste worden hier genoemd en beschreven.

### [.env]()

Het .env bestand bevat alle variabelen die gebruikt worden tijdens de uitvoer van het script. Het bevat de volgende variabelen
met de juist waarde:

1. UPLOAD_DIRECTORY=
2. URL=
3. EXCEL_FILE=
4. JSON_PERSONS=
5. USERNAME_OMB=
6. USERNAME_PA=
7. USERNAME_HRA=
8. PASSWORD_OMB=
9. PASSWORD_PA=
10. PASSWORD_HRA=

De UPLOAD_DIRECTORY wordt gevuld met de directory naam waar de zogenaamde copy van het paspoort / identiteitsbewijs staat.

De URL dient gevuld te worden met de url die gestart dient te worden om de gegevens in te vullen. In dit geval wordt deze gevuld met: [https://performancemanager.successfactors.eu/sf/home?bplte_company=UniMaasQAS&amp;_s.crb=qzdhmG4wsMqzJ1xpqUvFvNUOxAex15%2f9KKEEfaC%2fVjI%3d](https://performancemanager.successfactors.eu/sf/home?bplte_company=UniMaasQAS&_s.crb=qzdhmG4wsMqzJ1xpqUvFvNUOxAex15%2f9KKEEfaC%2fVjI%3d).

EXCEL_FILE wordt gevuld met de directory en de bestandsnaam waar de gegevens van de toe te voegen medewerkers zijn ingevuld.

JSON_PERSONS wordt gevuld met de directory en de bestandsnaam waar de gegevens van de toe te voegen medewerkers gezet moeten worden voor het gebruiken van deze gegevens in Playwright. Playwright kan immers niet rechtstreeks de gegevens van een Excel bestand lezen en gebruiken. Dit dient eerst omgezet te worden naar een zogenaamd JSON-bestand.

Dan worden er drie gebruikers namen vermeld, die ieder een andere rol hebben binnen SuccessFactors: USERNAME_OMB (OM-beheerder, is voor het aanmaken van stoelen), USERNAME_PA (PersoneelsAssistent, voor het aanmaken van de medewerker) en USERNAME_HRA (HR adviseur, die zorgt voor de goedkeuring).

De laatste drie variabelen (PASSWORD_OMB, PASSWORD_PA en PASSWORD_HRA) dienen base64 gecodeerd
te zijn, anders kan er niet ingelogd worden.

### Excel workbook

In het Excel workbook staan alle gegevens die ingevoerd dienen te worden in de SuccessFactors applicatie.

In totaal bestaat dit workbook uit 58 kolommen. Deze kolommen vertegenwoordigen de veldnamen die gebruikt worden in het JSON-bestand.

Enkele opmerkingen over dit bestand:

1. De inhoud van iedere cel dient tekst te zijn, dus geen nummer of een datum. Om er voor te zorgen dat dit ook zo is, dient men bij een cel wat als nummer herkent wordt een formule in de cel te zetten. Deze formule bestaat dan uit:
   “=TEXT(`<nummer>`)”. Wanneer een datum gebruikt wordt, dient eveneens de TEXT functie bijgevoegd te worden: “=TEXT(NOW()-1;"ddmmjjjj")”.
   Het script kan namelijk niet goed omgaan met cijfers in het JSON bestand.
2. De vermelde email adressen dienen mogelijke email adressen te zijn. Dus geen speciale tekens in het email adres. SuccessFactors controleert bij het aanmaken van de workflow hierop.
3. De ingevoerde BSN’s dienen correcte nummers te zijn. SuccessFactors controleert op de juistheid hiervan.
4. Wanneer als functiegegevens_formatieplaats  Beheerder ICT (50003393) wordt geselecteerd dient er nog een personeelssubgebied toegevoegd te worden. Bij iedere andere functiegegevens_formatieplaats zal SuccessFactors zelf het personeelssubgebied selecteren en zal het script dit personeelsubgebied niet gaan selecteren.

### [ExcelToJSON]()

Dit script haalt de gegevens uit het Excel bestand en voegt de gegevens toe aan een JSON-bestand met de naam persons.json.

Indien dit bestand (persons.json) niet bestaan, dan wordt het aangemaakt. Wanneer het bestand reeds bestaat, dan wordt het overschreven.

Nadat dit bestand is aangemaakt kan dit bestand eventueel geopend worden en gecontroleerd worden op cijfers. Alle variabelen dienen namelijk met “ te beginnen en
met “ daar ook mee te eindigen.

### [.spec.ts]() bestanden

Dit is het bestand dat alle stappen uitvoert om een medewerker toe te voegen aan het SuccessFactors systeem.

Buiten dat wordt er aan het begin van het script een Excel bestand ingelezen en naar een JSON bestand geconverteerd. Deze conversie is noodzakelijk omdat typescript wel JSON bestanden kan lezen maar geen Excel bestanden. De data worden gebruikt om in SuccessFactors in te voeren.

Vervolgens wordt de browser opgestart en wordt er ingelogd op het systeem. Dit wordt slechts één keer gedaan. Daarna wordt er een lus gestart die zo vaak uitgevoerd wordt als dat er rijen ingevuld zijn in het Excel bestand.

Nadat de gegevens zijn ingevoerd, vindt er nog een controle plaats. Er wordt dan gekeken of de melding: ‘Voor deze actie is een workflow gemaakt.’ in de browser verschijnt. Op dit moment worden er geen verdere controles uitgevoerd, omdat SuccessFactors zelf al de controles heeft uitgevoerd omdat anders de melding: ‘Voor deze actie is een workflow aangemaakt.’ niet zou verschijnen. Er vindt bovendien ook nog een handmatige controle plaats op diverse plekken.

Op dit moment worden alleen de nieuwe medewerkers toegevoegd die bij de volgende functiegegevens__medewerkersgroep "Bezoldigd personeel (A)" behoren. Voor de medewerkerkers met functiegegevens__medewerkersgroep "Gastvrijheid ovk (B)" en functiegegevens__medewerkersgroep “Extern bedrijf (E)” zijn voor de betreffende test gebruiker die is ingelogd nog gaan rechten toegekend.

Ook worden de personen die reeds in het systeem zijn toegevoegd, te weten Boudewijn Brons en Helen Honing, niet meegenomen in de test run.

### [JSONtoExcel.spec.js]()

Dit bestand zorgt ervoor dat er van de testresultaten een overzicht gemaakt kan worden in een Excel bestand.

Eerst worden de testresultaten opgehaald, waarna vervolgens een Excel bestand aangemaakt wordt en gevuld wordt met de testresultaten. Hierbij worden de test naam, het test resultaat (passed of failed), de starttijd van het script en de tijdsduur van het uitvoeren per test script in milliseconden.

De totale tijd van de uitvoer van alle scripts kan minder zijn dan het totaal van alle scripts bij elkaar omdat er 6 scripts tegelijker tijd uitgevoerd worden. Het aantal 6
kan per laptop weer anders zijn.

### Uitvoer

Voor de uitvoeren van de scripts kan men twee commando’s uitvoeren om de command prompt:

```
node ExcelToJSON.js
```
of ```tsx ExceltoJSON.ts```

en vervolgens:

```
npx playwright test tests/<bestandsnaam>
.spec.ts
```

en als laatste, nadat het vorige scripts in zijn geheel is uitgevoerd:

```
node JSONtoExcel.js
```
of ```tsx JSONtoExcel.ts```

Een andere optie is om het volgende in te typen op de command prompt:

```
npm start
```

Deze actie voert de vorige beschreven commando’s achter elkaar uit, waarbij de conversies van en naar Excel de .js bestanden gebruikt worden. 

Nadat alle scripts zijn uitgevoerd wordt een Excel bestand gegenereerd waarin de resultaten per ingevoerde medewerker worden opgeslagen met de naam van het
scriptbestand, de naam van het script, of het script het beoogde resultaat heeft behaald of niet, de starttijd en het aantal milliseconden dat het uitvoeren van het script heeft geduurd.

## Opmerkingen
### toevoegen.ts
In dit bestand staat in regel 31: 

```	for (let teller = 18; teller < 19; teller++) {```

dat inhoudt dat de gegevens uit rij 20 genomen worden. 
Wanneer men een andere medewerker toe wil voegen uit de lijst van het Excel bestand dan dient men daar het nummer van het ID, vermeld in kolom A in te voeren -1. Min 1 is omdat er vanf 0 geteld wordt. Tevens dient men 

```teller < 19``` 

uiteraard ook aan te passen. Die is dan weer de waarde van de teller + 1. De hele for next lus wordt dan 1 keer uitgevoerd.
 
Wanneer men alle medewerkers uit het Excel workbook wil toevoegen dan kan men de code uit regel 31 als volgt aanpassen:

```for (let teller = 0; teller < personsList.length(); teller++) {```

### Opzet / structuur
De scripts zijn zodanig opgezet dat er in het uit te voeren script (toevoegen.ts bijvoorbeeld) eigenlijk alleen nog maar daadwerkelijke stappen gezet hoeven te worden, als die de gebruiker zou doen indien het hele proces handmatig zou moeten gebeuren. Dit maakt het geheel in stuk eenvoudiger en ook duidelijker om te lezen.

In de tests/Page directory staan per onderdeel (basisgegevens, persoonlijkegegevens, functiegegevens, logingegevens, doorvoer) staan verschillende bestanden die door het uit te voeren script aangeroepen kunnen worden. In deze bestanden staan per handeling de verschillende stappen.

Bijkomende voordelen zijn o.a.:

1. Stappen die bij elkaar horen staan bijelkaar
2. Stappen die herhaaldelijk uitgevoerd dienen te worden, zoals bijvoorbeeld het vullen van een tekst veld, worden iedere keer op dezelfde manier uitgevoerd.
3. Het maken van fouten wordt beperkt omdat het geheel van stappen reeds ergens staan en aangeroepen kan worden
4. De gebruikte bestanden nemen minder ruimte in beslag


### Uitvoer duur
Het playwright.config.ts bestand is zodanig geconfigureerd dat er bij ieder uitvoer van het script een zogenaamde trace en een vidoe bestand aangemaakt wordt. Dat neem nogal wat tijd in beslag. Voordeel hiervan is dat men precies kan zien hoe het proces verlopen is.

In het genoemde configuratie bestand staan deze waarden in regel 37 en 38:

```video: 'on', ```

```trace: 'on', ```

Om het hele proces wat sneller te laten verlopen zouden deze waarden als volgt aangepast kunnen worden:

```video: 'on-first-retry'```

```trace: 'on-first-retry'```
 
Hierbij worden de trace en video aangemaakt wanneer er iets mis gegaan is bij de uitvoer van het script.

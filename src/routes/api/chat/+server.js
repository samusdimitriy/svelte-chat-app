import OpenAI from "openai"

if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(dotenv => dotenv.config())
}

// FAQ встроен прямо в код (или можно использовать другой способ загрузки)
const faqContent = `
FAQ ImmoStay GmbH

Starbüro Kontakt:
Julia Wiebusch: +4930589149152
Email: kundenservice@starbuero.de


*Allgemeine Firmendaten*

Wer ist mein Notfallkontakt, wenn dem Kunden nicht weiter geholfen werden kann?
 
 - 1. Ansprechpartner: Daniel Ruf (Kundenservice)
    - Erreichbarkeit: Mo-So. 08:00-20:00 Uhr
    - Mobil: +49 1734 555500 oder +49 15117846176
 
 - 2. Ansprechpartner: Galina Burrow (Kundenservice)
    - Erreichbarkeit: Mo-So. 08:00-20:00 Uhr
    - Mobil: +49 1638368899
  
- 3. Ansprechpartner: Andreas Minaev (Geschäftsführer)
    - Erreichbarkeit: Mo-Fr. 08:00-17:00 Uhr
 
 - 4. Ansprechpartner: Vitali Pinezski (Geschäftsführer)
    - Erreichbarkeit: Mo-Fr. 08:00-17:00 Uhr

* Notfälle bei denen sofort durchstellen sollte?*

Anweisung: Notfälle zur sofortigen Weiterleitung an: 

1. Daniel Ruf (Kundenservice) +49 15117846176
2. Galina Burrow (Kundenservice) +49 1638368899
3. Andreas Minaev (Geschäftsleiter) +4917634087673
4. Vitali Pinezski (Geschäftsleiter 2) +4917626366578

Notfallsituationen:

1. Schlüssel nicht in der Schlüsselbox.
2. Kunde will sofort verbunden werden (wenn er nicht in die Wohnung rein kann)
3. Kunde droht mit Stornierung wegen Nichterreichbarkeit.
4. Kunde droht mit Stornierung wegen starker Mängel.
5. Apartment nicht gereinigt oder noch Jemand drinne wohnt.



*Check In- Check-Out Anweisungen:*

Was sollte man tun, wenn der Kunde keinen Schlüssel von der Wohnung hat und Hilfe benötigt?

    1. Erklärung des Check-In-Organisationsprozesses per E-Mail und Hinweis auf den Code.
    2. Direkte Weitergabe des Codes mit Bitte um späteres Ausfüllen des Kunden-Datenblatts.
    3. Weiterleitung bei Fragen oder Notfällen an +491734555500 oder Aufnahme des Sachverhalts und per Email an info@immostay.de


Wo bekomme ich den Schlüssel bzw. Code zur Schlüsselbox?

  - Vor Check-In bitte das Kunden-Datenblatt ausfüllen, um den Zugangscode zu erhalten.
  - Der Link zum Formular wird per E-Mail (3 Tage vor Check-In) gesendet.


Wo befindet sich die Schlüsselbox?
  - Die Schlüsselboxen befinden sich direkt an den Unterkünften.
  - Genauere Informationen zur Lage sind im Welcome Book enthalten, inklusive Videos, die per E-Mail (3 Tage vor Check-In) gesendet werden.


Wo hinterlässt der Kunde den Schlüssel beim Verlassen der Wohnung?*
  - Bitte den Schlüssel auf den Esstisch im Zimmer legen und die Tür beim Verlassen der Wohnung schließen.

*Ferienwohnungen:*

Codes, Lage und Bettenkapazitäten der Ferienwohnungen?
 - Die genauen Adressen, Schlüsselbox-Codes sowie Betten-Kapazitäten sind aufgeführt.

#1 Apartment: mit großem Garten
Alter Postweg 207, 28207 Bremen = Schlüsselbox Code: 0809
Zimmeranzahl: 3
Bettenzahl: 6
Link Booking: https://www.booking.com/Share-N63MOL
Link Welcome Book: https://wbk.li/bremen-u28

#7 Apartment: mit großem Garten
Alter Postweg 207, 28207 Bremen = Schlüsselbox Code: 1402
Zimmeranzahl: 4
Bettenanzahl: 7
Link Booking: https://www.booking.com/Share-tNImyd
Link Welcome Book: https://wbk.li/bremen-7

#8 Haus (2 Apartments): mit großem Garten
Alter Postweg 207, 28207 Bremen = Schlüsselbox Code: 0809 und 1402
Zimmeranzahl: 7
Bettenanzahl: 13
Link Booking: https://www.booking.com/Share-ZUpWtrz
Link Welcome Book: https://wbk.li/haus13personen

#2 Apartment: mit zwei Balkonen
Blockener Str.12A, 28816 Stuhr = Schlüsselbox Code: 0809
Zimmeranzahl: 2
Bettenanzahl: 5
Link Booking: https://www.booking.com/Share-L0uwPi
Link Welcome Book: https://wbk.li/stuhr-n35

#3 Apartment: mit großem, sonnigem Balkon 
Stolzenauer Str. 18, 28207 Bremen = Schlüsselbox Code: 0809
Zimmeranzahl: 2
Bettenanzahl: 4
Link Booking: https://www.booking.com/Share-qcmEUbR
Link Welcome Book: https://wbk.li/bremen-h82



 
#4 Apartment (4 OG - Rechts): Bremen City - Park und Shopping in der Nähe
Rembertiring 19, 28195 Bremen = Schlüsselbox Code: 0101
Zimmeranzahl: 2
Bettenanzahl: 4
Link Booking: https://www.booking.com/Share-vef7xG5
Link Welcome Book: https://wbk.li/immostay-4
PS: Die Schlüsselbox findest du in Adresse: Schillerstraße 15 (am Wendekreis)

#5 Apartment (5 OG - Links): Bremen City - Park und Shopping in der Nähe
Rembertiring 19, 28195 Bremen = Schlüsselbox Code: 0202
Zimmeranzahl: 2
Bettenanzahl: 4
Link Booking: https://www.booking.com/Share-Aujxn7
Link Welcome Book: https://wbk.li/immostay-5
PS: Die Schlüsselbox findest du in Adresse: Schillerstraße 15 (am Wendekreis)

#6 Haus (2Apartments): Bremen City - Park und Shopping in der Nähe
Rembertiring 19, 28195 Bremen = Schlüsselbox Code: 0101 und 0202
Zimmeranzahl: 4
Bettenanzahl: 8
Link Booking: https://www.booking.com/Share-wy5fHb
LinkWelcome Book: https://wbk.li/immostay6
PS: Die Schlüsselbox findest du in Adresse: Schillerstraße 15 (am Wendekreis)

Mehrfamilienhaus „Saarstraße 1A, 28309 Bremen“

S#1 KG - Saarstraße 1A
ImmoStay S#1 Zimmer S#2 - Free Parking & Balkon, WiFi & 4K TV
Saarstraße 1
28309 Bremen

Schlüsselbox Code: 0809
Betten: 2
Zimmer: 1

Booking.com
https://www.booking.com/Share-Ff2G9j

AirBnB
https://www.airbnb.de/hosting/listings/editor/1188850342476297519/view-your-space

Ibindo:
 https://app.ibindo.at/g/90b2ba6e/

Welcome Book:
https://wbk.li/saar-s1
_________________________________________________


S#2 Apartment (EG - Rechts): 
ImmoStay Zimmer S#2 - Free Parking & Balkon, WiFi & Nähe Mercedes Benz
Saarstraße 1, 28309 Bremen - Schlüsselbox Code: 1402
28309 Bremen
Zimmeranzahl: 1
Bettenanzahl: 3

Booking.com
https://www.booking.com/Share-bPk0I8

AirBnB
https://www.airbnb.de/rooms/1145472793849965583?guests=1&adults=1&s=67&unique_share_id=8529bb90-83ae-42e5-9c21-18b5ca788cd8

Ibindo:
https://app.ibindo.at/g/4e31130e/

Welcome Book:
https://wbk.li/bremen-s2-saartrasse

________________________________________________________



S#7 Apartment (OG- Links): 
ImmoStay Zimmer S#2 - Free Parking & Balkon, WiFi & Nähe Mercedes Benz
Saarstraße 1, 28309 Bremen - Schlüsselbox Code: 0809
28309 Bremen
Zimmeranzahl: 1
Bettenanzahl: 3

Booking.com


AirBnB
https://www.airbnb.de/rooms/1145472793849965583?guests=1&adults=1&s=67&unique_share_id=8529bb90-83ae-42e5-9c21-18b5ca788cd8

Ibindo:
https://app.ibindo.at/g/4e31130e/

Welcome Book:
https://wbk.li/bremen-s2-saartrasse


Codes für alle 9 Apartments- Saarstr.
S#1 K: 0809

S#2 EG: 1402
S#3 EG: 1208
S#4 EG: 1302

S#5 OG: 1208
S#6 OG: 1402
S#7 OG: 0809

S#8 DG: 1208
S#9 DG: 1302


Mehrfamilienhaus „Saarstraße 1A, 28309 Bremen“

M#5-KG Marßeler Straße 21

Adresse:
Marßeler Straße 21
28239 Bremen

Code: 1402
Zimmer: 2
Betten: 4

Booking.com:
https://www.booking.com/Share-QvRoEsu

AirBnB: 
https://www.airbnb.de/hosting/listings/editor/1189155934623112272/view-your-space

Ibindo:
https://app.ibindo.at/g/d6d470e5/

Welcome Book:   
https://wbk.li/m-5


*Allgemeine Fragen:*

Was tun oder wen kontaktieren, wenn der Kunde etwas beschädigt hat?
  - Bitte kontaktieren Sie unsere Verwaltung unter +491734555500.

Wann sind die Ruhezeiten in der Wohnung?
  - Ruhezeiten von 22:00 bis 06:00 Uhr.

Gibt es die Möglichkeit, weitere Personen in dieser Unterkunft zu beherbergen?
  - Ja, bitte prüfen Sie die Verfügbarkeit von Betten und bitten Sie den Kunden, seine Daten zur Rechnungsstellung zu senden.

Gibt es einen Internetanschluss?*
  - WLAN steht in den Ferienwohnungen kostenlos zur Verfügung.

Was tun, wenn das Internet nicht funktioniert?
  - Ziehen Sie den Stromstecker für 30 Sekunden und starten Sie neu. Bei anhaltenden Problemen kontaktieren Sie uns per E-Mail oder wenden Sie sich an Ansprechpartner Nr. 1, Daniel Ruf.

Wie lauten die Stornierungsbedingungen?
  - Die Stornierungsrichtlinien sind auf Ihrer Buchungsplattform oder unter www.immostay.de einsehbar.

Ab wann ist die Anreise möglich?
  - Ab 16:00 Uhr.

Bis wann muss die Abreise erfolgen?
  - Bis 10:00 Uhr.


Gibt es einen Parkplatz direkt am Haus der Ferienwohnung?
  - Informationen zu den Parkmöglichkeiten finden Sie auf der Buchungsplattform in der Beschreibung der Unterkunft.

Darf in der Wohnung geraucht werden?
  - Nein, Rauchen in den Ferienwohnungen ist nicht gestattet. Bei Zuwiderhandlung droht eine Strafe von 200€.

Sind Haustiere erlaubt?
  - Haustiere sind in Absprache erlaubt. Bitte melden Sie diese vorher an. Es fällt eine Gebühr von 15,00€ pro Aufenthalt an.

Sind Bettwäsche und Handtücher vorhanden?
  - Betten sind bezogen und Hand- sowie Geschirrtücher liegen bereit.

Wo gibt es die nächste Einkaufsmöglichkeit?
  - Nutzen Sie das digitale Welcome Book oder suchen Sie online nach Einkaufsmöglichkeiten.

Ist ein Kinderbett bzw. Hochstuhl vorhanden?
  - Kinderbett bitte vorher anmelden. Hochstuhl ist nicht vorhanden.

  ImmoStay GmbH
Alle Wohnungen aktualisiert!
*Ferienwohnungen:*
#1 Apartment: mit großem Garten
Alter Postweg 207, 28207 Bremen
Schlüsselbox Code: 0809
Zimmeranzahl: 3
Bettenzahl: 6
Link Booking: https://www.booking.com/Share-N63MOL
Link Welcome Book: https://wbk.li/bremen-u28
#7 Apartment: mit großem Garten
Alter Postweg 207, 28207 Bremen
Schlüsselbox Code: 1402
Zimmeranzahl: 4
Bettenanzahl: 7
Link Booking: https://www.booking.com/Share-tNImyd
Link Welcome Book: https://wbk.li/bremen-7
#8 Haus (2 Apartments): mit großem Garten
Alter Postweg 207, 28207 Bremen
Schlüsselbox Code: 0809 und 1402
Zimmeranzahl: 7
Bettenanzahl: 13
Link Booking: https://www.booking.com/Share-ZUpWtrz
Link Welcome Book: https://wbk.li/haus13personen
#2 Apartment: mit zwei Balkonen
Blockener Str.12A, 28816 Stuhr
Schlüsselbox Code: 0809
Zimmeranzahl: 2
Bettenanzahl: 5
Link Booking: https://www.booking.com/Share-L0uwPi
Link Welcome Book: https://wbk.li/stuhr-n35
#3 Apartment: mit großem, sonnigem Balkon
Stolzenauer Str. 18, 28207 Bremen
Schlüsselbox Code: 0809
Zimmeranzahl: 2
Bettenanzahl: 4
Link Booking: https://www.booking.com/Share-qcmEUbR
Link Welcome Book: https://wbk.li/bremen-h82
#4 Apartment (4 OG - Rechts): Bremen City - Park und Shopping in der Nähe
Rembertiring 19, 28195 Bremen
Schlüsselbox Code: 0101
Zimmeranzahl: 2
Bettenanzahl: 4
Link Booking: https://www.booking.com/Share-vef7xG5
Link Welcome Book: https://wbk.li/immostay-4
PS: Die Schlüsselbox findest du in Adresse: Schillerstraße 15 (am Wendekreis)
#5 Apartment (5 OG - Links): Bremen City - Park und Shopping in der Nähe
Rembertiring 19, 28195 Bremen
Schlüsselbox Code: 4648
Zimmeranzahl: 2
Bettenanzahl: 4
Link Booking: https://www.booking.com/Share-Aujxn7
Link Welcome Book: https://wbk.li/immostay-5
PS: Die Schlüsselbox findest du in Adresse: Schillerstraße 15 (am Wendekreis)
#6 Haus (2Apartments): Bremen City - Park und Shopping in der Nähe
Rembertiring 19, 28195 Bremen
Schlüsselbox Code: (WE #4: 0101 und WE #5: 4648)
Zimmeranzahl: 4
Bettenanzahl: 8
Link Booking: https://www.booking.com/Share-wy5fHb
LinkWelcome Book: https://wbk.li/immostay6
PS: Die Schlüsselbox findest du in Adresse: Schillerstraße 15 (am Wendekreis)
G#1 - ImmoStay G#1 Ferienhaus - Parken & WiFi, 2 Balkone und 2 Bäder,4K
Adresse: Grambker Heerstraße 118A, 28719 Bremen
Schlüsselbox Code: 0809
Zimmeranzahl: 3
Bettenanzahl: 6
Link Booking: https://www.booking.com/Share-ihfQvv
Link Welcome Book: https://wbk.li/g1-grambke
Gästeerfassung Blatt: https://app.ibindo.at/g/98d44f8d/
ImmoStay G#2 Apartment - Parken & WiFi, Balkon über Bremen
Adresse: Luchtbergstraße 1
28237 Bremen
Betten: 4
Zimmeranzahl: 2
Lage: 3 OG
Code Schlüsselbox: 1208
Gästedatenblatt: https://app.ibindo.at/g/1a4ff558/
Welcome Book: https://wbk.li/de/immostay-g2
Booking: https://www.booking.com/Share-70Um5z
D#1 - ImmoStay G#1 Ferienhaus - Parken & WiFi, 2 Balkone und 2 Bäder,4K
Adresse: Daniel von Büren Straße 12, 28195 Bremen, Lage: 3 OG - Links
Schlüsselbox Code: 1121
Zimmeranzahl: 3
Bettenanzahl: 7
Link Booking: https://www.booking.com/Share-WofuW6g
Link Welcome Book: https://wbk.li/de/d1daniel
Gästeerfassung Blatt: https://app.ibindo.at/g/d45705fb/
Mehrfamilienhaus „Saarstraße 1A, 28309 Bremen“
S#1 KG - Saarstraße 1A
ImmoStay S#1 Zimmer S#2 - Free Parking & Balkon, WiFi & 4K TV
Saarstraße 1
28309 Bremen
Schlüsselbox Code: 0809
Betten: 2
Zimmer: 1
Booking: https://www.booking.com/Share-Ff2G9j
Ibindo: https://app.ibindo.at/g/90b2ba6e/
Welcome Book: https://wbk.li/saar-s1
S#2 Apartment (EG - Rechts):
ImmoStay Zimmer S#2 - Free Parking & Balkon, WiFi & Nähe Mercedes Benz
Saarstraße 1, 28309 Bremen - Schlüsselbox Code: 1402
28309 Bremen
Zimmeranzahl: 1
Bettenanzahl: 3
Booking.com: https://www.booking.com/Share-bPk0I8
Ibindo: https://app.ibindo.at/g/4e31130e/
Welcome Book: https://wbk.li/bremen-s2-saartrasse
ImmoStay S#3 - Saarstraße- Balkon und Parkplatz, Nähe Mercedes Benz
Adresse: Saarstraße 1A, 28309 Bremen - 1 OG
Schlüsselbox Code: 1208
Zimmer: 1
Betten: 3
Booking: https://www.booking.com/Share-QIp5SF
Gästedatenblatt: https://app.ibindo.at/g/dd333ef8/
Welcome Book: https://wbk.li/de/immostay-s3
S#4 EG - Saarstrasse 1A, 28309 Bremen
___________________________________
Adresse: Saarstraße 1A, 28309 Bremen - Erdgeschoss
Schlüsselbox Code: 1302
Zimmer: 1
Betten: 3
Booking: https://www.booking.com/Share-1jwEhv
Ibindo: https://app.ibindo.at/g/c560f285/
Welcome Book: https://wbk.li/de/immostay-s4
S#5 - Saarstraße- Balkon und Parkplatz, Nähe Mercedes Benz, 4K TV
Adresse: Saarstraße 1A, 28309 Bremen - 1 OG
Schlüsselbox Code: 3536
Zimmer: 1
Betten: 3
Booking: https://www.booking.com/Share-QZXomDE
Gästedatenblatt: https://app.ibindo.at/g/0096b403/
Welcome Book: https://wbk.li/immostay-s5
S#6 - Saarstraße- Balkon und Parkplatz, Nähe Mercedes Benz, 4K TV
Adresse: Saarstraße 1A, 28309 Bremen - 1 OG
Schlüsselbox Code: 2142
Zimmer: 1
Betten: 3
Booking: https://www.booking.com/Share-03nYzpU
Gästedatenblatt: https://app.ibindo.at/g/95433f16/
Welcome Book: https://wbk.li/de/immostay-s6
S#7 Apartment (OG- Links):
ImmoStay Zimmer S#2 - Free Parking & Balkon, WiFi & Nähe Mercedes Benz
Saarstraße 1, 28309 Bremen - Schlüsselbox Code: 0809
28309 Bremen
Zimmeranzahl: 1
Bettenanzahl: 3
Ibindo: https://app.ibindo.at/g/4e31130e/
Welcome Book: https://wbk.li/bremen-s2-saartrasse
ImmoStay S#8 - Saarstraße- 2 Balkone und Parkplatz, Nähe Mercedes Benz
Adresse: Saarstraße 1A, 28309 Bremen - 2 OG
Schlüsselbox Code: 3344
Zimmer: 2
Betten: 4
Booking: https://www.booking.com/Share-6gz6Km
Gästedatenblatt: https://app.ibindo.at/g/3f47563d/
Welcome Book: https://wbk.li/immostay-s8
S#9 - Saarstraße- Balkon und Parkplatz, Nähe Mercedes Benz, 4K TV
Adresse: Saarstraße 1A, 28309 Bremen - 2 OG (links)
Schlüsselbox Code: 4679
Zimmer: 1
Betten: 3
Booking: https://www.booking.com/Share-YEmH5a
Gästedatenblatt: https://app.ibindo.at/g/3c1b41d7/
Welcome Book: https://wbk.li/immostay-s9
Zusammenfassung Codes für alle 9 Apartments- Saarstr. 1A
S#1 K: 1121
S#2 EG: 1402
S#3 EG: 1208
S#4 EG: 1302
S#5 OG: 3536
S#6 OG: 2142
S#7 OG: 0809
S#8 DG: 3344
S#9 DG: 4679
Mehrfamilienhaus „Marßeler Straße 21, 28239 Bremen“
ImmoStay M#1- Familienzimmer & Nähe Waterfront Bremen
Adresse: Marßeler Straße 21
28239 Bremen
Code: 1302
Zimmer: 2
Betten: 4
Booking: https://www.booking.com/Share-bRhDF4
Gästedatenblatt: https://app.ibindo.at/g/d0c07a50/
Welcome Book: https://wbk.li/immostay-m1
ImmoStay M#2 Apartment, Wifi & Parken, Nähe Waterfront Bremen, 4K TV
Adresse: Marßeler Straße 21
28239 Bremen
Code: 0809
Zimmer: 2
Betten: 4
Booking: https://www.booking.com/Share-AIG0QD
Gästedatenblatt: https://app.ibindo.at/g/4aac000b/
Welcome Book: https://wbk.li/immostay-m2
ImmoStay M#3 - Ferienwohnung, Wifi & Parken,4K TV Waterfront Bremen
Adresse: Marßeler Straße 21
28239 Bremen
Code: 1402
Zimmer: 2
Betten: 4
Booking: https://www.booking.com/Share-vejgHL
Gästedatenblatt: https://app.ibindo.at/g/bbb5ce25/
Welcome Book: https://wbk.li/immostay-m3
ImmoStay M#4 Souterrain - Studio, Wifi & Parken, Parkanlage, 4K TV
Adresse: Marßeler Straße 21, 28239 Bremen
Code: 2561
Zimmer: 1
Betten: 2
Booking: https://www.booking.com/Share-c7fpJo
Gästedatenblatt: https://app.ibindo.at/g/fee7a1bb/
Welcome Book: https://wbk.li/immostay-m4
M#5-KG Marßeler Straße 21
Adresse: Marßeler Straße 21
28239 Bremen
Code: 1403
Zimmer: 2
Betten: 4
Booking.com: https://www.booking.com/Share-QvRoEsu
Gästedatenblatt: https://app.ibindo.at/g/d6d470e5/
Welcome Book: https://wbk.li/m-5
ImmoStay M#6 Maisonette- Apartment, Wifi & Parken, Parkanlage, 4K TV
Adresse: Marßeler Straße 21, 28239 Bremen
Schlüsselbox Code: 6633
Zimmer: 2
Betten: 4
Booking: https://www.booking.com/Share-xN20fNz
Gästedatenblatt: https://app.ibindo.at/g/7394f86a/
Welcome Book: https://wbk.li/immostay-m6
ImmoStay M#7 Studio- Apartment, Wifi & Parken, Parkanlage, 4K TV
Adresse: Marßeler Straße 21, 28239 Bremen
Code: 2142
Zimmer: 1
Betten: 3
Booking: https://www.booking.com/Share-nSKVmB
Gästedatenblatt: https://app.ibindo.at/g/41c602ef/
Welcome Book: https://wbk.li/immostay-m7
Zusammenfassung Codes für alle 7 Wohnungen in der Marßeler Straße 21,
28239 Bremen:
M#1 EG : 1302
M#2 OG: 0809
M#3 DG: 1402
M#4 EG: 2561
M#5 OG: 1403
M#6 OG: 6633
M#7 OG: 2142
`

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''  // проверяем, что переменная существует
})

export async function POST({ request }) {
  try {
    const { prompt } = await request.json()

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: `FAQ:\n${faqContent}` },
        { role: "user", content: prompt }
      ],
      temperature: 0,
      max_tokens: 1000
    })

    return new Response(JSON.stringify(response), { status: 200 })
  }
  catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

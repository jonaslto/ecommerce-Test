const brukere = [
    {
        brukernavn: "pernille.mohn@gmail.com",
        passord: "Test123!"
    },
    {
        brukernavn: "caroline.vegge@sogeti.no",
        passord: "Sogeti123!"
    },
    {
        brukernavn: "99998888",
        passord: "halloooo!!"
    }

];

const endreInfo =
    {
        navn: "Pernille Tester",
        epost: "pernille.mohn+test@gmail.com",
        passord: "Test456!"
    };

const defaultInfo = [
    {
        navn: "Pernille Mohn",
        epost: "pernille.mohn@gmail.com",
        passord: "Test123!",
        bedrift: "103017"
    },
    {
        navn: "Caroline Vegge",
        epost: "caroline.vegge@sogeti.no",
        passord: "Sogeti123!",
        bedrift: "103017"
    }
];


const filer = [
    {
        bildeMappe: "\\\\LT011291\\bilder",
        signaturJPG: "signatur.jpg",
        logoPNG: "logo.png",
        sertifiseringJPG0: "\"sertifisering0.jpg\" ",
        sertifiseringJPG1: "\"sertifisering1.jpg\" ",
        sertifiseringJPG2: "\"sertifisering2.png\" ",
        sertifiseringJPG3: "\"sertifisering3.gif\" ",
        sertifiseringJPG4: "\"sertifisering4.png\" ",
        sertifiseringJPG5: "\"sertifisering5.jpg\" "
    },
    {
        bildeMappe: "C:\\Users\\C1818420\\Desktop\\Bilder_optimera_test",
        signaturJPG: "signatur.jpg",
        logoPNG: "logo.png",
        sertifiseringJPG0: "\"sertifisering0\" ",
        sertifiseringJPG1: "\"sertifisering1\" ",
        sertifiseringJPG2: "\"sertifisering2\" ",
        sertifiseringJPG3: "\"sertifisering3\" ",
        sertifiseringJPG4: "\"sertifisering4\" ",
        sertifiseringJPG5: "\"sertifisering5\" "
    }
];


const kontaktinfoBedrift =
    {
        telefon: "98867550",
        mobil: "98867550",
        epost: "testuser@test.co"
    };/*,
    {
        telefon: "19283764",
        mobil: "11559933",
        epost: "carolinevegge+4@gmail.com"
    }
   **/

const nyPerson =
    {
        navn: "Per Lyver",
        epost: "testemail@test.no",
        telefon: "11885522",
        rolle: "Bruker"

    };
const slettPerson =
    {
        slettePerson: "https:////test.optimera.no//Plugins//UserAdmin//UserAdminPlugin.aspx#//",
        epost: "testemail@test.no"
    };

const nyJobb = {
    prosjektNavn: "Automatisert jobb",
    adresse: "Gåsøveien 28",
    postnummer: "3160",
    forventetPoststed: "STOKKE",
    beskrivelse: "En beskrivelse av den automatiserte jobben.. ",
    kontaktNavn: "Tester testersen",
    telefon: "99998888",
    nyttProsjektNavn: "Automatisert jobb Endret",
    nyProsjektAdresse: "Trullåsen 4"
};

const endreJobb = {
    endreTil: "000007",
    endreBeskrivelse: "legge til litt tekst i den automatiserte jobben. ",
    endreTilByggedelJobb: "000026",
    endreTilDokumentasjonsJobb: "1403"
};

const dokumentasjon = {
    mappe: "C:\\TestCompleteProjects\\PDF",//"\\\\LT010893\\PDF",
    dokument1: "\"1.docx\"",
    dokument2: "\"2.pdf\"",
    dokument3: "\"3.docx\"",
    forside1: "\"forside.png\""
};
module.exports.brukere = brukere;
module.exports.endreInfo = endreInfo;
module.exports.defaultInfo = defaultInfo;
module.exports.filer = filer;
module.exports.kontaktinfoBedrift = kontaktinfoBedrift;
module.exports.nyPerson = nyPerson;
module.exports.endreJobb = endreJobb;
module.exports.nyJobb = nyJobb;
module.exports.dokumentasjon = dokumentasjon;
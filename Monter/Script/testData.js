const key = {
    URL: "https://test.monter.no/*",
    page: Aliases.browser.pageTestMonter
};
/*
const users = [
    discount: {
        discountAccount: "optimeratester"
    }];*/

const bruker = [
    {
        mobilnummer: "48196176",
        epost: "jonas.tester.det+001@gmail.com",
        fornavn: "MONTERNO",
        etternavn: "AUTOMATISERT",
        adresse: "Klinkekuleveien 18",
        postnummer: "3160",
        poststed: "Stokke",
        passord: "Test1234"
    }
    ,
    {
        mobilnummer: "48196176",
        epost: "jonas.tester.det@gmail.com",
        fornavn: "Jona",
        etternavn: "Store",
        adresse: "Klinkekuleveien 18",
        postnummer: "3160",
        poststed: "Stokke",
        passord: "Test1234"
    }/*
    ,
    {
        mobilnummer: "99887766",
        epost: "pernille.mohn+t37@gmail.com",
        fornavn: "Kåre",
        etternavn: "Testeren",
        adresse: "Klinkekuleveien 18",
        postnummer: "3160",
        poststed: "Stokke",
        passord: "Test123!"
    },
    {
        mobilnummer: "93866085",
        fornavn: "MONTERNO",
        etternavn: "AUTOMATISERT TEST",
        epoststart: "optimeratester\+test",
        epostslutt: "@gmail.com",
        adresse: "Klinkekuleveien 18",
        postnummer: "3160",
        poststed: "Stokke",
        passord: "Test456!"
    },
    {
        mobilnummer: "99988877",
        epost: "optimeratester+uregistrert@gmail.com",
        fornavn: "Uregistrert",
        etternavn: "Testeren",
        adresse: "Klinkekuleveien 18",
        postnummer: "3160",
        poststed: "Stokke"
    } */
];

const email = [
    {
        email: "jonas.tester.det@gmail.com",
        password: "Test1234!"
    }
];


const betalingskort = [
    {
        type: "Visa",
        kortNr: "4925000000000004",
        dateMonth: "09",
        dateYear: "2020",
        cvc: "123"
    },
    
    {
        type: "MasterCard",
        kortNr: "5413000000000000",
        dateMonth: "10",
        dateYear: "2023",
        cvc: "579"
    }
    
];

//module.exports = { key, users };
module.exports.bruker = bruker;
module.exports.betalingskort = betalingskort;
module.exports.email = email;

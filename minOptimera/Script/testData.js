const key = {
    header: Aliases.header,
    loginPanel: Aliases.panelRow,
    loginURL: "https://authorizationtest.optimera.no/*",
    //leftMenu: Aliases.browser.pageBrukerOptimeraNotForCommerci,
    leftMenu: Aliases.panelSiteMenu,
    //content: Aliases.browser.pageBrukerOptimeraNotForCommerci,
    content: Aliases.panelSiteContent,
    URL: "https://test.optimera.no/*",
    //page: Aliases.browser.pageBrukerOptimeraNotForCommerci,
    page: Aliases.browser.pageMinOversiktOptimera,
    browser: Sys.browser("firefox"),
};

const bruker = [
    {
        mobilnummer: "48196176",
        epost: "jonas.toreskas@sogeti.no",
        fornavn: "MONTERNO",
        etternavn: "AUTOMATISERT",
        adresse: "Klinkekuleveien 18",
        postnummer: "3160",
        poststed: "Stokke",
        passord: "Test1234!"
    },
    {
        mobilnummer: "48196176",
        epost: "jonas.tester.det+001@gmail.com",
        fornavn: "MONTERNO",
        etternavn: "AUTOMATISERT",
        adresse: "Klinkekuleveien 18",
        postnummer: "3160",
        poststed: "Stokke",
        passord: "Test1234!"
    }
]

module.exports = { key,bruker };


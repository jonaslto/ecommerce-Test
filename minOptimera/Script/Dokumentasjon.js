﻿const testData = require("testData");
const utils = require("utils");
const dokumentasjon = require("dokumentasjonUtils");


// !! Du må være logget inn med en bruker på Min Optimera, og bedrift bygg4 er valgt.

function dokumentasjonTC1() {
    const userEmail = "jonas.toreskas@sogeti.no";

    if (testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100).Exists) {
        testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100).Click();
        aqUtils.Delay(5000);
    }
    aqUtils.Delay(500);
    const documentationLink = testData.key.leftMenu.findChild("namePropStr", "Dokumentasjon", 100);
    documentationLink.Click();
    utils.waitForPage(testData.key.URL);

    // Sjekk at det er varsling om at jobb må velges:
    const pickDocumentsButton = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Velg typer dokument"], 100);
    pickDocumentsButton.Click();

    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Velg en jobb for å komme i gang"], 100).Visible === true) {
        Log.Checkpoint("Warning showing");
    } else {
        Log.Error("Pick Job warning not displayed.");
    }

    // pick a job

    const openJobPicker = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "Velg jobb"], 100);
    openJobPicker.Click();
    aqUtils.Delay(5000);

    while (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "000014"], 100).Exists === false) {
        testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Vis de * neste"], 100).Click();
    }
    testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "000014"], 100).Click();
    aqUtils.Delay(2500);

    // start new documentation
    pickDocumentsButton.Click();
    aqUtils.Delay(15000);

    // Velg alle typer dokumentasjon:

    const selectFDV = testData.key.content.findChild(["ObjectType", "contentText"], ["Label", "*\"shortname\":\"FDV\"*"], 100);
    selectFDV.Click();

    const selectHMS = testData.key.content.findChild(["ObjectType", "contentText"], ["Label", "*\"shortname\":\"HMS\"*"], 100);
    selectHMS.Click();

    // trykk strukturer dokument
    const structureDocument = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "Strukturer dokumentet"], 100);
    structureDocument.Click();
    aqUtils.Delay(800);

    // Steg 2 vises: Strukturer dokumentet og sett opp kategorier

    // legg til kategori "Kategori 1"
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lag ny kategori"], 100).Click();
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["Textbox", "newCategoryName"], 100).Keys("Kategori 1");
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre"], 100).Click();
    aqUtils.Delay(1000);


    // legg til underkategori 1.1.
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Legg til underkategori"], 100).Click();
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["Textbox", "newCategoryName"], 100).Keys("Underkategori 1.1");
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre"], 100).Click();
    aqUtils.Delay(1000);

    // Legg til underkategori "Underkategori 1.2"
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Legg til underkategori"], 100).Click();
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["Textbox", "newCategoryName"], 100).Keys("Underkategori 1.2");
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre"], 100).Click();
    aqUtils.Delay(1000);

    // Trykk lag ny kategori - trykk så avbryt
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lag ny kategori"], 100).Click();
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Avbryt"], 100).Click();

    // legg til ny kategori "kategori 2"
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lag ny kategori"], 100).Click();
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["Textbox", "newCategoryName"], 100).Keys("Kategori 2");
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre"], 100).Click();
    aqUtils.Delay(1000);

    // Legg til underkategori ""
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["Textbox", "newCategoryName"], 100).Keys("Underkategori 2.1");
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre"], 100).Click();
    aqUtils.Delay(1000);

    // Gå til kategori 1 - slett underkategori 1.2
    testData.key.page.findChild(["ObjectType", "contentText"], ["Link", "Kategori 1"], 100).Click();
    testData.key.page.findChild(["ObjectType", "contentText", "RowIndex"], ["Cell", "Underkategori 1.2*", "0"], 100).Button(0).Click();
    testData.key.browser.page("*").Keys("[Enter]");

    // GÃ¥ til kategori 2 - legg til underkategori "Underkategori 2.2"
    testData.key.page.findChild(["ObjectType", "contentText"], ["Link", "Kategori 2"], 100).Click();
    aqUtils.Delay(1000);
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Legg til underkategori"], 100).Click();
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["Textbox", "newCategoryName"], 100).Keys("Underkategori 2.2");
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre"], 100).Click();
    aqUtils.Delay(1000);


    // Legg til 3 ulike varer pÃ¥ de 3 ulike underkategoriene.

    dokumentasjon.leggTilVarer();


    // Last opp et dokument - legg det til i underkategori 1.1
    // dokumentet blir lastet opp
    testData.key.page.findChild(
        ["ObjectType", "contentText", "className"],
        ["Panel", "Last opp dokument (maks 20 MB)", "*FileUpload*"],
        100).Click();
    aqUtils.Delay(1000);
    utils.lastOpp("C:\\Users\\J9334452\\Documents\\TC_monter\\", "testDoc.docx");
    aqUtils.Delay(2000);
    const uploadedDocRow = dokumentasjon.sjekkOpplastede("testDoc.docx");

    // Legger til opplastet dokument til underkategori 1.1
    dokumentasjon.velgOpplastetDokument(uploadedDocRow);

    // GÃ¥ til detaljering

    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "*til detaljering"], 100).Click();


    // Endre tittelen på dokumentasjonen til "test dokumentasjon"
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Rediger"], 100).Click();
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["Textbox", "vm_formData_name"], 100).Keys("^a[BS]test dokumentasjon");


    // Last opp forsidebilde
    testData.key.page.findChild(["ObjectType", "contentText"], ["Panel", "Last opp bilde"], 100).Click();
    utils.lastOpp("C:\\Users\\J9334452\\Documents\\TC_monter\\", "test.png");
    aqUtils.Delay(1000);


    // last opp et bilde til kategori 1
    dokumentasjon.redigerKategorier("Kategori 1");

    // // Last opp et bilde til  og legg til en beskrivelse
    dokumentasjon.redigerKategorier("Underkategori 2.1");


    testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "G* til forh*ndsvisning"], 100).Click();
    aqUtils.Delay(1000);
    testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "Ferdigstill dokumentet"], 100).Click();

    // Sletter mottaker
    if (testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "Slett"], 100).title.includes(userEmail)) {
        testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "Slett"], 100).Click();
        Log.Checkpoint("Deleted email");
    } else {
        Log.Error("Cannot find expected email and delete it");
    }

    // legg til mottaker igjen
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["EmailInput", "recipient"], 100).Keys(userEmail);
    testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "Legg til"], 100).Click();

    // lag PDF
    aqUtils.Delay(1000);
    testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "Lag PDF"], 100).Click();

    if (testData.key.page.findChild(["ObjectType", "contentText"], ["TextNode", "Vi lager en PDF til deg. Du f*r en e-post n*r den er klar, og kan finne den under*"], 100)) {
        Log.Checkpoint("Info text about email when documentation is done is showing");
    } else {
        Log.Error("Cannot find infotext about email being sendt when documentation is done");
    }
}
function test() {
    Log.Message(Aliases.pageDokumentasjonMinOptimera.slettMottaker.title);
    Log.Message(testData.brukere[0].brukernavn);
    if (Aliases.pageDokumentasjonMinOptimera.slettMottaker.title.includes(testData.brukere[0].brukernavn)) {
        Aliases.pageDokumentasjonMinOptimera.slettMottaker.Click();
    }
}



function slettUnderkategori(navn) {
    tbl = Aliases.pageDokumentasjonMinOptimera.tableVarer;
    for (let i = 0; i < tbl.ColumnCount(0); i++) {
        if (tbl.Cell(0, i).contentText.includes(navn)) {
            tbl.Cell(0, i).Button(0).Click();
            Aliases.pageDokumentasjonMinOptimera.buttonOk.Click();
        }
    }
}

function velgKategori(navn) {
    kategorier = Aliases.pageDokumentasjonMinOptimera.panelDocumentationCategoryList.findAll("ObjectType", "Link", 1);
    for (let i = 0; i < kategorier.length; i++) {
        if (kategorier[i].contentText == navn) {
            kategorier[i].click();
        }
    }
}
function fjernType(arr) {
    valgteDokumentTyper = Aliases.pageDokumentasjonMinOptimera.panelDokumentasjon.findAllChildren("ObjectType", "Panel", 1);
    for (let i = 0; i < valgteDokumentTyper.length; i++) {
        for (j in arr) {
            if (valgteDokumentTyper[i].contentText.includes(arr[j])) {
                finnSlett = valgteDokumentTyper[i].findChild("ObjectType", "Button", 1);
                finnSlett.Click();
                Log.Message(`${valgteDokumentTyper[i].contentText} Slettet`);
            }
        }
    }
}

function testTC1() {
    dokumentasjon.redigerKategorier("Kategori 1");
}

// trykk ferdigstill dokumentet
// steg 5 "snart ferdig" vises

// Slett nÃ¥vÃ¦rende mottaker
// Mottaker blir slettet

// legg til en annen mottaker
// mottaker blir lagt til

// trykk lukk
// Blir sendt til hovedsiden for dokumentasjon

// Trykk fortsett pÃ¥ "Test dokumentasjon"
// steg 5 - "snart ferdig" steget vises med mottaker tidligere lagt til.

// trykk "lag PDF"
// Blir sendt til hovedsiden for dokumentasjon - det vises at det lastes og dokumentet er lagt under "Dokumenter som genereres" - med dagens dato.

// Trykk "Avbryt" pÃ¥ "test dokumentasjon"
// Varsel "Vil du avbryte genereringen av test dokumentasjon?"

// Trykk ok
// Genereringen av dokumentasjonen stanses - med mulighet for Ã¥ endre eller slette

// Trykk "fortsett"
// Du blir sendt til dokumentasjons steg 5 - "snart ferdig"

// trykk "lag PDF"
// Blir sendt til hovedsiden for dokumentasjon - det vises at det lastes og dokumentet er lagt under "Dokumenter som genereres" - med dagens dato.

// E-post blir mottatt etter en stund med dokumentasjonen og dokumentasjonen legger seg under "Ferdige PDF-er".

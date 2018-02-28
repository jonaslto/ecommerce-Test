let checkout = require("checkout");
let func = require("functions");
let testData = require("testData");

function checkOutUregistrert(customerNo) {
    let sPath;
    let d = new Date();

    sPath = "c:\\monter\\checkout.csv";

    //velgNyttVarehus("MontÃ©r LillestrÃ¸m");
    checkout.velgVarehus();
    cartTotal = checkout.leggTilVare("7242331");
    Aliases.linkHandlevogn.Click();
    cartTotal = Aliases.sectionProductDetailed.textnodeShoppingcartTotal.contentText;

    Aliases.sectionProductDetailed.buttonTilKassen.Click();

    //fyll inn info
    aqUtils.Delay(2000);
    Aliases.mobilnummer.Keys(testData.bruker[customerNo].mobilnummer);
    Aliases.kontaktEpost.setText(testData.bruker[customerNo].epost);
    Aliases.fornavn.Keys(testData.bruker[customerNo].fornavn);
    Aliases.etternavn.Keys(testData.bruker[customerNo].etternavn);
    //Aliases.adresse.Keys(testData.bruker[customerNo].adresse);
   // Aliases.postnummer.Keys(testData.bruker[customerNo].postnummer);

   /* totalKasse = Aliases.tableTotalKasse.contentText;
    if (totalKasse.indexOf(cartTotal) == 0) {
        Log.Error("Cart matcher ikke totalsum i kasse.");
    }
    else {
        Log.Checkpoint("Cart matcher totalsum");
    }*/
    Aliases.checkboxTerms.Click();
    Aliases.buttonTilBetaling.Click();

    checkout.netsPayment(testData.betalingskort[0].type, testData.betalingskort[0].kortNr, testData.betalingskort[0].dateMonth, testData.betalingskort[0].dateYear, testData.betalingskort[0].cvc);
    /*if (totalKasse.indexOf(cartTotal) == totalKasse) {
        Log.Error("Kasse matcher ikke kvitteringen.");
    }
    else {
        Log.Checkpoint("kassen matcher kvitteringen");
    }*/
    aqUtils.Delay(5000);
    orderID = checkout.checkEmailReceipt();

    aqFile.WriteToTextFile(sPath, d.toLocaleString() + "; " + testData.bruker[customerNo].epost + "; " + orderID + "\r\n", aqFile.ctANSI, false);

}

function checkoutLoggInn(customerNo) {
    let sPath;
    let d = new Date();

    sPath = "c:\\monter\\checkout.csv";

    checkout.velgVarehus();
    cartTotal = checkout.leggTilVare("7242331");
    Aliases.linkHandlevogn.Click();
    cartTotal = Aliases.sectionProductDetailed.textnodeShoppingcartTotal.contentText;
    Aliases.sectionProductDetailed.buttonTilKassen.Click();

    Aliases.checkoutLogin.Click();
    Aliases.textboxBrukernavnEPost.setText(testData.bruker[customerNo].epost);
    Aliases.passord.setText(testData.bruker[customerNo].passord);
    Aliases.buttonLoggInn.Click();

    //Sjekk om brukerinfo matcher
    Aliases.browser.Page(Aliases.browser.pageMonter.URL).Wait();

    checkout.sjekkAdresseFelt(customerNo);
    Aliases.checkboxTerms.Click();
    Aliases.buttonTilBetaling.Click();

    checkout.netsPayment(testData.betalingskort[0].type, testData.betalingskort[0].kortNr, testData.betalingskort[0].dateMonth, testData.betalingskort[0].dateYear, testData.betalingskort[0].cvc);

    orderID = checkout.checkEmailReceipt();

    aqFile.WriteToTextFile(sPath, d.toLocaleString() + "; " + testData.bruker[customerNo].epost + "; " + orderID + "\r\n", aqFile.ctANSI, false);
}

function checkoutNyKonto() {
    let sPath;
    let d = new Date();

    sPath = "c:\\monter\\checkout.csv";

    //velgNyttVarehus("MontÃ©r LillestrÃ¸m");
    checkout.velgVarehus();
    cartTotal = checkout.leggTilVare("7242331");
    Aliases.linkHandlevogn.Click();
    cartTotal = Aliases.sectionProductDetailed.textnodeShoppingcartTotal.contentText;
    Aliases.sectionProductDetailed.buttonTilKassen.Click();

    //fyll inn info
    aqUtils.Delay(3000);
    Aliases.mobilnummer.Keys(testData.bruker[2].mobilnummer);
    Aliases.kontaktEpost.setText(testData.bruker[2].epoststart + Project.Variables.currentEmail + testData.bruker[2].epostslutt);
    Aliases.fornavn.Keys(testData.bruker[2].fornavn);
    Aliases.etternavn.Keys(testData.bruker[2].etternavn);
    Aliases.adresse.Keys(testData.bruker[2].adresse);
    Aliases.postnummer.Keys(testData.bruker[2].postnummer);
    Aliases.checkboxJaJegNskerRegistrereMeg.Click();


    Project.Variables.currentEmail = Project.Variables.currentEmail + 1;
    totalKasse = Aliases.tableTotalKasse.contentText;
    if (totalKasse.indexOf(cartTotal) == 0) {
        Log.Error("Cart matcher ikke totalsum i kasse.");
    }
    else {
        Log.Checkpoint("Cart matcher totalsum");
    }
    Aliases.checkboxTerms.Click();
    Aliases.buttonTilBetaling.Click();

    checkout.netsPayment(testData.betalingskort[0].type, testData.betalingskort[0].kortNr, testData.betalingskort[0].dateMonth, testData.betalingskort[0].dateYear, testData.betalingskort[0].cvc);
    if (totalKasse.indexOf(cartTotal) == totalKasse) {
        Log.Error("Kasse matcher ikke kvitteringen.");
    }
    else {
        Log.Checkpoint("kassen matcher kvitteringen");
    }

    orderID = checkout.checkEmailReceipt();

    aqFile.WriteToTextFile(sPath, d.toLocaleString() + "; " + testData.bruker[2].epoststart + Project.Variables.currentEmail + testData.bruker[2].epostslutt + "; " + orderID + "\r\n", aqFile.ctANSI, false);

    checkout.activateAccount();

    aqUtils.Delay(4000);

}
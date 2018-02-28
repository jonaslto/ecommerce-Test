let checkout = require("checkoutJonas");
let func = require("functions");
let testData = require("testData");

function checkOutUregistrert(customerNo) {
    let sPath;
    let d = new Date();

    sPath = "c:\\Users\\J9334452\\Documents\\TC_monter\\checkout.csv";

    //checkout.velgNyttVarehus("Stabekk");
    checkout.velgVarehus();
    cartTotal = checkout.leggTilVare("7242331");
    Aliases.linkHandlevogn.Click();
    cartTotal = Aliases.textnodeShoppingcartTotal.contentText;
    Log.Message(cartTotal)
    Aliases.buttonTilKassenOgBetaling.Click();

    //fyll inn info
    aqUtils.Delay(2000);
    Aliases.browser.pageKasseMonter.panelBodyWhite.sectionPageCheckout.form.phoneinputBillingaddressPhone2.Keys(testData.bruker[customerNo].mobilnummer);
    Aliases.emailinputEPost.setText(testData.bruker[customerNo].epost);
    Aliases.textboxFornavn.Keys(testData.bruker[customerNo].fornavn);
    Aliases.textboxEtternavn.Keys(testData.bruker[customerNo].etternavn);
    //Aliases.adresse.Keys(testData.bruker[customerNo].adresse);
   // Aliases.postnummer.Keys(testData.bruker[customerNo].postnummer);
   
    totalKasse = Aliases.browser.pageKasseMonter.panelBodyWhite.sectionPageCheckout.form.KasseTotal.contentText;
    if (totalKasse.indexOf(cartTotal) == 0) {
      Log.Error("Cart matcher ikke totalsum i kasse.");
    }
    else {
        Log.Checkpoint("Cart matcher totalsum");
    } 
    
    Aliases.checkboxJaJegAkseptererVilkReneF.Click();
    Aliases.buttonTilBetaling.Click();
    aqUtils.Delay(2000);
    
    checkout.netsPayment(testData.betalingskort[0].type, testData.betalingskort[0].kortNr, testData.betalingskort[0].dateMonth, testData.betalingskort[0].dateYear, testData.betalingskort[0].cvc);
    kvitteringSum = Aliases.browser.pageTakkForDinBestillingMonter.kvitteringSum.sumKvittering.contentText;
    
    if (kvitteringSum.indexOf(cartTotal) == kvitteringSum) {
        Log.Error("Kasse matcher ikke kvitteringen.");
    }
    else {
        Log.Checkpoint("kassen matcher kvitteringen");
    }
    
    aqUtils.Delay(5000);
    orderID = checkout.checkEmailReceipt();

    aqFile.WriteToTextFile(sPath, d.toLocaleString() + "; " + testData.bruker[customerNo].epost + "; " + orderID + "\r\n", aqFile.ctANSI, false);
}


function checkoutLoggInn(customerNo) {
    let sPath;
    let d = new Date();

    sPath = "c:\\Users\\J9334452\\Documents\\TC_monter\\checkout.csv";

    checkout.velgVarehus();
    cartTotal = checkout.leggTilVare("7242331");
    Aliases.linkHandlevogn.Click();
    cartTotal = Aliases.textnodeShoppingcartTotal.contentText;
    Log.Message(cartTotal)
    Aliases.buttonTilKassenOgBetaling.Click();

    Aliases.browser.pageKasseMonter.panelBodyWhite.sectionPageCheckout.panelLoginInitial.buttonLoggInn.Click();
    Aliases.browser.pageKasseMonter.panelBodyWhite.sectionPageCheckout.form2.textboxBrukernavnEPost.setText(testData.bruker[customerNo].epost);
    Aliases.browser.pageKasseMonter.panelBodyWhite.sectionPageCheckout.form2.passwordboxPassord.setText(testData.bruker[customerNo].passord);
    Aliases.browser.pageKasseMonter.panelBodyWhite.sectionPageCheckout.form2.buttonLoggInn.Click();

    //Sjekk om brukerinfo matcher
    //Aliases.browser.Page(Aliases.browser.pageMonter.URL).Wait();
    Aliases.browser.pageKasseMonter.Wait();

    checkout.sjekkAdresseFelt(customerNo);
    Aliases.checkboxJaJegAkseptererVilkReneF.Click();
    Aliases.buttonTilBetaling.Click();
    aqUtils.Delay(2000);

    checkout.netsPayment(testData.betalingskort[0].type, testData.betalingskort[0].kortNr, testData.betalingskort[0].dateMonth, testData.betalingskort[0].dateYear, testData.betalingskort[0].cvc);
  
    orderID = checkout.checkEmailReceipt();

    aqFile.WriteToTextFile(sPath, d.toLocaleString() + "; " + testData.bruker[customerNo].epost + "; " + orderID + "\r\n", aqFile.ctANSI, false);
}
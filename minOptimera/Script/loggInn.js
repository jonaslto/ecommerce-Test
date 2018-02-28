﻿let testData = require("TestData");
let func = require("functions");
let bruker = testData.bruker;
let minProfil = require("minProfil");

function loggInn(brukernavn, passord){
    Aliases.textboxEPostadresse.setText(brukernavn);
    Aliases.passwordboxPassord.setText(passord);
    Aliases.submitbuttonLoggInn.Click();
    aqUtils.Delay(4000);
}

function loggUt() {
  Aliases.linkAuthorizationLogout.Click();
} 

function loginGyldig(brukernr) {
    Aliases.linkAuthorizationLogin.Click();
    let brukernavn = bruker[brukernr].epost;
    let passord = bruker[brukernr].passord;
    loggInn(brukernavn, passord);
    loggUt();
}


// C3486	Login med ugyldig info
function loginUgyldig() {
    Aliases.linkAuthorizationLogin.Click();

    let brukernavn = func.random(15) + "@" + func.random(7) + ".com"
    let passord = func.random(8)
    loggInn(brukernavn, passord);

  //Sjekk om feilmelding kommer frem: 
    aqObject.CheckProperty(Aliases.textnodeBeklagerViFantIngenMedDe, "Visible", cmpEqual, true);
    Aliases.linkHttpsTestOptimeraNo.Click();
}



// C3487	Login med gyldig brukernavn og tomt passord

function loginGyldigTomt(brukernr) {
    Aliases.linkAuthorizationLogin.Click();

    let brukernavn = bruker[brukernr].epost;
    let passord = "";
    loggInn(brukernavn, passord);

  //Sjekk om feilmelding kommer frem: 
    aqObject.CheckProperty(Aliases.textnodeBeklagerViFantIngenMedDe, "Visible", cmpEqual, true);
    aqObject.CheckProperty(Aliases.textnodeFyllInnDittPassord, "contentText", cmpEqual, "Fyll inn ditt passord");
    
    Aliases.linkHttpsTestOptimeraNo.Click();
}


// C3488	Login med tomt brukernavn og gyldig passord
function loginTomtGyldig(brukernr) {
    Aliases.linkAuthorizationLogin.Click();

    let brukernavn = "";
    let passord = bruker[brukernr].passord;
    loggInn(brukernavn, passord);

  //Sjekk om feilmelding kommer frem: 
    aqObject.CheckProperty(Aliases.textnodeBeklagerViFantIngenMedDe, "Visible", cmpEqual, true);
    aqObject.CheckProperty(Aliases.textnodeFyllInnDinEPostadresse, "contentText", cmpEqual, "Fyll inn din e-postadresse");

    Aliases.linkHttpsTestOptimeraNo.Click();
}


// C3489	Login med tom brukernavn og tom passord
function loginTomtTomt() {
    Aliases.linkAuthorizationLogin.Click();

    let brukernavn = "";
    let passord = "";
    loggInn(brukernavn, passord);

  //Sjekk om feilmelding kommer frem: 
    aqObject.CheckProperty(Aliases.textnodeBeklagerViFantIngenMedDe, "Visible", cmpEqual, true);
    aqObject.CheckProperty(Aliases.textnodeFyllInnDittPassord, "contentText", cmpEqual, "Fyll inn ditt passord");
    aqObject.CheckProperty(Aliases.textnodeFyllInnDinEPostadresse, "contentText", cmpEqual, "Fyll inn din e-postadresse");

    Aliases.linkHttpsTestOptimeraNo.Click();
}


// C3490	Login med storebokstaver på alt i Brukernavn og passord
function loginUpperCase(brukernr) {
    Aliases.linkAuthorizationLogin.Click();

    let brukernavn = bruker[brukernr].epost;
    let passord = bruker[brukernr].passord;
    brukernavn = brukernavn.toUpperCase();
    passord = passord.toUpperCase();
    loggInn(brukernavn, passord);

  //Sjekk om feilmelding kommer frem: 
    aqObject.CheckProperty(Aliases.textnodeBeklagerViFantIngenMedDe, "Visible", cmpEqual, true);

    Aliases.linkHttpsTestOptimeraNo.Click();
}



// C3492	Logout - tilbakeknapp !!Denne må endres, da det nå er bug i MO!! 
function logoutTilbake(brukernr) {
    loginGyldig(brukernr);
    //loggUt();
    Sys.Desktop.Keys("~[Left]");
    Aliases.linkHttpsTestOptimeraNo.Click();

}


// C3493	Endre passord - gyldig pass

function endrePassord(gammeltPass, nyttPass) {
    Aliases.pageMinProfil.profilEndrePassord.Click();
    Aliases.pageEndrePassord.gammeltPassord.SetText(gammeltPass);
    Aliases.pageEndrePassord.nyttPassord.SetText(nyttPass);

}

function endrePassGyldig(brukernr) {
    Aliases.hovedmeny.linkMinProfil.Click();
    endrePassord(bruker[brukernr].passord, testData.endreInfo.passord);
    Aliases.pageEndrePassord.buttonEndrePassord.Click();
    aqObject.CheckProperty(Aliases.pageEndrePassord.bekreftelsePassordEndret, "contentText", cmpEqual, "Passordet er endret");
    Aliases.pageEndrePassord.linkAvbryt.Click()
}
// C3495	Endre passord - gyldig så ugyldig
function endrePassUgyldigNytt(brukernr) {
    Aliases.hovedmeny.linkMinProfil.Click();
    endrePassord(bruker[brukernr].passord, func.random(8));
    aqObject.CheckProperty(Aliases.pageEndrePassord.buttonEndrePassord, "Enabled", cmpEqual, false);
    Aliases.pageEndrePassord.linkAvbryt.Click();
}

// C3496	Endre passord - ugyldig gammelt passord
function endrePassUgyldigGammelt() {
    Aliases.hovedmeny.linkMinProfil.Click();
    endrePassord(func.random(8), testData.endreInfo.passord);
    Aliases.pageEndrePassord.buttonEndrePassord.Click();
    aqObject.CheckProperty(Aliases.pageEndrePassord.feilmeldingBytte, "contentText", cmpContains, "Beklager, bytte av passord feilet.")
    Aliases.pageEndrePassord.linkAvbryt.Click();
}
// C3497	Endre passord - logg inn med gammelt passord
function loggInnGammelt(brukernr) {
    Aliases.hovedmeny.linkMinProfil.Click();
    endrePassGyldig(brukernr);
    aqUtils.Delay(2000);
    Aliases.hovedmeny.loggUt.Click();
    Aliases.pageStartsideMinOptimera.linkLoggInn.Click();
    func.loggInn(bruker[brukernr].brukernavn, bruker[brukernr].passord);
    aqObject.CheckProperty(Aliases.pageLoggInn.feilPassordVarsel, "Visible", cmpEqual, true);
    func.loggInn(bruker[brukernr].brukernavn, testData.endreInfo.passord);
}

function endreTilbake(brukernr) {
    Aliases.hovedmeny.linkMinProfil.Click();
    Log.Message(testData.endreInfo.passord, testData.defaultInfo[brukernr].passord);
    endrePassord(testData.endreInfo.passord, testData.defaultInfo[brukernr].passord);
    Aliases.pageEndrePassord.buttonEndrePassord.Click();
    aqObject.CheckProperty(Aliases.pageEndrePassord.bekreftelsePassordEndret, "contentText", cmpEqual, "Passordet er endret");
    Aliases.pageEndrePassord.linkAvbryt.Click();
}
// C3498	Glemt passord - bytte til gyldig passord
// C3499	Glemt passord - bytte til ugyldig passord
// C3500	Glemt passord - bytte til gyldig, ugyldig
// C3501	Glemt passord - Mottak av mail
// C3502	Glemt passord - Logg inn etter mail
// C3503	Glemt passord - E - post oppsett
// C3504	Glemt passord - ugyldig e- post
module.exports.endreTilbake = endreTilbake;
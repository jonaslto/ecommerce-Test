let testData = require("TestData");
let bruker = testData.bruker;
let func = require("functions");

function loggInn(brukernavn, passord){
        Aliases.emailinputBrukernavnEPost.setText(brukernavn);
        Aliases.passwordboxPassord.setText(passord);
        Aliases.buttonLoggInn.Click();
        aqUtils.Delay(4000);
}

function loginGyldig(brukernr) {

  Aliases.linkLoggInn.Click();
  let brukernavn = bruker[brukernr].epost;
  let passord = bruker[brukernr].passord;
  loggInn(brukernavn, passord);

  loggUt();

}

function loggUt(){
    Aliases.linkMinSide.Click();
    Aliases.linkLoggUt.Click();
    aqUtils.Delay(2000);
}

// C3486	Login med ugyldig info
function loginUgyldig() {
  Aliases.linkLoggInn.Click();

  let brukernavn = func.random(15) + "@" + func.random(7) + ".com"
  let passord = func.random(8)
  loggInn(brukernavn, passord);

  //Sjekk om feilmelding kommer frem: 
  aqObject.CheckProperty(Aliases.feilLoggInn, "Visible", cmpEqual, true);
  Aliases.imageMonterLogo.Click();
  aqUtils.Delay(2000);
}

// C3487	Login med gyldig brukernavn og tomt passord

function loginGyldigTomt(brukernr) {
  Aliases.linkLoggInn.Click();

  let brukernavn = bruker[brukernr].epost;
  let passord = "";
  loggInn(brukernavn, passord);

  //Sjekk om feilmelding kommer frem: 
  aqObject.CheckProperty(Aliases.feilLoggInn, "Visible", cmpEqual, true);
  aqObject.CheckProperty(Aliases.feilLoggInn, "contentText", cmpEqual, "Passord må fylles ut.");
  Aliases.imageMonterLogo.Click();
  aqUtils.Delay(2000);
}

// C3488	Login med tomt brukernavn og gyldig passord
function loginTomtGyldig(brukernr) {
  Aliases.linkLoggInn.Click();

  let brukernavn = "";
  let passord = bruker[brukernr].passord;
  loggInn(brukernavn, passord);

  //Sjekk om feilmelding kommer frem: 
  aqObject.CheckProperty(Aliases.feilLoggInn, "Visible", cmpEqual, true);
  aqObject.CheckProperty(Aliases.feilLoggInn, "contentText", cmpEqual, "Brukernavn må være en gyldig e-postadresse.");

  Aliases.imageMonterLogo.Click();
  aqUtils.Delay(2000);
}


// C3489	Login med tom brukernavn og tom passord
function loginTomtTomt() {
  Aliases.linkLoggInn.Click();

  let brukernavn = "";
  let passord = "";
  loggInn(brukernavn, passord);

  //Sjekk om feilmelding kommer frem: 
  aqObject.CheckProperty(Aliases.feilLoggInn, "Visible", cmpEqual, true);
  //aqObject.CheckProperty(Aliases.feilPassord, "contentText", cmpEqual, "Passord må fylles ut.");
  //aqObject.CheckProperty(Aliases.feilBrukernavn, "contentText", cmpEqual, "Brukernavn må være en gyldig e-postadresse.");

  Aliases.imageMonterLogo.Click();
  aqUtils.Delay(2000);
}


// C3490	Login med storebokstaver pÃ¥ alt i Brukernavn og passord
function loginUpperCase(brukernr) {
  Aliases.linkLoggInn.Click();

  let brukernavn = bruker[brukernr].epost;
  let passord = bruker[brukernr].passord;
  brukernavn = brukernavn.toUpperCase();
  passord = passord.toUpperCase();
  loggInn(brukernavn, passord);

  //Sjekk om feilmelding kommer frem: 
  aqObject.CheckProperty(Aliases.feilLoggInn, "Visible", cmpEqual, true);
  Aliases.imageMonterLogo.Click();
}


/*
// C3492	Logout - tilbakeknapp !!Denne mÃ¥ endres, da det nÃ¥ er bug i MO!! 
function logoutTilbake(brukernr) {
  loginGyldig(brukernr);
  Aliases.hovedmeny.loggUt.Click();
  Sys.Desktop.Keys("~[Left]");
  Aliases.linkLogo.Click();

}

*/
// C3493	Endre passord - gyldig pass

function endrePassord(gammeltPass, nyttPass) {
  Aliases.pageMinProfil.profilEndrePassord.Click();
  Aliases.panelInputGroupVertical.passwordboxNyttPassord.SetText(gammeltPass);
  Aliases.panelInputGroupVertical.passwordboxGjentaNyttPassord.SetText(gammeltPass);
  Aliases.passord.SetText(nyttPass);

}

/*
function endrePassGyldig(brukernr) {
  Aliases.hovedmeny.linkMinProfil.Click();
  endrePassord(bruker[brukernr].passord, testData.endreInfo.passord);
  Aliases.pageEndrePassord.buttonEndrePassord.Click();
  aqObject.CheckProperty(Aliases.pageEndrePassord.bekreftelsePassordEndret, "contentText", cmpEqual, "Passordet er endret");
  Aliases.pageEndrePassord.linkAvbryt.Click()
}
// C3495	Endre passord - gyldig sÃ¥ ugyldig
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
  Aliases.linkMinSide.Click();
  loggInn(bruker[brukernr].epost, bruker[brukernr].passord);
  aqObject.CheckProperty(Aliases.feilLoggInn, "Visible", cmpEqual, true);
  loggInn(bruker[brukernr].epost, testData.endreInfo.passord);
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
*/
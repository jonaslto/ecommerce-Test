let func = require("functions");
let testData = require("testData");


function loginGmail() {
    Aliases.browser.pageMonter.Keys("^t");
    aqUtils.Delay(2000);
    Sys.Browser().ToUrl("http://gmail.com");
    Aliases.browser.Page("*google.com*").Wait();
    if (Aliases.browser.pageGmailGratisLagringOgEPostFra.linkGmailSignIn.Exists) {
        Aliases.browser.pageGmailGratisLagringOgEPostFra.linkGmailSignIn.Click();
        Aliases.browser.pageGmail.formGaiaLoginform.emailinputSkrivInnEPostadressenD.setText(testData.email[0].email);
        Aliases.browser.pageGmail.Keys("[Enter]");
        Aliases.browser.pageGmail.formGaiaLoginform.passwordboxPassord.setText(testData.email[0].password);
        Aliases.browser.pageGmail.Keys("[Enter]");
    } else if (Aliases.browser.pageGmail.formGaiaLoginform.emailinputSkrivInnEPostadressenD.Exists) {
        Aliases.browser.pageGmail.formGaiaLoginform.emailinputSkrivInnEPostadressenD.setText(testData.email[0].email);
        Aliases.browser.pageGmail.Keys("[Enter]");
        Aliases.browser.pageGmail.formGaiaLoginform.passwordboxPassord.setText(testData.email[0].password);
        Aliases.browser.pageGmail.Keys("[Enter]");
    } else {
        Log.Message("Already logged in");
    }

}


function checkEmailReceipt() {
    loginGmail();
    aqUtils.Delay(2000);
    emailTable = Aliases.browser.pageInbox1OptimeratesterGmailCom.panelBlthkeNhOy8mbfAe3.tableBsNhIy;

    for (let i = 0; i < emailTable.RowCount; i++) {
        if (emailTable.Cell(i, 5).contentText.indexOf("Ordrebekreftelse") >= 0) {
            emailTable.Cell(i, 5).Click();
            emailContent = Aliases.browser.pageInbox1OptimeratesterGmailCom.panelBlthkeNhOy8mbfAe3.panelNh.panelH7IeNhOy8mbf.contentText;
            emailContent = emailContent.split("\n");
            for (let j = 0; j < emailContent.length; j++) {
                if (emailContent[j].indexOf("Ordrenummer:") >= 0) {

                    orderID = emailContent[j].substr(emailContent[j].length - 10);

                    //fjerne epost fra inbox
                    Aliases.browser.pageInbox1OptimeratesterGmailCom.panelBlthkeNhOy8mbfAe3.tableBsNhIy2.cellBu.panelNhIf.panelNh.tableCfHx.textnodeI.Click();
                    aqUtils.Delay(2000);
                    return orderID;
                }
            }
            break;
        }
    }
}

function activateAccount() {
    loginGmail();
    aqUtils.Delay(2000);
    emailTable = Aliases.browser.pageInbox1OptimeratesterGmailCom.panelBlthkeNhOy8mbfAe3.tableBsNhIy;

    for (let i = 0; i < emailTable.RowCount; i++) {
        if (emailTable.Cell(i, 5).contentText.indexOf("Aktivér") >= 0) {
            emailTable.Cell(i, 5).Click();

            // fjerne epost fra inbox
            Aliases.browser.pageInbox1OptimeratesterGmailCom.panelBlthkeNhOy8mbfAe3.tableBsNhIy2.cellBu.panelNhIf.panelNh.tableCfHx.textnodeI.Click();


            confirmEmailLink = Aliases.browser.pageInbox1OptimeratesterGmailCom.panelBlthkeNhOy8mbfAe3.panelNh.panelH7IeNhOy8mbf.findChild("contentText", "Bekreft at e-postadressen er din.", 10);
            confirmEmailLink.Click();
            aqUtils.Delay(2000);

            Aliases.formAktiver.passwordboxNyttPassord.setText(testData.email[0].password);
            Aliases.formAktiver.passwordboxGjentaNyttPassord.setText(testData.email[0].password);
            Aliases.formAktiver.buttonLagre.Click();
            aqUtils.Delay(3000);
            break;
        }

    }
}


function sjekkAdresseFelt(customerNo) {
    if (Aliases.mobilnummer.Text != testData.bruker[customerNo].mobilnummer) {
        Log.Message(Aliases.mobilnummer.value)
        Log.Error("mobilnummer matcher ikke")
    }

    if (Aliases.fornavn.value != testData.bruker[customerNo].fornavn) {
        Log.Error("fornavn matcher ikke")
    }

    if (Aliases.etternavn.value != testData.bruker[customerNo].etternavn) {
        Log.Error("etternavn matcher ikke");
    }

    if (Aliases.adresse.value != testData.bruker[customerNo].adresse) {
        Log.Error("adresse matcher ikke");
    }
    if (Aliases.postnummer.value != testData.bruker[customerNo].postnummer) {
        Log.Error("Postnummer matcher ikke");
    }

}


function fyllKundeinfo(customerNo) {
    Aliases.mobilnummer.Keys(testData.bruker[customerNo].mobilnummer);
    Aliases.kontaktEpost.setText(testData.bruker[customerNo].epost);
    Aliases.fornavn.Keys(testData.bruker[customerNo].fornavn);
    Aliases.etternavn.Keys(testData.bruker[customerNo].etternavn);
    Aliases.adresse.Keys(testData.bruker[customerNo].adresse);
    Aliases.postnummer.Keys(testData.bruker[customerNo].postnummer);
}
function velgVarehus() {
    if (Aliases.globalVelgVarehus.Exists) {
        Aliases.globalVelgVarehus.findChild("Name", "Button(0)", 10).Click();
        Aliases.browser.pageMonter.Wait();
    }

}

function velgNyttVarehus(varehus) {

    if (Aliases.valgtVarehus.Exists == false || ((Aliases.valgtVarehus.contentText.indexOf(varehus)) == 0)) {
        Aliases.linkVarehus.Click();
        varehusArticle = Aliases.panelListindexcontent.findChild("contentText", "*" + varehus + "*", 3);
        varehusArticle.find("ObjectType", "Button", 10).Click();
    }

}

function leggTilVare(vare) {
    //sjekker antallet i handlevogn
    aqUtils.Delay(2000);
    handlevognCount = parseInt(Aliases.linkHandlevogn.contentText.slice(0, Aliases.linkHandlevogn.contentText.indexOf("\n")));
    Log.Message(handlevognCount);

    Aliases.textboxSK.Keys(vare + "[Enter]");
    vare = Aliases.panelResults.findChild("namePropStr", vare, 2);
    vare.Click();
    aqUtils.Delay(3000);
    Aliases.sectionProductDetailed.buttonLeggIHandlevognen.Click();

}

function netsPayment(type, cardNo, month, year, cvc) {
    Aliases.browser.Page(Aliases.pageNetsNetaxept.URL).Wait();
    typeButton = Aliases.pageNetsNetaxept.panelContent.findChild("idStr", type, 2);
    typeButton.Click();
    Aliases.pageNetsNetaxept.panelContent.buttonNeste.Click();
    Aliases.pageNetsNetaxept.panelContent.textboxCardnumber.Keys(cardNo);
    Aliases.pageNetsNetaxept.panelContent.selectMonth.ClickItem(month);
    Aliases.pageNetsNetaxept.panelContent.selectYear.ClickItem(year);
    Aliases.pageNetsNetaxept.panelContent.textboxSecuritycode.Keys(cvc);
    Aliases.pageNetsNetaxept.panelContent.submitbuttonBetal.Click();
}


module.exports.loginGmail = loginGmail;
module.exports.checkEmailReceipt = checkEmailReceipt;
module.exports.activateAccount = activateAccount;
module.exports.sjekkAdresseFelt = sjekkAdresseFelt;
module.exports.fyllKundeinfo = fyllKundeinfo;
module.exports.velgVarehus = velgVarehus;
module.exports.velgNyttVarehus = velgNyttVarehus;
module.exports.leggTilVare = leggTilVare;
module.exports.netsPayment = netsPayment
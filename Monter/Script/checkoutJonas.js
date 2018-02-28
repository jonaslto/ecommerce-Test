let func = require("functions");
let testData = require("testData");

function leggTilVare(vare) {
    //sjekker antallet i handlevogn
    aqUtils.Delay(2000);
    //handlevognCount = parseInt(Aliases.linkHandlevogn.contentText.slice(0, Aliases.linkHandlevogn.contentText.indexOf("\n")));
    //Log.Message(handlevognCount);

    Aliases.textboxSK.Keys(vare + "[Enter]");
    vare = Aliases.panelCategoryResults.findChild("namePropStr", vare, 2);
    vare.Click();
    aqUtils.Delay(3000);
    Aliases.buttonLeggIHandlevognen.Click();
}

function velgVarehus() {
    if (Aliases.buttonVelgByggevarehus.Exists) {
        Aliases.buttonVelgByggevarehus.Click();
        aqUtils.Delay(3000);
        Aliases.buttonVelg.Click();
        Aliases.browser.pageTestMonter.Wait();
    }
}

function velgNyttVarehus(varehus) {

    if (Aliases.buttonVelgByggevarehus.Exists == false) {
        Aliases.linkVReByggevarehus.Click();
        varehusArticle = Aliases.panelListindexcontent.findChild("contentText", "*" + varehus + "*", 3);
        varehusArticle.find("ObjectType", "Button", 10).Click();
    }

}

function netsPayment(type, cardNo, month, year, cvc) {
    Aliases.browser.Page(Aliases.pageNetsNetaxept.URL).Wait();
    typeButton = Aliases.pageNetsNetaxept.formForm1.panelContent.FindChild("contentText", type, 2);
    //typeButton = Aliases.pageNetsNetaxept.panelContent.findChild("idStr", type, 2);
    typeButton.Click();
    Aliases.pageNetsNetaxept.formForm1.buttonNeste.Click();
    //Aliases.pageNetsNetaxept.panelContent.buttonNeste.Click();
    Aliases.pageNetsNetaxept.formForm1.panelContent.textboxCardnumber.Keys(cardNo);
    Aliases.pageNetsNetaxept.formForm1.panelContent.selectMonth.ClickItem(month);
    Aliases.pageNetsNetaxept.formForm1.panelContent.selectYear.ClickItem(year);
    Aliases.pageNetsNetaxept.formForm1.panelContent.textboxSecuritycode.Keys(cvc);
    Aliases.pageNetsNetaxept.formForm1.panelContent.submitbuttonBetal.Click();
}

function loginGmail() {
    Aliases.browser.pageTestMonter.Keys("^t");
    aqUtils.Delay(2000);
    //Browsers.CurrentBrowser.Navigate("http://gmail.com");
    Sys.Browser("firefox").ToUrl("http://gmail.com");
    Aliases.browser.Page("*").Wait();
    if (Aliases.browser.pageGmailFreeStorageAndEmailFrom.navGmailNavStandardScrolledLoade.linkSignIn.Exists) {
        Aliases.browser.pageGmailFreeStorageAndEmailFrom.navGmailNavStandardScrolledLoade.linkSignIn.Click();
        Aliases.browser.pageGmail.formRfjusbBxpaydK6zj8d.emailinputIdentifierid.setText(testData.email[0].email);
        Aliases.browser.pageGmail.Keys("[Enter]");
        Aliases.browser.pageGmail2.formRfjusbBxpaydK6zj8d.passwordboxPassword.setText(testData.email[0].password);
        Aliases.browser.pageGmail.Keys("[Enter]");
    } else if (Aliases.browser.pageGmail.formRfjusbBxpaydK6zj8d.emailinputIdentifierid.Exists) {
        Aliases.browser.pageGmail.formRfjusbBxpaydK6zj8d.emailinputIdentifierid.setText(testData.email[0].email);
        //Aliases.browser.pageGmail.formGaiaLoginform.emailinputSkrivInnEPostadressenD.setText(testData.email[0].email);
        Aliases.browser.pageGmail.Keys("[Enter]");
        Aliases.browser.pageGmail2.formRfjusbBxpaydK6zj8d.passwordboxPassword.setText(testData.email[0].password);
        //Aliases.browser.pageGmail.formGaiaLoginform.passwordboxPassord.setText(testData.email[0].password);
        Aliases.browser.pageGmail.Keys("[Enter]");
    } else {
        Log.Message("Already logged in");
    }

}

function checkEmailReceipt() {
    loginGmail();
    aqUtils.Delay(2000);
    //emailTable = Aliases.browser.pageInbox1OptimeratesterGmailCom.panelBlthkeNhOy8mbfAe3.tableBsNhIy;
    emailTable = Aliases.browser.pageInboxJonasTesterDetGmailComG.panelBlthkeNhOy8mbfAe3.panelAe4Adm.panelCp.panel.tableV;

    for (let i = 0; i < emailTable.RowCount; i++) {
        if (emailTable.Cell(i, 5).contentText.indexOf("Ordrebekreftelse fra test.monter.no") >= 0) {
            emailTable.Cell(i, 5).Click();
            //emailContent = Aliases.browser.pageInbox1OptimeratesterGmailCom.panelBlthkeNhOy8mbfAe3.panelNh.panelH7IeNhOy8mbf.contentText;
            emailContent = Aliases.browser.pageInboxJonasTesterDetGmailComG.panelBlthkeNhOy8mbfAe3.panelNh.panelH7IeNhOy8mbf.textnode.contentText;
            emailContent = emailContent.split("\n");
            for (let j = 0; j < emailContent.length; j++) {
                if (emailContent[j].indexOf("Ordrenummer:") >= 0) {

                    orderID = emailContent[j].substr(emailContent[j].length - 10);

                    //fjerne epost fra inbox
                    //Aliases.browser.pageInbox1OptimeratesterGmailCom.panelBlthkeNhOy8mbfAe3.tableBsNhIy2.cellBu.panelNhIf.panelNh.tableCfHx.textnodeI.Click();
                    Aliases.browser.pageInboxJonasTesterDetGmailComG.panelDelete.panelAsa.panelAr9TIJ3JJ5Ji.Click();
                    aqUtils.Delay(2000);
                    Log.Message(orderID);
                    return orderID;
                }
            }
            break;
        }
    }
}

function sjekkAdresseFelt(customerNo) {
    if (Aliases.browser.pageKasseMonter.panelBodyWhite.sectionPageCheckout.form.textboxBillingaddressPhone.Text != testData.bruker[customerNo].mobilnummer) {
        Log.Message(Aliases.mobilnummer.value)
        Log.Error("mobilnummer matcher ikke")
    }

    if (Aliases.textboxFornavn.value != testData.bruker[customerNo].fornavn) {
        Log.Error("fornavn matcher ikke")
    }

    if (Aliases.textboxEtternavn.value != testData.bruker[customerNo].etternavn) {
        Log.Error("etternavn matcher ikke");
    }
/*
    if (Aliases.adresse.value != testData.bruker[customerNo].adresse) {
        Log.Error("adresse matcher ikke");
    }
    if (Aliases.postnummer.value != testData.bruker[customerNo].postnummer) {
        Log.Error("Postnummer matcher ikke");
    }
*/
}

module.exports.leggTilVare = leggTilVare;
module.exports.velgVarehus = velgVarehus;
module.exports.velgNyttVarehus = velgNyttVarehus;
module.exports.netsPayment = netsPayment;
module.exports.checkEmailReceipt = checkEmailReceipt;
module.exports.sjekkAdresseFelt = sjekkAdresseFelt;
const testData = require("testData");
const utils = require("utils");

function editName(name) {
    const profileName = testData.key.content.findChild("ObjectIdentifier", "profile_name", 100);
    const saveButton = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre endringer"], 100);
    profileName.Keys("^a[BS]");
    profileName.Keys(name);
    aqUtils.Delay(500);
    saveButton.Click();
    utils.waitForPage(testData.key.URL);
    aqUtils.Delay(5000);
    Sys.Desktop.Keys("^[F5]");
    utils.waitForPage(testData.key.URL);
    aqUtils.Delay(5000);

    if (testData.key.content.findChild("ObjectIdentifier", "profile_name", 100).Text === name) {
        Log.Checkpoint("Navn er oppdatert!");
    } else {
        Log.Error(`Navn matcher ikke ${profileName.Text}`);
    }
}

function editPhone(phone) {
    const profilePhone = testData.key.content.findChild("ObjectIdentifier", "profile_phone", 100);
    const saveButton = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre endringer"], 100);
    profilePhone.Keys("^a[BS]");
    profilePhone.Keys(phone);
    aqUtils.Delay(500);
    saveButton.Click();
    aqUtils.Delay(500);
    utils.waitForPage(testData.key.URL);
    aqUtils.Delay(1500);
    Sys.Desktop.Keys("^[F5]");
    utils.waitForPage(testData.key.URL);
    aqUtils.Delay(1500);

    if (testData.key.content.findChild("ObjectIdentifier", "profile_phone", 100).Text === phone) {
        Log.Checkpoint("telefon er oppdatert!");
    } else {
        Log.Error(`Telefon matcher ikke ${profilePhone.Text}`);
    }
    aqUtils.Delay(1500);
}

function changeCompany(company, companyName) {
    const companyTable = testData.key.content.findChild("ObjectType", "Table", 100);
    const saveButton = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre endringer"], 100);

    const findRadioButton = companyTable.findChild(
        ["ObjectType", "Value"],
        ["RadioButton", company],
        100);

    findRadioButton.parent.Click();
    saveButton.Click();

    utils.waitForPage(testData.key.URL);
    aqUtils.Delay(1500);
    // verify that company is changed
    if (testData.key.leftMenu.findChild(["ObjectType", "innerHTML"], ["TextNode", "companyName"], 20)) {
        Log.Checkpoint("Current company is changed");
    } else {
        Log.Error(`Current company does not match ${testData.key.leftMenu.findChild(["ObjectType", "innerHTML"], ["TextNode", "companyName"], 20)} expected: ${companyName}`);
    }
}

function signatur() {
    utils.waitForPage(testData.key.URL);

    const deleteSignButton = testData.key.content.findChild(["ObjectLabel"], ["Slett signatur"], 200);
    if (deleteSignButton.Exists) {
        Log.Message("Fant slett signatur");
        deleteSignButton.Click();
    }
    aqUtils.Delay(3000);
    testData.key.content.findChild(["ObjectIdentifier", "ObjectType"], ["signatureForm", "Panel"], 100).Click();
    utils.lastOpp("C:\\testFiler", "signatur.png");
    aqUtils.Delay(2000);
}


module.exports = {
    editName,
    editPhone,
    changeCompany,
    signatur
};

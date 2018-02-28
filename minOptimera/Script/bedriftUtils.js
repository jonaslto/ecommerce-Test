const testData = require("testData");
const utils = require("utils");

function deleteUser(email) {
    testData.key.browser.page("*").Keys("^t");
    const page = "https://test.optimera.no/Plugins/UserAdmin/UserAdminPlugin.aspx#/*";
    testData.key.browser.ToUrl(page);
    const emailField = testData.key.browser.Page(page).findChild("idStr", "filter", 100);
    emailField.Keys(`${email}[Enter]`);
    const changeButton = testData.key.browser.Page(page).findChild(["ObjectType", "contentText"], ["Link", "Endre"], 100);
    changeButton.Click();
    aqUtils.Delay(2000);
    const editLoginAccount = testData.key.browser.Page(page).findChild(["ObjectType", "namePropStr", "contentText"], ["Link", "edit-login-account", "Innlogging"], 100);
    editLoginAccount.Click();

    const deleteAccount = testData.key.browser.Page(page).findChild(["ObjectType", "ObjectLabel"], ["Button", "Slett*"], 100);

    deleteAccount.Click();
    testData.key.browser.page("*").Keys("[Enter]");
    aqUtils.Delay(2000);
    testData.key.browser.page("*").Keys("^w");
}

function editField(field, value) {
    const inputField = testData.key.content.findChild("ObjectIdentifier", field, 100);
    const saveButton = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre endringer"], 100);
    inputField.Keys("^a[BS]");
    inputField.Keys(value);
    aqUtils.Delay(500);
    saveButton.Click();
    utils.waitForPage(testData.key.URL);
    aqUtils.Delay(5000);
    Sys.Desktop.Keys("^[F5]");
    utils.waitForPage(testData.key.URL);
    aqUtils.Delay(1500);

    if (testData.key.content.findChild("ObjectIdentifier", field, 100).Text === value) {
        Log.Checkpoint(`${field} er oppdatert!`);
    } else {
        Log.Error(`${field} ${typeof value} ${value} matcher ikke ${testData.key.content.findChild("ObjectIdentifier", field, 100).Text} ${typeof testData.key.content.findChild("ObjectIdentifier", field, 100).Text}`);
    }
    aqUtils.Delay(1500);
}

function changeLogo() {
    const deleteSignButton = testData.key.content.findChild(["ObjectLabel"], ["Slett logo"], 200);
    if (deleteSignButton.Exists) {
        Log.Message("Fant slett logo");
        deleteSignButton.Click();
    }
    aqUtils.Delay(3000);
    testData.key.content.findChild(["ObjectIdentifier", "ObjectType"], ["logoForm", "Panel"], 100).Click();
    utils.lastOpp("C:\\testFiler", "logo.jpg");
    aqUtils.Delay(2000);
}

function changeCertification() {
    const profileLink = testData.key.page.findChild("namePropStr", "profil", 100);
    profileLink.Click();
    utils.waitForPage(testData.key.URL);
    const myCompanyLink = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Min bedrift"], 100);
    myCompanyLink.Click();
    const findDeleteButtons = Array.from(testData.key.content.findAll(["ObjectLabel", "ObjectType"], ["Slett sertifisering", "Button"], 100));
    if (findDeleteButtons.length > 0) {
        for (let i = 0; i < findDeleteButtons.length; i++) {
            Log.Message(findDeleteButtons.length);
            findDeleteButtons[i].click();
        }
    }
    aqUtils.Delay(3000);
    testData.key.content.findChild(["ObjectIdentifier", "ObjectType"], ["certificationForm", "Panel"], 100).Click();
    utils.lastOpp("C:\\testFiler", "sertifisering1.png");
    aqUtils.Delay(2000);
    testData.key.content.findChild(["ObjectIdentifier", "ObjectType"], ["certificationForm", "Panel"], 100).Click();
    utils.lastOpp("C:\\testFiler", "sertifisering2.png");
    aqUtils.Delay(2000);
}


module.exports = { deleteUser, editField, changeLogo, changeCertification };

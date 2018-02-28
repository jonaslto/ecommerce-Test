const testData = require("testData");
const utils = require("utils");
const profile = require("profileUtils");

function minProfilTC1(name, email, phone, password, company) {
    testData.key.page.findChild("namePropStr", "profil", 100).Click();
    utils.waitForPage(testData.key.URL);


    const profileEmail = testData.key.page.findChild("ObjectIdentifier", "profile_email", 100);
    const removeChanges = testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Forkast endringer"], 100);

    profile.editName(name);
    profile.editPhone(phone);


    // rediger e-postdresen - forkast endringen
    const oldEmail = profileEmail.Text;
    profileEmail.Keys("^a[BS]");
    profileEmail.keys(email);
    aqUtils.Delay(500);
    removeChanges.ClickButton();
    aqUtils.Delay(500);
    if (oldEmail === testData.key.page.findChild("ObjectIdentifier", "profile_email", 100).Text) {
        Log.Checkpoint("email er ikke oppdatert!");
    } else {
        Log.Error(`email er endret ${oldEmail} ${testData.key.page.findChild("ObjectIdentifier", "profile_email", 100).Text}`);
    }

    profile.changeCompany(company, "Busch Eskild");
    profile.signatur();
}

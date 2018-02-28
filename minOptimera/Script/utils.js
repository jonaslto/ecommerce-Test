const testData = require("testData");

function random(x) {
    let randomString = "";
    const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-";

    while (randomString.length < x) {
        randomString += options.charAt(Math.floor(Math.random() * options.length));
    }

    return randomString;
}

function waitForPage(URL) {
    Aliases.browser.Page(URL).Wait();
}

function lastOpp(mappe, fil) {
    const vindu = Aliases.browser.Window("#32770", "*", 1);
    /* if (Aliases.browser.ObjectIdentifier === "firefox") {
        vindu = Aliases.browser.Window("#32770", "File Upload", 1);
    } else if (Aliases.browser.ObjectIdentifier === "iexplore") {
        vindu = Aliases.browser.Window("#32770", "Choose File to Upload", 1);
    } else {
        vindu = Aliases.browser.Window("#32770", "Open", 1);
    }*/

    vindu.Window("ComboBoxEx32", "", 1).Window("ComboBox", "", 1).Window("Edit", "", 1).Click();
    vindu.Keys(mappe);
    vindu.Keys("[Enter]");
    Log.Message(fil);
    vindu.OpenFile(fil);
}

function goToMenuItem(jobID, menuItem) {
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100).Exists) {
        testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100).Click();
        aqUtils.Delay(5000);
    }

    testData.key.leftMenu.findChild("namePropStr", "jobb", 1).Click();
    waitForPage(testData.key.URL);

    while (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "000001"], 100).Exists === false) {
        testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Vis de * neste"], 100).Click();
    }

    testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", jobID], 100).Click();
    aqUtils.Delay(2500);
    testData.key.leftMenu.findChild("namePropStr", menuItem, 1).Click();
    waitForPage(testData.key.URL);
}

module.exports = { random, waitForPage, lastOpp, goToMenuItem };

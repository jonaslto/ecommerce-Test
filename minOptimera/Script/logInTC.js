const testData = require("testData");
const loginUtils = require("loginUtils");
const utils = require("utils");

function loginTC1(user, pass) {
    const loginLink = testData.key.page.findChild("namePropStr", "Login", 10);
    loginLink.Click();
    utils.waitForPage(testData.key.loginURL);
    loginUtils.login(user, pass);
    utils.waitForPage(testData.key.URL);
    if (testData.key.page.Visible === true) {
        Log.Checkpoint("Login success");
    } else {
        Log.Error("Login failed");
    }
    loginUtils.logout();
}

// C3486 Login med ugyldig info
function loginTC2() {
    const loginLink = testData.key.page.findChild("namePropStr", "Login", 10);
    const user = `${utils.random(15)}@${utils.random(7)}.com`;
    const pass = utils.random(8);
    loginLink.Click();
    utils.waitForPage(testData.key.loginURL);
    loginUtils.login(user, pass);

    if (testData.key.page.findChild("contentText", "Kunne ikke logge inn.", 10)) {
        Log.Checkpoint("Login failed");
    } else {
        Log.Error("Login error message not showing.");
    }
    const logo = testData.key.page.findChild("contentText", "Tilbake", 10);
    logo.Click();
}

// C3487 Login med gyldig brukernavn og tomt passord
function loginTC3(user) {
    const loginLink = testData.key.page.findChild("namePropStr", "Login", 10);
    const pass = "";
    loginLink.Click();
    utils.waitForPage(testData.key.loginURL);
    loginUtils.login(user, pass);

    if (testData.key.page.findChild("contentText", "Kunne ikke logge inn.", 10)) {
        Log.Checkpoint("Login failed");
    } else {
        Log.Error("Login error message not showing.");
    }
    const logo = testData.key.page.findChild("contentText", "Tilbake", 10);
    logo.Click();
}

// C3488 Login med tomt brukernavn og gyldig passord
function loginTC4(pass) {
    const loginLink = testData.key.page.findChild("namePropStr", "Login", 10);
    const user = "";
    loginLink.Click();
    utils.waitForPage(testData.key.loginURL);
    loginUtils.login(user, pass);

    if (testData.key.page.findChild("contentText", "Kunne ikke logge inn.", 10)) {
        Log.Checkpoint("Login failed");
    } else {
        Log.Error("Login error message not showing.");
    }
    const logo = testData.key.page.findChild("contentText", "Tilbake", 10);
    logo.Click();
}

// C3489 Login med tom brukernavn og tom passord
/*function loginTC4() {
    const loginLink = testData.key.header.findChild("namePropStr", "Login", 10);
    const user = "";
    const pass = "";
    loginLink.Click();
    utils.waitForPage(testData.key.loginURL);
    loginUtils.login(user, pass);

    if (testData.key.loginPanel.findChild("contentText", "Kunne ikke logge inn.", 10)) {
        Log.Checkpoint("Login failed");
    } else {
        Log.Error("Login error message not showing.");
    }
    const logo = testData.key.loginPanel.findChild("contentText", "Tilbake", 10);
    logo.Click();
}
*/
// C3490 Login med storebokstaver på alt i Brukernavn og passord
function loginTC5(user, pass) {
    const loginLink = testData.key.page.findChild("namePropStr", "Login", 10);
    loginLink.Click();
    utils.waitForPage(testData.key.loginURL);
    loginUtils.login(user.toUpperCase(), pass.toUpperCase());

    if (testData.key.page.findChild("contentText", "Kunne ikke logge inn.", 10)) {
        Log.Checkpoint("Login failed");
    } else {
        Log.Error("Login error message not showing.");
    }
    const logo = testData.key.page.findChild("contentText", "Tilbake", 10);
    logo.Click();
}

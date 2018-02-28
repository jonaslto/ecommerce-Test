const testData = require("testData");

function login(user, pass) {
    const username = testData.key.page.findChild("ObjectIdentifier", "UserName", 10);
    const password = testData.key.page.findChild("ObjectIdentifier", "Password", 10);
    const loginButton = testData.key.page.findChild("ObjectType", "SubmitButton", 10);
    username.setText(user);
    password.setText(pass);
    loginButton.Click();
}

function logout() {
    const logoutButton = testData.key.page.findChild("namePropStr", "logout", 10);
    logoutButton.Click();
    aqUtils.Delay(5000);
}

module.exports = { login, logout };

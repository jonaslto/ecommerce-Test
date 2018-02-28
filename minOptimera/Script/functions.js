function lastOpp(mappe, fil) {
    let vindu;
    if (Aliases.browser.ObjectIdentifier == "firefox") {
        vindu = Aliases.browser.Window("#32770", "File Upload", 1)
    }
    else if (Aliases.browser.ObjectIdentifier == "iexplore") {
        vindu = Aliases.browser.Window("#32770", "Choose File to Upload", 1);
    }
    else {
        vindu = Aliases.browser.Window("#32770", "Open", 1)
    }
    vindu.Window("ComboBoxEx32", "", 1).Window("ComboBox", "", 1).Window("Edit", "", 1).Click();
    pressKey(mappe);
    pressKey("[Enter]");
    Log.Message(fil);
    vindu.OpenFile(fil);
}

function toPage(url, browser){
    Browsers.Item(browser).Run(url)
}

function random(x) {
    let randomString = "";
    let muligheter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-";

    for (var i = 0; i < x; i++)
        randomString += muligheter.charAt(Math.floor(Math.random() * muligheter.length));

    return randomString;
}
function close(){
  Aliases.browser.Close(5000);
}

module.exports.random = random;
module.exports.toPage = toPage;

//module.exports.pressKey = pressKey;
module.exports.lastOpp = lastOpp;
//module.exports.loggInn = loggInn;
//module.exports.random = random;



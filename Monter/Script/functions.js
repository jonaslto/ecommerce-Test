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

const testData = require("testData");
const utils = require("OrderUtils");
const cart = require("cartUtils");

function velgJobb(jobbID){
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100).Exists) {
        testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100).Click();
        aqUtils.Delay(5000);
    }

    testData.key.siteMenu.findChild("namePropStr", "jobb", 1).Click();
    utils.waitForPage(testData.key.URL);
    //hent frem alle jobber for firma 121763
    while (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "000002"], 100).Exists === false) {
        testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Vis de * neste"], 100).Click();
    }

    testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", jobbID], 100).Click();
    utils.waitForPage(testData.key.URL);
}

function setMiljoReq(a20, hea02, nat) {
    testData.key.siteMenu.findChild("namePropStr", "jobb", 100).Click();
    utils.waitForPage(testData.key.URL);
    const miljoProfil = testData.key.content.findChild("ObjectIdentifier", "edit_environment_profile", 100);
    miljoProfil.Click();
    
    //a20
    let checkBox = miljoProfil.findChild(["ObjectType", "ObjectLabel"], ["CheckBox", "BREEAM-NOR-MAT01-A20"], 100);
    if (a20 !== checkBox.checked) {
      checkBox.Click();
    }
    //hea02
    checkBox = miljoProfil.findChild(["ObjectType", "ObjectLabel"], ["CheckBox", "BREEAM-NOR HEA02"], 100);
    if (hea02 !== checkBox.checked) {
      checkBox.Click();
    }
    //nasjonalt filter
    checkBox = miljoProfil.findChild(["ObjectType", "ObjectLabel"], ["CheckBox", "Nasjonalt filter"], 100);
    if (nat !== checkBox.checked) {
      checkBox.Click();
    }
    aqUtils.Delay(2000);
    miljoProfil.findChild(["ObjectType", "contentText"], ["Button", "Lagre endringer"], 100).Click();
    aqUtils.Delay(10000);
    utils.waitForPage(testData.key.URL);
}

//kjapp greie for å sjekke om miljø stopper ordresimulering
function miljoTC1 (jobbID, item, a20, hea02, nat) {
    velgJobb(jobbID);
    const products = {};
    //item må ha krav til miljøprofil
    utils.search(item);
    products.item = utils.addToCart(item, 2);
    aqUtils.Delay(8000);
    //a20,hea02,nat = true
    setMiljoReq(a20, hea02, nat);
    utils.goToCart();
    utils.waitForPage();
    cart.orderNowButton();
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Følgende produkter er blokkert av miljøprofil på jobben, og må fjernes fra ordren"], 100).Exists) {
      Log.Checkpoint("Order blocked by environmental profile");
    }
    else {
      Log.Error("Environment failed");
    }
}

function miljoTC2 (jobbID, item, a20, hea02, nat) {
    velgJobb(jobbID);
    setMiljoReq(a20, hea02, nat);
    const products = {};
    //item må ha krav til miljøprofil
    utils.search(item);
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["Panel", "Oppfyller ikke krav til *"], 100).Exists) {
      Log.Checkpoint("Add to cart blocked by environmental profile");
    }
    else {
      Log.Error("Environment failed");
    }
    setMiljoReq(false, false, false);
    utils.search(item);
    products.item = utils.addToCart(item, 2);
    aqUtils.Delay(8000);
    //a20,hea02,nat = true
    setMiljoReq(a20, hea02, nat);
    utils.goToCart();
    utils.waitForPage();
    cart.orderNowButton();
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Følgende produkter er blokkert av miljøprofil på jobben, og må fjernes fra ordren"], 100).Exists) {
      Log.Checkpoint("Order blocked by environmental profile");
    }
    else {
      Log.Error("Environment failed");
    }
}
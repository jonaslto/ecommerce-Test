const testDataAdmin = require("testDataAdmin");

function waitForPage(URL) {
    Aliases.browser.Page(URL).Wait();
}

function chooseWarehouse(warehouse){
    const varehus = "Montér " + warehouse;
    Aliases.selectVelgVarehus.ClickItem(varehus);
    aqUtils.Delay(2000);
}

function checkCalc(warehouse, calcType) {
    const varehus = "Montér " + warehouse;
    
    if (calcType === "garasje") {
      Aliases.sectionMainSection.FindChild(["ObjectType", "namePropStr"], ["Link", "*&type=Garage"],100).Click();
      if (Aliases.browser.pageMontRVarehusadmin.panelBodyContainer.panelBodyContent.panelPageMain.FindChild(["ObjectType", "contentText"], ["TextNode", varehus],1000).Exists) {
        Log.Checkpoint("Varehus matcher");
      }
      else {
        Log.Error("Varehus mismatch");
      }
    } 
    else if (calcType === "tak") {
      Aliases.sectionMainSection.FindChild(["ObjectType", "namePropStr"], ["Link", "*&type=Roof"],100).Click();
      if (Aliases.browser.pageMontRVarehusadmin.panelBodyContainer.panelBodyContent.panelPageMain.FindChild(["ObjectType", "contentText"], ["TextNode", varehus],1000).Exists) {
        Log.Checkpoint("Varehus matcher");
      }
      else {
        Log.Error("Varehus mismatch");
      }
    } 
    else if (calcType === "terrasse") {
      Aliases.sectionMainSection.FindChild(["ObjectType", "namePropStr"], ["Link", "*&type=Terrace"],100).Click();
      if (Aliases.browser.pageMontRVarehusadmin.panelBodyContainer.panelBodyContent.panelPageMain.FindChild(["ObjectType", "contentText"], ["TextNode", varehus],1000).Exists) {
        Log.Checkpoint("Varehus matcher");
      }
      else {
        Log.Error("Varehus mismatch");
      }
    }
    else {
      Log.Error("Ugyldig kalkulatortype");
    } 
    
}

function random(x) {
    let randomString = "";
    let muligheter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-";

    for (var i = 0; i < x; i++)
        randomString += muligheter.charAt(Math.floor(Math.random() * muligheter.length));

    return randomString;
}

module.exports = { random, chooseWarehouse };

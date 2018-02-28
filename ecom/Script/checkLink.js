const testData = require("testData");
const func = require("functions");

function checkLinkTC1() {
    // link på dashboard
    const siteLinks = Array.from(testData.key.siteMenu.findAll("ObjectType", "Link", 1));

    const returnMinOversikt = siteLinks.find(function (link) {
        return link.contentText === "Min oversikt";
    });

    returnMinOversikt.Click();
    func.waitForPage();

    const appContentLinks = Array.from(testData.key.appContent.findAll("ObjectType", "Link", 10));

    const returnAppLink = appContentLinks.find(function (link) {
        return link.namePropStr === "nettbutikk";
    });

    returnAppLink.Click();
    func.waitForPage();

/*
    if (testData.link.ecomHeader.Exists) {
        Log.Message("Dashboard Link ok");
    } else {
        Log.Error("Dashboard link ikke ok");
    }


    // sjekk link i handleliste
    testData.link.minOversikt.Click();
    aqUtils.Delay(3000);
    testData.link.jobbLink.Click();

    handlelister = testData.link.jobbHandeliste.findAll("ObjectType", "Link", 10);
    handlelister[0].Click();
    aqUtils.Delay(3000);
    testData.link.handlelisteTabell.Cell(1, 6).findChild("ContentText", "Legg i handlevogn", 3).Click();
    aqUtils.Delay(20000);
    if (testData.link.handlevognHeader.Exists) {
         Log.Message("vare i handlevogn fra handleliste link ok");
     } else{
         Log.Error("vare i handlevogn fra handleliste link ikke ok");
     }

    // Legg alle varer i handlevogn fra handleliste
    testData.link.minOversikt.Click();
    aqUtils.Delay(3000);
    testData.link.jobbLink.Click();

    handlelister = testData.link.jobbHandeliste.findAll("ObjectType", "Link", 10);
    handlelister[0].Click();
    aqUtils.Delay(3000);
    testData.link.handelisteAlleVarer.Click();
    aqUtils.Delay(25000);
    if (testData.link.handlevognHeader.Exists) {
         Log.Message("alle varer i handlevogn fra handleliste link ok");
     } else{
         Log.Error("alle varer i handlevogn fra handleliste link ikke ok");
     }


    // sjekk link i lagret byggedel
    testData.link.jobbLink.Click();

    minbyggedel = testData.link.jobbByggedel.findAll("ObjectType", "Link", 10);
    minbyggedel[0].Click();
    aqUtils.Delay(3000);
    testData.link.jobbByggedelIVogn.Click();
    aqUtils.Delay(25000);
    if (testData.link.ecomHeader.Exists || testData.link.valideringHeader) {
         Log.Message("vare i handlevogn fra lagret byggedel link ok");
     }else {
         Log.Error("vare i handlevogn fra lagret byggedel link ikke ok");
     }


    // sjekk link på varer og byggedeler:
    testData.link.varerOgByggedeler.Click();
    aqUtils.Delay(3000);
    testData.link.linkEcomByggedeler.Click();
    aqUtils.Delay(25000);
    if (testData.link.ecomHeader.Exists) {
        Log.Message("Link varer og byggedeler ok");
    } else{
        Log.Error("Link varer og byggedeler ikke ok");
    }


    // Sjekk legg i handlevogn fra byggedeler.
    testData.link.varerOgByggedeler.Click();
    byggedel = testData.link.alleByggedeler.findAll("ObjectType", "Link", 2);
    aqUtils.Delay(3000);
    for (let i = 0; i <= byggedel.length; i++) {
        if (byggedel[i].contentText == "Betongvegg utforet på innside") {
            byggedel[i].Click();
            break;
        }
    }
    aqUtils.Delay(3000);
    varianter = testData.link.appView.findAll("className", "Box-header", 10);
    for (let i = 0; i <= varianter.length; i++) {
        if (varianter[i].contentText == "Vindu 120x140 i betongvegg innv.listverk") {
            varianter[i].Click();
            break;
        }
    }
    testData.link.variantMengde.keys(10);
    testData.link.variantBeregn.Click();
    aqUtils.Delay(3000);
    testData.link.jobbByggedelIVogn.Click();
    aqUtils.Delay(25000);
    if (testData.link.ecomHeader.Exists || testData.link.valideringHeader) {
            Log.Message("Legg i handlevogn varer og byggedeler ok");
        }else {
            Log.Error("Legg i handlevogn varer og byggedeler ikke ok");
        }*/
}


function test() {
    byggedel = testData.link.alleByggedeler.findAll("ObjectType", "Link", 2);

    for (let i = 0; i <= byggedel.length; i++) {
        if (byggedel[i].contentText == "Betongvegg utforet på innside") {
            byggedel[i].Click();
            break;
        }
    }
    aqUtils.Delay(3000);
    varianter = testData.link.appView.findAll("className", "Box-header", 10);
    for (let i = 0; i <= varianter.length; i++) {
        if (varianter[i].contentText == "Vindu 120x140 i betongvegg innv.listverk") {
            varianter[i].Click();
            break;
        }
    }
    testData.link.variantMengde.keys(10);
    testData.link.variantBeregn.Click();
    aqUtils.Delay(3000);
    testData.link.jobbByggedelIVogn.Click();
    aqUtils.Delay(3000);
    if (testData.link.ecomHeader.Exists) {
            Log.Message("Legg i handlevogn varer og byggedeler ok");
        }else {
            Log.Error("Legg i handlevogn varer og byggedeler ikke ok");
        }
}

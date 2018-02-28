const testData = require("testData");
const utils = require("utils");
const byggedeler = require("byggedeler");

function verifyCustomerPreview(byggedelNavn, sum) {
    // customer name
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Ille Fransen"], 100).Visible) {
        Log.Checkpoint("Name is in offer");
    } else {
        Log.Error("Cannot find name in offer");
    }

    // customer address

    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Klinkekuleveien 39"], 100).Visible) {
        Log.Checkpoint("Address is in offer");
    } else {
        Log.Error("Cannot find address in offer");
    }

    // postal code
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "0364 OSLO"], 1000).Visible) {
        Log.Checkpoint("postal code and postal name is in offer");
    } else {
        Log.Error("Cannot find postal code amd/or postal name in offer");
    }

/* 
    // postal name
   if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "OSLO"], 1000).Visible) {
        Log.Checkpoint("Postal name is in offer");
    } else {
        Log.Error("Cannot find postal name in offer");
    }
*/
    // offer name
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Automatisert tilbud"], 100).Visible) {
        Log.Checkpoint("Name is in offer");
    } else {
        Log.Error("Cannot find Name in offer");
    }

    // introduction
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Introduksjon til det automatiserte tilbudet"], 100).Visible) {
        Log.Checkpoint("Introduction is in offer");
    } else {
        Log.Error("Cannot find introduction in offer");
    }

    // description
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "En beskrivelse av det automatiserte tilbudet, som kan inneholde litt ekstra tekst"], 100).Visible) {
        Log.Checkpoint("Introduction is in offer");
    } else {
        Log.Error("Cannot find introduction in offer");
    }

    // check module 1
    const module1 = testData.key.content.findChild(["ObjectType", "contentText"], ["Panel", "Automatisert delbeskrivelse 1*"], 100);

    if (module1.findChild(["ObjectType", "contentText"], ["TextNode", "Automatisert delbeskrivelse 1"], 100).Visible) {
        Log.Checkpoint("Heading for module 1 is in offer");
    } else {
        Log.Error("Cannot find heading in module 1");
    }
    if (module1.findChild(["ObjectType", "contentText"], ["TextNode", "En beskrivelse av automatisert delbeskrivelse 1"], 100)) {
        Log.Checkpoint("description for module 1 is in offer");
    } else {
        Log.Error("Cannot find description in module 1");
    }
    if (module1.findChild(["ObjectType", "contentText"], ["TextNode", "*1 222*"], 100).Visible) {
        Log.Checkpoint("price for module 1 is in offer");
    } else {
        Log.Error("Cannot find price in module 1");
    }

    // check module 2
    const module2 = testData.key.content.findChild(["ObjectType", "contentText"], ["Panel", `${byggedelNavn}*`], 100);

    if (module2.findChild(["ObjectType", "contentText"], ["TextNode", "Mengde"], 100).Visible) {
        Log.Checkpoint("amount for module 2 is in offer");
    } else {
        Log.Error("Cannot find heading in module 2");
    }
    if (module2.findChild(["ObjectType", "contentText"], ["TextNode", "Varer"], 100).Visible) {
        Log.Checkpoint("goods price module 2 is in offer");
    } else {
        Log.Error("Cannot find goods price in module 2");
    }
    if (module2.findChild(["ObjectType", "contentText"], ["TextNode", "Timer"], 100).Visible) {
        Log.Checkpoint("hours for module 2 is in offer");
    } else {
        Log.Error("Cannot find hours in module 2");
    }

    // check module 3
    const module3 = testData.key.content.findChild(["ObjectType", "contentText"], ["Panel", "Automatisert delbeskrivelse 3*"], 100);

    if (module3.findChild(["ObjectType", "contentText"], ["TextNode", "Automatisert delbeskrivelse 3"], 100).Visible) {
        Log.Checkpoint("Heading for module 3 is in offer");
    } else {
        Log.Error("Cannot find heading in module 3");
    }

    // Check total price
    const totalPrice = testData.key.content.findChild("ObjectType", "Table", 100).Cell(0, 1).contentText.replace(/,(.*)/g, "").replace(" ", "");
    if (parseInt(totalPrice, 10) === sum) {
        Log.Checkpoint("Total price is correct");
    } else {
        Log.Error(`totalPrice is not correct, expected ${sum} got ${totalPrice} `);
    }
}

function tilbudTC1(byggedelKategori, byggedelNavn) {
    byggedeler.ByggedelerTC1(byggedelKategori, byggedelNavn);
    const mengde = "10";
    const nyPris = "3000";
    const timer = "5";

    if (testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 1000).Visible) {
        testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 1000).Click();
    }

    const offerLink = testData.key.leftMenu.findChild("namePropStr", "Tilbud", 100);
    offerLink.Click();
    utils.waitForPage(testData.key.URL);

    const startNewOfferButton = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Opprett nytt tilbud"], 100);
    startNewOfferButton.Click();
    aqUtils.Delay(2500);

    function editField(fieldName, value) {
        testData.key.content.findChild("ObjectIdentifier", fieldName, 100).Keys(value);
    }

    const goToPreview = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "G* til forh*ndsvisning"], 100);

    editField("offer_introduction", "Introduksjon til det automatiserte tilbudet");
    editField("offer_description", "En beskrivelse av det automatiserte tilbudet, som kan inneholde litt ekstra tekst");
    testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Kontaktinfo"], 100).Click();
    editField("offer_customer_name", "Ille Fransen");
    editField("offer_customer_phone", "48196176");
    editField("offer_customer_address", "Klinkekuleveien 39");
    editField("postnummer", "0364");

    goToPreview.Click();
    aqUtils.Delay(500);

    if (testData.key.content.findChild(["ObjectType", "contentText"], ["Panel", "For * kunne opprette et tilbud, m* du navngi tilbudet"], 100).Visible === true) {
        Log.Checkpoint("Title Warning showing");
    } else {
        Log.Error("Title warning not showing");
    }

    editField("offer_name", "Automatisert tilbud");


    // add module

    editField("module_0_name", "Automatisert delbeskrivelse 1");
    aqUtils.Delay(1000);
    editField("module_0_description", "En beskrivelse av automatisert delbeskrivelse 1");
    aqUtils.Delay(1000);
    editField("module_totalsum", "1222");
    testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Label", "Vis\nberegning\ni tilbud"], 100).Click();
    aqUtils.Delay(2000);
    testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Legg til delbeskrivelse"], 100).Click();
    editField("module_1_name", "Automatisert delbeskrivelse 2");
    Sys.Desktop.Keys("[Tab]");
    aqUtils.Delay(2000);
    const module2ID = testData.key.content.findChild(["ObjectType", "Text"], ["Textbox", "Automatisert delbeskrivelse 2"], 100).idStr.replace(/[^0-9]/g, "");
    Log.Message(`module2 ID: ${module2ID}`);
    testData.key.content.findChild("idStr", `module-${module2ID}-source`, 100).Click();
    aqUtils.Delay(2000);
    testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Mine byggedeler"], 100).Click();
    aqUtils.Delay(2000);
    testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", byggedelNavn], 100).Click();
    aqUtils.Delay(5000);


    function verifyValue(fieldName, expected) {
        const moduleFieldValue = testData.key.content.findChild("idStr", fieldName, 100).Text;
        return moduleFieldValue === expected ? Log.Checkpoint(`${fieldName} is correct`) : Log.Error(`${fieldName} is wrong, got ${moduleFieldValue} expected ${expected} `);
    }

    verifyValue(`module-${module2ID}-amount`, mengde);
    verifyValue(`module-${module2ID}-productprice`, nyPris);
    verifyValue(`module-${module2ID}-hours`, timer);
    verifyValue(`module-${module2ID}-markup`, "");
    verifyValue(`module-${module2ID}-hourlyrate`, "");
    verifyValue(`module-${module2ID}-totalsum`, nyPris);

    testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Label", "Vis\nmengde\ni tilbud"], 100).Click();
    testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Label", "Vis\nproduktpris\ni tilbud"], 100).Click();
    testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Label", "Vis\ntimer\ni tilbud"], 100).Click();

    // add module 2

    testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Legg til delbeskrivelse"], 100).Click();
    editField("module_2_name", "Automatisert delbeskrivelse 3");
    Sys.Desktop.Keys("[Tab]");
    aqUtils.Delay(2000);
    const module3ID = testData.key.content.findChild(["ObjectType", "Text"], ["Textbox", "Automatisert delbeskrivelse 3"], 100).idStr.replace(/[^0-9]/g, "");
    testData.key.content.findChild("idStr", `module-${module3ID}-source`, 100).Click();
    aqUtils.Delay(2000);
    Log.message(module3ID);
    testData.key.content.findChild(["ObjectType", "ObjectLabel", "Visible"], ["Button", "Byggedeler", true], 100).Click();
    aqUtils.Delay(2000);

    testData.key.page.findChild(["ObjectType", "contentText"], ["Link", "Rekkverk og levegger"], 100).Click();
    testData.key.page.findChild(["ObjectType", "contentText"], ["TextNode", "Rekkverk royal 48x73-19x148 topp/bunn/spiler-45x145 topprekke"], 100).Click();
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "group_amount"], 100).Keys("10");
    testData.key.page.findChild(["ObjectType", "ObjectLabel", "Visible"], ["Button", "Beregn", true], 100).Click();
    testData.key.page.findChild(["ObjectType", "ObjectLabel", "Visible"], ["Button", "Legg i tilbudet", true], 100).Click();
    aqUtils.Delay(2000);
    testData.key.content.findChild(["ObjectType", "contentText", "VisibleOnScreen"], ["TextNode", "Varer", true], 100).Click();
    if (testData.key.content.findChild(["ObjectType", "VisibleOnScreen"], ["Table", true], 100).RowCount > 1) {
        Log.Checkpoint("Found item lines");
    } else {
        Log.Error("No items found");
    }

    testData.key.content.findChild(["ObjectType", "ObjectLabel", "VisibleOnScreen"], ["Label", "Vis\nberegning\ni tilbud", true], 100).Click();
    const module3Value = parseInt(testData.key.content.findChild("idStr", `module-${module3ID}-totalsum`, 100).Text, 10);

    const totalSum = 1222 + 3000 + module3Value;
    const totalSumOffer = testData.key.content.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "offer_total_sum"], 100);

    if (parseInt(totalSumOffer.Text, 10) === totalSum) {
        Log.Checkpoint("Total sum on offer is correct");
    } else {
        Log.Error(`total sum on offer is incorrect expected ${totalSum}, got ${totalSumOffer}`);
    }

    // change totalsum
    totalSumOffer.Keys(5000);
    const reCalculateOffer = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "beregne på nytt"], 100);
    if (reCalculateOffer.Visible) {
        Log.Checkpoint("Change warning showing");
    } else {
        Log.Error("change warning not showing.");
    }

    reCalculateOffer.Click();
    aqUtils.Delay(1000);

    if (parseInt(testData.key.content.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "offer_total_sum"], 100).Text, 10) === totalSum) {
        Log.Checkpoint("Total sum on offer is correct");
    } else {
        Log.Error(`total sum on offer is incorrect expected ${totalSum}`);
    }

    testData.key.content.findChild(["ObjectType", "ObjectIdentifier"], ["Textarea", "offer_signaturetext"], 100).Keys("Litt tekst over signaturen");
    goToPreview.Click();
    aqUtils.Delay(500);


    // check preview

    verifyCustomerPreview(byggedelNavn, totalSum);

    // create PDF Button
    testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lag PDF"], 100).Click();
    aqUtils.Delay(30000);

    if (testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Last ned som PDF*"], 100).Visible) {
        Log.Checkpoint("Download PDF is visible");
    } else {
        Log.Error("Download PDF is not visible");
    }

    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Automatisert tilbud"], 100).Visible) {
        Log.Checkpoint("Offer name visible");
    } else {
        Log.Error("Offer name not visible");
    }

    if (testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Klinkekuleveien 39, 0364 OSLO"], 1000).Visible) {
        Log.Checkpoint("Offer address visible");
    } else {
        Log.Error("Offer address not visible");
    }

    const totalPrice = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Totalt*"], 100).contentText.replace(/([A-Za-z])|(,(.*))/g, "").replace(/ /g,"");
    Log.message(totalPrice);
    if (parseInt(totalPrice, 10) === totalSum) {
        Log.Checkpoint("Total price is correct");
    } else {
        Log.Error(`totalPrice is not correct, expected ${totalSum} got ${parseInt(totalPrice, 10)} `);
    }
}

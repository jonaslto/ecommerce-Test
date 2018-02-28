const testData = require("testData");
const utils = require("OrderUtils");
const cart = require("cartUtils");
const checkout = require("checkoutUtils");
const m3Utils = require("m3Utils");


function ecomTC1() {
    utils.addProduct("7084157");

    // gå til handlevogn
    testData.key.minicart.Click();
    testData.key.showCart.Click();
    aqUtils.Delay(30000);
    Aliases.browser.Page(testData.key.checkoutURL).Wait();

    testData.key.deliveryMethod.ClickItem(2);
    testData.key.pickupDate.setText(utils.pickDate());
    testData.key.pickupTime.ClickItem(2);
    testData.key.pickupPoint.ClickItem(75);
    aqUtils.Delay(5000);

    const checkoutTable = testData.key.checkoutTable;
    for (let i = 0; i < checkoutTable.rowCount; i++) {
        if (checkoutTable.cell(i, 1).contentText.includes("7084157")) {
            // legg til kommentar pÃ¥ varelinje:
            checkoutTable.cell(i, 0).Link(0).Click();
            Sys.Keys("Kommentar til vare 1");

            // Endre antall bestilt
            aqUtils.Delay(1000);
            checkoutTable.cell(i, 2).findChild("ObjectType", "Textbox", 1).setText("3");

            // sjekk at pris stemmer pÃ¥ linjen.

            const unit = checkoutTable.cell(i, 6).contentText.substr(checkoutTable.cell(i, 6).contentText.indexOf("/") + 1, checkoutTable.cell(i, 6).contentText.length);
            let unitPrice = checkoutTable.cell(i, 6).contentText.substr(0, checkoutTable.cell(i, 6).contentText.indexOf("/"));
            unitPrice = parseFloat(unitPrice.replace(",", ".").replace(" ", ""));
            const totalPrice = parseFloat(checkoutTable.cell(i, 8).contentText.replace(",", ".").replace(" ", ""));
            const selectUnit = checkoutTable.cell(i, 3).findChild("ObjectType", "Select", 2);
            selectUnit.ClickItem(unit);

            if (unitPrice * 3 === totalPrice) {
                Log.Message("Pris matcher");
            } else {
                Log.Error(`Pris matcher ikke. Antall: ${unitPrice} unit: ${unit} totalpris:  ${checkoutTable.cell(i, 8).contentText}`);
            }
            break;
        }
        /* for(let j = 0; j < 20; j++){
            Log.Message(checkoutTable.Cell(2, j).contentText);
        }*/
    }
    // Oppdater handlevogn
    testData.key.reCalcButton.Click();
    aqUtils.Delay(20000);

    // Bestill varer nÃ¥:
    testData.key.orderNow.Click();

    if (testData.key.deliveryMethod.wSelectedItem === 0 || testData.key.deliveryMethod.wSelectedItem === 1) {
        utils.unloading("Kraning av sjåfør opp på/inn i bygg",
            "10 m",
            false,
            "Liten bil (trang byggeplass / lav undergang)",
            true,
            12);
    }
    testData.key.contactName.setText("Automatisert test");
    testData.key.contactPhone.setText("48196176");
    testData.key.checkOrder.Click();
    testData.key.sendOrder.Click();

    // hent batchordrenummer
    const hash = testData.key.seeOrder.hash;
    const orderNr = hash.substr(hash.indexOf("/") + 1, hash.lastIndexOf("/") - 2);
    ProjectSuite.Variables.currentOrderId = orderNr;

    // Sjekk hvis ordrenummer har dukket opp i ordrelisten.
    utils.checkOrderNumber(ProjectSuite.Variables.currentOrderId);
}
function ecomTC2() {
    // TC 1. varer og byggedeler -> gå til kategori (fungerer muligens ikke)
    testData.link.varerOgByggedeler.Click();
    testData.link.linkEcomByggedeler.Click();
    const categories = [
        "Gulv og innredning",
        "Gulv",
        "Gulvbelegg"];
    const item = "7422472";
    const qty = 3;
    const products = {};
    const shipping = "Vanlig levering";
    const deliveryTime = null; // 13-16
    const pickupPoint = null; // "Optimera dist. lager Østre Aker vei"
    const delivery = "Vanlig levering";
    const craneLength = null;
    const turnablePlasterFork = null;
    const carType = null;
    const rearMountedCrane = null;
    const maxAllowedWeightRequirement = null;
    const maxAllowedWeight = null;
    const name = "Automatisert test";
    const phone = "48196176";

    utils.findCategories(categories);
    products.item = utils.addToCart(item, qty);

    testData.key.minicart.Click();
    testData.key.showCart.Click();

    utils.waitForPage();
    cart.shipping(shipping);
    cart.deliveryDate();
    cart.deliveryTime(deliveryTime);
    cart.selectPickupPoint(pickupPoint);

    cart.editItemLine(products.item, 3);
    cart.orderNowButton();
    utils.waitForPage();
    checkout.unloading(delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight);

    checkout.continueToContact();
    checkout.contactInformation(name, phone);
    checkout.checkOrder();
    checkout.sendOrder();
}

function ecomTC3(item, qty, shipping, deliveryTime, pickupPoint, delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight, name, phone) {
    const products = {};
    utils.search(item);
    products.item = utils.addToCart(item, qty);
    aqUtils.Delay(8000);
    utils.goToCart();

    utils.waitForPage();
    cart.shipping(shipping);
    cart.deliveryDate();
    cart.deliveryTime(deliveryTime, shipping);
    cart.selectPickupPoint(pickupPoint);

    cart.editItemLine(products.item, qty - 1);
    cart.orderNowButton();
    if (shipping !== "Hent ferdig pakket") {
        checkout.unloading(delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight);
        checkout.continueToContact();
    }

    checkout.contactInformation(name, phone);
    checkout.checkOrder();
    checkout.sendOrder();

    const deliveryConditions = m3Utils.getDeliveryConditions(delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight, phone);
    ProjectSuite.Variables.deliveryString = deliveryConditions;
    Log.Message(deliveryConditions);
    checkout.checkBatchOrder();
    m3Utils.createOrderFromBatchOrder();
    m3Utils.changeOrderStatusTo44(shipping);
    m3Utils.changeOrderStatusTo66();

    // Check if deliveryConditions matches M3 delivery string
    if (shipping !== "Hent ferdig pakket") {
      Log.Message(`shipping: ${shipping} typeof${typeof(shipping)}`);
      const deliveryStringM3 = m3Utils.findDeliveryString(shipping);

      if (deliveryConditions.toLowerCase() === deliveryStringM3.toLowerCase()) {
          Log.Checkpoint(`deliveryConditions ${deliveryConditions} matches string in m3 ${deliveryStringM3} `);
      } else {
          Log.Error(`deliveryConditions (${deliveryConditions}) ${typeof(deliveryConditions)} does not match string in m3 (${deliveryStringM3}) ${typeof(deliveryStringM3)} `);
      }
    }
    
    // m3Utils.changeOrderStatusTo77();
}

function ecomTC4(item, qty, shipping, deliveryTime, pickupPoint, delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight, name, phone) {
    const products = {};
    const varerOgByggedelerLink = testData.key.siteMenu.findChild(["ObjectType", "namePropStr"], ["Link", "varer"], 10);
    varerOgByggedelerLink.Click();
    utils.waitForPage();

    const ecomLink = testData.key.appContent.findChild(["ObjectType", "namePropStr"], ["Link", "nettbutikk"], 10);
    ecomLink.Click();
    utils.waitForPage();
    const categories = [
        "Trelast og listverk",
        "Konstruksjonsvirke (K-virke)",
        "Justert K-virke, ubehandlet"];

    utils.findCategories(categories);

    products.item = utils.addToCart(item, qty);
    aqUtils.Delay(8000);
    utils.goToCart();

    utils.waitForPage();
    cart.shipping(shipping);
    cart.deliveryDate();
    cart.deliveryTime(deliveryTime);
    cart.selectPickupPoint(pickupPoint);

    cart.editItemLine(products.item, qty - 1);
    cart.orderNowButton();
    if (shipping !== "Hent ferdig pakket") {
        checkout.unloading(delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight);
    }

    checkout.continueToContact();
    checkout.contactInformation(name, phone);
    checkout.checkOrder();
    checkout.sendOrder();

    const deliveryConditions = m3Utils.getDeliveryConditions(delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight, phone);
    ProjectSuite.Variables.deliveryString = deliveryConditions;
    Log.Message(deliveryConditions);
    checkout.checkBatchOrder();
    m3Utils.createOrderFromBatchOrder();
    m3Utils.changeOrderStatusTo44(shipping);
    m3Utils.changeOrderStatusTo66();
    // m3Utils.changeOrderStatusTo77();
}

function ecomTCAutoFrigi(item, qty, shipping, deliveryTime, pickupPoint, delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight, name, phone) {
    const products = {};
    utils.search(item);
    products.item = utils.addToCart(item, qty);
    aqUtils.Delay(8000);
    utils.goToCart();

    utils.waitForPage();
    cart.shipping(shipping);
    cart.deliveryDate();
    cart.deliveryTime(deliveryTime, shipping);
    cart.selectPickupPoint(pickupPoint);

    cart.editItemLine(products.item, qty - 1);
    cart.orderNowButton();
    if (shipping !== "Hent ferdig pakket") {
        checkout.unloading(delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight);
        checkout.continueToContact();
    }

    checkout.contactInformation(name, phone);
    checkout.checkOrder();
    checkout.sendOrder();

    const deliveryConditions = m3Utils.getDeliveryConditions(delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight, phone);
    ProjectSuite.Variables.deliveryString = deliveryConditions;
    Log.Message(deliveryConditions);
    
    //checkout.checkBatchOrder();
    //m3Utils.createOrderFromBatchOrder();
    checkout.checkOrderNumber();
    m3Utils.changeOrderStatusTo44(shipping);
    m3Utils.changeOrderStatusTo66();

    // Check if deliveryConditions matches M3 delivery string
    if (shipping !== "Hent ferdig pakket") {
      Log.Message(`shipping: ${shipping} typeof${typeof(shipping)}`);
      const deliveryStringM3 = m3Utils.findDeliveryString(shipping);

      if (deliveryConditions.toLowerCase() === deliveryStringM3.toLowerCase()) {
          Log.Checkpoint(`deliveryConditions ${deliveryConditions} matches string in m3 ${deliveryStringM3} `);
      } else {
          Log.Error(`deliveryConditions (${deliveryConditions}) ${typeof(deliveryConditions)} does not match string in m3 (${deliveryStringM3}) ${typeof(deliveryStringM3)} `);
      }
    }
    
    // m3Utils.changeOrderStatusTo77();
}
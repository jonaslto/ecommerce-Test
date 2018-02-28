const utils = require("orderUtils");

function getDeliveryConditions(delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight, phone) {
    let deliveryString = "";
    let deliveryStringSlice;

    if (delivery === "UseTowerCrane") {
        deliveryString += "L0-";
    }
    switch (craneLength) {
    case "Crane20MNoJib":
        deliveryString += "L1-";
        break;
    case "Crane20MJib":
        deliveryString += "L2-";
        break;
    case "Crane25MJib":
        deliveryString += "L3-";
        break;
    case "Crane30MJib":
        deliveryString += "L4-";
        break;
    default:
        deliveryString += "";
    }

    if (turnablePlasterFork === true) {
        deliveryString += "VbGfl-";
    }

    switch (carType) {
    case "SmallCar":
        deliveryString += "Liten-";
        break;
    case "BoxTruck":
        deliveryString += "Skap-";
        break;
    default:
        deliveryString += "";
    }

    if (rearMountedCrane === true) {
        deliveryString += "Bak-";
    }

    if (maxAllowedWeightRequirement === true) {
        deliveryString += `Max${maxAllowedWeight}-`;
    }

    if (deliveryString.charAt(deliveryString.length - 1) === "-") {
        deliveryStringSlice = deliveryString.slice(0, (deliveryString.length - 1));
    }
    deliveryStringSlice += ` tlf${phone}`;
    return deliveryStringSlice;
}

function tabWait() {
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    //Aliases.MangoClient.Item3.Keys("[Tab]");
    aqUtils.Delay(500);
}
function backTabWait() {
    Aliases.wfica32.wndTransparentWindowsClient.Keys("![Tab]");
    aqUtils.Delay(500);
}

// runs program OIS275 in m3.
function createOrderFromBatchOrder() {
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^r OIS275 [Enter]");
    aqUtils.Delay(60000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys(ProjectSuite.Variables.currentOrderId);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("![Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[BS]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(3000);
    utils.repeat(tabWait, 3);
    aqUtils.Delay(5000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(3000);
    utils.repeat(tabWait, 1);
    aqUtils.Delay(5000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(8000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    aqUtils.Delay(5000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    aqUtils.Delay(200);
    Sys.Desktop.KeyDown(VK_NUMPAD2);
    aqUtils.Delay(200);
    Sys.Desktop.KeyUp(VK_NUMPAD2);
    aqUtils.Delay(200);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    aqUtils.Delay(200);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(3000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^c");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^c");
    ProjectSuite.Variables.orderID = Sys.Clipboard;
    Log.Message(`${ProjectSuite.Variables.orderID} saved`);
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
}

function findOrder() {
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^r OIS300 [Enter]");
    aqUtils.Delay(20000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys(ProjectSuite.Variables.orderID);
    aqUtils.Delay(1000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    tabWait();
    aqUtils.Delay(1000);
}

function changeOrderStatusTo44(shipping) {
    Log.Message("Change orderstatus to 44 start");
    findOrder();
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD4);
    Sys.Desktop.KeyUp(VK_NUMPAD4);
    Sys.Desktop.KeyDown(VK_NUMPAD3);
    Sys.Desktop.KeyUp(VK_NUMPAD3);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(5000);

    if (shipping !== "Hent ferdig pakket") {
        // Create sending
        Sys.Desktop.KeyDown(VK_CONTROL);
        Sys.Desktop.KeyDown(VK_NUMPAD2);
        Sys.Desktop.KeyUp(VK_NUMPAD2);
        Sys.Desktop.KeyDown(VK_NUMPAD4);
        Sys.Desktop.KeyUp(VK_NUMPAD4);
        Sys.Desktop.KeyUp(VK_CONTROL);
        aqUtils.Delay(2000);
        Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
        aqUtils.Delay(500);
        Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
        aqUtils.Delay(1000);
        Sys.Desktop.KeyDown(VK_CONTROL);
        Sys.Desktop.KeyDown(VK_NUMPAD2);
        Sys.Desktop.KeyUp(VK_NUMPAD2);
        Sys.Desktop.KeyDown(VK_NUMPAD5);
        Sys.Desktop.KeyUp(VK_NUMPAD5);
        Sys.Desktop.KeyUp(VK_CONTROL);
        aqUtils.Delay(2000);
        Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    }
    aqUtils.Delay(1000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD3);
    Sys.Desktop.KeyUp(VK_NUMPAD3);
    Sys.Desktop.KeyDown(VK_NUMPAD2);
    Sys.Desktop.KeyUp(VK_NUMPAD2);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(10000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F5]");
    aqUtils.Delay(1000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
}
/*
    Aliases.MangoClient.Item3.Keys("[Tab]");
    Aliases.MangoClient.Item3.Keys("[Tab]");
    Aliases.MangoClient.Item3.Keys("[Tab]");
}*/

function changeOrderStatusTo66() {
    Log.Message("Start change orderstatus to 66");
    findOrder();
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD4);
    Sys.Desktop.KeyUp(VK_NUMPAD4);
    Sys.Desktop.KeyDown(VK_NUMPAD3);
    Sys.Desktop.KeyUp(VK_NUMPAD3);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(5000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(2000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyDown(VK_NUMPAD4);
    Sys.Desktop.KeyUp(VK_NUMPAD4);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(4000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F10]");
    aqUtils.Delay(3000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("1");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("STK");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F12]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys(" ");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
}

function changeOrderStatusTo77() {
    // do something
    Log.Message("start change orderstatus to 77");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^r OIS180 [Enter]");
    aqUtils.Delay(5000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys(ProjectSuite.Variables.orderID);
    aqUtils.Delay(500);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys(ProjectSuite.Variables.orderID);
    aqUtils.Delay(500);
    utils.repeat(backTabWait, 9);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^a 170404");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^a 170430");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("![Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("![Tab]");
    aqUtils.Delay(500);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(500);
    Sys.Desktop.Keys("[Enter]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    aqUtils.Delay(500);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^r OIS350 [Enter]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Del]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys(ProjectSuite.Variables.orderID);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(500);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD5);
    Sys.Desktop.KeyUp(VK_NUMPAD5);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(500);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^c");
    ProjectSuite.Variables.invoiceID = Sys.Clipboard;
    Log.Message(`${ProjectSuite.Variables.invoiceID} saved`);
}

function findDeliveryString(shipping) {
    Log.Message("start find delivery string");

    findOrder();
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD2);
    Sys.Desktop.KeyUp(VK_NUMPAD2);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(5000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(500);
    //Log.message(typeof shippingString);
    Log.Message(typeof shipping);
    if (shipping === "Tidsbestemt levering") {
        Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    } else {
        Aliases.wfica32.wndTransparentWindowsClient.Keys("![Tab]");
    }
    aqUtils.Delay(500);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^c");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^c");
    const deliveryString = Sys.Clipboard;
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    aqUtils.Delay(500);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    return deliveryString;
}

module.exports = { getDeliveryConditions, createOrderFromBatchOrder, changeOrderStatusTo44, changeOrderStatusTo66, changeOrderStatusTo77, findDeliveryString };

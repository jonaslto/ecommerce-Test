const testData = require("testData");
const utils = require("OrderUtils");

function shipping(method) {
    const shippingMethod = testData.key.ecomContent.findChild("ObjectIdentifier", "ShippingMethod", 100);
    shippingMethod.ClickItem(method);
}
function deliveryDate() {
    const deliveryDateTextbox = testData.key.ecomContent.findChild("ObjectIdentifier", "DeliveryDate", 100);
    deliveryDateTextbox.SetText(utils.pickDate());
}
function deliveryTime(time, method) {
    let timeType;
    aqUtils.Delay(1000);
    if (method === "Hent ferdig pakket") {
        timeType = "PickupTimeOfDay";
    } else if (method === "Tidsbestemt levering") {
        timeType = "DeliveryTimeOfDay";
    }
    if (time !== null) {
        const deliveryTimePicker = testData.key.ecomContent.findChild("ObjectIdentifier", timeType, 100);
        deliveryTimePicker.ClickItem(time);
    }
}

function selectPickupPoint(location) {
    aqUtils.Delay(1000);
    if (location !== null) {
        const pickupPoint = testData.key.ecomContent.findChild("ObjectIdentifier", "PickupPoint", 100);
        pickupPoint.ClickItem(location);
    }
}

function findColumns(column) {
    const cartTable = testData.key.ecomContent.find("ObjectType", "Table", 100);
    const itemCell = Array.from(cartTable.findAll("ObjectType", "Cell", 100));
    const findLine = itemCell.find(function (cell) {
        return cell.contentText.includes(column) && cell.RowIndex === 0;
    });
    return findLine.ColumnIndex;
}

function editItemLine(item, qty) {
    utils.waitForPage();
    const cartTable = testData.key.ecomContent.find("ObjectType", "Table", 100);
    const itemCell = Array.from(cartTable.findAll("ObjectType", "Cell", 1));
    const findLine = itemCell.find(function (cell) {
        return cell.contentText.includes(item.itemNumber);
    });

    // column 0 is for item comment
    cartTable.Cell(findLine.RowIndex, 0).FindChild("ObjectType","Button").Click();
    Sys.Keys("Kommentar til vare");

    const qtyColumn = findColumns("Mengde");
    const unitColumn = findColumns("Enhet");
    const retailColumn = findColumns("Veil. pris");
    const yourPriceColumn = findColumns("Din pris");
    const sumColumn = findColumns("Sum");

    cartTable.Cell(findLine.RowIndex, qtyColumn).findChild("ObjectType", "Textbox", 1).SetText(qty);

    aqUtils.Delay(3000);

    // column 3 is unit
    const unit = cartTable.Cell(findLine.RowIndex, unitColumn).contentText;
    if (item.unit === unit) {
        Log.Checkpoint("unit match");
    } else {
        Log.Error(`unit does not match ${unit} and ${item.unit}`);
    }

    // column 4 is retail price
    const lineRetailPrice = cartTable.Cell(findLine.RowIndex, retailColumn).contentText.substring(3, cartTable.Cell(findLine.RowIndex, retailColumn).contentText.length);
    if (lineRetailPrice === item.retail) {
        Log.Checkpoint("retailPrice Match");
    } else {
        Log.Error(`retailPrice does not match (${lineRetailPrice}) and (${item.retail}) `);
    }
    // column 5 is your price
    let lineYourPrice = cartTable.Cell(findLine.RowIndex, yourPriceColumn).contentText.substring(3, cartTable.Cell(findLine.RowIndex, yourPriceColumn).contentText.length);
    if (lineYourPrice === item.price) {
        Log.Checkpoint("yourPrice Match");
    } else {
        Log.Error(`yourPrice does not match (${lineYourPrice}) ${typeof lineYourPrice} and (${item.price}) ${typeof item.price}`);
    }

    // column 6 is sum
    const lineSum = cartTable.Cell(findLine.RowIndex, sumColumn).contentText
        .substring(3, cartTable.Cell(findLine.RowIndex, sumColumn).contentText.length)
        .replace(",", ".");

    const lineSumFloat = parseFloat(lineSum);

    lineYourPrice = lineYourPrice.replace(",", ".");
    const lineYourPriceFloat = parseFloat(lineYourPrice);

    const lineCalculation = (qty * lineYourPriceFloat);

    if (lineCalculation === lineSumFloat) {
        Log.Checkpoint("totalprice Match");
    } else {
        Log.Error(`totalprice does not match ${lineCalculation} and ${lineSumFloat}`);
    }
}

function orderNowButton() {
    const orderButton = Array.from(testData.key.ecomContent.findAll("ObjectType", "Button", 100));
    const findButton = orderButton.find(function (button) {
        return button.contentText.includes("Bestill varene nå");
    });
    findButton.Click();
    utils.waitForPage();
    while (testData.key.ecomContent.findChild(["ObjectType", "ObjectIdentifier"], ["panel", "loading_bar_spinner"], 100).Exists) {
        aqUtils.Delay(1000);
    }
}

module.exports = { editItemLine, orderNowButton, shipping, deliveryDate, deliveryTime, selectPickupPoint, findColumns };

function stupidTest() {
  const shippingMethod = testData.key.ecomContent.findChild("ObjectIdentifier", "ShippingMethod", 100);
  aqUtils.Delay(1000);
  shippingMethod.ClickItem("Hent *");
}

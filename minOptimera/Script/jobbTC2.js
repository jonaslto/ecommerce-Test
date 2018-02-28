const testData = require("testData");
const utils = require("utils");

function jobbTC2() {
    utils.goToMenuItem("000001", "varer");

    testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Lydgulv og lydhimlinger"], 100).Click();
    testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "48x198mm bjelkelag med 150 isolasjon lydgulv og lydhimling 2 lag gips"], 100).Click();
    testData.key.content.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "group_amount"], 100).Keys("10");
    testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["Button", "Beregn"], 100).Click();
    aqUtils.Delay(10000);

    // check if amount is correct
    if (testData.key.content.findChild("innerText", "Mengde*", 100).contentText.replace(/\D/g, "") === "10") {
        Log.Checkpoint("Amount is correct");
    } else {
        Log.Error(`Expected 10m2, showing: ${testData.key.content.findChild("innerText", "Mengde*", 100).contentText}`);
    }

    const calculationPrice = parseInt(testData.key.content.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "calculation_productprice"], 100).Text, 10);
    const hours = parseFloat(testData.key.content.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "calculation_hours"], 100).Text.replace(",", "."), 10);
    testData.key.content.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "calculation_hourlyrate"], 100).Keys("100");
    Log.Message(hours);
    Log.Message(calculationPrice);
    const total = calculationPrice + (hours * 100);

    // Verify total Price
    if (parseInt(testData.key.content.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "calculation_totalsum"], 100).Text, 10) === total) {
        Log.Checkpoint("Total price is correct");
    } else {
        Log.Error(`Totalprice is not correct, expected ${total} received ${parseInt(testData.key.content.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "calculation_totalsum"], 100).Text, 10)}`);
    }

    // get all items
    testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Varer i byggedelen"], 100).Click();
    aqUtils.Delay(10000);

    // Creates an array and inserts all lines in component as objects in the array
    let itemsFromComponent = [];
    itemsFromComponent = (function () {
        const table = testData.key.content.findChild("ObjectType", "Table", 100);
        for (let i = 1; i < table.RowCount; i++) {
            const obj = {
                item: table.Cell(i, 0).contentText,
                amount: table.Cell(i, 1).contentText,
                unit: table.Cell(i, 2).contentText,
                retailPrice: table.Cell(i, 3).contentText,
                yourPrice: table.Cell(i, 4).contentText
            };
            itemsFromComponent.push(obj);
        }

        return itemsFromComponent;
    }());

    testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Estimeringsgrunnlag"], 100).Click();
    aqUtils.Delay(2500);

    testData.key.content.findChild(["ObjectType", "ObjectIdentifier"], ["Button", "calculate_building_part_result_dropdown"], 100).Click();
    testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "I mine byggedeler"], 100).Click();
    testData.key.page.findChild(["ObjectType", "contentText"], ["Link", "G* til byggedelen"], 100).Click();

    aqUtils.Delay(3500);
    testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Varer i byggedelen"], 100).Click();
    aqUtils.Delay(5000);

    let itemsFromSavedComponent = [];
    itemsFromSavedComponent = (function () {
        const table = testData.key.content.findChild("ObjectType", "Table", 100);
        for (let i = 1; i < table.RowCount; i++) {
            const obj = {
                item: table.Cell(i, 0).contentText,
                amount: table.Cell(i, 1).contentText,
                unit: table.Cell(i, 2).contentText,
                retailPrice: table.Cell(i, 3).contentText,
                yourPrice: table.Cell(i, 4).contentText
            };
            itemsFromSavedComponent.push(obj);
        }

        return itemsFromSavedComponent;
    }());

    Log.Message(`itemsFromComponent ${itemsFromComponent.length}`);
    Log.Message(`itemsFromSavedComponent ${itemsFromSavedComponent.length}`);

    if (itemsFromComponent.length === itemsFromSavedComponent.length) {
        for (let i = 1; i < itemsFromComponent.length; i++) {
            if (itemsFromSavedComponent[i].item === itemsFromComponent[i].item &&
                itemsFromSavedComponent[i].amount === itemsFromComponent[i].amount &&
                itemsFromSavedComponent[i].unit === itemsFromComponent[i].unit &&
                itemsFromSavedComponent[i].retailPrice === itemsFromComponent[i].retailPrice &&
                itemsFromSavedComponent[i].yourPrice === itemsFromComponent[i].yourPrice
            ) {
                Log.Checkpoint(`(${itemsFromSavedComponent[i].item}) match (${itemsFromComponent[i].item})`);
            } else {
                Log.Error(`There is a mismatch between the two objects: 
                        (${itemsFromComponent[i].item}) - (${itemsFromSavedComponent[i].item})
                        (${itemsFromComponent[i].amount}) -(${itemsFromSavedComponent[i].amount})
                        (${itemsFromComponent[i].unit}) - (${itemsFromSavedComponent[i].unit})
                        (${itemsFromComponent[i].retainPrice}) - (${itemsFromSavedComponent[i].retainPrice})
                        (${itemsFromComponent[i].yourPrice}) - (${itemsFromSavedComponent[i].yourPrice})
                        
                        `);
            }
        }
    } else {
        Log.Error("Doesn't match");
    }
}

function testTC1() {
    let itemsFromComponent = [];
    itemsFromComponent = (function () {
        const table = testData.key.content.findChild("ObjectType", "Table", 100);
        for (let i = 1; i < table.RowCount; i++) {
            const obj = {
                item: table.Cell(i, 0).contentText,
                amount: table.Cell(i, 1).contentText,
                unit: table.Cell(i, 2).contentText,
                retainPrice: table.Cell(i, 3).contentText,
                yourPrice: table.Cell(i, 4).contentText
            };
            itemsFromComponent.push(obj);
        }

        return itemsFromComponent;
    }());

    Log.Message(itemsFromComponent[0].item);
}

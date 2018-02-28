const testData = require("testData");

function waitForPage() {
    testData.key.browser.Page(testData.key.URL).Wait();
}

function repeat(func, times) {
    func();
    if (times > 0) {
        repeat(func, times - 1);
    }
}

function pickDate() {
    const getNextWeekday = function (date) {
        const nextDay = new Date(date.getTime() + (72 * 60 * 60 * 1000));
        Log.Message(`nextday: ${nextDay.getDay()}`);
        return nextDay.getDay() !== 0 && nextDay.getDay() !== 6 ? nextDay : getNextWeekday(nextDay);
    };
    const nextWeekday = getNextWeekday(new Date());
    return `${nextWeekday.getDate()}.${nextWeekday.getMonth() + 1}.${nextWeekday.getFullYear()}`;
}

function findCategories(categories) {
    categories.forEach(function (category) {
        const categoryArr = Array.from(testData.key.ecomContent.findAll("ObjectType", "Link", 100));
        const findLink = categoryArr.find(function (link) {
            return link.contentText === category;
        });
        findLink.Click();
        Aliases.browser.Page(testData.key.URL).Wait();
    });
}

function addToCart(item, qty) {
    const itemArr = Array.from(testData.key.ecomContent.findAll(["ObjectType", "className"], ["Panel", "item"], 100));
    const findItem = itemArr.find(function (article) {
        return article.contentText.includes(item);
    });

    const itemContent = findItem.contentText.split("\n");
    Log.Message(itemContent);

    // retail price
    const findRetail = itemContent.find(function (str) {
        return str.includes("eil.");
    });
    const retailPrice = findRetail.replace(/[^0-9,]/g, "");

    // unit
    const itemUnit = findItem.findChild("ObjectIdentifier", "unit", 10).wText;

    // your price
    const findYour = itemContent.findIndex(function (str) {
        return str.includes("Din pris");
    });
    const yourPrice = itemContent[findYour + 1];

    const quantity = findItem.findChild("ObjectType", "NumberInput", 10);
    quantity.SetText(qty);
    const toCart = findItem.findChild("ObjectType", "Button", 10);
    toCart.Click();

    const itemInfo = {
        itemNumber: item,
        quantity: qty,
        unit: itemUnit,
        price: yourPrice,
        retail: retailPrice
    };
    return itemInfo;
}

function search(item) {
    testData.key.search.Keys(`${item} [Enter]`);
    waitForPage();
}

function checkOrderNumber(orderNumber) {
    testData.link.ordreLink.Click();
    aqUtils.Delay(20000);
    if (testData.orders.table.Cell(1, 0).TextNode(0).contentText === orderNumber) {
        Log.Message("Ordrenummer Funnet");
    } else {
        Log.Error("Ordrenummer etter registrering ikke funnet i ordrelisten");
    }
}

function goToCart() {
    const cart = testData.key.header.findChild("ObjectIdentifier", "cartContainer", 10);
    cart.Click();
    const showCartLink = testData.key.header.findChild(["ObjectType", "namePropStr"], ["Link", "handlevogn"], 10);
    showCartLink.Click();
}

module.exports = { repeat, search, checkOrderNumber, pickDate, addToCart, findCategories, waitForPage, goToCart };

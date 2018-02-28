const testData = require("testData");
const utils = require("utils");

function ByggedelerTC1(byggedelKateogri, byggedelNavn) {
    const mengde = 10;
    const nyPris = 3000;
    const timer = 5;

    if (testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 1000).Visible) {
        testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 1000).Click();
        aqUtils.Delay(1500);
    }
    const jobLink = testData.key.page.findChild("namePropStr", "varer", 100);
    jobLink.Click();
    utils.waitForPage(testData.key.URL);

    testData.key.page.findChild(["ObjectType", "contentText"], ["Link", byggedelKateogri], 100).Click();
    aqUtils.Delay(1500);
    testData.key.page.findChild(["ObjectType", "contentText"], ["Link", byggedelNavn], 100).Click();
    aqUtils.Delay(1500);
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "group_amount"], 100).Keys(mengde);
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Beregn"], 100).Click();
    aqUtils.Delay(5000);
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "calculation_productprice"], 100).Keys(`^a[BS]${nyPris}`);
    testData.key.page.findChild(["ObjectType", "ObjectIdentifier"], ["NumberInput", "calculation_hours"], 100).Keys(`^a[BS]${timer}`);
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre"], 100).Click();
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "I mine byggedeler"], 100).Click();
    aqUtils.Delay(1500);
}

function testTC1() {
    if (testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100).Visible) {
        testData.key.page.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100).Click();
    }
}

module.exports = { ByggedelerTC1 };

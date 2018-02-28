const testData = require("testData");
const utils = require("OrderUtils");

function unloading(delivery, craneLength, turnablePlasterFork, carType, rearMountedCrane, maxAllowedWeightRequirement, maxAllowedWeight) {
    // Lossing
    // const unloadingLabels = testData.key.unloadingForm.Fieldset(0).findAll("ObjectType", "Label", 2);
    const allButtons = Array.from(testData.key.ecomContent.findAll("ObjectType", "RadioButton", 100));
    const findDeliveryButton = allButtons.find(function (button) {
        return button.value === delivery;
    });
    findDeliveryButton.Parent.Click();

    if (craneLength !== null) {
        aqUtils.Delay(1000);
        const craneLengthButton = allButtons.find(function (button) {
            return button.value === craneLength;
        });
        craneLengthButton.Parent.Click();
    }

    if (turnablePlasterFork !== false) {
        const turnablePlasterForkCheckbox = testData.key.ecomContent.findChild("ObjectIdentifier", "TurnablePlasterFork", 100);
        turnablePlasterForkCheckbox.Parent.Click();
    }

    const findCarType = allButtons.find(function (button) {
        return button.value === carType;
    });
    findCarType.Parent.Click();

    if (rearMountedCrane !== false) {
        const rearMountedCraneCheckbox = testData.key.ecomContent.findChild("ObjectIdentifier", "RearMountedCrane", 100);
        rearMountedCraneCheckbox.Parent.Click();
    }
    if (maxAllowedWeightRequirement > 0) {
        const maxAllowedWeightRequirementCheckbox = testData.key.ecomContent.findChild("ObjectIdentifier", "MaxAllowedWeightRequirement", 100);
        maxAllowedWeightRequirementCheckbox.Parent.Click();
        const maxAllowedWeightTextbox = testData.key.ecomContent.findChild("ObjectIdentifier", "MaxAllowedWeight", 100);
        maxAllowedWeightTextbox.SetText(maxAllowedWeight);
    }
}

function continueToContact() {
    const continueButton = testData.key.ecomContent.findChild("ObjectLabel", "Fortsett med kontaktinformasjon", 100);
    continueButton.Click();
    utils.waitForPage();
}

function contactInformation(name, phone) {
    const reference = testData.key.ecomContent.findChild("ObjectIdentifier", "Reference", 100);
    const phoneNumber = testData.key.ecomContent.findChild("ObjectIdentifier", "PhoneNumber", 100);

    reference.SetText(name);
    phoneNumber.SetText(phone);
}
function checkOrder() {
    const checkOrderButton = testData.key.ecomContent.findChild("ObjectLabel", "Se over ordren", 100);
    checkOrderButton.Click();
    utils.waitForPage();
}

function sendOrder() {
    const sendOrderButton = testData.key.ecomContent.findChild("ObjectIdentifier", "sbutton", 100);
    sendOrderButton.Click();
    utils.waitForPage();
}

function checkBatchOrder() {
    const findButton = testData.key.ecomContent.findChild("namePropStr", "?view=orders", 100);
    const batchorderNumber = findButton.hash.substr(2, 10);
    Log.Message(batchorderNumber);
    ProjectSuite.Variables.currentOrderId = batchorderNumber;
}

function checkOrderNumber() {
    const findButton = testData.key.ecomContent.findChild("namePropStr", "?view=orders", 100);
    const orderNumber = findButton.hash.substr(2, 10);
    Log.Message(orderNumber);
    ProjectSuite.Variables.currentOrderId = orderNumber;
} 

module.exports = {
    unloading,
    continueToContact,
    contactInformation,
    checkOrder,
    sendOrder,
    checkBatchOrder,
    checkOrderNumber
};

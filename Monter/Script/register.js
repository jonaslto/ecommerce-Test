// let checkout = require("checkout");
// let func = require("functions");
const testData = require("testData");

function checkoutNyKontoTC1() {
    const loginLink = testData.key.page.findChild(["ObjectType", "namePropStr"], ["Link", "min-side"], 100);
    loginLink.Click();
    const createUserLink = Aliases.panelContainer.findChild(["ObjectType", "namePropStr"], ["Link", "bli-kunde"], 100);
    createUserLink.Click();

    const phone = testData.key.page.findChild("idStr", "BillingAddress_Phone", 100);
    const firstName = testData.key.page.findChild("idStr", "BillingAddress_FirstName", 100);
    const lastName = testData.key.page.findChild("idStr", "BillingAddress_LastName", 100);
    const email = testData.key.page.findChild("idStr", "BillingAddress_Email", 100);
    const adress = testData.key.page.findChild("idStr", "BillingAddress_Address", 100);
    const postalCode = testData.key.page.findChild("idStr", "BillingAddress_PostalCode", 100);
    const checkBoxTerms = testData.key.page.findChild("idStr", "TermsAndConditionsAccepted", 100);
    const registerSubmit = testData.key.page.findChild("idStr", "register-submit", 100);


    phone.Keys("00000000");
    email.setText(`jonas.tester.det+${Project.Variables.currentEmail}@gmail.com`);
    firstName.Keys(testData.bruker[2].fornavn);
    lastName.Keys(testData.bruker[2].etternavn);
    adress.Keys(testData.bruker[2].adresse);
    postalCode.Keys(testData.bruker[2].postnummer);


    Project.Variables.currentEmail += 1;

    checkBoxTerms.Click();
    registerSubmit.Click();
    Aliases.browser.Page(testData.key.URL).Wait();
}

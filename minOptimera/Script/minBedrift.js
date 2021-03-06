﻿const testData = require("testData");
const utils = require("utils");
const bedrift = require("bedriftUtils");


function minBedriftTC1(phone, mobile) {
    const profileLink = testData.key.leftMenu.findChild("namePropStr", "profil", 100);
    profileLink.Click();
    utils.waitForPage(testData.key.URL);
    const myCompanyLink = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Min bedrift"], 100);
    myCompanyLink.Click();
    utils.waitForPage(testData.key.URL);

    bedrift.editField("company_phone", phone);
    bedrift.editField("company_mobile", mobile);

    bedrift.changeLogo();
    bedrift.changeCertification();
}


function minBedriftTC2(nameInput, emailInput, phoneInput, companyInput) {
    const profileLink = testData.key.page.findChild("namePropStr", "profil", 100);
    profileLink.Click();
    utils.waitForPage(testData.key.URL);
    const myCompanyLink = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Min bedrift"], 100);
    myCompanyLink.Click();
    utils.waitForPage(testData.key.URL);
    const usersLink = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Brukere"], 100);
    usersLink.Click();
    utils.waitForPage(testData.key.URL);

    const addUserButton = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Legg til person"], 100);
    addUserButton.Click();
    const userName = testData.key.page.findChild("ObjectIdentifier", "formData_profile_name", 100);
    const userEmail = testData.key.page.findChild("ObjectIdentifier", "new_user_email", 100);
    const userPhone = testData.key.page.findChild("ObjectIdentifier", "new_user_phone", 100);
    const role = testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Label", "Bruker"], 100);
    const company = testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Label", companyInput], 100);
    const addPersonButton = testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lag ny person"], 100);

    userName.Keys(nameInput);
    userEmail.Keys(emailInput);
    userPhone.Keys(phoneInput);
    role.Click();
    company.Click();
    addPersonButton.Click();

    aqUtils.Delay(15000);

    let table = testData.key.content.findChild("ObjectType", "Table", 100);
    const findCell = Array.from(table.findAll("ObjectType", "Cell", 1));
    const findLine = findCell.find(function (cell) {
        return cell.contentText.includes(emailInput);
    });

    if (table.Cell(findLine.RowIndex, 1).contentText === nameInput) {
        Log.Checkpoint("Name is Correct");
    } else {
        Log.Error(`Name is incorrect got ${table.Cell(findLine.RowIndex, 1).contentText}, expected ${nameInput}`);
    }

    if (table.Cell(findLine.RowIndex, 2).contentText.includes(companyInput)) {
        Log.Checkpoint("Company is Correct");
    } else {
        Log.Error(`Company is incorrect got ${table.Cell(findLine.RowIndex, 2).contentText}, expected ${companyInput}`);
    }

    if (table.Cell(findLine.RowIndex, 3).findChild(["ObjectType", "ObjectLabel"], ["Select", "Rolle"], 5).wText === "Bruker") {
        Log.Checkpoint("Role is Correct");
    } else {
        Log.Error(`Role is incorrect got ${table.Cell(findLine.RowIndex, 3).findChild(["ObjectType", "ObjectLabel"], ["Select", "Rolle"]).wText}, expected ${"Bruker"}`);
    }

    table.Cell(findLine.RowIndex, 3).findChild(["ObjectType", "ObjectLabel"], ["Select", "Rolle"], 5).ClickItem("Administrator");
    Sys.Desktop.Keys("^[F5]");
    utils.waitForPage(testData.key.URL);
    table = testData.key.content.findChild("ObjectType", "Table", 100);
    if (table.Cell(findLine.RowIndex, 3).findChild(["ObjectType", "ObjectLabel"], ["Select", "Rolle"], 5).wText === "Administrator") {
        Log.Checkpoint("Role change is Correct");
    } else {
        Log.Error(`Role change is incorrect got ${table.Cell(findLine.RowIndex, 3).findChild(["ObjectType", "ObjectLabel"], ["Select", "Rolle"]).wText}, expected ${"Administrator"}`);
    }

    bedrift.deleteUser(emailInput);
    Sys.Desktop.Keys("^[F5]");
    utils.waitForPage(testData.key.URL);
    table = testData.key.content.findChild("ObjectType", "Table", 100);
    const findEmail = Array.from(table.findAll("ObjectType", "Cell", 1)).find(function (cell) {
        return cell.contentText.includes(emailInput);
    });

    if (findEmail === undefined) {
        Log.CheckPoint("User does not exist anymore");
    } else if (findEmail.contentText === emailInput) {
        Log.Error("User still exists");
    }
}

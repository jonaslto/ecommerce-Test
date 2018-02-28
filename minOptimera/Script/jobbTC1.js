const testData = require("testData");
const utils = require("utils");

function jobbTC1() {
    if (testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100).Exists) {
        testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100).Click();
    }
    const jobLink = testData.key.leftMenu.findChild("namePropStr", "jobb", 100);
    jobLink.Click();
    utils.waitForPage(testData.key.URL);

    const inactiveJobs = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Inaktive"], 100);
    inactiveJobs.Click();

    const findInactiveJob = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", "Inaktiv jobb"], 100);
    if (findInactiveJob.Visible === true) {
        Log.Checkpoint("Found inactive job");
    } else {
        Log.Error("cannot find inactive job");
    }

    const activeJobs = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Aktive"], 100);
    activeJobs.Click();
    utils.waitForPage(testData.key.URL);

    const createJob = testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Opprett ny jobb"], 100);
    createJob.Click();

    const jobName = testData.key.page.findChild("ObjectIdentifier", "formData_projectname", 100);
    const jobAddress = testData.key.page.findChild("ObjectIdentifier", "formData_address", 100);
    const jobPostalCode = testData.key.page.findChild("ObjectIdentifier", "postnummer", 100);
    const jobDescription = testData.key.page.findChild("ObjectIdentifier", "formData_description", 100);
    const jobContactName = testData.key.page.findChild("ObjectIdentifier", "formData_contact", 100);
    const jobContactPhone = testData.key.page.findChild("ObjectIdentifier", "formData_contactphone", 100);
    const addJobButton = testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre"], 100);

    jobName.Keys("Automatisert job");
    jobAddress.Keys("Klinkekuleveien 39 C");
    jobPostalCode.Keys("3160");
    jobDescription.Keys("En beskrivelse av den automatiserte jobben");
    jobContactName.Keys("Nille Fransen");
    jobContactPhone.Keys("99887766");
    addJobButton.Click();

    aqUtils.Delay(15000);

    if (testData.key.content.findChild("innerText", "Kontaktperson: Nille Fransen", 100).Exists === true) {
        Log.Checkpoint("Contact name is Correct");
    } else {
        Log.Error("Contact name is incorrect");
    }

    if (testData.key.content.findChild("innerText", "Telefon: 99887766", 100).Exists === true) {
        Log.Checkpoint("Phone is Correct");
    } else {
        Log.Error("Phone is incorrect");
    }
    if (testData.key.content.findChild("innerText", "Navn: Automatisert job", 100).Exists === true) {
        Log.Checkpoint("Name is Correct");
    } else {
        Log.Error("Name is incorrect");
    }
    if (testData.key.content.findChild("innerText", "Adresse: Klinkekuleveien 39 c, 3160 Stokke", 100).Exists === true) {
        Log.Checkpoint("Address is Correct");
    } else {
        Log.Error("Address is incorrect");
    }

    if (testData.key.content.findChild("innerText", "Beskrivelse\nEn beskrivelse av den automatiserte jobben", 100).Exists === true) {
        Log.Checkpoint("Description is Correct");
    } else {
        Log.Error("description is incorrect");
    }

    const jobID = testData.key.content.findChild("innerText", "ID:*", 100).innerText.replace(/\D/g, "");

    const exitJob = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "*ut av jobb"], 100);
    exitJob.Click();
    utils.waitForPage(testData.key.URL);

    let newID = jobID - 1;
    if (newID.toString().length < 6) {
        for (let i = newID.toString().length; i < 6; i++) {
            newID = `0${newID}`;
        }
    }
    const findActiveJob = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", newID], 100);
    if (findActiveJob.Visible) {
        Log.Checkpoint("Found active job");
    } else {
        Log.Error("cannot active job");
    }

    // select previous created job (job id created last - 1)
    findActiveJob.Click();
    aqUtils.Delay(1000);
    testData.key.content.findChild(["ObjectType", "contentText"], ["Link", "Endre"], 100).Click();

    // change jobname
    testData.key.page.findChild("ObjectIdentifier", "formData_projectname", 100).Keys("^a[BS]Changed Job");
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Button", "Lagre"], 100).Click();
    aqUtils.Delay(2500);

    if (testData.key.content.findChild("innerText", "Navn: Changed Job", 100).Exists === true) {
        Log.Checkpoint("Name is Correct");
    } else {
        Log.Error("Name is incorrect");
    }
}
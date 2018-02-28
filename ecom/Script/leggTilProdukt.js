let testData = require("testData");

function leggTil() {
    leggTilProdukt("7084157")
}

function leggTilProdukt(produktID) {
    let handlevognAntall;
    if (testData.key.minicart.Exists) {
        handlevognAntall = testData.key.minicart.contentText;
    } else {
        handlevognAntall = 0;
    }
    //søk frem produktid og legg til i handlevogn 
    testData.key.search.Keys(produktID + "[Enter]");
    testData.key.searchResult.Click();
    aqUtils.Delay(30000);
    testData.key.orderAmount.Keys("1[Enter]");


    //!!HUSK Å FIKSE!! FUNKER IKKE PÅ LITEN SKJERM!!
    //Sjekk hvis handlevogn ikonet blir oppdatert
    /* if((handlevognAntall++) == testData.key.minicart.contentText){
         Log.Message("Handlevogn ikon oppdatert");
         
     }else{
         Log.Message(typeof handlevognAntall);
         Log.Error("Handlevogn ikon ikke oppdatert");
         
     } */
}

function ecomTC1() {

    let currentTime = new Date();
    let month = currentTime.getMonth() + 1;
    let day = currentTime.getDate()+1;
    let year = currentTime.getFullYear();
    let dayName = currentTime.getDay() +1;
    if(month < 10){
        month = '0'+month;
    }
    if(dayName == 6 || dayName == 7){
        day = day+2;
    }

    //gå til handlevogn
    testData.key.minicart.Click();
    testData.key.showCart.Click();
    aqUtils.Delay(30000);
    Aliases.browser.Page(testData.key.checkoutURL).Wait();

    testData.key.deliveryMethod.ClickItem(2);
    testData.key.pickupDate.setText(day + "." + month + "." + year);
    testData.key.pickupTime.ClickItem(2);
    testData.key.pickupPoint.ClickItem(75);
    aqUtils.Delay(5000);

    //Hvis varsling om leveringsdato dukker opp, velges det å levere varene samtidig
    /*if(testData.key.deliveryAlert.Exists){
        //findRadioButton = testData.key.deliveryAlert.findChild("contentText", "Endre*", 10);
        //findRadioButton.findChild("ObjectType", "RadioButton", 1).Click();
        testData.key.changeDeliveryDate.Click();
        Aliases.browser.Page(testData.key.checkoutURL).Wait();
    }*/

    checkoutTable = testData.key.checkoutTable;
    for (let i = 0; i < checkoutTable.rowCount; i++) {
        if (checkoutTable.cell(i, 1).contentText.includes("7084157")) {

            //legg til kommentar på varelinje: 
            checkoutTable.cell(i, 0).Link(0).Click();
            Sys.Keys("Kommentar til vare 1");

            //Endre antall bestilt
            aqUtils.Delay(1000);
            checkoutTable.cell(i, 2).findChild("ObjectType", "Textbox", 1).setText("3");
            
            //sjekk at pris stemmer på linjen. 

            unit = checkoutTable.cell(i, 6).contentText.substr(checkoutTable.cell(i, 6).contentText.indexOf("/") + 1, checkoutTable.cell(i, 6).contentText.length);
            unitPrice = checkoutTable.cell(i, 6).contentText.substr(0, checkoutTable.cell(i, 6).contentText.indexOf("/"));
            unitPrice = parseFloat(unitPrice.replace(',', '.').replace(' ', ''));
            totalPrice = parseFloat(checkoutTable.cell(i, 8).contentText.replace(',', '.').replace(' ', ''))

            selectUnit = checkoutTable.cell(i, 3).findChild("ObjectType", "Select", 2);
            selectUnit.ClickItem(unit);

            if (unitPrice * 3 == totalPrice) {
                Log.Message("Pris matcher");
            } else {
                Log.Error("Pris matcher ikke. Antall: " + unitPrice + " unit: " + unit + " totalpris: " + checkoutTable.cell(i, 8).contentText);
            }
            break;
        }
        /*for(let j = 0; j < 20; j++){
            Log.Message(checkoutTable.Cell(2, j).contentText);
        }*/
    }
    //Oppdater handlevogn
    testData.key.reCalcButton.Click();
    aqUtils.Delay(20000);

    //Bestill varer nå: 
    testData.key.orderNow.Click();
    
    if(testData.key.deliveryMethod.wSelectedItem == 0 || testData.key.deliveryMethod.wSelectedItem == 1){
        unloading("Kraning av sjåfør opp på/inn i bygg",
        "10 m",
        false,
        "Liten bil (trang byggeplass / lav undergang)",
        true,
        12);
    }
    testData.key.contactName.setText("Automatisert test");
    testData.key.contactPhone.setText("93866085");
    testData.key.checkOrder.Click();
    testData.key.sendOrder.Click();
    
    //hent batchordrenummer
    const hash = testData.key.seeOrder.hash
    orderNr = hash.substr(hash.indexOf("/")+1, hash.lastIndexOf("/")-2);
    ProjectSuite.Variables.currentOrderId = orderNr; 

}
function test() {
    const hash = testData.key.seeOrder.hash
    orderNr = hash.substr(hash.indexOf("/")+1, hash.lastIndexOf("/")-2);
    Log.Message(orderNr);
  

}

function unloading(loss, kran, vindu, lev, bakKran, totalVekt) {

    //Lossing
    unloadingLabels = testData.key.unloadingForm.Fieldset(0).findAll("ObjectType", "Label", 2);


    for (let i = 0; i <= unloadingLabels.length; i++) {
        if (unloadingLabels[i].ObjectLabel == loss) {
            Log.Message(unloadingLabels[i].ObjectLabel);
            unloadingLabels[i].ClickButton();
            if (loss.includes("Kraning")) {
                craneLength = testData.key.unloadingForm.Fieldset(0).findAll("ObjectType", "Label", 3);
                for (let j = 0; j <= craneLength.length; j++) {
                    if (craneLength[j].ObjectLabel == kran) {
                        craneLength[j].ClickButton();
                        if (vindu === true) {
                            Log.Message("inni loop");
                            window = testData.key.unloadingForm.findChild("ObjectLabel", "Ønsker vendbar gipsgaffel", 10);
                            window.Click();
                        }
                        break;
                    }
                }
            }
            break;
        }
    }

    //levering type bil
    deliveryCar = testData.key.unloadingForm.Fieldset(1).findAll("ObjectType", "Label", 1);

    for (let i = 0; i <= deliveryCar.length; i++) {
        if (deliveryCar[i].ObjectLabel == lev) {
            deliveryCar[i].ClickButton();
            break;
        }
    }

    //tilleggsbehov
    additionalNeeds = testData.key.unloadingForm.Fieldset(2).findAll("ObjectType", "Label", 1);

    if (bakKran === true) {
        additionalNeeds[0].Click()
    }
    if (totalVekt > 0) {
        testData.key.maxWeight.setText(totalVekt);
    }

}


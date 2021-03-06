﻿const testData = require("TestData");

function garasjeKalkTC1(garasjeNavn, width, length, method, covering, gate, window, roofDecking, underlay, gutter) {
    const selectGarage = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", `${garasjeNavn}`], 200);
    //const selectGarage = Aliases.panelSiteContent.frameMinOptimeraVarerKalkulator.form.panelOcBlockgrid.FindChild(["ObjectType", "ObjectLabel"], ["RadioButton", `${garasjeNavn}?`], 100);
    selectGarage.Click();
    aqUtils.Delay(1500);

    function findRow(row) {
        const table = testData.key.content.find("ObjectType", "Table", 100);
        const itemRow = Array.from(table.findAll("ObjectType", "Cell", 100));
        const findLine = itemRow.find(function (cell) {
            return cell.contentText.includes(row) && cell.ColumnIndex === 0;
        });
        return findLine.RowIndex;
    }

    const garageTypeRow = findRow("Garasjetype");
    const table = testData.key.content.find("ObjectType", "Table", 100);
    if (table.Cell(garageTypeRow, 1).contentText === garasjeNavn) {
        Log.Checkpoint("garage selected");
    } else {
        Log.Error(`Garage summary does not match selected garage ${garasjeNavn} showing: ${table.Cell(garageTypeRow, 1).contentText} `);
    }

    // Size

    const stepSize = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "Oppgi Størrelse"], 100);
    stepSize.Click();

    const selectWidth = testData.key.content.findChild("idStr", "WIDTH_select", 100);
    selectWidth.ClickItem(width);

    const selectLength = testData.key.content.findChild("idStr", "LENGTH_select", 100);
    selectLength.ClickItem(length);

    const widthRow = findRow("Bredde");
    if (table.Cell(widthRow, 1).contentText.includes(width)) {
        Log.Checkpoint("width correct");
    } else {
        Log.Error(`width does not match selected width ${width} showing: ${table.Cell(widthRow, 1).contentText} `);
    }

    const lengthRow = findRow("Lengde");
    if (table.Cell(lengthRow, 1).contentText.includes(length)) {
        Log.Checkpoint("length correct");
    } else {
        Log.Error(`length does not match selected length ${length} showing: ${table.Cell(lengthRow, 1).contentText} `);
    }

    // building method

    const buildingMethod = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "Velg byggemåte"], 100);
    buildingMethod.Click();
    aqUtils.Delay(1500);
    //const selectMethod = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["RadioButton", `${method}`], 1000);
    const selectMethod = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", `${method}`], 1000);
    selectMethod.Click();

    const methodRow = findRow("Byggemåte");
    if (table.Cell(methodRow, 1).contentText === method) {
        Log.Checkpoint("Building method selected");
    } else {
        Log.Error(`Building method does not match selected Building method ${method} showing: ${table.Cell(methodRow, 1).contentText} `);
    }

    // select covering
    const nextCovering = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "Velg kledning"], 100);
    nextCovering.Click();
    //const selectCovering = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["RadioButton", `${covering}?`], 100);
    const selectCovering = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", `${covering}`], 100);
    selectCovering.Click();

    const coveringRow = findRow("Kledning");
    if (table.Cell(coveringRow, 1).contentText === covering) {
        Log.Checkpoint("Covering selected");
    } else {
        Log.Error(`Covering does not match selected covering ${covering} showing: ${table.Cell(coveringRow, 1).contentText} `);
    }

    // select garageGate

    const nextGate = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "Velg garasjeport"], 100);
    nextGate.Click();
    //const selectGate = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["RadioButton", `${gate}?`], 100);
    const selectGate = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", `${gate}`], 2000);
    selectGate.Click();
    selectGate.Click();

    const gateRow = findRow("Garasjeport");
    if (table.Cell(gateRow, 1).contentText === gate) {
        Log.Checkpoint("Gate selected");
    } else {
        Log.Error(`Gate does not match selected gate ${gate} showing: ${table.Cell(gateRow, 1).contentText} `);
    }

    // select windows
    const nextWindows = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "Velg vindu"], 100);
    nextWindows.Click();
    //const selectWindow = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["RadioButton", `${window}?`], 100);
    const selectWindow = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", `${window}`], 100);
    selectWindow.Click();

    const windowRow = findRow("Vindu");
    if (table.Cell(windowRow, 1).contentText === window) {
        Log.Checkpoint("Window selected");
    } else {
        Log.Error(`Window does not match selected Window ${window} showing: ${table.Cell(windowRow, 1).contentText} `);
    }

    // select roofDecking
    const nextRoofDecking = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "Velg taktekke"], 100);
    nextRoofDecking.Click();
    //const selectRoofDecking = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["RadioButton", `${roofDecking}?`], 100);
    const selectRoofDecking = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", `${roofDecking}`], 100);
    selectRoofDecking.Click();

    const roofDeckingRow = findRow("Takstein");
    if (table.Cell(roofDeckingRow, 1).contentText === roofDecking) {
        Log.Checkpoint("roofDecking selected");
    } else {
        Log.Error(`roofDecking does not match selected roofDecking ${roofDecking} showing: ${table.Cell(roofDeckingRow, 1).contentText} `);
    }

    // select solution
    const nextSolution = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "Velg løsning"], 100);
    nextSolution.Click();

    //const selectUnderlay = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["RadioButton", `${underlay}`], 100);
    const selectUnderlay = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", `${underlay}`], 100);
    selectUnderlay.Click();

    const underlayRow = findRow("Undertak");
    if (table.Cell(underlayRow, 1).contentText === underlay) {
        Log.Checkpoint("Underlay selected");
    } else {
        Log.Error(`Underlay does not match selected Underlay ${underlay} showing: ${table.Cell(underlayRow, 1).contentText} `);
    }

    //const selectGutter = testData.key.content.findChild(["ObjectType", "ObjectLabel"], ["RadioButton", `${gutter}`], 100);
    const selectGutter = testData.key.content.findChild(["ObjectType", "contentText"], ["TextNode", `${gutter}`], 100);
    selectGutter.Click();

    const gutterRow = findRow("Takrenne");
    if (table.Cell(gutterRow, 1).contentText === gutter) {
        Log.Checkpoint("Gutter selected");
    } else {
        Log.Error(`Gutter does not match selected Gutter ${gutter} showing: ${table.Cell(gutterRow, 1).contentText} `);
    }


    // Result
    const nextResult = testData.key.content.findChild(["ObjectType", "contentText"], ["Button", "Resultat"], 100);
    nextResult.Click();

    const tableResult = testData.key.content.find("ObjectType", "Table", 100);
    const garageResult = tableResult.Cell(garageTypeRow, 1).contentText === garasjeNavn ? "garage matcher" : `Garage summary does not match selected garage ${garasjeNavn} showing: ${table.Cell(garageTypeRow, 1).contentText}`;
    Log.Message(garageResult);

    const widthResult = tableResult.Cell(widthRow, 1).contentText.includes(width) ? "width matcher" : "width does not match";
    Log.Message(widthResult);


    const lengthResult = tableResult.Cell(lengthRow, 1).contentText.includes(length) ? "length matcher" : "length does not match";
    Log.Message(lengthResult);

    const methodResult = tableResult.Cell(methodRow, 1).contentText === method ? "method matcher" : "method does not match";
    Log.Message(methodResult);

    const coveringResult = tableResult.Cell(coveringRow, 1).contentText === covering ? "covering matcher" : "covering does not match";
    Log.Message(coveringResult);

    const gateResult = tableResult.Cell(gateRow, 1).contentText === gate ? "gate matcher" : "gate does not match";
    Log.Message(gateResult);

    const windowResult = tableResult.Cell(windowRow, 1).contentText === window ? "window matcher" : "window does not match";
    Log.Message(windowResult);

    const roofDeckingResult = tableResult.Cell(roofDeckingRow, 1).contentText === roofDecking ? "roofDecking matcher" : "roofDecking does not match";
    Log.Message(roofDeckingResult);

    const underlayResult = tableResult.Cell(underlayRow, 1).contentText === underlay ? "underlay matcher" : "underlay does not match";
    Log.Message(underlayResult);

    const gutterResult = tableResult.Cell(gutterRow, 1).contentText === gutter ? "gutter matcher" : "gutter does not match";
    Log.Message(gutterResult);
}

function testTC1() {
    garasjeKalkTC1("Frøya", "4200", "6600", "Standard", "Impregnert", "Leddport i stål GTL 250x210", "Topphengslet", "Betong", "Sutak trefiber", "Stål");
}

const testData = require("testData");
const utils = require("utils");

function leggTilVarer() {
    const tbl = testData.key.page.findChild("ObjectType", "Table", 100);
    const obj = {
        underKat1: [],
        underKat2: [],
        underKat3: []
    };
    let pushKategori = obj.underKat1;
    for (let i = 1; i < tbl.ColumnCount(0); i++) {
        for (let j = 1; j < 10; j++) {
            tbl.Cell(j, i).Click();
            pushKategori.push(tbl.Cell(j, 0).contentText);
            if (j === 3) {
                i++;
                pushKategori = obj.underKat2;
            }
            if (j === 6) {
                testData.key.page.findChild(["ObjectType", "contentText"], ["Link", "Kategori 1"], 100).Click();
                i--;
                j++;
                tbl.Cell(j, i).Click();
                pushKategori = obj.underKat3;
                pushKategori.push(tbl.Cell(j, 0).contentText);
            }
        }
    }

    return obj;
}

function sjekkOpplastede(file) {
    aqUtils.Delay(1000);
    const tbl = testData.key.page.findChild(["ObjectType", "contentText"], ["Table", "Opplastede*"], 100);
    for (let i = 0; i < tbl.RowCount; i++) {
        if (tbl.Cell(i, 1).contentText.includes(file)) {
            Log.Checkpoint("Fil lastet opp OK");
            const rad = i;
            return rad;
        }
    }
    return null;
}

function velgOpplastetDokument(uploadedDocRow) {
    const tbl = testData.key.page.findChild(["ObjectType", "contentText"], ["Table", "Opplastede*"], 100);
    tbl.Cell(uploadedDocRow, 2).Click();
}

function redigerKategorier(category) {
    Log.Message(`${category}`);
    const kategori = testData.key.page.findChild(["ObjectType", "contentText"], ["TextNode", category], 100);
    kategori.Click();
    aqUtils.Delay(500);
    // add description
    kategori.parent.parent.parent.findChild(["ObjectType", "ObjectIdentifier"], ["Textarea", "description"], 100).Keys("Description of category");
    aqUtils.Delay(1000);
    // choose already uploaded image, first.
    kategori.parent.parent.parent.findChild(["ObjectType", "ObjectLabel"], ["Button", "Velg bilde"], 100).Click();
    aqUtils.Delay(3000);
    testData.key.page.findChild(["ObjectType", "ObjectLabel"], ["Label", "Velg bilde"], 100).Click();
    aqUtils.Delay(1500);
    // Sjekker at bilde er lastet opp:
    if (kategori.parent.parent.parent.findChild("ObjectType", "Image", 100).Exists) {
        Log.Checkpoint("Bilde lastet opp.");
    } else {
        Log.Error("Bilde ikke lagt til");
    }
    // lukker kategori igjen
    kategori.Click();
}

module.exports = { leggTilVarer, sjekkOpplastede, velgOpplastetDokument, redigerKategorier };

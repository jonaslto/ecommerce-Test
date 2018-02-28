function CSVDriver() {

  let sPath;
  sPath = "C:\\monter\\test.txt";
  DDT.CSVDriver("C:\\monter\\postnummerNovember.csv");
  if (!aqFile.Exists(sPath))
    aqFile.Create(sPath);


  while (!DDT.CurrentDriver.EOF()) {

    let postnummer = DDT.CurrentDriver.Value(0);
    postArr = postnummer.split(";");


    for (let i = 0; postArr[0].length < 4; i++) {
      postArr[0] = "0" + postArr[0];
    }

    Aliases.globalVelgVarehus.tbSkrivPostnummer.setText(postArr[0]);
    Aliases.globalVelgVarehus.btnFinnVarehus.Click();
    if (Aliases.globalVelgVarehus.tnButikkNavn.Exists) {
      if (postArr[2] != Aliases.globalVelgVarehus.tnButikkNavn.contentText) {
        aqFile.WriteToTextFile(sPath, "Butikknavn CSV = " + postArr[2] + "- Butikknavn Monter = " 
        + Aliases.globalVelgVarehus.tnButikkNavn.contentText + "\r\n", aqFile.ctANSI, false);
      }
    }
    if (Aliases.globalVelgVarehus.fantIkkeVarehus.Exists) {
      aqFile.WriteToTextFile(sPath, "Finner ikke postnummer " + postArr[0] + "\r\n", aqFile.ctANSI, false);
    }


    DDT.CurrentDriver.Next();
  }
  DDT.CloseDriver(DDT.CurrentDriver.Name);
}
﻿function alleVarerPris(){
  let sPath;
  sPath = "C:\\monter\\katgoriVarer.txt";
  if (!aqFile.Exists(sPath))
    aqFile.Create(sPath);
    resultat = Aliases.panelCategoryResultsNoColSm9.findAllChildren("ObjectType", "Link", 3);
    Log.Message(resultat.length);
    for(let i = 0; resultat.length; i++){
        pris = resultat[i].contentText.split("\n");
         aqFile.WriteToTextFile(sPath, resultat[i].namePropStr+" "+ pris[1]+"\r\n", aqFile.ctANSI, false);
    }

  DDT.CloseDriver(DDT.CurrentDriver.Name);
  
}

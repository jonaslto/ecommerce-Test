﻿const testData = require("testDataAdmin");
const utils = require("utils");
const logIn = require("loginAdmin");

function userTC1(brukernr,warehouse) {
    let brukernavn = testData.bruker[brukernr].epost;
    let passord = testData.bruker[brukernr].password;
    logIn.loggInn(brukernavn,passord);
    
    utils.chooseWarehouse(warehouse);
    
  
} 
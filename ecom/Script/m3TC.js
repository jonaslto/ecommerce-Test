﻿function tabWait() {
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    aqUtils.Delay(500);
}
function backTabWait() {
    Aliases.wfica32.wndTransparentWindowsClient.Keys("![Tab]");
    aqUtils.Delay(500);
}
function batchTo33(batchnr) {
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^r OIS275 [Enter]");
    aqUtils.Delay(30000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys(batchnr);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("![Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[BS]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(3000);
    utils.repeat(tabWait, 3);
    aqUtils.Delay(5000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(3000);
    utils.repeat(tabWait, 1);
    aqUtils.Delay(5000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(8000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    aqUtils.Delay(5000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    aqUtils.Delay(200);
    Sys.Desktop.KeyDown(VK_NUMPAD2);
    aqUtils.Delay(200);
    Sys.Desktop.KeyUp(VK_NUMPAD2);
    aqUtils.Delay(200);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    aqUtils.Delay(200);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(3000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^c");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^c");
    let orderID = Sys.Clipboard;
    Log.Message(`${orderID} saved`);
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
}

function findOrder(ordernr) {
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^r OIS300 [Enter]");
    aqUtils.Delay(20000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys(ordernr);
    aqUtils.Delay(1000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    tabWait();
    aqUtils.Delay(1000);
}

function changeOrderStatusTo44TC(shipping, ordernr) {
    Log.Message("Change status to 44 Ordernumber: ${ordernr}");
    findOrder(ordernr);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD4);
    Sys.Desktop.KeyUp(VK_NUMPAD4);
    Sys.Desktop.KeyDown(VK_NUMPAD3);
    Sys.Desktop.KeyUp(VK_NUMPAD3);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(5000);

    if (shipping !== "Hent ferdig pakket") {
        // Create sending
        Sys.Desktop.KeyDown(VK_CONTROL);
        Sys.Desktop.KeyDown(VK_NUMPAD2);
        Sys.Desktop.KeyUp(VK_NUMPAD2);
        Sys.Desktop.KeyDown(VK_NUMPAD4);
        Sys.Desktop.KeyUp(VK_NUMPAD4);
        Sys.Desktop.KeyUp(VK_CONTROL);
        aqUtils.Delay(2000);
        Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
        aqUtils.Delay(500);
        Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
        aqUtils.Delay(1000);
        Sys.Desktop.KeyDown(VK_CONTROL);
        Sys.Desktop.KeyDown(VK_NUMPAD2);
        Sys.Desktop.KeyUp(VK_NUMPAD2);
        Sys.Desktop.KeyDown(VK_NUMPAD5);
        Sys.Desktop.KeyUp(VK_NUMPAD5);
        Sys.Desktop.KeyUp(VK_CONTROL);
        aqUtils.Delay(2000);
        Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    }
    aqUtils.Delay(1000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD3);
    Sys.Desktop.KeyUp(VK_NUMPAD3);
    Sys.Desktop.KeyDown(VK_NUMPAD2);
    Sys.Desktop.KeyUp(VK_NUMPAD2);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(10000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F5]");
    aqUtils.Delay(1000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
}

function changeOrderStatusTo66TC(ordernr) {
    Log.Message("Change status to 66 Ordernumber: ${ordernr}");
    findOrder(ordernr);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD4);
    Sys.Desktop.KeyUp(VK_NUMPAD4);
    Sys.Desktop.KeyDown(VK_NUMPAD3);
    Sys.Desktop.KeyUp(VK_NUMPAD3);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(5000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(2000);
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyDown(VK_NUMPAD4);
    Sys.Desktop.KeyUp(VK_NUMPAD4);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(4000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F10]");
    aqUtils.Delay(3000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("1");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("STK");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F12]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys(" ");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    aqUtils.Delay(2000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
}

function payInvoice(invoicenr, amount, customernumber) { 
    Aliases.wfica32.wndTransparentWindowsClient.Keys("^r ARS110 [Enter]");
    aqUtils.Delay(5000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_CONTROL);
    aqUtils.Delay(5000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys(amount);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(5000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys(customernumber);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(3000);
    
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    
    Aliases.wfica32.wndTransparentWindowsClient.Keys(invoicenr);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Enter]");
    aqUtils.Delay(3000);
    
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[Tab]");
    
    Sys.Desktop.KeyDown(VK_CONTROL);
    Sys.Desktop.KeyDown(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_NUMPAD1);
    Sys.Desktop.KeyUp(VK_CONTROL);
    Log.Message(`${amount} payed`);
    aqUtils.Delay(3000);
    
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
    aqUtils.Delay(3000);
    Aliases.wfica32.wndTransparentWindowsClient.Keys("[F3]");
} 


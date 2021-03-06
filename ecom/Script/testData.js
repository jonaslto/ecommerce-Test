﻿const key = {
    browser: Sys.Browser("firefox"),
    URL: "https://test.optimera.no/*",
    minicart: Aliases.header.textnodeMinicartcount,
    search: Aliases.header.textboxTypeaheadSearch,
    searchResult: Aliases.panelSearchresultsCollapsed.linkZitem,
    showCart: Aliases.header.linkVisHandlevognen,
    orderAmount: Aliases.textboxAntall,

    // CHECKOUT:
    checkoutURL: "https://ecommercetest.optimera.no/op_ecom/cc/zOrderForm.jsp",
    /* deliveryMethod: Aliases.pageOptimeraECommerceTest2.selectLeveringsmTe,
    deliveryDate: Aliases.pageOptimeraECommerceTest2.panelUiDatepickerDiv,
    deliveryAlert: Aliases.pageOptimeraECommerceTest2.panelDeliveryalertbox,
    changeDeliveryDate: Aliases.pageOptimeraECommerceTest2.panelDeliveryalertbox.textnodeDeliverydatealertopt1,
    checkoutTable: Aliases.pageOptimeraECommerceTest2.tableListIteratorTable,
    reCalcButton: Aliases.pageOptimeraECommerceTest2.submitbuttonOppdater,
    orderNow: Aliases.pageOptimeraECommerceTest2.buttonBestillVareneN,
    unloadingForm: Aliases.browser.pageOptimeraECommerceTest3.formJsCheckoutUnloading,
    maxWeight: Aliases.browser.pageOptimeraECommerceTest3.formJsCheckoutUnloading.fieldsetTilleggsbehovForLevering.numberinputMaxWeight,
    pickupTime: Aliases.pageOptimeraECommerceTest2.selectHentesKl,
    pickupDate: Aliases.pageOptimeraECommerceTest2.textboxDato,
    pickupPoint: Aliases.pageOptimeraECommerceTest2.selectHentested,*/

    // new checkout

    ecomContent: Aliases.browser.pageMinOptimera,
    header: Aliases.header,
    siteMenu: Aliases.panelSiteMenu,
    appContent: Aliases.panelAppView,
   // appContent: Aliases.navGlobalNav,
    content: Aliases.browser.pageMinOptimera.panelSiteContent

    // contact:
/*
    contactName: Aliases.fieldsetKontaktpersonPByggeplass.textboxNavn,
    contactPhone: Aliases.fieldsetKontaktpersonPByggeplass.phoneinputCheckoutContactinfoPho,
    checkOrder: Aliases.buttonSeOverOrdren,
    sendOrder: Aliases.buttonBekreftOgSendOrdre,
    seeOrder: Aliases.linkSeOrdredetaljerOgStatus*/
};

/* const link = {
    minOversikt: Aliases.browser.linkMinOversikt,
    dashboardLink: Aliases.panelDashBox,
    ecomURL: "https://ecommercetest.optimera.no/op_ecom/cc/GalleryView.jsp?mainpage=GalleryView.jsp",
    ecomHeader: Aliases.textnodeVarer,
    jobbLink: Aliases.browser.linkJobb,
    jobbHandeliste: Aliases.browser.mineHandlelister,
    jobbByggedel: Aliases.browser.mineByggedeler,
    jobbByggedelIVogn: Aliases.browser.buttonLeggIVogn,
    handlelisteTabell: Aliases.browser.handlelisteTable,
    handelisteAlleVarer: Aliases.browser.buttonLeggAlleVarerIHandlevogn,
    handlevognHeader: Aliases.browser.headerHandlevogn,
    varerOgByggedeler: Aliases.browser.linkVarerByggedeler,
    linkEcomByggedeler: Aliases.browser.linkCc,
    alleByggedeler: Aliases.browser.byggedeler,
    appView: Aliases.browser.panelAppView,
    variantMengde: Aliases.browser.numberinputGroupAmount,
    variantBeregn: Aliases.browser.buttonBeregn,
    valideringHeader: Aliases.browser.textnodeValidering,
    ordreLink: Aliases.linkOrdreLeveranser
};

const orders = {
    table: Aliases.tableTableNgTable
}; */

module.exports = { key };

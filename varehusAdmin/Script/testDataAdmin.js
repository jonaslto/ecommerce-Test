const key = {
    header: Aliases.browser.pageMontRVarehusadmin.panelBodyContainer.panelBodyContent.header,
    URL: "https://admintest.monter.no/*",
    page: Aliases.browser.pageMontRVarehusadmin,
    browser: Sys.Browser("firefox"),
};

const bruker = [
  {
    epost: "jonas.toreskas@sogeti.no",
    password: "Test1234!",
  }
]; 

module.exports = { key, bruker };
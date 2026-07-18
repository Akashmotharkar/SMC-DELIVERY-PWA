const CONFIG = {

    APP_NAME: "Milk Collection",

    VERSION: "1.0.0",

    API_URL:
        "https://script.google.com/macros/s/AKfycbzlICxgwokRn6TSeMphL9-HK8_CXMLDAExseUNvcW0dwwn7tVS9lAdKlHCGoQMd6-8Gtg/exec",

    STORAGE_PREFIX:
        "milk_collection_",


    /* ==========================================
       DELIVERY ROUTES
       ========================================== */

    ROUTES: [ ],


    /* ==========================================
       LOCAL STORAGE KEYS
       ========================================== */

   STORAGE: {

        ROUTE: "route",
    
        PIN: "pin",
    
        USER: "user",
    
        DATE: "selected_date",
    
        SHEET_NAME: "sheet_name"
    
    },


    /* ==========================================
       REQUEST TIMEOUT
       ========================================== */

    REQUEST_TIMEOUT: 30000

};

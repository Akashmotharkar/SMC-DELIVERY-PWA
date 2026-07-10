const CONFIG = {

    APP_NAME: "Milk Collection",

    VERSION: "1.0.0",

    API_URL:
        "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL",

    STORAGE_PREFIX:
        "milk_collection_",


    /* ==========================================
       DELIVERY ROUTES
       ========================================== */

    ROUTES: [

        {
            id: "A",
            name: "Route A"
        },

        {
            id: "B",
            name: "Route B"
        },

        {
            id: "C",
            name: "Route C"
        },

        {
            id: "D",
            name: "Route D"
        }

    ],


    /* ==========================================
       LOCAL STORAGE KEYS
       ========================================== */

    STORAGE: {

        ROUTE: "route",

        PIN: "pin",

        USER: "user",

        DATE: "selected_date"

    },


    /* ==========================================
       REQUEST TIMEOUT
       ========================================== */

    REQUEST_TIMEOUT: 30000

};

const App = {

    customer: null,

    initialized: false,

    selectedDate: "",

    headers: [],

    customerIDs: [],

    data: [],

async initialize() {

    if (this.initialized) return;

    this.initialized = true;

    Utils.showLoading();

    Auth.initialize();

    UI.initialize();

    Table.initialize();

    await Auth.autoLogin();

},



    async load() {

        Table.initialize();

        this.restoreDate();

        this.buildToolbar();

        await this.loadMilkData();

    },



    restoreDate() {

        let savedDate =

            Storage.get(

                CONFIG.STORAGE.DATE

            );



        if (!savedDate) {

            savedDate =

                Utils.toInputDate(

                    new Date()

                );

        }



        this.selectedDate = savedDate;
        this.selectedDateText =

    Utils.formatDate(

        savedDate

    );

    },



    buildToolbar() {

        CONFIG.APP_NAME =
            Storage.get(
                CONFIG.STORAGE.SHEET_NAME,
                CONFIG.APP_NAME
            );

        const toolbar =

            Utils.$("toolbar");



        toolbar.innerHTML = `

            <button id="menu-button" class="btn">☰</button>
            
            <div>${CONFIG.APP_NAME}</div>
            
            <input
                id="date-picker"
                type="date"
                value="${this.selectedDate}">
            
            <button
                id="save-button"
                class="btn">
                Save
            </button>

        `;



        Utils.$("date-picker")

            .addEventListener(

                "change",

                e => {

                    this.selectedDate =

                        e.target.value;
                    this.selectedDateText =

    Utils.formatDate(

        this.selectedDate

    );
                    



                    Storage.set(

                        CONFIG.STORAGE.DATE,

                        this.selectedDate

                    );



                    this.loadMilkData();

                }

            );



        Utils.$("menu-button")

            .addEventListener(

                "click",

                () => {

                    UI.openMenu();

                }

            );

        Utils.$("save-button")
            .addEventListener(
                "click",
                () => Table.submit()
            );

    },



    async loadMilkData() {

        Utils.showLoading();



        const response =

            await API.getMilkSalesData(

                this.selectedDate

            );



        Utils.hideLoading();



        if (!response.success && response.error) {

            Utils.showToast(

                response.message ||

                response.error ||

                "Unable to load data."

            );

            return;

        }



        this.headers =

            response.headers || [];



        this.customerIDs =

            response.customerIDs || [];



        this.data =

            response.data || [];

        if (!this.headers.includes(this.selectedDateText)) {

            Table.headers = this.headers;
        
            Table.data = this.data;
        
            Table.addDateColumnLocally(this.selectedDateText);
        
            this.headers = Table.headers;
        
            this.data = Table.data;
        
        }



        if (!Table.table) {

    Table.initialize();

}

Table.render(

    this.headers,

    this.data,

    this.customerIDs

);
        Table.updateSummaryRows();

    }

};



document.addEventListener(

    "DOMContentLoaded",

    () => {

        App.initialize();

    }

);

const App = {

    customer: null,

    initialized: false,

    selectedDate: "",

    headers: [],

    customerIDs: [],

    data: [],

    async initialize() {

    alert("1");

    if (this.initialized) return;

    this.initialized = true;

    alert("2");

    Utils.showLoading();

    alert("3");

    Auth.initialize();

    alert("4");

    UI.initialize();

    alert("5");

    Table.initialize();

    alert("6");

    await Auth.autoLogin();

    alert("7");

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

        const toolbar =

            Utils.$("toolbar");



        toolbar.innerHTML = `

            <button

                id="menu-button"

                class="btn">

                ☰

            </button>



            <div>

                ${CONFIG.APP_NAME}

            </div>



            <input

                id="date-picker"

                type="date"

                value="${this.selectedDate}">

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
                    Table.setMode("sales");



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

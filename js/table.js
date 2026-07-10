const Table = {

    headers: [],

    data: [],

    customerIDs: [],

    editMode: null,

    activeInput: null,

    customerYesterdayMap: {},

    yesterdayDateStr: "",

    table: null,

    headerRow: null,

    body: null,



    initialize() {

        const content = Utils.$("content");



        content.innerHTML = `

            <div class="table-wrapper">

                <table id="sales-table">

                    <thead>

                        <tr id="header-row"></tr>

                    </thead>

                    <tbody id="table-body"></tbody>

                </table>

            </div>

        `;



        this.table =

            Utils.$("sales-table");



        this.headerRow =

            Utils.$("header-row");



        this.body =

            Utils.$("table-body");



    },



    render(

        headers,

        data,

        customerIDs

    ) {

        this.headers =

            headers || [];



        this.data =

            data || [];



        this.customerIDs =

            customerIDs || [];



        if (!this.table) {

            this.initialize();

        }



        this.headerRow.innerHTML = "";



        this.body.innerHTML = "";



        this.buildHeader();



        this.buildRows();

    },



    buildHeader() {

    const fixedHeaders = [

        "Customer Name",

        "Rate",

        "Balance"

    ];



    fixedHeaders.forEach(title => {

        const th = Utils.create("th");

        th.textContent = title;

        this.headerRow.appendChild(th);

    });



    this.headers.forEach(date => {

        const th = Utils.create("th");



        const day = parseInt(

            String(date)

                .split(" ")[1]

                .replace(",", ""),

            10

        );



        th.textContent =

            isNaN(day)

                ? date

                : day;



        if (

            Utils.formatDate(

                App.selectedDate

            ) === date

        ) {

            th.classList.add(

                "active-date-cell"

            );

        }



        this.headerRow.appendChild(th);

    });

},



    buildRows() {



        // Next Part



    },



    setMode(mode) {

        this.editMode = mode;

    }

};

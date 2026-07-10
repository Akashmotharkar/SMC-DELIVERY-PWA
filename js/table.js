const Table = {

    /* ==========================================================
       STATE
       ========================================================== */

    headers: [],

    data: [],

    customerIDs: [],

    editMode: null,

    activeInput: null,

    yesterdayMap: {},

    selectedDate: "",

    table: null,

    headerRow: null,

    body: null,



    /* ==========================================================
       INITIALIZE
       ========================================================== */

    initialize() {

        this.table = document.createElement("table");



        const thead = document.createElement("thead");

        this.headerRow = document.createElement("tr");

        thead.appendChild(this.headerRow);



        this.body = document.createElement("tbody");



        this.table.appendChild(thead);

        this.table.appendChild(this.body);



        const wrapper = document.createElement("div");

        wrapper.className = "table-wrapper";



        wrapper.appendChild(this.table);



        Utils.$("content").appendChild(wrapper);

    },



    /* ==========================================================
       MODE
       ========================================================== */

    setMode(mode) {

        this.editMode = mode;

        this.render(

            this.headers,

            this.data,

            this.customerIDs

        );

    },



    /* ==========================================================
       RENDER
       ========================================================== */

    render(

        headers,

        data,

        customerIDs

    ) {

        this.headers = headers || [];

        this.data = data || [];

        this.customerIDs = customerIDs || [];



        this.selectedDate =

            Utils.formatDate(

                App.selectedDate

            );



        this.buildHeader();

        this.buildRows();

        this.resizeColumns();

    },



    /* ==========================================================
       HEADER
       ========================================================== */

    buildHeader() {

        this.headerRow.innerHTML = "";



        [

            "Customer Name",

            "Rate",

            "Balance"

        ]

        .forEach(text => {

            const th = document.createElement("th");

            th.textContent = text;

            this.headerRow.appendChild(th);

        });



        this.headers.forEach(date => {

            const th = document.createElement("th");



            const day =

                parseInt(

                    date.split(" ")[1]

                );



            th.textContent = day;



            if (

                date === this.selectedDate

            ) {

                th.classList.add(

                    "active-date-cell"

                );

            }



            this.headerRow.appendChild(th);

        });

    },



    /* ==========================================================
       BODY
       ========================================================== */

    buildRows() {

        this.body.innerHTML = "";



        this.data.forEach(

            (

                row,

                rowIndex

            ) => {

                const tr =

                    document.createElement(

                        "tr"

                    );



                tr.dataset.rowType =

                    row[0];



                row.forEach(

                    (

                        cell,

                        colIndex

                    ) => {

                        const td =

                            this.createCell(

                                cell,

                                rowIndex,

                                colIndex,

                                row[0]

                            );



                        tr.appendChild(td);

                    }

                );



                this.body.appendChild(tr);

            }

        );

    },



    /* ==========================================================
       CELL
       ========================================================== */

    createCell(

        value,

        row,

        col,

        rowName

    ) {

        const td =

            document.createElement("td");



        td.textContent =

            value ?? "";



        return td;

    },



    /* ==========================================================
       COLUMN WIDTHS
       ========================================================== */

    resizeColumns() {

        if (

            !this.headers.length

        ) {

            return;

        }



        const rows =

            this.body.querySelectorAll(

                "tr"

            );



        for (

            let c = 3;

            c <

            this.headerRow.children.length;

            c++

        ) {

            const th =

                this.headerRow.children[c];



            th.style.width =

                "40px";



            rows.forEach(tr => {

                if (

                    tr.cells[c]

                ) {

                    tr.cells[c].style.width =

                        "40px";

                }

            });

        }



        const active =

            this.headers.indexOf(

                this.selectedDate

            );



        if (

            active === -1

        ) {

            return;

        }



        const column =

            active + 3;



        this.headerRow.children[column]

            .style.width =

            "150px";



        rows.forEach(tr => {

            if (

                tr.cells[column]

            ) {

                tr.cells[column]

                    .style.width =

                    "150px";

            }

        });

    }

};

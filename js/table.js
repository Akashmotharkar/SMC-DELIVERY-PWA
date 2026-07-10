const Table = {

    headers: [],

    data: [],

    customerIDs: [],

    editMode: null,

    selectedDate: "",

    activeInput: null,

    yesterdayMap: {},

    headerRow: null,

    tableBody: null,



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

        this.headerRow =

            Utils.$("header-row");

        this.tableBody =

            Utils.$("table-body");

    },



    render(

        headers,

        data,

        customerIDs

    ) {

        this.headers = headers || [];

        this.data = data || [];

        this.customerIDs =
            customerIDs || [];

        this.selectedDate =
            Utils.formatDate(
                App.selectedDate
            );

        this.buildHeader();

        this.buildRows();

        this.setColumnWidths();

    },



    buildHeader() {

        this.headerRow.innerHTML = "";



        [

            "Customer Name",

            "Rate",

            "Balance"

        ].forEach(text => {

            const th =
                Utils.create("th");

            th.textContent = text;

            this.headerRow.appendChild(th);

        });



        this.headers.forEach(date => {

            const th =
                Utils.create("th");



            const day =
                parseInt(

                    date
                        .split(" ")[1]
                        .replace(",", ""),

                    10

                );



            th.textContent = day;



            if (

                date === this.selectedDate

            ) {

                th.classList.add(

                    "active-date-cell"

                );

            }



            this.headerRow

                .appendChild(th);

        });

    },



    buildRows() {

        this.tableBody.innerHTML = "";



        this.data.forEach(

            (

                row,

                rowIndex

            ) => {

                const tr =
                    this.buildRow(

                        row,

                        rowIndex

                    );



                this.tableBody

                    .appendChild(tr);

            }

        );

    },



    buildRow(

        row,

        rowIndex

    ) {

        const tr =
            Utils.create("tr");



        tr.dataset.rowType =
            row[0];



        row.forEach(

            (

                cell,

                cellIndex

            ) => {

                const td =
                    this.buildCell(

                        row,

                        rowIndex,

                        cell,

                        cellIndex

                    );



                tr.appendChild(td);

            }

        );



        return tr;

    },



    buildCell(

        row,

        rowIndex,

        cell,

        cellIndex

    ) {

        const td =
            Utils.create("td");



        td.textContent =
            cell || "";



        return td;

    },



    setColumnWidths() {

        const rows =
            this.tableBody
                .querySelectorAll("tr");



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



            rows.forEach(row => {

                if (

                    row.cells[c]

                ) {

                    row.cells[c]

                        .style.width =
                        "40px";

                }

            });

        }



        if (

            !this.selectedDate

        ) {

            return;

        }



        const index =

            this.headers.indexOf(

                this.selectedDate

            );



        if (

            index === -1

        ) {

            return;

        }



        const column =
            index + 3;



        this.headerRow.children[column]

            .style.width =
            "150px";



        rows.forEach(row => {

            if (

                row.cells[column]

            ) {

                row.cells[column]

                    .style.width =
                    "150px";

            }

        });

    }

};

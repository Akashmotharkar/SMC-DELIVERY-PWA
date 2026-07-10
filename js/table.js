const Table = {

    headers: [],

    data: [],

    customerIDs: [],

    editMode: null,

    activeInput: null,

    floatingSubmit: null,

    floatingCustomerName: null,

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

    const activeDate = App.selectedDateText;

    this.data.forEach((row, rowIndex) => {

        const tr = Utils.create("tr");

        const rowName =
            String(row[0] || "").trim();

        tr.dataset.rowType = rowName;

        const isDispatch =
            rowName === "Dispatch";

        const isReturned =
            rowName === "Returned Milk";

        const isSummary =

            rowName === "Total Sales" ||

            rowName === "Difference";

        const displayName =

            isDispatch
                ? "नेलेले दूध"

            : isReturned
                ? "परत आलेले दूध"

            : rowName;

        row.forEach((cell, cellIndex) => {

            const td = Utils.create("td");

            if (cellIndex === 0) {

                td.textContent = displayName;

            }

            else if (

                cellIndex >= 3 &&

                this.editMode === "sales" &&

                this.headers[cellIndex - 3] === activeDate &&

                !isSummary

            ) {

                const input =
                    this.createSalesInput(

                        rowIndex,

                        rowName,

                        cell,

                        cellIndex

                    );

                td.appendChild(input);

            }

            else {

                td.textContent =
                    cell ?? "";

            }

            if (cellIndex >= 3) {

                const header =
                    this.headers[cellIndex - 3];

                if (header === activeDate) {

                    td.classList.add(
                        "active-date-cell"
                    );

                }

            }

            tr.appendChild(td);

        });

        if (rowName === "Difference") {

            tr.style.display = "none";

        }

        this.body.appendChild(tr);

    });

    this.setEditableColumnWidth();

},


createSalesInput(

    rowIndex,

    rowName,

    value,

    cellIndex

) {

    const input =
        Utils.create("input");

    input.type = "number";

    input.value = value || "";

    input.defaultValue = value || "";

    if (rowName === "Dispatch") {

        input.dataset.type = "dispatch";

        input.dataset.dispatchDate =
            App.selectedDateText;

    }

    else if (rowName === "Returned Milk") {

        input.dataset.type =
            "returnedMilk";

        input.dataset.returnDate =
            App.selectedDateText;

    }

    else {

        input.dataset.type = "sales";

        input.dataset.customerName =
            rowName;

        input.dataset.customerId =

            this.customerIDs[
                rowIndex - 4
            ] || "";

    }

    input.addEventListener(

        "focus",

        e => this.onInputFocus(e)

    );

    return input;

},
    

onInputFocus(e) {

    this.activeInput = e.target;

    const rect =
        e.target.getBoundingClientRect();

    UI.showFloatingButton(

        rect.bottom +

        window.scrollY +

        8,

        rect.left +

        window.scrollX

    );

    if (

        e.target.dataset.type === "sales"

    ) {

        UI.showCustomerName(

            e.target.dataset.customerName,

            rect.top +

            window.scrollY -

            34,

            rect.left +

            window.scrollX

        );

    }

    e.target.select();

},


setEditableColumnWidth() {

    if (!this.headerRow) {

        return;

    }

    const rows =
        this.body.querySelectorAll("tr");

    for (

        let c = 3;

        c < this.headerRow.children.length;

        c++

    ) {

        this.headerRow.children[c].style.width =
            "40px";

        this.headerRow.children[c].style.minWidth =
            "40px";

        this.headerRow.children[c].style.maxWidth =
            "40px";

        rows.forEach(row => {

            if (!row.cells[c]) {

                return;

            }

            row.cells[c].style.width =
                "40px";

            row.cells[c].style.minWidth =
                "40px";

            row.cells[c].style.maxWidth =
                "40px";

        });

    }

    const index =
        this.headers.indexOf(
            App.selectedDateText
        );

    if (index === -1) {

        return;

    }

    const column = index + 3;

    this.headerRow.children[column].style.width =
        "150px";

    this.headerRow.children[column].style.minWidth =
        "150px";

    this.headerRow.children[column].style.maxWidth =
        "150px";

    rows.forEach(row => {

        if (!row.cells[column]) {

            return;

        }

        row.cells[column].style.width =
            "150px";

        row.cells[column].style.minWidth =
            "150px";

        row.cells[column].style.maxWidth =
            "150px";

    });

},

    

  setMode(mode) {

    this.editMode = mode;

    App.loadMilkData();

}

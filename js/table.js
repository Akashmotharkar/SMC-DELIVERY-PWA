
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
    
        alert("T1");
    
        alert("Utils = " + typeof Utils);
    
        alert("Utils.$ = " + typeof Utils.$);
    
        const content = Utils.$("content");
    
        alert("content = " + (content ? "FOUND" : "NULL"));
    
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
    
        alert("table = " + (Utils.$("sales-table") ? "FOUND" : "NULL"));
        alert("header = " + (Utils.$("header-row") ? "FOUND" : "NULL"));
        alert("body = " + (Utils.$("table-body") ? "FOUND" : "NULL"));
    
        this.table = Utils.$("sales-table");
        this.headerRow = Utils.$("header-row");
        this.body = Utils.$("table-body");
    
        alert("T4");
    },



    render(
    headers,
    data,
    customerIDs
) {

    this.headers = headers || [];

    this.data = data || [];

    this.customerIDs = customerIDs || [];

    if (!this.table) {

        this.initialize();

    }

    this.buildYesterdayMap();

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

    cellIndex === 1 &&

    this.editMode === "rate" &&

    !App.selectedDate

) {

    td.appendChild(

        this.createRateBalanceInput(

            value = cell,

            rowIndex,

            "rate"

        )

    );

}

else if (

    cellIndex === 2 &&

    this.editMode === "balance" &&

    !App.selectedDate

) {

    td.appendChild(

        this.createRateBalanceInput(

            value = cell,

            rowIndex,

            "balance"

        )

    );

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


buildYesterdayMap() {

    this.customerYesterdayMap = {};

    if (

        !App.selectedDateText ||

        this.headers.length === 0

    ) {

        return;

    }

    const selected =

        new Date(App.selectedDate);

    const yesterday =

        new Date(selected);

    yesterday.setDate(

        yesterday.getDate() - 1

    );

    this.yesterdayDateStr =

        Utils.formatDate(yesterday);

    const yesterdayColumn =

        this.headers.indexOf(

            this.yesterdayDateStr

        );

    if (yesterdayColumn === -1) {

        return;

    }

    this.data

        .slice(4)

        .forEach((row, index) => {

            const value =

                row[3 + yesterdayColumn];

            if (

                value !== "" &&

                value !== null &&

                value !== undefined

            ) {

                this.customerYesterdayMap[

                    this.customerIDs[index]

                ] = String(value);

            }

        });

},


createRateBalanceInput(

    value,

    rowIndex,

    mode

) {

    const input =

        Utils.create("input");

    input.type = "number";

    input.value = value || "";

    input.defaultValue = value || "";

    input.dataset.type = mode;

    input.dataset.customerId =

        this.customerIDs[
            rowIndex - 4
        ] || "";

    return input;

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

    input.addEventListener(
    "input",
    e => this.updateLiveSummary(
        e.target.parentElement.cellIndex
    )
);

input.addEventListener(
    "keydown",
    e => this.onInputKeyDown(e)
);

    return input;

},
    

onInputFocus(e) {

    this.activeInput = e.target;

    if (

        e.target.dataset.type === "sales"

    ) {

        const customerId =

            e.target.dataset.customerId;

        if (

            e.target.value === "" &&

            this.customerYesterdayMap[customerId]

        ) {

            e.target.value =

                this.customerYesterdayMap[customerId];

            this.updateLiveSummary(

                e.target.parentElement.cellIndex

            );

        }

    }

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


onInputKeyDown(e) {

    if (e.key !== "Enter") {

        return;

    }

    e.preventDefault();

    const inputs =

        Array.from(

            this.body.querySelectorAll(

                'input[type="number"]'

            )

        );

    const index =

        inputs.indexOf(e.target);

    if (

        index >= 0 &&

        index < inputs.length - 1

    ) {

        inputs[index + 1].focus();

    }

},


updateLiveSummary(column) {

    const rows =

        this.body.querySelectorAll("tr");

    if (rows.length < 4) {

        return;

    }

    const totalRow =
        rows[0];

    const dispatchRow =
        rows[1];

    const returnedRow =
        rows[2];

    const differenceRow =
        rows[3];

    let total = 0;

    for (

        let r = 4;

        r < rows.length;

        r++

    ) {

        const input =

            rows[r]
                .cells[column]
                ?.querySelector("input");

        const value =

            input
                ? Number(input.value) || 0
                : Number(
                    rows[r]
                        .cells[column]
                        .textContent
                  ) || 0;

        total += value;

    }

    totalRow.cells[column].textContent =
        total;

    const dispatchInput =

        dispatchRow
            .cells[column]
            ?.querySelector("input");

    const dispatch =

        dispatchInput
            ? Number(dispatchInput.value) || 0
            : Number(
                dispatchRow
                    .cells[column]
                    .textContent
              ) || 0;

    const returnedInput =

        returnedRow
            .cells[column]
            ?.querySelector("input");

    const returned =

        returnedInput
            ? Number(returnedInput.value) || 0
            : Number(
                returnedRow
                    .cells[column]
                    .textContent
              ) || 0;

    differenceRow.cells[column].textContent =

        (total + returned) - dispatch;

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


updateSummaryRows() {

    for (

        let column = 3;

        column <

        this.headerRow.children.length;

        column++

    ) {

        this.updateLiveSummary(column);

    }

},



collectChanges() {

    const updates = {

        sales: [],

        dispatch: [],

        returnedMilk: [],

        rates: [],

        balances: []

    };

    const inputs =

        this.body.querySelectorAll(

            'input[type="number"]'

        );

    inputs.forEach(input => {

        const current =

            input.value.trim();

        const original =

            input.defaultValue.trim();

        if (current === original) {

            return;

        }

        switch (input.dataset.type) {

                case "rate":
            
                updates.rates.push({
            
                    customerId:
            
                        input.dataset.customerId,
            
                    value:
            
                        current
            
                });
            
                break;
            
            case "balance":
            
                updates.balances.push({
            
                    customerId:
            
                        input.dataset.customerId,
            
                    value:
            
                        current
            
                });
            
                break;

            case "sales":

                updates.sales.push({

                    customerId:

                        input.dataset.customerId,

                    customerName:

                        input.dataset.customerName,

                    value: current

                });

                break;

            case "dispatch":

                updates.dispatch.push({

                    date:

                        input.dataset.dispatchDate,

                    value: current

                });

                break;

            case "returnedMilk":

                updates.returnedMilk.push({

                    date:

                        input.dataset.returnDate,

                    value: current

                });

                break;

        }

    });

    return updates;

},


hasChanges(updates) {

    return (

        updates.sales.length ||

        updates.dispatch.length ||

        updates.returnedMilk.length ||

        updates.rates.length ||

        updates.balances.length

    );

},



async submit() {

    const updates =

        this.collectChanges();

    if (

        !this.hasChanges(updates)

    ) {

        Utils.showToast(

            "No changes detected."

        );

        return;

    }

    Utils.showToast(

        "Saving...",

        0

    );

    try {

        await this.saveChanges(updates);

    }

    finally {

        Utils.hideToast();

    }

},


async saveChanges(updates) {

    let salesResult = null;

    /* -----------------------------
           Rate
        ------------------------------ */
        
        if (updates.rates.length) {
        
            const result =
        
                await API.updateCustomerRates(
        
                    updates.rates.map(r => [
        
                        r.customerId,
        
                        r.value
        
                    ])
        
                );
        
            if (!result.success) {
        
                throw new Error(
        
                    result.message ||
        
                    "Unable to save rates."
        
                );
        
            }
        
        }
        
        /* -----------------------------
           Balance
        ------------------------------ */
        
        if (updates.balances.length) {
        
            const result =
        
                await API.updateCustomerBalances(
        
                    updates.balances.map(r => [
        
                        r.customerId,
        
                        r.value
        
                    ])
        
                );
        
            if (!result.success) {
        
                throw new Error(
        
                    result.message ||
        
                    "Unable to save balances."
        
                );
        
            }
        
        }

    /* -----------------------------
       Sales
    ------------------------------ */

    if (updates.sales.length) {

        const salesData =

            updates.sales.map(item => [

                item.customerName,

                item.customerId,

                item.value

            ]);

        salesResult =

            await API.updateMilkSalesData(

                App.selectedDate,

                salesData

            );

        if (!salesResult.success) {

            throw new Error(

                salesResult.message ||

                "Unable to save sales."

            );

        }

    }

    /* -----------------------------
       Dispatch
    ------------------------------ */

    for (const item of updates.dispatch) {

        const result =

            await API.updateDispatchQty(

                item.date,

                item.value,

                ""

            );

        if (!result.success) {

            throw new Error(

                result.message ||

                "Unable to save dispatch."

            );

        }

    }

    /* -----------------------------
       Returned Milk
    ------------------------------ */

    for (const item of updates.returnedMilk) {

        const result =

            await API.updateReturnedMilkQty(

                item.date,

                item.value,

                ""

            );

        if (!result.success) {

            throw new Error(

                result.message ||

                "Unable to save returned milk."

            );

        }

    }

    /* -----------------------------
       Refresh table
    ------------------------------ */

    await App.loadMilkData();

    Utils.showToast(

        "Changes saved successfully."

    );

},

    

  setMode(mode) {

    this.editMode = mode;

    App.loadMilkData();

}

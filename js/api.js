const API = {

    async request(action, data = {}) {

        try {

            const response =
                await fetch(
                    CONFIG.API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                    
                        app: "delivery",
                    
                        action,
                    
                        route:
                            Storage.get(
                                CONFIG.STORAGE.ROUTE
                            ),
                    
                        ...data
                    
                    })

                    }
                );

            if (!response.ok) {

                throw new Error(
                    "Network Error"
                );

            }

            const json =
                await response.json();

            return json;

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message: err.message

            };

        }

    },



    /* ==========================================
       LOGIN
       ========================================== */

    login(route, pin) {

        return this.request(

            "login",

            {
                route,
                pin
            }

        );

    },



    /* ==========================================
       SALES
       ========================================== */

    getMilkSalesData(selectedDate) {

        return this.request(

            "getMilkSalesData",

            {
                selectedDate
            }

        );

    },



    updateMilkSalesData(

        selectedDate,

        updatedData

    ) {

        return this.request(

            "updateMilkSalesData",

            {

                selectedDate,

                updatedData

            }

        );

    },



    updateCustomerRates(

        updatedRates

    ) {

        return this.request(

            "updateCustomerRates",

            {

                updatedRates

            }

        );

    },



    updateCustomerBalances(

        updatedBalances

    ) {

        return this.request(

            "updateCustomerBalances",

            {

                updatedBalances

            }

        );

    },



    updateDispatchQty(

        dateStr,

        qty,

        reason

    ) {

        return this.request(

            "updateDispatchQty",

            {

                dateStr,

                newQty: qty,

                reason

            }

        );

    },



    updateReturnedMilkQty(

        dateStr,

        qty,

        reason

    ) {

        return this.request(

            "updateReturnedMilkQty",

            {

                dateStr,

                newQty: qty,

                reason

            }

        );

    },



    /* ==========================================
       PDF
       ========================================== */

    generateMonthlyInvoices(

        month,

        year

    ) {

        return this.request(

            "generateMonthlyInvoices",

            {

                month,

                year

            }

        );

    },



    /* ==========================================
       DEBUG
       ========================================== */

    saveClientDebugLog(log) {

        return this.request(

            "saveClientDebugLog",

            {

                logText: log

            }

        );

    },



    sendSingleSummary(

        selectedDate,

        changes,

        oldTotalSales,

        totalSales,

        oldDispatchQty,

        dispatchQty,

        oldReturnedQty,

        returnedQty,

        isNewDate

    ) {

        return this.request(

            "sendSingleSummary",

            {

                selectedDate,

                changes,

                oldTotalSales,

                totalSales,

                oldDispatchQty,

                dispatchQty,

                oldReturnedQty,

                returnedQty,

                isNewDate

            }

        );

    }

};

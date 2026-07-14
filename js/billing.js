const Billing = {

    async open() {

        const month = prompt(

            "Enter month (1-12):",

            new Date().getMonth() + 1

        );

        if (month === null) {

            return;

        }

        const year = prompt(

            "Enter year:",

            new Date().getFullYear()

        );

        if (year === null) {

            return;

        }

        await this.generate(

            Number(month),

            Number(year)

        );

    },



    async generate(

        month,

        year

    ) {

        Utils.showToast(

            "Generating PDF...",

            0

        );

        try {

            const result =

                await API.generateMonthlyInvoices(

                    month,

                    year

                );

            Utils.hideToast();

            if (
                !result ||
                !result.success
            ) {
            
                console.log(result);
            
                Utils.showToast(
                    result.message || "PDF generation failed."
                );
            
                return;
            
            }

            const a =

                document.createElement("a");

            a.href =

                "data:application/pdf;base64," +

                result.pdfBase64;

            a.download =

                result.fileName;

            document.body.appendChild(a);

            a.click();

            a.remove();

            Utils.showToast(

                "PDF downloaded."

            );

        }

        catch (err) {

            Utils.hideToast();

            Utils.showToast(

                err.message ||

                "Unable to generate PDF."

            );

        }

    }

};

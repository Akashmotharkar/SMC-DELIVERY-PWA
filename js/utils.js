const Utils = {

    toastTimer: null,

    /* ==========================================
       TOAST
       ========================================== */

    showToast(message, duration = 3000) {

        const toast =
            document.getElementById("toast");

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(this.toastTimer);

        if (duration > 0) {

            this.toastTimer = setTimeout(() => {

                toast.classList.remove("show");

            }, duration);

        }

    },

    hideToast() {

        document
            .getElementById("toast")
            .classList
            .remove("show");

    },

    /* ==========================================
       LOADING
       ========================================== */

    showLoading() {

        document
            .getElementById("loading-screen")
            .classList
            .remove("hidden");

    },

    hideLoading() {

        document
            .getElementById("loading-screen")
            .classList
            .add("hidden");

    },

    /* ==========================================
       DATE
       ========================================== */

    formatDate(date) {

        if (!(date instanceof Date)) {

            date = new Date(date);

        }

        return date.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        );

    },

    toInputDate(date) {

        if (!(date instanceof Date)) {

            date = new Date(date);

        }

        const offset =
            date.getTimezoneOffset();

        date =
            new Date(
                date.getTime() -
                offset * 60000
            );

        return date
            .toISOString()
            .split("T")[0];

    },

    /* ==========================================
       NUMBER
       ========================================== */

    number(value) {

        return Number(value) || 0;

    },

    /* ==========================================
       DEBOUNCE
       ========================================== */

    debounce(fn, delay = 300) {

        let timer;

        return function () {

            clearTimeout(timer);

            timer = setTimeout(() => {

                fn.apply(
                    this,
                    arguments
                );

            }, delay);

        };

    },

    /* ==========================================
       ELEMENT
       ========================================== */

    $(id) {

        return document.getElementById(id);

    },

    create(tag) {

        return document.createElement(tag);

    }

};

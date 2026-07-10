const UI = {

    menu: null,

    floatingButton: null,

    floatingName: null,

    initialize() {

        this.createBottomSheet();

        this.floatingButton =
            Utils.$("floating-submit");

        this.floatingName =
            Utils.$("floating-customer-name");

    },



    createBottomSheet() {

        const sheet =
            document.createElement("div");

        sheet.id = "bottom-sheet";

        sheet.className = "bottom-sheet";



        sheet.innerHTML = `

            <button
                id="menu-generate"
                class="btn">
                Generate Monthly Bills
            </button>

            <button
                id="menu-rate"
                class="btn secondary">
                Edit Rate
            </button>

            <button
                id="menu-balance"
                class="btn secondary">
                Edit Balance
            </button>

            <button
                id="menu-logout"
                class="btn danger">
                Logout
            </button>

            <button
                id="menu-close"
                class="btn secondary">
                Close
            </button>

        `;



        document.body.appendChild(sheet);

        this.menu = sheet;



        Utils.$("menu-close")
            .addEventListener(
                "click",
                () => this.closeMenu()
            );



        Utils.$("menu-logout")
            .addEventListener(
                "click",
                () => {

                    this.closeMenu();

                    Auth.logout();

                }
            );



        Utils.$("menu-rate")
            .addEventListener(
                "click",
                () => {

                    this.closeMenu();

                    Table.setMode("rate");

                }
            );



        Utils.$("menu-balance")
            .addEventListener(
                "click",
                () => {

                    this.closeMenu();

                    Table.setMode("balance");

                }
            );



        Utils.$("menu-generate")
            .addEventListener(
                "click",
                () => {

                    this.closeMenu();

                    Billing.open();

                }
            );

    },



    openMenu() {

        this.menu.classList.add("show");

    },



    closeMenu() {

        this.menu.classList.remove("show");

    },



    showFloatingButton(top, left) {

        this.floatingButton.style.top =
            top + "px";

        this.floatingButton.style.left =
            left + "px";

        this.floatingButton.classList.remove(
            "hidden"
        );

    },



    hideFloatingButton() {

        this.floatingButton.classList.add(
            "hidden"
        );

        this.hideCustomerName();

    },



    showCustomerName(

        name,

        top,

        left

    ) {

        this.floatingName.textContent =
            name;

        this.floatingName.style.top =
            top + "px";

        this.floatingName.style.left =
            left + "px";

        this.floatingName.classList.remove(
            "hidden"
        );

    },



    hideCustomerName() {

        this.floatingName.classList.add(
            "hidden"
        );

    }

};

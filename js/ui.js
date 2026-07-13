const UI = {

    menu: null,

    floatingName: null,

    initialize() {

        this.createBottomSheet();

        this.floatingName =
            Utils.$("floating-customer-name");
    },



    createBottomSheet() {
        if (this.menu) {
        
            this.menu.remove();
        
        }

        const sheet =
            document.createElement("div");

        sheet.id = "bottom-sheet";

        sheet.className = "bottom-sheet";



        const user = Auth.getUser();
        
        const isAdmin =
            user.role === "Admin";
        
        sheet.innerHTML = `
        
            ${
                isAdmin
                ? `
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
                `
                : ""
            }
        
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



        if (Utils.$("menu-rate")) {
        
        Utils.$("menu-rate")
            .addEventListener(
                "click",
                () => {

                    this.closeMenu();

                    Table.setMode("rate");

                }
            );
            }



        if (Utils.$("menu-balance")) {

    Utils.$("menu-balance")
        .addEventListener(
            "click",
            () => {

                this.closeMenu();

                Table.setMode("balance");

            }
        );

}


if (Utils.$("menu-generate")) {

    Utils.$("menu-generate")
        .addEventListener(
            "click",
            () => {

                this.closeMenu();

                Billing.open();

            }
        );

}

    },



    openMenu() {

        this.menu.classList.add("show");

    },



    closeMenu() {

        this.menu.classList.remove("show");

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

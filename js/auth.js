const Auth = {

    initialize() {

        this.populateRoutes();

        Utils.$("login-button")
            .addEventListener(
                "click",
                () => this.login()
            );

        Utils.$("pin-input")
            .addEventListener(
                "keydown",
                e => {

                    if (e.key === "Enter") {

                        this.login();

                    }

                }
            );

    },

    
    
        populateRoutes() {
    
        const select =
            Utils.$("route-select");
    
        select.innerHTML =
            '<option value="">Select Delivery Path</option>';
    
        CONFIG.ROUTES.forEach(route => {
    
            const option =
                document.createElement("option");
    
            option.value = route.id;
    
            option.textContent = route.name;
    
            select.appendChild(option);
    
        });
    
    },



    async autoLogin() {

        const route =
            Storage.get(
                CONFIG.STORAGE.ROUTE
            );

        const pin =
            Storage.get(
                CONFIG.STORAGE.PIN
            );

        if (!route || !pin) {

            Utils.hideLoading();

            Utils.$("login-screen")
                .classList
                .remove("hidden");

            return;

        }

        Utils.$("route-select").value =
            route;

        Utils.$("pin-input").value =
            pin;

        await this.login(true);

    },



    async login(isAuto = false) {

        const route =
            Utils.$("route-select").value;

        const pin =
            Utils.$("pin-input").value.trim();

        if (!route) {

            Utils.showToast(
                "Select Delivery Path"
            );

            return;

        }

        if (!pin) {

            Utils.showToast(
                "Enter PIN"
            );

            return;

        }

        Utils.showLoading();

        const result =
            await API.login(
                route,
                pin
            );

        alert(JSON.stringify(result, null, 2));

        Utils.hideLoading();

        if (!result.success) {

            if (!isAuto) {

                Utils.showToast(
                    result.message ||
                    "Invalid PIN"
                );

            }

            Storage.clear();

            Utils.$("login-screen")
                .classList
                .remove("hidden");

            return;

        }

        Storage.set(
            CONFIG.STORAGE.ROUTE,
            route
        );

        Storage.set(
            CONFIG.STORAGE.PIN,
            pin
        );

        Storage.set(
            CONFIG.STORAGE.USER,
            result.user || {}
        );

        Storage.set(
            "SESSION_TOKEN",
            result.token
        );

        CONFIG.APP_NAME =
            result.sheetName ||
            CONFIG.APP_NAME;
        
        Storage.set(
            CONFIG.STORAGE.SHEET_NAME,
            CONFIG.APP_NAME
        );

        Utils.$("login-screen")
            .classList
            .add("hidden");

        Utils.$("app-screen")
            .classList
            .remove("hidden");
        
        // Rebuild menu now that the user is known.
        UI.createBottomSheet();
        
        App.load();

    },



    async logout() {

            try {
        
                await API.logout();
        
            } catch (e) {}
        
            Storage.clear();
        
            location.reload();
        
        },



    getUser() {

        return Storage.get(
            CONFIG.STORAGE.USER,
            {}
        );

    }

};

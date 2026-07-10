const Storage = {

    prefix: CONFIG.STORAGE_PREFIX,

    key(name) {

        return this.prefix + name;

    },

    set(name, value) {

        localStorage.setItem(

            this.key(name),

            JSON.stringify(value)

        );

    },

    get(name, defaultValue = null) {

        const value = localStorage.getItem(

            this.key(name)

        );

        if (value === null) {

            return defaultValue;

        }

        try {

            return JSON.parse(value);

        }

        catch (e) {

            return defaultValue;

        }

    },

    remove(name) {

        localStorage.removeItem(

            this.key(name)

        );

    },

    clear() {

        Object.keys(localStorage).forEach(key => {

            if (

                key.startsWith(this.prefix)

            ) {

                localStorage.removeItem(key);

            }

        });

    }

};

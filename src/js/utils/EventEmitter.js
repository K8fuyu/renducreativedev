export default class EventEmitter {
    constructor() {
        this.callbacks = {};
        this.callbacks.base = {};
    }

    on(names, callback) {
        if (typeof names === 'undefined' || names === '') {
            console.warn('wrong names');
            return false;
        }

        if (typeof callback === 'undefined') {
            console.warn('wrong callback');
            return false;
        }

        const resolvedNames = this.resolveNames(names);

        resolvedNames.forEach((name) => {
            const resolvedName = this.resolveName(name);

            if (!(this.callbacks[resolvedName.namespace] instanceof Object)) {
                this.callbacks[resolvedName.namespace] = {};
            }

            if (!(this.callbacks[resolvedName.namespace][resolvedName.value] instanceof Array)) {
                this.callbacks[resolvedName.namespace][resolvedName.value] = [];
            }

            this.callbacks[resolvedName.namespace][resolvedName.value].push(callback);
        });

        return this;
    }

    off(names) {
        if (typeof names === 'undefined' || names === '') {
            console.warn('wrong name');
            return false;
        }

        const resolvedNames = this.resolveNames(names);

        resolvedNames.forEach((name) => {
            const resolvedName = this.resolveName(name);

            if (resolvedName.namespace !== 'base' && resolvedName.value === '') {
                delete this.callbacks[resolvedName.namespace];
            } else {
                if (resolvedName.namespace === 'base') {
                    for (const namespace in this.callbacks) {
                        if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][resolvedName.value] instanceof Array) {
                            delete this.callbacks[namespace][resolvedName.value];

                            if (Object.keys(this.callbacks[namespace]).length === 0) {
                                delete this.callbacks[namespace];
                            }
                        }
                    }
                } else if (this.callbacks[resolvedName.namespace] instanceof Object && this.callbacks[resolvedName.namespace][resolvedName.value] instanceof Array) {
                    delete this.callbacks[resolvedName.namespace][resolvedName.value];

                    if (Object.keys(this.callbacks[resolvedName.namespace]).length === 0) {
                        delete this.callbacks[resolvedName.namespace];
                    }
                }
            }
        });

        return this;
    }

    trigger(name, args) {
        if (typeof name === 'undefined' || name === '') {
            console.warn('wrong name');
            return false;
        }

        let finalResult = null;
        let result = null;

        const resolvedNames = this.resolveNames(name);
        let resolvedName = this.resolveName(resolvedNames[0]);

        if (resolvedName.namespace === 'base') {
            for (const namespace in this.callbacks) {
                if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][resolvedName.value] instanceof Array) {
                    this.callbacks[namespace][resolvedName.value].forEach(function (callback) {
                        result = callback.apply(this, args);

                        if (typeof finalResult === 'undefined') {
                            finalResult = result;
                        }
                    });
                }
            }
        } else if (this.callbacks[resolvedName.namespace] instanceof Object) {
            if (resolvedName.value === '') {
                console.warn('wrong name');
                return this;
            }

            this.callbacks[resolvedName.namespace][resolvedName.value].forEach(function (callback) {
                result = callback.apply(this, args);

                if (typeof finalResult === 'undefined') {
                    finalResult = result;
                }
            });
        }

        return finalResult;
    }

    resolveNames(names) {
        let resolvedNames = names;
        resolvedNames = resolvedNames.replace(/[^a-zA-Z0-9 ,/.]/g, '');
        resolvedNames = resolvedNames.replace(/[,/]+/g, ' ');
        resolvedNames = resolvedNames.split(' ');

        return resolvedNames;
    }

    resolveName(name) {
        const resolvedName = {};
        const parts = name.split('.');

        resolvedName.original = name;
        resolvedName.value = parts[0];
        resolvedName.namespace = 'base';

        if (parts.length > 1 && parts[1] !== '') {
            resolvedName.namespace = parts[1];
        }

        return resolvedName;
    }
}

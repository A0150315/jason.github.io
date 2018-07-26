function MVVM(options) {
    this.$options = options;
    const data = this._data = this.$options.data;
    Object.keys(data).forEach(key => {
        this._proxy(key)
    })
    observe(data, this);
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    _proxy: function (key) {
        Object.defineProperty(
            this,
            key, {
                configurable: false,
                enumerable: true,
                get: function proxyGetter() {
                    return this._data[key];
                },
                set: function proxySetter(newVal) {
                    this._data[key] = newVal
                }
            }
        )
    }
}
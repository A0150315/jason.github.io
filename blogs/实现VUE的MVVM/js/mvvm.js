class MVVM {
    constructor(options) {
        this.$options = options;
        const data = this._data = this.$options.data;
        Object.keys(data).forEach(key => { // 劫持this[key] 👇
            this._proxy(key)
        })
        observe(data); // 开始为data添加Observer -> observer.js
        this.$compile = new Compile(options.el || document.body, this) // 开始创建Compile实例 -> compile.js
    }
    _proxy(key) { // 劫持this[key]，当this[key]被修改时，主动把this._data[key]修改为新的值,浅监听（只监听第一层） ↑
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
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;

    this.value = this.get();
}
Watcher.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        const value = this.get()
        const oldValue = this.value
        if (value !== oldValue) {
            this.value = value;
            this.cb.call(this.vm, value, oldValue)
        }
    },
    get: function (key) {
        Dep.target = this;
        const value = this.vm[exp]; // 这里会触发属性的getter，从而添加订阅者
        Dep.target = null;
        return value;
    },
    addDep: function (dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }
}
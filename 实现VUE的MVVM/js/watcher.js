class Watcher {
    /**
     * 添加一个Watcher实例
     * @param {MVVM} vm
     * @param {String} exp
     * @param {Function} cb
     * @memberof Watcher
     */
    constructor(vm, exp, cb) {
        this.cb = cb;
        this.vm = vm;
        this.exp = exp;
        this.depIds = {};

        this.value = this.get();
        // Watcher.get() -> Dep.target = this -> 触发vm的Observer的getter -> 触发Dep的depend 并把当前dep传过去 ->  
        // 触发Wacher的addDep，判断当前 Wather中的depids是否全在相应dep，没有就通知dep触发addSub添加Watch，且把dep保存到Wather的depIds中 
    }
    update() {
        this.run();
    }
    run() {
        const value = this.get()
        const oldValue = this.value
        if (value !== oldValue) {
            this.value = value;
            this.cb.call(this.vm, value, oldValue)
        }
    }
    get() {
        Dep.target = this;
        const value = this.vm[this.exp]; // 这里会触发属性的getter，从而添加订阅者
        Dep.target = null;
        return value;
    }
    addDep(dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }
}
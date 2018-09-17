class Dep {
    constructor() {
        this.subs = []; // Wacther列表
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update() // 触发Watcher的update
        })
    }
    depend() {
        Dep.target.addDep(this)
    }
}

Dep.target = null;
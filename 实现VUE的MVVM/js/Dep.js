class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(sub => {
            sub.upadte()
        })
    }
    depend(){
        Dep.target.addDep(this)
    }
}

Dep.target = null;
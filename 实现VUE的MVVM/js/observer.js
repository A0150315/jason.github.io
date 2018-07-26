function observe(data) {
    if (!data || typeof data !== "object") return;
    // Object.keys(obj) 获取对象属性数组
    Object.keys(data).forEach(function (key) {
        defineReactive(data, key, data[key])
    })
}

function defineReactive(data, key, val) {
    const dep = new Dep();
    let childObj = observe(val); // 子属性
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function () {
            console.log("我被获取了");
            Dep.target && dep.depend();
            return val;
        },
        set: function (newVal) {
            if (val === newVal) return;
            console.log(`我被设置了, ${val} ====> ${newVal} `);
            childObj = observe(newVal);
            val = newVal;
            dep.notify(); // 通知
        }
    })
}
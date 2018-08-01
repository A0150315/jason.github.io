interface Data {
    data: object
}

function defineReactive(data: object, key: (number | string), val: any) {
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function () {
            console.log("我被获取了");
            return val;
        },
        set: function (newVal) {
            if (val === newVal) return;
            console.log(`我被设置了, ${val} ====> ${newVal} `);
            val = newVal;
        }
    })
}

const test: Data = {
    data: {
        a: 0
    }
}

Object.keys(test.data).forEach(function (key) {
    defineReactive(test.data, key, test.data[key]) // 为每一个属性配置Property 👇
})
const OtherData: Data = {} as Data
OtherData.data = test.data;

OtherData.data.a = 1

"use strict";
function defineReactive(data, key, val) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function () {
            console.log("我被获取了");
            return val;
        },
        set: function (newVal) {
            if (val === newVal)
                return;
            console.log("\u6211\u88AB\u8BBE\u7F6E\u4E86, " + val + " ====> " + newVal + " ");
            val = newVal;
        }
    });
}
var test = {
    data: {
        a: 0
    }
};
Object.keys(test.data).forEach(function (key) {
    defineReactive(test.data, key, test.data[key]); // 为每一个属性配置Property 👇
});
var OtherData = {};
OtherData.data = test.data;
OtherData.data.a = 1;

/**
 * Compile
 * 
 * @param {Element} el
 * @param {Object} vm
 */
function Compile(el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment)
    }
}
Compile.prototype = {
    init: function () {
        this.compileElement(this.$fragment);
    },
    node2Fragment: function (el) {
        const fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment;
    },
    compileElement: function (el) {
        const childNodes = el.childNodes;
        [].slice.call(childNodes).forEach(node => {
            const text = node.textContent;
            const reg = /\{\{(.*)\}\}/; // 双括号表达式文本
            if (this.isElementNode(node)) { // v-指令
                this.compile(node);
            } else if (this.isTextNode(node) && reg.test(text)) { // 花括号
                this.compileText(node, RegExp.$1); // {{}}匹配到第一个值
            }
            if (node.childNodes && node.childNodes.length) { // 遍历子节点
                this.compileElement(node)
            }
        })
    },
    compile: function (node) {
        const nodeAttrs = node.attributes;
        [].slice.call(nodeAttrs).forEach(attr => {
            const attrName = attr.name;
            if (this.isDirective(attrName)) {
                const exp = attr.value; // 内容
                const dir = attrName.substring(2); // 具体指令
                if (this.isEventDirective(dir)) { // 匹配是否有‘on’，事件指令
                    compileUtil.eventHandler(node, this.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, this.$vm, exp); // v-model、v-if、v-show………
                }
            }
        })
    },
    compileText: function (node, exp) {
        compileUtil.text(node, this.$vm, exp)
    },
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    isTextNode: function (node) {
        return node.nodeType == 3;
    },
    isDirective: function (attr) {
        return attr.indexOf('v-') == 0;
    },
    isEventDirective: function (dir) {
        return dir.indexOf('on') === 0;
    }
}

const compileUtil = {
    text: function (node, vm, exp) {
        this.bind(node, vm, exp, 'text')
    },
    bind: function (node, vm, exp, dir) {
        const updaterFn = updater[dir + "Updater"];
        updaterFn && updaterFn(node, vm[exp]);
        new Watcher(vm, exp, function (value, oldValue) {
            // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
            updaterFn && updaterFn(node, value, oldValue);
        });
    },
    eventHandler: function (node, vm, exp, dir) {
        const eventType = dir.split(':')[1]; // on:click
        const fn = vm.$options.methods && vm.$options.methods[exp]; // 获取函数主体

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false)
        }
    }
}

const updater = {
    textUpdater: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
}
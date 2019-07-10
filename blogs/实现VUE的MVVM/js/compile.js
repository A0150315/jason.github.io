class Compile {
    /**
     * 添加一个Compile实例
     * @param {String} el
     * @param {MVVM} vm
     * @memberof Compile
     */
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = this.isElementNode(el) ? el : document.querySelector(el)
        if (this.$el) {
            this.$fragment = this.node2Fragment(this.$el); // 把html节点转换为文档片段，储存在内存中
            this.init();
            this.$el.appendChild(this.$fragment)
        }
    }
    init() {
        this.compileElement(this.$fragment);
    }
    node2Fragment(el) {
        var fragment = document.createDocumentFragment();
        let child;

        while (child = el.firstChild) {
            // appendChild将元素从dom上移到fragment
            fragment.appendChild(child)
        }
        return fragment;
    }
    compileElement(el) {
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
    }
    compile(node) {
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
    }
    compileText(node, exp) {
        compileUtil.text(node, this.$vm, exp)
    }
    isElementNode(node) {
        return node.nodeType == 1;
    }
    isTextNode(node) {
        return node.nodeType == 3;
    }
    isDirective(attr) {
        return attr.indexOf('v-') == 0;
    }
    isEventDirective(dir) {
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
    model: function (node, vm, exp) {
        node.value = vm[exp]
        node.addEventListener('input', e => {
            vm[exp] = e.target.value;
        }, false)
        new Watcher(vm, exp, function (value, oldValue) {
            // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
            updater.modelUpdater(node, value, oldValue);
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
    },
    modelUpdater: function (node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
}
function Compile(el) {
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
            if (this.isElementNode(node)) {
                this.compile(node);
            } else if (this.isTextNode(node) && reg.test(text)) {
                this.compileText(node, RegExp.$1);
            }
            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node)
            }
        })
    },
    compile: function (node) {
        const nodeAttrs = node.attributes;
        
    },
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    isTextNode: function (node) {
        return node.nodeType == 3;
    }
}
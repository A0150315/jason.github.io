在学习**Typescript**之前，早已听过、看过很多人对其的赞扬，**强类型**、**静态类型**等等的关键词一直伴随着我对它的认知。经过一段时间（又或者是断断续续）的学习，也大致算是入门了。

#### 以下文章是我在学习中的一些心得与记录：
# 编辑器以及相关配置
- 安装 Typescript

```
npm install -g typescript
```
- 编辑器方面我们选择 VSCode ，Typescript 本身就是由 Microsoft 开源的，配置自家的编辑器，对 Typescript 的第一方支持，体验简直不要太爽，ctrl 配置 鼠标移到对应变量、接口、类等字段上会有惊喜哦；
- 插件方面，TSLint 是必须的，它可以在编辑器中就提示你语法的错误，减少 Fail completion ，红红的一条波浪线去掉的那一瞬间，简直是强迫症的福利；
- 以上准备好后，我们需要给Typescript添加相关编译配置了( Typescript 必须编译成 Javascript 才能被直接运行，类似 Java -> Class )，首先需要在根目录新建文件 —— “ tsconfig.json ”，相关配置可参考[官网文档](https://www.tslang.cn/docs/handbook/compiler-options.html)。我的常用配置：

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    // 这可以对 `this` 上的数据属性进行更严格的推断
    "strict": true,
    // 如果使用 webpack 2+ 或 rollup，可以利用 tree-shake:
    "module": "es2015",
    "moduleResolution": "node",
    "sourceMap": true,
    // 此选项可以给ts文件编译时自动生成声明文件，我在一些需要把ts转换成js的情况下开启
    "declaration": true  
  }
}
```
- 以上已经把运行ts最简单的平台给配置好了，对于没有用过ts的同学，其实在这里或许会有点云里雾里的感觉，不过没事，后面慢慢就孰能生巧了。

# 编写第一个ts文件并运行它
- 新建文件 test.ts

```ts
// test.ts
console.log('Hello World!')
```
- 此时目录结构如下
![image](https://user-images.githubusercontent.com/18693417/43575454-76f380ca-9679-11e8-9cfb-9f2646021e4e.png)

- 编译ts
    - 使用VSCode的快捷键 Shift + Ctrl + B 开启如下选择框：
![image](https://user-images.githubusercontent.com/18693417/43575627-e4dc61e2-9679-11e8-9f9a-e1d38274c280.png)
    - 这里选哪个都可以，选择“构建”，则表示编译一次就退出编译；选择“监视”，则相当于开启了“watch”选项，编译时会一直监听ts文件的改变，修改一次编译一次；我这里选择“构建”；
    - 构建后，目录结构如下：
![image](https://user-images.githubusercontent.com/18693417/43575839-658f43b8-967a-11e8-9d29-4f6ec02192a9.png)
    - .d.ts文件是相应ts的[声明文件](https://www.tslang.cn/docs/handbook/declaration-files/introduction.html)，具体可以参考官方文档； .js 则是相应ts文件构建编译后的js文件，内部跟ts源文件大致相同：
![image](https://user-images.githubusercontent.com/18693417/43576065-f8daa13a-967a-11e8-9765-b226b9e4458e.png)
- **node test** 运行一下
- 结果：
![image](https://user-images.githubusercontent.com/18693417/43576137-2df6db36-967b-11e8-8b48-e8b9ab4bc1db.png)
- 完美~
# 为已有的Webpack项目添加ts语法支持
> 需要注意：新版的Typescript（编写这篇心得时，Typescript的版本刚更新到**3.0**）需要**webpack4**+版本才能正常运行
- 假设目录结构如下：

```
│  .babelrc                               // babel配置文件
│  .gitignore
│  index.html                             // 页面文件
│  index.js                               // 入口文件
│  package-lock.json
│  package.json                           // npm init
│  webpack.config.js                      // webpack 配置文件
│
└─dist                                    // 打包后的目录
        bundle.js
        index.html
```
- 这是一个AngularJs 1.5.8 的项目，其入口文件代码如下，主要是测试Angular.config和Angular.run的执行顺序：

```js
require('angular');

var myApp = angular.module("init", [ "exampleApp.Services", "exampleApp.Directives"]);

myApp.constant("startTime", new Date().toLocaleString());
myApp.config(function (startTime) {
    console.log("Main module config: " + startTime);
});
myApp.run(function (startTime) {
    console.log("Main module run: " + startTime);
})

angular.module("exampleApp.Directives", [])
    .directive("highlight", function ($filter) {
        var dayFilter = $filter("dayName");
        return function (scope, element, attrs) {
            if (dayFilter(scope.day) == attrs["highlight"]) {
                element.css("color", "red");
            }
        }
    })

var now = new Date();
myApp.value("nowValue", now);
angular.module("exampleApp.Services", [])
    .service("days", function (nowValue) {
        this.today = nowValue.getDay();
        this.tomorrow = this.today + 1;
    })
    .config(function () {
        console.log("Services module config: (no time)");
    })
    .run(function (startTime) {
        console.log("Services module run: " + startTime);
    })
```
- 此时项目一切正常，我们开始为其添加ts语法支持；
- 目录下加入tsconfig.json配置文件：

```
│  .babelrc                          // babel配置文件
│  .gitignore
│  index.html                        // 页面文件
│  index.js                          // 入口文件
│  package-lock.json
│  package.json                      // npm init
│  tsconfig.json --------------------// ts配置文件
│  webpack.config.js                 // webpack 配置文件
│
└─dist                               // 打包后的目录
        bundle.js
        index.html
```
- 对 webpack 添加对 typescript 支持：

```
npm i -D ts-loader typescript
```

```js
// 在 module.rules 添加 ts-loader 并修改入口文件为index.ts
{
        test: /\.ts|\.tsx$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
}
```
- 把目录下的index.js改为index.ts文件，此时配合VSCode，index.ts肯定是一堆红色波浪线的，如下
![image](https://user-images.githubusercontent.com/18693417/43635605-2e00bcba-9742-11e8-8d29-a05d71c17527.png)
- ### 开始修复小红线；
- 为 index.ts 添加声明文件
    - 在index.ts的目录下新建index.d.ts文件

```ts
// index.d.ts
/**
 * 通过路径导入模块
 * @param {string} moduleName
 * @returns {*}
 */
declare function require(moduleName: string): any;
```
- 在 index.ts 中导入声明文件

```ts
// index.ts开头插入
/// <reference path="./index.d.ts" />
```
- “require” 的小红线消失
![image](https://user-images.githubusercontent.com/18693417/43635937-38478ab8-9743-11e8-8968-785c77b863b1.png)

- 修改 angular 引入的方式

```ts
- require('angular');
           👇
+ import * as angular from 'angular';
```
- 新增警告提示如下：
![image](https://user-images.githubusercontent.com/18693417/43636207-fc36478e-9743-11e8-9d86-c4c4d75ff37e.png)
- 遇到这些共用库缺少声明文件的情况，可以到[TypeSearch](http://microsoft.github.io/TypeSearch/)搜索下载网上编写好的声明文件，这里我就直接安装了：

```
npm i -D  @types/angular
```
- 安装好后，又消灭一个小红线
![image](https://user-images.githubusercontent.com/18693417/43636375-7a567c74-9744-11e8-9617-c4fa059e1be1.png)
- 再根据红线提醒，根据ts语法，为函数或其他变量添加类型声明，红线全部消灭，舒服！

```ts
// index.ts
/// <reference path="./index.d.ts" />

import * as angular from 'angular';

var myApp = angular.module("init", ["exampleApp.Services", "exampleApp.Directives"]);

myApp.constant("startTime", new Date().toLocaleString());
myApp.config(function (startTime: String) {
    console.log("Main module config: " + startTime);
});
myApp.run(function (startTime: String) {
    console.log("Main module run: " + startTime);
})

angular.module("exampleApp.Directives", [])
    .directive("highlight", function ($filter) {
        var dayFilter = $filter("dayName");
        return function (scope: any, element, attrs) {
            if (dayFilter(scope.day) == attrs["highlight"]) {
                element.css("color", "red");
            }
        }
    })

var now = new Date();
myApp.value("nowValue", now);
angular.module("exampleApp.Services", [])
    .service("days", function (this: Day, nowValue: Date) {
        this.today = nowValue.getDay();
        this.tomorrow = this.today + 1;
    })
    .config(function () {
        console.log("Services module config: (no time)");
    })
    .run(function (startTime: string) {
        console.log("Services module run: " + startTime);
    })
```

```ts
// index.d.ts
/**
 * 通过路径导入模块
 * @param {string} moduleName
 * @returns {*}
 */
declare function require(moduleName: string): any;

interface Day {
    today?: number;
    tomorrow?: number;
}
```
![image](https://user-images.githubusercontent.com/18693417/43637243-0642a260-9747-11e8-96b3-3ab886a54da2.png)
- 最终目录结构：
```
│  .babelrc                               // babel配置文件
│  .gitignore
│  index.d.ts                             // 入口ts文件声明文件
│  index.html                             // 页面文件
│  index.ts                               // 入口ts文件
│  package-lock.json
│  package.json                           // npm init
│  tsconfig.json                          // ts配置文件
│  webpack.config.js                      // webpack 配置文件
│
└─dist                                    // 打包后的目录
        bundle.js
        index.html
```

# 总结
文章代码比较多，但是十分实用。

angularjs + webpack4 + typescript 这个组合也十分不常见，这种典型的例子或许说明 typescript 的应用场景可以十分广泛，具体语法大家可以到[官方文档](https://www.tslang.cn/docs/handbook/basic-types.html)好好学习。

希望这篇文章对入门 Typescript 的同学会有所帮助
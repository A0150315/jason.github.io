### 上个星期，甲方说要在应用上做一个促活活动（其实就是让用户领OFO的骑车券），考虑到之前在我另一个应用上已经做过客户端token验证，想想，撸起袖子直接在之前的Node上开搞吧。

- ### Nuxt
 这个东西类似与React中的Next，做Vue服务端渲染在Nuxt确实挺方便的，整个目录结构与Vue-Cli也差不多，但我觉得更清晰明了，而且有很丰富的配置，包括我最喜欢的顶部Loadding条啊、Layer主题模板啊、服务端渲染有益于SEO啊、自动生成Router啊等等等等。这里我就不详细展开了，选择他主要是用习惯了，而且性能也很不错。

- ### Express
它就是一个Koa、egg等的一个服务端的工具，封装很多便捷的方法。这里也不详细展开。

### 第一步 完成静态页面
+ 在这里就不详细说明HTML怎么构建、Vue使用方法等等等不相关的问题，首先页面效果如下图：
![default](https://user-images.githubusercontent.com/18693417/42724526-71f0ddde-87a6-11e8-94c7-4428932f7a37.png)
+ 点击确认领取后，向后端发送请求，获取券码：
![1](https://user-images.githubusercontent.com/18693417/42724542-d96e0de2-87a6-11e8-9f4e-cb05455035f5.png)
+ 大致业务流程就是这样子了。

### 第二步 基于webview完成token验证
+ 甲方公司的token是怎么给到用户的呢？
    - 用户登录客服端
    - 用户在webview访问相应的地址
    - 客户端把token等信息绑定在地址上让服务端接受，并向服务端发送GET请求
    - 服务端接受到Token后，根据Token信息验证用户身份并返回页面给用户
+ 所以也就是相当于，此时我手上的Node需要完成一个Token验证的需求，开搞：
> 这里必须说一下Session这个东西，一开始当我完成了Token验证的时候，可是发现两个用户同时访问的时候，后访问者会重新执行一次对应请求里的方法，相当于很多数据都初始化甚至重新赋值。完全不知道怎么把用户分开，问了一下JAVA的同学，他们说框架自带会分开，这就让我很忧郁了。其实，他们也知道Session这个东西，只是一直这样用后习惯了也就突然说不清楚甚至想到它的存在了。
我一开始想到的是用Cookie验证对应浏览器，但总觉得这种方法有点古老，不够高大上（个人主观看法，勿喷），储存量也很有限。所以又探索了一天，得知有个Session这个东西可以验证对应浏览器（好吧，其实也就是把Cookie当成数据索引）。知道了有这么一回事之后也就茅塞顿开了。

```js
// 引入一些工具
const http = require('http')
const express = require("express");
const session = require('express-session');

const nuxtapp = express(); // 创建一个express应用

// 设置SESSION配置
nuxtapp.use(session({
  secret: 'key' // 建议使用 128 个字符的随机字符串 
}));

// 处理OPTIONS请求（axios发送POST请求时会先发送一个OPTION请求验证服务器的连通情况）
nuxtapp.use(function (req, res, next) {
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 写一个验证Token的接口
nuxtapp.get('/getphone', (req, res) => {
    if (!req.query.token) {
      //  if else ...
      res.sendStatus(200)
      return;
    }
    // 这里创建请求只是举一个例子，有的Token可以本地解析，有的需要服务端向另一个服务端请求解析。（参考微信）
    const request = http.request({
      host: "api.example.com",
      headers: {
        'Content-Type': ' application/json',
        'Accept-Encoding': 'utf-8', //这里设置返回的编码方式 设置其他的会是乱码
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
      },
      path: '/getTokenorSth',
      port: 'port',
      method: 'POST'
    }, response => {
      let data = ""; // 创建变量记录数据
      response.on("data", function (chunk) {
        data += chunk
      })
      response.on("end", function () { // 设置seesion
        try {
          if (!req.session.id) {
            // set session like : req.session.id= JSON.parse(data)
          }
          res.sendStatus(200)
        } catch (err) {
          console.log(err);
          res.sendStatus(500)
        }
      })
    }).on('error', (e) => {
      console.log(`错误信息: ${e.message}`);
      res.sendStatus(500)
    });
    // POST Data
    request.write(JSON.stringify({
        example:example,
        token: req.query.token
    })); // 用户传过来的数据 post
    request.end();
})

nuxtapp.listen(port || 80, '0.0.0.0')
console.log("已开启服务器，请访问 —— localhost:" + port || 80)
```

### 第三步 服务端代理（这里我也有个点不是很确定，所谓淘宝Node+JAVA是不是就是这种模式）
> 毕竟我还是个前端，功能方面的实现还是交给资深大JAVA吧（若是给我时间，我还真的想写一下SQL复习一下）
+ 用户访问的时候还是向Node请求，这里需要提一点的就是，假如后端提供了很多接口，你不一定每个都要写一个app.get(‘/api’)或者什么，express的文档上有提到类似这种写法：

```js
nuxtapp.all(["/api1/*","/api2/*"], requestFunction)
```
其他就跟上面token验证差不多了

### 第四步 用Express执行Nuxt
+ 在Nuxt官网上其实也有部分代码教你如何用自己写的Node去运行，但一直不是很完善，有点差强人意。我在这里就补充一下我的理解，**哪里写得不对，请尽管喷，谢谢喷我的每一个人**。

```js
// nuxt
const {
  Nuxt,
  Builder
} = require('nuxt') // 引入核心构建属性

// 判断开发环境
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 80

// 引入nuxt配置
const config = require('./nuxt.config.js')
config.dev = !isProd;
const nuxt = new Nuxt(config);

// 判断生产模式 dev(开发者模式)表示重新构建 ；pro(生产模式)表示直接从yanr build的文件直接执行
if (config.dev) {
  new Builder(nuxt).build()
    .then(listen)
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
} else {
  listen()
}
```
以上的listen就是我在第二、三步写的相应接口的express服务器啦。
+ 那么nuxt其实还并没有在代码中执行，new Nuxt一个Nuxt实例后返回一个nuxt方法，它其实是根据request,response去执行相应的渲染，其中我们要考虑到express()的各种接口的执行顺序，假如一开始就匹配到了第二步的代码的get请求，那么写在第二步代码后的all方法中的各种接口是接收不到的。
+ 我考虑到的是接口不是无缘无故执行的，但用户请求是必然发生的。那么也就是当用户除了故意发送请求，全部由Nuxt接手。所以Nuxt会是放在最后让其渲染页面并交给用户，为了方便验证Token，我把验证Token的请求放在首页让浏览器捕获Token以及相应信息后交给Node执行手动登陆。（其实也可以通过在nuxt渲染前判断是否存在Token来决定是否进行token验证，我就不在这里再进行大量代码的展示了）
+ 结合以上思路，也就是在最后捕获所有GET请求并交手给Nuxt即可：

```js
// 最后捕获nuxt渲染
nuxtapp.get('/*', (req, res) => {
  nuxt.render(req, res)
})
```


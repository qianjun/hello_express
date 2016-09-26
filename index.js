// 这句的意思就是引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
var express = require('express');
// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
var app = express();

// req (请求) 和 res (响应) 与 Node 提供的对象完全一致，因此，你可以调用 req.pipe()、req.on('data', callback) 
// 以及任何 Node 提供的方法。
// app 本身有很多方法，其中包括最常用的 get、post、put/patch、delete，在这里我们调用其中的 get 方法，为我们的 `/` 路径指定一个 handler 函数。
// 这个 handler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response。
// request 中包含了浏览器传来的各种信息，比如 query 啊，body 啊，headers 啊之类的，都可以通过 req 对象访问到。
// res 对象，我们一般不从里面取信息，而是通过它来定制我们向浏览器输出的信息，
// 比如 header 信息，比如想要向浏览器输出的内容。这里我们调用了它的 #send 方法，向浏览器输出一个字符串。
app.get('/',function(req,res){
	res.send('Hello World!');
});

// 定义好我们 app 的行为之后，让它监听本地的 3000 端口。这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。
var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s',host,port);
})
// 端口

// 端口的作用：通过端口来区分出同一电脑内不同应用或者进程，从而实现一条物理网线(通过分组交换技术-比如internet)同时链接多个程序 Port_(computer_networking)

// 端口号是一个 16位的 uint, 所以其范围为 1 to 65535 (对TCP来说, port 0 被保留，不能被使用. 对于UDP来说, source端的端口号是可选的， 为0时表示无端口).

// app.listen(3000)，进程就被打标，电脑接收到的3000端口的网络消息就会被发送给我们启动的这个进程
// URL
// <scheme>://<host>:<port>/<url-path>

// 简单说来呢，这个 package.json 文件就是定义了项目的各种元信息，包括项目的名称，git repo 的地址，作者等等。
// 最重要的是，其中定义了我们项目的依赖，这样这个项目在部署时，我们就不必将 node_modules 目录也上传到服务器，
// 服务器在拿到我们的项目时，只需要执行 npm install，则 npm 会自动读取 package.json 中的依赖并安装在项目的 node_modules 下面，
// 然后程序就可以在服务器上跑起来了。

// npm init 这个命令的作用就是帮我们互动式地生成一份最简单的 package.json 文件
// npm install express utility --save
// --save 参数，这个参数的作用，就是会在你安装依赖的同时，自动把这些依赖写入 package.json

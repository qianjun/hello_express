console.log("Event Proxy 控制并发");
var express = require("express");
var superagent = require("superagent");
var cheerio = require("cheerio");
var eventproxy = require("eventproxy");
var url = require('url');
var load_url = 'https://cnodejs.org/'

var app = express();

app.get('/',function(req,cres){
	 // 用 superagent 去抓取 https://cnodejs.org/ 的内容
	superagent.get(load_url)
	   .end(function(err,res){
	   	if(err){
	   		return next(err);
	   	}
	   	// sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
	   	var $ = cheerio.load(res.text);
	   	var topicUrls = [];
	   	$('#topic_list .topic_title').each(function(idx,element){
	   		var $element = $(element);
	   		// $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
	   		var href = url.resolve(load_url,$element.attr('href'))
	   		topicUrls.push(href);
	   	});

	   	var ep = new eventproxy();
      topicUrls = topicUrls.slice(0,5);
	   	ep.after('topic_html',topicUrls.length,function(topics){
	   		topics = topics.map(function(topicPair){
	   			var topicUrl = topicPair[0];
	   			var topicHtml = topicPair[1];
	   			var $ = cheerio.load(topicHtml);
	   			return({
	   				title: $('.topic_full_title').text().trim(),
	   				href: topicUrl,
	   				comment1: $('.reply_content').eq(0).text().trim(),
	   				author: $('.user_name .dark').text(),
	   				score: $('.floor .big').text()
	   			});
	   		});
	   	  cres.send(topics);
	   	  // console.log(topics);
	   	});

	   	topicUrls.forEach(function(topicUrl){
	   		superagent.get(topicUrl)
	   		.end(function(err,res){
	   			ep.emit('topic_html',[topicUrl,res.text])
	   		})
	   	})

	   });
});

app.listen(process.env.PORT || 5000);

// var server = app.listen(3000,function(){
// 	var host = server.address().address;
// 	var port = server.address().port;

// 	console.log('Example app listening at http://%s:%s',host,port);
// })

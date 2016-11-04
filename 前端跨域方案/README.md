#前端跨域方案

前端在使用接口的时候中常常会遇到一些跨域问题~

关于跨域的定义，只要是**不同域名**，**不同端口**或者**不同协议**都会造成跨域。

解决跨域的方案也有好几种，下面介绍下我在工作中遇到过的方法：

###JSONP

####原理
JSONP原理其实就是使用 **script** 标签，将参数和回调函数带到服务器，然后服务器再解析所携带的参数并将数据以参数形式传给回调函数，由浏览器执行，由此完成浏览器和服务器间的通信。（这个原理感觉和很多js与端间通信类似，都是由js发出一个请求，然后端来截取，并解析，再执行回调）

有个例子蛮容易理解
```
	//前端代码
	<script type="text/javascript">
	    function dosomething(jsondata){
	        //处理获得的json数据
	    }
	</script>
	<script src="http://host/data.php?callback=dosomething"></script>

	//后端代码
	<?php
		if($params['callback'] && $this->isValidCallback($params['callback'])) $ret = $params['callback']."($ret)";

		header('Content-type:application/javascript');
		echo $ret;
	?>
```

####实现
用zepto或jQuery发送一般这样，官网上有详细的文档：
```
	$.ajax({
		type : "get", 
        url: url,   
        dataType: 'jsonp',   //要写明是jsonp的请求哦
        data: {},            //携带参数
        success: function(res) {},
        fail: function() {}
    });

```

**但是JSONP有个硬伤，只能接受get请求，所以对一些最好使用post的接口，比如会写入数据库的接口，并不是很好。**

###IFRAME

####原理

###postMessage

HTML5中提供了window.postMessage这个API，可以用作客户端和客户端直接的数据传递，既可以跨域传递，也可以同域传递。

* 页面和其打开的新窗口的数据传递

* 多窗口之间消息传递

* 页面与嵌套的iframe消息传递

* 上面三个问题的跨域数据传递

看了下[各浏览器兼容性](http://caniuse.com/#search=postMessage)，各浏览器支持度还不错，只要不用兼容IE6和IE7，可以考虑下使用postMessage
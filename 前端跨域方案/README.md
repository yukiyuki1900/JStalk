## 前端跨域方案

前端在使用接口的时候中常常会遇到一些跨域问题~

关于跨域的定义，只要是**不同域名**，**不同端口**或者**不同协议**都会造成跨域。

注意就算是域名和域名对应ip之间也会跨域哦，主域名相同子域名不同也同样会跨域
比如：
```
	//协议不一致不允许通信
	http://www.baidu.com/
	https://www.baidu.com/

	//域名和对应ip之间不允许通信
	https://www.baidu.com/
	https://172.22.172.37/  

	//主域名相同子域名不同，不允许通信
	https://www.baidu.com/
	https://baidu.com/
```

解决跨域的方案也有好几种，下面介绍下我在工作中遇到过的方法：

### JSONP

#### 原理
JSONP原理其实就是使用 **script** 标签可以链接到不同域名的js文件，并且当浏览器发出资源请求后，如果是来自**script**标签的请求，对于服务器返回的response text，浏览器会进行执行（如果是css文件，浏览器会进行repaint；如果是img，则会渲染出来）。

根据这个特点，将参数和回调函数带到服务器，然后服务器再解析所携带的参数并返回一个callback(json)，json为传给浏览器的数据，由浏览器执行，由此完成浏览器和服务器间的通信。

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
		if($params['callback'] && $this->isValidCallback($params['callback'])) 
			$ret = $params['callback']."($ret)";

		header('Content-type:application/javascript');
		echo $ret;
	?>
```

#### 实现
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

### IFRAME

#### 原理
window对象有个name属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的。
所以实际上也是通过修改window.name来解决跨域

#### 实现



### postMessage

HTML5中提供了window.postMessage这个API，可以用作客户端和客户端直接的数据传递，既可以跨域传递，也可以同域传递，是一个安全的跨源通信的方法。

* 页面和其打开的新窗口的数据传递

* 多窗口之间消息传递

* 页面与嵌套的iframe消息传递

* 上面三个问题的跨域数据传递

看了下[各浏览器兼容性](http://caniuse.com/#search=postMessage)，各浏览器支持度还不错，只要不用兼容IE6和IE7，可以考虑下使用postMessage

比如一个页面中一部分（如iframe）能拿到数据，另一个部分（如iframe的parent，也就是iframe的父节点）没法拿到这部分数据，但是却需要用到，此时便可以使用postMessage来将这部分数据传给页面的这个部分。所以可以用postMessage来跨域在不同窗口/iframe间发送数据。

#### 实现

比如现在有个页面里内嵌了一个iframe
```
	<div style="width:200px; float:left; margin-right:200px;border:solid 1px #333;">
	    <div id="color">Frame Color</div>
	</div>
	<div>
	    <iframe id="child" src="http://host.com/xMessage.html"></iframe>
	</div>
```

发送数据
```
	//通用格式
	otherWindow.postMessage(message, targetOrigin);
```
* **otherWindow**：其他窗口的一个引用，比如iframe的contentWindow属性、执行window.open返回的窗口对象、或者是命名过或数值索引的window.frames。
* **message**：传给其他window的数据
* **targetOrigin**：指定能接收消息事件的窗口，如果不传，默认为'*'，不限制通信域

```
	//帮忙获得window的函数，可以参考下
	var getContentWindow = function(obj) {
	    /**
	     * 如果是window对象，直接返回
	     * eg. top, parent, window
	     */
	    if (isWindowObject(obj)) {
	        return obj;
	    }

	    if ($.isString(obj)) {
	        /*只返回选择器返回的第一个dom节点*/
	        obj = document.querySelector(obj);
	    }

	    /*如果是iframe，获取contentWindow*/
	    if (obj.nodeName === 'IFRAME') {
	        return obj.contentWindow;
	    }

	    return obj;
	};

	var target = $("#child").get(0);
	var otherWindow = getContentWindow(target);

	otherWindow.postMessage(message, 'http://host.com/xMessage.html');

	//当然这里也可以用window.frames+索引值来获得如
	window.frames[0].postMessage(message, 'http://host.com/xMessage.html');
```

接收数据
接收域可监听'message'来获取数据
```
	window.addEventListener("message", function(e) {
		// For Chrome, the origin property is in the event.originalEvent object.
		var origin = event.origin || event.originalEvent.origin; 

		//为了安全起见，对MessageEvent对象判断了一下消息源
		if (event.origin !== "http://example.org:8080") {
			return;
		}
		
		console.log('message received:  ' + e.data,event);
    	e.source.postMessage('holla back youngin!',e.origin);
 	}, false);
```

这里有几个重要的属性：

1. **data**：传递来的message

2. **source**：消息源，消息的发送窗口/iframe

3. **origin**：发送消息窗口的源（协议+主机+端口号）

这样就可以跨域把数据发送和接收了
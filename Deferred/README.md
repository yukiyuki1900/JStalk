##Deferred

> 这里介绍的是[jQuery的Deferred对象](http://api.jquery.com/category/deferred-object/)
> 当然Zepto也引入了Deferred对象，用法一样

在jQuery的1.5版本开始引入了Deferred对象，通过**jQuery.Deferred()**（下文的jQuery域统一用$替代，不然敲的好累）创建对象，可以注册多个回调函数，来代替多个同步或异步函数的成功或失败的状态。

和jQuery对象的链式调用方式一样，Deferred对象也是可以链式调用的。

Deferred除了会提供像promise的一些方法和属性之外，它也可以返回一个promise对象**deferred.promise()**，具体promise的用法可见文章[Promise](https://github.com/yukiyuki1900/JStalk/tree/master/Promise)

### Deferred与promise的关系

简单来说关系是这样的：
* **Deferred拥有Promise**  我们可以通过**deferred.promise()**来返回一个promise对象
* **Deferred 具备对 Promise的状态进行操作的特权方法**


### Deferred与$.ajax()返回的对象的关系

我们很容易发现在jQuery里**$.ajax**返回的对象和deferred拥有了很多相似的函数与属性，那$.ajax()返回的是deferred对象吗？

在这篇[using-deferreds-in-jquery](http://www.erichynds.com/blog/using-deferreds-in-jquery)文章中有一段话：

**$.ajax() returns an object packed with other deferred-related methods. I discussed promise(), but you’ll also find then(), done(), fail(), and a host of others. You don’t have access to the complete deferred object, though; only the promise, callback-binding methods, and the isRejected() and isResolved() methods, which can be used to check the state of the deferred.**

意思就是$.ajax返回的对象（[jqXHR](http://api.jquery.com/Types/#jqXHR)，这是对原生的XMLHttpRequest的封装）包含了deferred相关的函数，包括promise()、then()、done()、fail()、isRejected()、isResolved()。

但是返回的对象里却没有resolve(), resolveWith(), reject(), rejectWith() 这几个函数，而这几个函数的作用是改变deferred对象流程。所以可以说，**$.ajax()返回的是一个只读的deferred对象。**

在文章中摘录的那一段话的下一段，解释了为什么不返回一个完整的deferred对象。那是因为，如果返回完整的deferred对象，那么外部程序就能随意的触发deferred对象的回调函数，很有可能在AJAX请求结束前就触发了回调函数（resolve），这就是与AJAX本身的逻辑相违背了。 
所以为了避免不经意间改变任务的内部流程，我们应该只返回deferred的只读版本（dfd.promise()）

### 使用
[jQuery的deferred文档](http://api.jquery.com/category/deferred-object/)里列出了deferred的所有API，具体可以在这里查。

在日常开发中感觉会常用到的几个API
```
	//指定回调函数
	.then( doneCallbacks, failedCallbacks )

	//$.when()接受多个deferred对象作为参数，当它们全部运行成功后，才调用resolved状态的回调函数
	//但只要其中有一个失败，就调用rejected状态的回调函数
	.when( deferredOBJ, deferredOBJ )

	//操作成功后的回调函数
	.done( doneCallbacks )

	//操作失败后的回调函数
	.fail( failCallbacks )

	//改变deferred的状态，一旦.resolve()被调用，则会依次执行.done()和.then()里指定的成功回调函数
	//.done()和.then()指定的回调函数参数由 .resolve()传入
	.resolve()

	//改变deferred的状态，一旦.reject()被调用，则会依次执行.fail()和.then()里指定的失败回调函数
	//.fail()和.then()指定的回调函数参数由 .reject()传入
	.reject()   
```

$.resolve & $.done()
```
	function fn1() {
		console.log(" 1 ");
	}
	function fn2() {
		console.log(" 2 ");
	}
	function fn3( n ) {
		console.log(n + " 3 " + n);
	}

	var dfd = $.Deferred();
 
	dfd
	  	.done( [ fn1, fn2 ], fn3, [ fn2, fn1 ] )
		.done(function( n ) {
			console.log( n + " we're done." );
		});

	dfd.resolve( "and" );
```
执行结果：
![image](https://github.com/yukiyuki1900/JStalk/blob/master/Deferred/deferred-resolve.png)


$.when()
```
	function getData() {
		//返回一个deferred对象
		return $.get('/foo/');
	}

	function showDiv() {
		//创建一个deferred对象
		var dfd = $.Deferred();

		$('#foo').fadeIn( 1000, dfd.resolve );

		return dfd.promise();
	}

	$.when( getData(), showDiv() ).done(function( ajaxResult ) {
	  	console.log('The animation AND the AJAX request are both done!');
	});
```
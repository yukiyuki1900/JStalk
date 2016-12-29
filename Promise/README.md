## Promise

### 概念
ECMAScript6提供了Promise对象，这个对象是抽象的异步处理的对象，并提供了相应的操作api，可以用来处理异步消息，尤其是当存在多个异步请求并发且请求之间有依赖关系的时候，按照传统的层层嵌套异步请求的写法丝毫不优雅，而且可读性差。如果使用promise，则可使用链式的方式实现多个并发的异步请求。

一个promise有3中状态：
* pending：promise对象刚被创建的初始化状态
* fulfilled：已完成（操作成功，又称resolve），此时会调用 **onRejected**
* rejected：已失败（操作失败），此时会调用 **onFulfilled**

一旦一个promise达到了fulfilled或rejected状态的话，它就不会再发生改变。
也就是说，promise对象的状态发生改变只有两种：
* 从pending -》 fulfilled  成功
* 从pending -》 rejected   失败

只要状态发生了改变，这个状态就不会再变化。这个和Event事件监听不太一样，事件监听是一旦错过了事件的发生，再如何监听都不会得到结果，而如果对promise对象加一个回调函数，会立即得到结果。


### 创建promise对象
流程如下：
1. **new Promise(fn)** 返回一个promise对象
2. 在**fn** 中指定异步等处理
	* 处理结果正常的话，调用 **resolve（处理结果的值）**
	* 处理结果错误的话，调用 **reject（Error对象）**

```
	//创建一个用Promise把XHR处理包装起来的名为 getURL 的函数
	function getURL(URL) {
		return new Promise(function (resolve, reject) {
			var req = new XMLHttpRequest(); 
			req.open('GET', URL, true); 

			req.onload = function () {
				if (req.status === 200) { 
					resolve(req.responseText);
				} else {
					reject(new Error(req.statusText));
				} 
			};

			req.onerror = function () { 
				reject(new Error(req.statusText));
			};

			req.send(); 
		});
	}

	// 运行示例
	var URL = "http://lalala/getlalala"; 

	getURL(URL).then(function onFulfilled(value){
		console.log(value); 
	}).catch(function onRejected(error){
		console.error(error); 
	});
```

在上面例子中，**getURL** 只有在通过XHR取得结果状态为200时才会调用**resolve**，其他情况（获取数据失败）时则会调用**reject**方法。

其中**.catch** 只是 **promise.then(undefined, onRejected)** 的别名而已，如下代码也可以完成同样的功能：

```
	getURL(URL).then(onFulfilled, onRejected);
```

### Promise.resolve(value)
静态方法 **Promise.resolve(value)** 是 **new Promise()** 方法的快捷方式
比如 **Promise.resolve(42)** 可以认为是下面的代码的语法糖

```
	new Promise(function(resolve){ 
		resolve(42);
	});
```

**resolve(42)** 会让promise对象立即进入resolve状态，并将**42**传递给后面then里指定的 **onFulfilled** 函数

**Promise.resolve(value)**的返回值也是一个promise对象，可以这样对返回值进行**.then**调用
```
	Promise.resolve(42).then(function(value) {
		console.log(value);
	})
```

在对promise对象进行初始化或编写测试代码的时候都很方便。

### Thenable
**Promise.resolve** 方法另一个作用就是将 thenable 对象转换为promise对象。

thenable 指的就是一个具有 **.then**方法的对象。就像有时候我们将具有 **.length** 方法的非数组对象成为 Array like一样。

像 **jQuery.ajax()** 返回的值就是thenable的，因为**jQuery.ajax()**返回的值是[jqXHR Object对象](http://api.jquery.com/Types/#jqXHR)，这个对象具有**.then**方法。

```
	//obj 为具有 `then`方法的对象
	var obj = $.ajax('/json/xxx.json');
```

可以通过使用 **Promise.resolve** 来转换成为一个promise对象
```
	var promise = Promise.resolve($.ajax('/json/comment.json'));// => promise对象 
	promise.then(function(value){
		console.log(value); 
	});
```


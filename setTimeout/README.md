## setTimeout

前几天群里有人问以下代码的输出是啥：

```
function Test() {
	this.run = function() {
		this.aa();
		setTimeout(this.aa, 1000);
		return 0;
	}
	this.aa = function() {
		console.log(this)
	}
}

var t = new Test();
t.run();

```

在控制台试了下，其输出是：

```
Test
0
Window
```

输出第一次执行aa函数的时候，this指针指向Test，而在setTimeout里的执行的aa函数，this指向了Window

瞬间起了好奇心，便顺便研究了下setTimeout这个函数

在控制台输入：

```
setTimeout(function() {
    console.log('111');
}, 0);

console.log(222);
```

输出是 
```
222
111 

```

为什么虽然延时为0，却不立即执行呢，这就要说到js执行上下文的函数调用栈（call stack）。因为js是单线程的，也就是在同一时间内只执行一行代码。当执行函数的时候，会将函数压到堆栈里，但是如果遇到异步函数（如setTimeout，ajax等），它会把函数扔到另一个新的调用栈里，而这个调用栈为先进先出的队列结构，而这个队列，会在调用栈清空了之后，才会执行。所以即便setTimeout设置为0，还是不会立即执行。

此时执行setTimeout的时候，已经跳出来原来的执行上下文了，所以此时this指向的是全局变量window

那如果让this指向Test呢，可以借助闭包或者es6的箭头函数。


```
//闭包
function Test() {
	this.run = function() {
		this.aa();
		let that = this;
		setTimeout((function(that) {
			return function() {
				that.aa();
			}
		})(that), 1000);
		return 0;
	}
	this.aa = function() {
		console.log(this)
	}
}

var t = new Test();
t.run();



//箭头函数
function Test() {
	this.run = function() {
		this.aa();
		setTimeout(this.aa, 1000);
		return 0;
	}
	this.aa = ()=>{
		console.log(this)
	}
}

var t = new Test();
t.run();

```


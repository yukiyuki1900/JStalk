## ES6新特性

> 之前用react做了个项目，首次在项目中使用了ES6，一直都没好好总结下ES6的一些新特性。现在就来梳理一下开发中一些常用到的特性吧 ~~

ES6的新特性都能在[ES6特性](http://es6-features.org/#Constants)里找到

ES6是ECMA Script6的缩写，也就是JavaScript的第6个版本标准，因为这个版本是2015年发布的，所以又称ECMA Script2015（简称ES2015）。

**所以ES6就是ES2015**


### [Babel](http://babeljs.cn/)

因为浏览性兼容性的问题，用es6开发的同时都会使用Babel对js进行编译转码，使得能让代码在更多浏览器中运行。[es6浏览器兼容](http://caniuse.com/#search=es6)

具体使用可进入Babel官网查看[http://babeljs.cn/](http://babeljs.cn/)

### 常用到的ES6新特性

#### let，const
最常用的变量声明，功能和var类似，但是使用过程中又有些不同。

我们都知道在es5，js是没有块级作用域的，变量在赋值的时候会**声明提前**，如以下：
```
	// i会被声明提前，这里i的值是'undefined'
	console.log(i);   //undefined
	for(var i = 0 ; i < 100 ; i ++) {
		//i被赋值
		console.log(i);
	}
	console.log(i);   //100
```

因为es5中js只有函数作用域和全局作用域，虽然为开发提供了一定的便捷，但是也会带来一些不合理的场景。比如函数内（或代码块级内层变量会覆盖外层变量）

在es6中提倡使用**let**来替代**var**，上面的代码如果用let替代var，执行如下：
```
	// i在这里不能用
	console.log(i);   //js报错，i不能用
	for(let i = 0 ; i < 100 ; i ++) {
		//i被赋值，块级作用域内可用
		console.log(i);
	}
	console.log(i);   //js报错，i不能用
```

**const**常常用于声明一个“常量”，但这个“常量”并不是我们通常意义上说的那种一经声明便不能更改值的常量。这里指的是**常量索引**，也就是说，使用**const**声明的变量的索引是一个不可更改的常量，也就是指向这个变量的指针不能更改，但是值还是可以更改哒
```
	const arr = ["a", "b"];

	arr = ["c", "d"];   //报错 `Assignment to constant variable.`

	arr.splice(0, 1, "e");   //可行，返回被删除的数组 `["a"]`，arr的值变为数组 `["e", "b"]`

	arr.push("f");   //可行

	arr.length = 0;   //可行
```

在一些计数的循环，我们知道如果执行代码的时期晚于计数的时期，输出的计数就会是技术结束后的值：
```
	var a = [];
	for(var i = 0 ; i < 10 ; i ++) {
		a[i] = function(){
			console.log(i);
		}
	}
	a[6]();   //10
```

这里a[6]()执行后打印10，原因是i是用**var**声明的，全局可以用，每次遍历都会覆盖一次，遍历完成，此时i的值是10

如果使用**let**则不会出现这种情况：
```
	var a = [];
	for(let i = 0 ; i < 10 ; i ++) {
		a[i] = function(){
			console.log(i);
		}
	}
	a[6]();   //10
```

#### destructuring(解构)

就是从数组和对象中提取值，对变量进行赋值，看下例子：
```
	function mangle(json) {
		let { id, status, data: number } = json;
		console.log(id, status, number);
		// 42, OK, [867, 5309]
	}

	mangle({ 
		id: 42, 
		status: "OK", 
		data: [867, 5309] 
	});
```
可以看到变量能自动从传入的对象提取值出来

```
	function mangle(json) {
		let { id=9, status, data: number } = json;
		console.log(id, status, number);
		// 9, OK, [867, 5309]
	}

	mangle({ 
		data: [867, 5309], 
		status: "OK" 
	});
```
顺序不一样也能提取出相对应key的值

按照这样的思路，调换x和y的值便可以这么写：
```
	if ( swapxy ) {
		[x, y] = [y, x];
	}
```

#### 默认参数
在开发中经常会遇到参数传递的函数，如果有些参数是选填的带默认值的话，我们一般将选填的参数放在参数的最后：
```
	function lala(a, b = 1, c = 2) {
		console.log(a, b, c)
	}
```

但是这样会有个缺点，在调用函数的时候如果中间的参数不传值的话，我们还是得传个`undefined`的值，如果参数很多的情况，调用非常的麻烦，一点都不友好。
```
	lala(3, undefined, 4);
```

在es6中，一切都会变得方便多了，我们可以将必填的参数标明参数名，选填的参数以一个Obj形式传入，这样从函数定义就可以一眼看出，哪些参数是必填，哪些餐食是选填：
```
	function lala(a, {b = 1, c = 2} = {}) {
		console.log(a, b, c)
	}

	lala(3, {
		b: 4
	});      // 3,4,2
```

#### template string
在往页面dom节点插入代码的时候我们经常都是用 **+** 号将需要插入的html作为一个字符串插入到html中，又或者使用各种js模板工具来辅助实现。比如：

``
	$("#result").append(
		"There are <b>" + basket.count + "</b> " +
		"items in your basket, " +
		"<em>" + basket.onSale + 
		"</em> are on sale!"
	);
``

在es6中，我们可以通过使用**``**来实现模板字符串的插入

``
	$("#result").append(`
		There are <b>${basket.count}</b> 
		items in your basket, <em>${basket.onSale}</em>
		are on sale!
	`);
``

#### arrow function
在es6，arrow是一个函数声明的简洁快捷的语法方式。

```
	function(i){ return i + 1; } //ES5
	(i) => i + 1 //ES6
```

是不是超级方便？通过使用**=>**就能完成一个函数的声明。

```
	// ES5实现
	nums.forEach(function (v) {
	   if (v % 5 === 0)
	       fives.push(v);
	});

	// ES6实现
	nums.forEach(v => {
	   if (v % 5 === 0)
	       fives.push(v)
	})
```

需要注意的是，在arrow function里的this指向的是定义时所在的对象哦，举个例子，比如在setTimeout或forEach等函数内部，this指向的是全局变量window，传统的解决方案要不就是在函数将this传给一个变量，要不就是将this作为参数传入函数内。

```
	// ES5实现
	// 实现一
	var self = this;
	this.nums.forEach(function (v) {
	    if (v % 5 === 0)
	        self.fives.push(v);
	});

	// 实现二
	this.nums.forEach(function (v) {
	    if (v % 5 === 0)
	        this.fives.push(v);
	}, this);


	// ES6实现
	this.nums.forEach((v) => {
	    if (v % 5 === 0)
	        this.fives.push(v)
	})
```

### 参考材料
* [http://es6-features.org](http://es6-features.org/#StatementBodies)
* [jQuery UK - EcmaScript 6](https://docs.google.com/presentation/d/1PvAHvODY_L3AiumgyjNFl4IPr82dq74vJxmMPOeU8uE/edit#slide=id.g68f6b382e_0118)
* [learn-es2015](http://babeljs.cn/docs/learn-es2015)

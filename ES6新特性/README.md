## ES6新特性

> 之前用react做了个项目，首次在项目中使用了ES6，一直都没好好总结下ES6的一些新特性。现在就来梳理一下吧 ~~

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

#### 函数参数
在开发中经常会遇到参数传递的函数，尤其是在写公共函数，有些参数是可选的，而且是多个函数可选的时候，我们常常用的方法是把参数封装成一个Obj，使用的时候可以选择到底传哪些参数，比如这样：
```
```

### 参考材料
* [jQuery UK - EcmaScript 6](https://docs.google.com/presentation/d/1PvAHvODY_L3AiumgyjNFl4IPr82dq74vJxmMPOeU8uE/edit#slide=id.g68f6b382e_0118)
* [learn-es2015](http://babeljs.cn/docs/learn-es2015)

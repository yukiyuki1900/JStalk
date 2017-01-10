## ES6新特性

> 之前用react做了个项目，首次在项目中使用了ES6，一直都没好好总结下ES6的一些新特性。现在就来梳理一下吧 ~~

ES6的新特性都能在[ES6特性](http://es6-features.org/#Constants)里找到

ES6是ECMA Script6的缩写，也就是JavaScript的第6个版本标准，因为这个版本是2015年发布的，所以又称ECMA Script2015（简称ES2015）。

**所以ES6就是ES2015**


### [Babel](http://babeljs.cn/)

因为浏览性兼容性的问题，用es6开发的同时都会使用Babel对js进行编译转码，使得能让代码在更多浏览器中运行。[es6浏览器兼容](http://caniuse.com/#search=es6)

### 常用到的ES6新特性

#### let，const
最常用的变量声明，功能和var类似，但是使用过程中又有些不同。

我们都知道在es6之前，js是没有块级作用域的，变量在赋值的时候会**声明提前**，如以下：
```
	// i会被声明提前，这里i的值是'undefined'
	console.log(i);   //undefined
	for(var i = 0 ; i < 100 ; i ++) {
		//i被赋值
		console.log(i);
	}
	console.log(i);   //100
```

因为es6之前js只有函数作用域和全局作用域，虽然为开发提供了一定的便捷，但是也会带来一些不合理的场景，如果你是从其他语言（比如计算机同学们都会学的c++）切换到js的开发环境，这种不一致的机制还会带来更多的理解成本啦。

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
	//
```


### 参考材料
* [jQuery UK - EcmaScript 6](https://docs.google.com/presentation/d/1PvAHvODY_L3AiumgyjNFl4IPr82dq74vJxmMPOeU8uE/edit#slide=id.g68f6b382e_0118)
* [learn-es2015](http://babeljs.cn/docs/learn-es2015)

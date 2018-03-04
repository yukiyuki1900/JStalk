## array常用函数与技巧

常用函数啊...

### 数组创建
```
	var arr = new Array();
	var arr1 = new Array('a', 'b');
	var arr2 = ['a', 'b'];
```

### 增加数组元素
注意以下操作原数组会发生改变
```
	var arr = ['a', 'b', 'c'];
	arr.push('d');   //在数组最后插入元素或数组，返回数组长度
	arr.unshift('e');  //在数组最前插入元素或数组，返回数组长度
	arr.splice(1, 0, 'f');   //在数组指定位置插入元素或数组，返回[]
```
![image](https://github.com/yukiyuki1900/JStalk/blob/master/array%E5%B8%B8%E7%94%A8%E5%87%BD%E6%95%B0%E4%B8%8E%E6%8A%80%E5%B7%A7/arr_add.png)

### 删除数组元素
注意以下操作原数组会发生改变
```
	var arr = ['a', 'b', 'c', 'd'];
	arr.pop();   //删除数组最后的元素，返回该元素
	arr.shift();  //删除数组最前面的元素，返回该元素
	arr.splice(1, 1);   //在数组指定位置删除特定数量的元素，以数组格式返回被删除的元素
```
![image](https://github.com/yukiyuki1900/JStalk/blob/master/array%E5%B8%B8%E7%94%A8%E5%87%BD%E6%95%B0%E4%B8%8E%E6%8A%80%E5%B7%A7/arr_del.png)

### 数组截取与合并
注意以下操作都不会改变原数组
```
	var arr = ['a', 'b', 'c', 'd'];
	arr.slice(1, 3);  //截取从1到3之前（不包含3）的元素，以数组格式返回。
	//**注意该方法不会修改原数组，如需要对原数组进行元素的删除，则可以选择使用splice。**

	var arr2 = ['f'];
	arr.concat(arr2);  // 合并两个数组，返回合并后的数组
```
![image](https://github.com/yukiyuki1900/JStalk/blob/master/array%E5%B8%B8%E7%94%A8%E5%87%BD%E6%95%B0%E4%B8%8E%E6%8A%80%E5%B7%A7/arr_con.png)

### 数组的排序
注意以下操作原数组会发生改变
```
	var arr = [1, 2, 3, 4];
	arr.reverse();    //数组翻转
	arr.sort(function(a, b){     //数组由小到大排序
		return a - b;
	});
```
![image](https://github.com/yukiyuki1900/JStalk/blob/master/array%E5%B8%B8%E7%94%A8%E5%87%BD%E6%95%B0%E4%B8%8E%E6%8A%80%E5%B7%A7/arr_sort.png)

###清空数组
把数组长度设为0就好了

```
	arr.length = 0;
```

### 遍历数组
```
	var arr = ['a', 'b', 'c', 'd'];
	//方法一
	for(var i = 0 , len = arr.length ; i < len ; i ++) {
		console.log(arr[i]);
	}
	//方法二，这个会有坑，还是少用比较好
	for(var i in arr) {
		console.log(arr[i])
	}
	//方法三，貌似IE中的array没有forEach方法
	arr.forEach(function(e) {
		console.log(e);
	})
```

如果js扩展了原生的Array，使用for in也会遍历出来~
```
	//扩展了js原生的Array
	Array.prototype.test = function(){
		//...
	}
	for(var i in arr) {
		console.log(arr[i]);
	}

```
![image](https://github.com/yukiyuki1900/JStalk/blob/master/array%E5%B8%B8%E7%94%A8%E5%87%BD%E6%95%B0%E4%B8%8E%E6%8A%80%E5%B7%A7/arr_for1.png)

可使用hasOwnProperty解决这个问题
```
	//扩展了js原生的Array
	Array.prototype.test = function(){
		//...
	}
	for(var i in arr) {
		if (arr.hasOwnProperty(i)) {
			console.log(arr[i]);
        }
	}

```

### 区分数组和Object的几种方法

执行以下代码：

```
	var arr = [];
	console.log(typeof arr);   // 'object'
```

可以看到返回的是'object'，原因是数组本身就是一个对象。那应该如何区分Array和Object呢？

第一反应是可以用数组自带的函数和属性，比如length,concat,pop等上文涉及到的一些函数，但是请注意，在object里，属性是可以定义的。如果给object定义一个length或者concat,pop之类的属性，那岂不是没法区分了？

以下是几种区分的方法：

```
	1. isArray
	es5新增的检测数组的方法：Array.isArray()

	var arr = [];
	console.log(Array.isArray(arr));   // true


	2. constructor
	通过构造函数可以判断是否为数组

	var arr = [];
	console.log(arr.constructor === Array);   // true

	不过因为构造函数可以被改写，所以不能确保，如：

	var str = '';
	str.constructor = Array;
	console.log(str.constructor === Array);   // true

	可是str并不是数组


	3. instanceof
	instanceof检测的是变量是检测的constructor,注意数组的constructor既是'Array'，也是'Object'

	var arr = [];
	console.log(arr instanceof Array);   // true
	console.log(arr instanceof Object);   // true

	同constructor方法，因为constructor会被改写，所以也不能确保。


	4. prototype
	通过 Object.prototype.toString.call方法，能够稳妥的判断是否是数组

	var arr = [];
	console.log(Object.prototype.toString.call(arr) === '[object Array]')   // true

```

### 查找数组最大最小值

最常见的数组的最大最小值，可以很简单的用遍历找出。

但是如果不使用遍历呢？

```
	var arr = [1,3,4,5,1,5];

	// 查找最大值
	Math.max.apply(this, arr);  // 5

	//查找最小值
	Math.min.apply(this, arr);  // 1
```
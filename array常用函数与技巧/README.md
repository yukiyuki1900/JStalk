#array常用函数与技巧

常用函数啊...

###数组创建
```
	var arr = new Array();
	var arr1 = new Array('a', 'b');
	var arr2 = ['a', 'b'];
```

###增加数组元素
```
	var arr = ['a', 'b', 'c'];
	arr.push('d');   //在数组最后插入元素或数组，返回数组长度
	arr.unshift('e');  //在数组最前插入元素或数组，返回数组长度
	arr.splice(1, 0, 'f');   //在数组指定位置插入元素或数组，返回[]
```
![image](https://github.com/yukiyuki1900/JStalk/blob/master/array%E5%B8%B8%E7%94%A8%E5%87%BD%E6%95%B0%E4%B8%8E%E6%8A%80%E5%B7%A7/arr_add.png)

###删除数组元素

###清空数组
把数组长度设为0就好了

```
	arr.length = 0;
```

###遍历数组
一般用两种

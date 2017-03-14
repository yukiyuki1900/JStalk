## 函数内属性 arguments

先看个最简单的函数

```
    function func(a, b) {
        console.log(a);        //1
        console.log(b);        //2
    }

    func(1, 2);   
```

函数**func**接收两个参数，并且把这两个参数打印出来。

在js里，函数的参数定义不需要声明类型，传入的参数也可以使任何类型的数据。而且，虽然函数定义的时候接受2个参数，但实际上即使函数定义没有参数，也可以往函数里传任何数量的参数。

在函数里面，可以通过**arguments**对象来获取传入的所有参数。

```
    function func() {
        console.log(arguments[0]);     //1
        console.log(arguments[1]);     //2
    }

    func(1, 2);
```

如果对**arguments**进行类型判断，可以发现其实它是个对象：

```
    function func() {
        console.log(typeof arguments);     //object
        console.log(arguments instanceof Object);     //true
        console.log(arguments instanceof Array);     //false
        console.log(arguments)            //[1, 2]
        console.log(arguments.length)     //2
    }

    func(1, 2);
```

但是却拥有数组一样的**length**属性和下标，因为它是一个**类数组对象**，可以使用for循环来遍历获取所有参数。

如何将这种类数组改成真正数组的，可以借助Array的slice或者concat的方法，因为这两个方法不会改变原数组，而且能返回一个新的数组。

```
    Array.prototype.slice.call(arguments);
    Array.prototype.concat.call(arguments);
```

```
    //使用slice
    function fun_slice() {
        var arg_tmp = Array.prototype.slice.call(arguments);
        console.log(arg_tmp instanceof Object);     //true
        console.log(arg_tmp instanceof Array);     //true
    }

    fun_slice(1, 2);


    //使用concat
    function fun_concat() {
        var arg_tmp = Array.prototype.concat.call(arguments);
        console.log(arg_tmp instanceof Object);     //true
        console.log(arg_tmp instanceof Array);     //true
    }

    fun_concat(1, 2);

```

### callee

说到这里顺便再说下arguments的一个熟悉**callee**，这个属性是一个指针，指向拥有这个arguments的这个函数，如果函数运行的时候需要调用自己，通过**arguments.callee**来调用函数，这样函数体就能和函数名解耦了。


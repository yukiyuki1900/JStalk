## 对象遍历

js的数据类型分为基本类型和引用类型，具体概念在[对象复制](https://github.com/yukiyuki1900/JStalk/tree/master/%E5%AF%B9%E8%B1%A1%E5%A4%8D%E5%88%B6)有详细说到。

在日常开发中，Object和Array恐怕是最常用的数据类型了，而遍历Object和Array也是常常会遇到。

Object是一个基础类型，其他所有类型都从Object继承了基本的行为，包括Array。所以typeof 一个数组的话，得到的是'object'。

```
    var arr = [];
    console.log(typeof arr);   // 'object'
```

这里再多说一句，除了Number，String，null，undefined，Boolean5个基本类型，其它的实例都会归为object。所以呢，**typeof**只能对基本类型有用哦~

### for 和 for in

for遍历应该是我们最常用的对象遍历方式了。

```
    var arr = [1, 2, 3
    for(var i = 0 , len = arr.length ; i < len  ; i ++) {
        console.log(arr[i]);    //输出1，2，3
    }
    for(var i in arr) {
        console.log(arr[i]);    //输出1，2，3
    }

    var obj = {
        x: 1,
        y: 2,
        z: 3
    }
    for(var i in obj) {
        console.log(obj[i]);    //输出1，2，3
    }
```

这个应该是最简单的遍历方式了。在这种情况下for 和 for in的表现一致。

如果给对象的原型加一个属性的话：

```
    //原型链上增加属性
    Object.prototype.set1 = 'setobj';
    Array.prototype.set2 = 'setarray';

    for(var i = 0 , len = arr.length ; i < len  ; i ++) {
        console.log(arr[i]);    //输出1，2，3
    }
    for(var i in arr) {
        console.log(arr[i]);    //输出1，2，3，setarray，setobj
    }
    for(var i in obj) {
        console.log(obj[i]);    //输出1，2，3，setobj
    }

```

由此可以知道，
* for in 循环遍历时，会遍历到原型链上的属性， 而for循环则不会
* 因为array继承了object，所以给Object原型链上增加属性，array也会增加相应的属性

如果只想遍历对象本身的属性，只要加个**hasOwnProperty**过滤掉即可。

```
    //加hasOwnProperty过滤
    for(var i in arr) {
        if(arr.hasOwnProperty(i)) {
            console.log(arr[i]);    //输出1，2，3
        }
    }
    for(var i in obj) {
        if(obj.hasOwnProperty(i)) {
            console.log(obj[i]);    //输出1，2，3
        }
    }
```

### 深度遍历

所谓深度遍历就是对象嵌套对象，学过数据结构的都能了解，其实这就是一个简单的树遍历的过程，深度优先或者宽度优先都行，这里就不多说了。在[对象复制](https://github.com/yukiyuki1900/JStalk/tree/master/%E5%AF%B9%E8%B1%A1%E5%A4%8D%E5%88%B6)里的深度复制里有介绍到。

### Array的迭代方法

es5为数组定义了5个迭代的方法，每个方法接收两个参数：每项都要运行的函数和运行改函数的作用域对象（可选，用来影响this的值）。而传入的函数接收三个参数：每一项的值，每一项的index，还有数组本身。

* forEach()

**forEach **也是我们比较经常用的一个遍历函数，它只是对数组的每一项运行传入函数，没有返回值。本质上和使用for循环来迭代数组一样。

```
    //forEach
    arr.forEach(function (item, index, array) {
        console.log(index + ' ' + item);     
    })

```

* filter()

**filter** 可以指定返回数组中符合特定条件的项，返回格式为数组。

```
    var arr = [1, 2, 3];
    //filter
    var filterarr = arr.filter(function (item, index, array) {
        return item%2 == 1
    })
    console.log(filterarr);  //输出[1, 3]

```

* map()

**map** 也是返回一个数组，但是返回数组的每一项都是在原始数组上计算的结果。

```
    var arr = [1, 2, 3];
    //map
    var maparr = arr.map(function (item, index, array) {
        return item*2
    })
    console.log(maparr);  //输出[2, 4, 6]

```

* every() 
* some()

**every**和**some** 很相像，它们都是判断数组里的项是都满足特定的条件，返回true或者false。**every**是所有项都满足条件的时候才返回true，而**some**只要有一个项满足条件就会返回true。

```
    var arr = [1, 2, 3];

    //every
    var everybool = arr.every(function (item, index, array) {
        return item>2
    })
    console.log(everybool);  //输出false

    //some
    var somebool = arr.some(function (item, index, array) {
        return item>2
    })
    console.log(somebool);  //输出true
```

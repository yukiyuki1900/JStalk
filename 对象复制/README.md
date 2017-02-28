## 对象复制

说到对象复制，需要先理解js的数据类型。

在js里有5种基本类型：**Undefined**、**Null**、**Boolean**、**Number**、**String**。这5种基本数据类型是按值访问的，也就是说操作的时候，是直接保存的是遍历中实际的值。

除了**基本类型**，还有一种数据类型为**引用类型**，如**Object**，**Array**都属于引用类型。引用类型在复制保存对象的某个变量时，操作的是对象的引用（指针），也就是说，包含引用类型的变量实际上包含的不是对象本身，而是指向该对象的指针。

所以，如果简单的赋值 a = b，那么当b的属性改变的时候，a的属性也会改变，因为a和b同时指向了内存的一个对象。

```
    var obja = {
        x: 11,
        y: 22
    }
    var objb = obja;
    objb.x = 33;
    console.log(obja.x);    // 33
```

注：但是如果是为对象添加属性的时候，操作的是实际的对象。

所以，我们在这里讨论的是如何创建一个对象的副本。

相关文章[对象遍历](https://github.com/yukiyuki1900/JStalk/tree/master/%E5%AF%B9%E8%B1%A1%E9%81%8D%E5%8E%86)

复制的话分两种，一种是浅复制，也就是所有嵌套的对象和数组都是只是复制了引用，并不是复制里面的值。而深复制则是完全复制了一个新的对象副本。

### Object的深浅复制

这是一个对象的浅复制实现：

```
    obja = {
        x: 11,
        y: 22,
        z: {
            m: 44,
            n: 55
        }
    }

    //浅复制
    var shadowObj = shadowCopy(obja);

    function shadowCopy (obj) {
        var dist = {};

        for(var i in obj) {
            if(obj.hasOwnProperty(i)) {
                dist[i] = obj[i];
            }
        }

        return dist;
    }

```

在代码中，只是对对象的第一层属性进行依次遍历复制，而因为js的对象是引用存储，所以浅复制会导致obja.z和shadowObj.z所指向的是一个内存地址，一旦其中一个对象的值发生改变，也会引起另一个对象的值发生改变。

下面是一个对象的深复制实现：
```
    var deepObj1 = deepCopy1(obja);
    function deepCopy1(obj) {
        var dist = JSON.stringify(obj);

        return JSON.parse(dist);
    }

```
这是利用字符串来实现对象的深复制。但是这种方法能正确处理的对象只有Number，String，Boolean，Array等能够被json直接表示的数据结构，如果对象中含有function，JSON.stringify会自动过滤掉，没法复制函数。

可以将对象看作为一个树结构，然后再进行深度优先遍历，复制对象。

```
    var obja = {
        x: 11,
        y: 22,
        z: {
            m: 44,
            n: 55
        },
        d: function() {
            console.log(111);
        }
    };

    function deepCopy2(obj) {
        var dist = obj.constructor === Array ? [] : {};

        if(typeof obj !== 'object') {
            return;
        }else {
            for(var i in obj) {
                if(obj.hasOwnProperty(i)) {
                    dist[i] = typeof obj[i] === 'object' ? deepCopy2(obj[i]) : obj[i];
                }
            }
        }

        return dist;
    }
    var deepObj2 = deepCopy2(obja);

    deepObj2.d = function() {
        console.log(222);
    }

    obja.d();    // 111
    deepObj2.d();   // 111

```

这个解决方法用了递归，如果遇到对象则进入对象进行复制，但是也有一些不完美的地方，比如它并没有解决存在环的问题。

### Array的深浅复制

Array的浅复制和Object的浅复制一样，都是直接复制引用，没有真正的实现一个数组的副本。

Array的深复制可以直接用slice方法，返回一个新数组：

```
    var arra = ['a', 'b', [3, 4], function() { console.log('arra')}];

    var arrb = arra.slice();

    arrb[3] = function() {
        console.log('arrb');
    }

    arra[3]();    // 'arra'
    arrb[3]();    // 'arrb'

```



#this, constructor和prototype

###this
this表示当前的对象，可是由于    其运行时绑定的原因，JavaScript中的this会随着运行时的情况而变成不一样的值，全局对象、当前对象、或者是任意指定对象。

####全局作用域下的例子
```
    console.log(this === window);  // true
    console.log(window.alert === this.alert);  // true
    console.log(this.parseInt("021", 10));  // 10
```

####当前对象
this的值是函数运行时决定的，而不是函数定时
```
    // 定义一个全局函数
    function foo() {
        console.log(this.fruit);
    }
    // 定义一个全局变量，等价于window.fruit = "apple";
    var fruit = "apple";
    // 此时函数foo中this指向window对象
    // 这种调用方式和window.foo();是完全等价的
    foo();  // "apple"

    // 自定义一个对象，并将此对象的属性foo指向全局函数foo
    var pack = {
        fruit: "orange",
        foo: foo
    };
    // 此时函数foo中this指向window.pack对象
    pack.foo(); // "orange"
```

####指定对象
使用**apply**或者**call**来改变this的值
一句话去吧apply和call的用法

```
foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments)==this.foo(arg1, arg2, arg3)
```

其实就是参数不一样

```
    // 定义一个全局函数
    function foo() {
        console.log(this.fruit);
    }

    // 定义一个全局变量
    var fruit = "apple";
    // 自定义一个对象
    var pack = {
        fruit: "orange"
    };

    // 等价于window.foo();
    foo.apply(window);  // "apple"
    // 此时foo中的this === pack
    foo.apply(pack);    // "orange"
    // 此时foo中的this === pack
    foo.apply(call);    // "orange"
```

从第二个参数起, call方法参数将依次传递给借用的方法作参数, 而apply直接将这些参数放到一个数组中再传递, 最后借用方法的参数列表是一样的。

```
    function print(a, b, c, d){
        alert(a + b + c + d);
    }
    function example(a, b , c , d){
        //用call方式借用print,参数显式打散传递
        print.call(this, a, b, c, d);
        //用apply方式借用print, 参数作为一个数组传递,
        //这里直接用JavaScript方法内本身有的arguments数组
        print.apply(this, arguments);
        //或者封装成数组
        print.apply(this, [a, b, c, d]);
    }
    //下面将显示”背光脚本”
    example(”背” , “光” , “脚”, “本”);

```


###constructor


###prototype
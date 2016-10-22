#this, constructor和prototype

###this
this表示当前的对象，可是由于	其运行时绑定的原因，JavaScript中的this会随着运行时的情况而变成不一样的值，全局对象、当前对象、或者是任意指定对象。

####全局对象
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


###constructor


###prototype
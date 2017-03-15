## this, prototype和constructor

### this
this表示当前的对象，可是由于    其运行时绑定的原因，JavaScript中的this会随着运行时的情况而变成不一样的值，全局对象、当前对象、或者是任意指定对象。

#### 全局作用域下的例子
```
    console.log(this === window);  // true
    console.log(window.alert === this.alert);  // true
    console.log(this.parseInt("021", 10));  // 10
```

#### 当前对象
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

#### 指定对象
使用**apply**或者**call**或者**bind**都用可以来改变this的值，不过**apply**和**call**是直接执行函数，而**bind**是返回一个新的函数对象。

一句话区别**apply**和**call**的用法

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

**bind**

bind是es5.1对Function对象扩展的一个函数，扩展函数声明为： ``Function.prototype.bind(thisArg [, arg1 [, arg2, …]])``，返回一个新的函数对象，该函数对象的this会绑定在``thisArg``参数上

```
    function locate(){
      console.log(this.location);
    }

    function Maru(location){
      this.location = location;
    }

    var kitty = new Maru("cardboard box");

    var locateMaru = locate.bind(kitty);

    locateMaru();  //cardboard box
```

```
    var OOO = {
        color: "#cd0000",
        element: $("#text"),
        events: function() {
            $("input[type='button']").addEventListener("click", function(e) {
                this.element.style.color = this.color;
            }.bind(this));
            return this;
        },
        init: function() {
            this.events();
        }
    };
```

不过注意bind函数在ie6 ~ ie8都是不兼容的，如果要实现兼容，可声明bind函数

```
    if (!function() {}.bind) {
        Function.prototype.bind = function(context) {
            var self = this
                , args = Array.prototype.slice.call(arguments);
                
            return function() {
                return self.apply(context, args.slice(1));    
            }
        };
    }
```

细心的观众朋友可能发现了，**Array.prototype.slice.call**是干嘛的呢？其实这是将类数组转化成真实数组方法，具体可见[函数内属性arguments](https://github.com/yukiyuki1900/JStalk/tree/master/%E5%87%BD%E6%95%B0%E5%86%85%E5%B1%9E%E6%80%A7arguments)


### prototype

* 每个函数都有一个默认的prototype属性，这个属性是一个指针，指向一个对象。而对于每一个函数（类）的实例都会从prototype属性指向的对象上继承属性，换句话说通过同一个函数创建的所有对象都继承一个相同的对象，共享改对象所包含的属性和方法。
* 通过new 关键字和构造函数创建的对象的原型，就是构造函数的prototype指向的那个对象
* 对于实例可以共享的信息，可以不必在构造函数中定义对象实例的信息，而是将信息直接添加在原型对象中。


```
    // 构造函数
    function Person(name) {
        this.name = name;
    }
    // 定义Person的原型，原型中的属性可以被自定义对象引用
    Person.prototype = {
        age: 18,
        getName: function() {
            return this.name;
        }
    }
    var person= new Person("yuki");
    console.log(person.age);      //18
    console.log(person.getName());   // "yuki"
```

不管什么时候，如果创建一个新的函数，都会为这个函数创建一个prototype的属性，指向函数的原型对象。而每个原型对象都会默认获得一个**constructor（构造函数）**的属性，这个**constructor**的属性指向prototype所在的函数的指针。在上面的例子上，Person.prototype.contructor 指向 Person。下图为构造函数，prototype和对象实例的关系。

![image](https://github.com/yukiyuki1900/JStalk/blob/master/this%2Cconstructor%E5%92%8Cprototype/prototype1.png)

JavaScript中的数据原型如字符串（String）、数字（Number）、数组（Array）、对象（Object）、日期（Date）等，都是基于构造函数来实现的。

```
    //声明一个数组
    var arr = new Array('a', 'b', 'c');
    //貌似一般习惯这样的数组声明
    var arr1 = ['d', 'e', 'f'];

    //使用Array的push函数
    arr.push('g');

    //为Array扩展一个函数
    Array.prototype.min = function() {
        //啦啦啦
    }

```

### constructor

constructor始终指向创建当前对象的构造函数

```
    // 等价于 var foo = new Array(1, 56, 34, 12);
    var arr = [1, 56, 34, 12];
    console.log(arr.constructor === Array); // true
    // 等价于 var foo = new Function();
    var Foo = function() { };
    console.log(Foo.constructor === Function); // true
    // 由构造函数实例化一个obj对象
    var obj = new Foo();
    console.log(obj.constructor === Foo); // true

    // 将上面两段代码合起来，就得到下面的结论
    console.log(obj.constructor.constructor === Function); // true
```

但是当constructor遇到prototype时，有趣的事情就发生了。 我们知道每个函数都有一个默认的属性prototype，而这个prototype的constructor默认指向这个函数。如下例所示：

```
    function Person(name) {
        this.name = name;
    };
    Person.prototype.getName = function() {
        return this.name;
    };
    var p = new Person("yuki");

    console.log(p.constructor === Person);  // true
    console.log(Person.prototype.constructor === Person); // true
    // 将上两行代码合并就得到如下结果
    console.log(p.constructor.prototype.constructor === Person); // true
```

但当我们重新定义函数的prototype时（注意：和上例的区别，这里不是修改而是覆盖）

```
    function Person(name) {
        this.name = name;
    };
    Person.prototype = {
        getName: function() {
            return this.name;
        }
    };
    var p = new Person("yuki");
    console.log(p.constructor === Person);  // false
    console.log(Person.prototype.constructor === Person); // false
    console.log(p.constructor.prototype.constructor === Person); // false
```

原因是当我们覆盖prototype的时候，实际发生的事情是这样：

```
    Person.prototype = new Object({
        getName: function() {
            return this.name;
        }
    });
```

所以此时的原型应该是Object

```
    function Person(name) {
        this.name = name;
    };
    Person.prototype = {
        getName: function() {
            return this.name;
        }
    };
    var p = new Person("yuki");
    console.log(p.constructor === Object);  // true
    console.log(Person.prototype.constructor === Object); // true
    console.log(p.constructor.prototype.constructor === Object); // true
```

怎么重新指向Person呢？重新赋值为Person就好啦

```
    function Person(name) {
        this.name = name;
    };
    Person.prototype = {
        getName: function() {
            return this.name;
        }
    };
    Person.prototype.constructor = Person;
    var p = new Person("yuki");
    console.log(p.constructor === Person);  // true
    console.log(Person.prototype.constructor === Person); // true
    console.log(p.constructor.prototype.constructor === Person); // true
```

或者这样：

```
    function Person(name) {
        this.name = name;
    };
    Person.prototype = {
        constructor: Person,//指定constructor
        getName: function() {
            return this.name;
        }
    };
```
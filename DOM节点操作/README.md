## DOM 节点操作

HTML的dom结构就和树结构一样，有父节点子节点和兄弟节点，DOM提供了一系列的api接口来让我们直接对其进行操作。

**因为工作中比较少接触到ie，所以下面的测试用例都是在chrome里测试的，ie的话会比较少考虑**

### 节点类型

常用的类型有：

* **document类型**：document表示的是整个HTML页面，而且它还是window的一个属性，可以通过window.document获取document对象，document.body可以获取body元素，nodeType的值是9
* **element类型**：就是对应的页面元素标签的节点啦，比如**<div>**,**<ul>**,**<script>**之类的，nodeType的值是1
* **text类型**：纯文本的节点，空格也算是一个纯文本节点，nodeType的值是3

因为dom是一个树结构，每个节点都有一个叫**nodeList**的属性，包含了该节点所有有的子节点。**nodeList**是一个类数组的对象，可以像数组一个遍历，拥有.length属性，但却不是数组的实例。类数组转化为数组可以看文章[函数内属性argument](https://github.com/yukiyuki1900/JStalk/tree/master/%E5%87%BD%E6%95%B0%E5%86%85%E5%B1%9E%E6%80%A7arguments)

### 子节点操作

```
    <body>
        <div id="outer1"></div>
        <div id="outer2">
            <div id="inner"></div>
        </div>

        <script>
            
            //查看子节点
            console.log(document.body.childNodes);   //[text, div#outer1, text, div#outer2, text, script, text]
            //查看子节点
            console.log(document.body.children);   //[div#outer1, div#outer2, script]
            
            //查看子节点个数
            console.log(document.body.childElementCount);   //3
        </script>
    </body>
```

查看子节点和子节点的数量的时候，都会只看一级的子节点，如果子节点里含有子节点，并不会取到（如上面代码里的inner节点。

**.children**返回的是3个元素节点，而**.childNodes**会将元素间的空格也算是节点（在ie里还是只会返回3个节点）。所以如果不想要计算空格的话，写html的时候要去掉元素间的空格（压缩就可以）。

针对所有节点和元素节点，dom提供了接口来做区分

```
    //第一个节点
    console.log(document.body.firstChild);   //#text

    //第一个元素节点
    console.log(document.body.firstElementChild);   //<div id="outer1"></div>

    //最后一个节点
    console.log(document.body.lastChild);   //#text

    //最后一个元素节点
    console.log(document.body.firstElementChild);   //<script>...</script>

```

创建元素：

使用**document.createElement**可以创建新的元素节点

```
    var div = document.createElement('div');
    div.id = "inner2";
    div.className = "inner2class";
    console.log(div);    // <div id=​"inner2" class=​"inner2class">​</div>​

```


查找元素：

**getElementsByTagName**，**getElementsByClassName**返回的是一个HTMLCollection的对象实例，和**nodeList**一样，是一个类数组

```
    //通过id查找元素，如果有多个元素有同样的id，则返回第一个
    document.getElementById("outer2");   // <div id="outer2">...</div>

    //通过tagname查找元素，返回HTMLCollection的对象实例，是一个类数组
    document.getElementsByTagName('div');

    //通过classname查找元素
    document.getElementsByClassName('inner2class');
```

插入节点：

```
    var outer2 = document.getElementById('outer2');
    var newNode = document.createElement('div');
    newNode.className = "newnode";

    //插入后成为最后一个子节点
    outer2.appendChild(newNode);
    outer2.insertBefore(newNode, null);

    //插入后成为第一个子节点
    outer2.insertBefore(newNode, outer2.firstChild);

```

移除接点：

```
    //删除outer2的第一个子节点
    outer2.removeChild(outer2.firstChild);


    //用新的节点替换outer2的第一个子节点
    outer2.replaceChild(newNode, outer2.firstChild)
```
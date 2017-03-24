## DOM 节点操作

HTML的dom结构就和树结构一样，有父节点子节点和兄弟节点，DOM提供了一系列的api接口来让我们直接对其进行操作。

**因为工作中比较少接触到ie，所以下面的测试用例都是在chrome里测试的，ie的话会比较少考虑**

### DOM的节点类型

常用的类型有：

* **document类型**：document表示的是整个HTML页面，而且它还是window的一个属性，可以通过window.document获取document对象，document.body可以获取body元素，nodeType的值是9
* **element类型**：就是对应的页面元素标签的节点啦，比如**div**,**ul**,**script**之类的，nodeType的值是1
* **text类型**：纯文本的节点，空格也算是一个纯文本节点，nodeType的值是3

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

创建节点：

```

```
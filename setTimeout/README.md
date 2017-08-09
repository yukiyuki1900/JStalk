## setTimeout

前几天群里有人问以下代码的输出是啥：

```
function Test() {
	this.run = function() {
		console.log('haha');
		setTimeout(this.run, 1000);

		return 0;
	}
}

var t = new Test();
t.run();

```

在控制台试了下，其输出是：

```
'haha'
0
'haha'
```

瞬间起了好奇心，便顺便研究了下setTimeout这个函数


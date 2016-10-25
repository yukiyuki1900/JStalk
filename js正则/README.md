#js正则

正则也是日常js开发中经常用到的~

###正则创建
正则创建方式有两种：使用//（两个斜杠）或者使用构造函数

####使用//（两个斜杠）创建正则：var reg = /表达式/参数

表达式：表示某些规则的字符串
参数：用来扩展表达式的含义，常用的有

```
	g: 全文查找
	i: 忽略大小写
	m: 多行查找
```
参数可以任意组合，也可以不用
例如：
```
	var reg = /abc/;
	var reg = /abc/gi;
```

####使用构造函数
```
	var re = new RegExp();  //RegExp是一个对象,和Aarray一样  
	//但这样没有任何效果,需要将正则表达式的内容作为字符串传递进去  
	var re = new RegExp("a");  //最简单的正则表达式,将匹配字母a  
	var re = new RegExp("a","i");  //第二个参数,表示匹配时不分大小写
```

###正则规则


###正则函数
正则表达式对象的相关函数

* test  //检测一个字符串是否匹配某个模式，返回Boolean值
* exec  //检索字符串中的正则表达式的匹配，如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。
* match  //可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
* replace
* search
* split

####test
```
	//test方法,测试字符串,符合模式时返回true,否则返回false  
	var re = /abc/;   //最简单的正则表达式,将匹配abc这个单词  
	var str = "abc";
	re.test(str);     //true
	str = "ABC";
	re.test(str);     //false
	re = /abc/i;
	re.test(str);     //true
	re=/^[a-z]/i;     //[]匹配指定范围内的任意字符,这里将匹配英文字母,不区分大小写  
	str="variableName";   //变量名必须以字母开头  
	alert(re.test(str));   //true  
	str="123abc";  
	alert(re.test(str));   //false 
```

####exec
```
	//exec方法，以数组的格式返回匹配规则的字符
	var re = /ab/;
	var str = "1ab2abaaba";
	re.exec(str);    //
```

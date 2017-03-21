## cookie,session和localstorage

在日常开发或者项目优化中，我们会经常会做一些数据存储，这里先介绍下常见的**cookie**，**sesstionStorage**和**localStorage**的区别吧。

### cookie

**cookie**，即**HTTP Cookie**，其实是HTTP协议请求头的一个字段，打开浏览器，输入[www.baidu.com](www.baidu.com)，页面加载完后在Network里随便找到一个http请求，可以看到其中携带的cookie信息：


![image](https://github.com/yukiyuki1900/JStalk/blob/master/cookie%2Csession%E5%92%8Clocalstorage/cookie1.png)

在服务器的响应头中携带了好几个**Set-Cookie**的字段来设定cookie，因为cookie会绑定在特定的域下面，所以在这之后，在创建它的域名下的HTTP请求都会带上这个cookie。

![image](https://github.com/yukiyuki1900/JStalk/blob/master/cookie%2Csession%E5%92%8Clocalstorage/cookie2.png)

可以看到请求头里的**Cookie**信息后带了一大段cookie信息，而cookie的value和值是被URL encode过的。

#### JS操作

**document.cookie**

在JS里可以通过**document.cookie**来获取cookie数据：

![image](https://github.com/yukiyuki1900/JStalk/blob/master/cookie%2Csession%E5%92%8Clocalstorage/cookie3.png)

获取到的是以``key1=value1;key2=value2;key3=value3;``组合起来的本地所有cookie值，而且所有cookie值的key和value都是url encode过的。

所以在读取或者写cookie的时候，因为js没有原生的接口来让我们直接操作，所以呢，为了方便开发，就需要咱们自己写了~

读cookie：

```
```

写cookie：

```
```

**通过document.cookie来配置cookie如果和原cookie的key相同，那原cookie的值就会被覆盖，否则原cookie的值不会被删除**

删除cookie：

```
```

### sessionStorage


### localStorage
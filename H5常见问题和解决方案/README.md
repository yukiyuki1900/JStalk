## H5常见问题 & 解决方案

### 移动端适配方案

* 设备像素比
	设备像素比即 **window.devicePixelRatio**，是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。可以看下浏览器的兼容性，[http://caniuse.com/#search=window.devicePixelRatio](http://caniuse.com/#search=window.devicePixelRatio)，为所有的webkit内核的浏览器所兼容。

	**window.devicePixelRatio = 物理像素 / 独立像素（dips）**

	怎么去理解物理像素和独立像素的区别呢？物理像素是机器像素，和机器屏幕的密度有关，可以用来辅助判断到底是不是retina屏，而我们写css的时候的px是独立像素

	非retina屏和retina屏的物理像素
	![image](https://github.com/yukiyuki1900/JStalk/blob/master/H5%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E5%92%8C%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/pixels.png)

	CSS像素为独立像素
	![image](https://github.com/yukiyuki1900/JStalk/blob/master/H5%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E5%92%8C%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/pixels-1.png)
	
	所以，**640px宽度在dpr=2的屏幕上宽度是320px**

### Meta 基础知识

* H5页面窗口自动调整到设备宽度，并禁止用户缩放页面
```
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
    // width    设置viewport宽度，为一个正整数，或字符串‘device-width’
	// height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
	// initial-scale    默认缩放比例，为一个数字，可以带小数
	// minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
	// maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
	// user-scalable    是否允许手动缩放

```

* 基本meta标签
```
	<!-- 设置缩放 -->
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">

	<!-- 可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果） -->
	<meta name="apple-mobile-web-app-capable" content="yes" />

	<!-- 仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ） -->
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />

	<!-- IOS中禁用将数字识别为电话号码/忽略Android平台中对邮箱地址的识别 -->
	<meta name="format-detection"content="telephone=no, email=no" />
```

* 其他meta标签
```
	<!-- 启用360浏览器的极速模式(webkit) -->
	<meta name="renderer" content="webkit">

	<!-- 避免IE使用兼容模式 -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
	<meta name="HandheldFriendly" content="true">

	<!-- 微软的老式浏览器 -->
	<meta name="MobileOptimized" content="320">

	<!-- uc强制竖屏 -->
	<meta name="screen-orientation" content="portrait">

	<!-- QQ强制竖屏 -->
	<meta name="x5-orientation" content="portrait">

	<!-- UC强制全屏 -->
	<meta name="full-screen" content="yes">

	<!-- QQ强制全屏 -->
	<meta name="x5-fullscreen" content="true">

	<!-- UC应用模式 -->
	<meta name="browsermode" content="application">

	<!-- QQ应用模式 -->
	<meta name="x5-page-mode" content="app">

	<!-- windows phone 点击无高光 -->
	<meta name="msapplication-tap-highlight" content="no">
```

### 常见问题

* 移动端字体定义font-family
```
	@ --------------------------------------中文字体的英文名称
	@ 宋体      SimSun
	@ 黑体      SimHei
	@ 微信雅黑   Microsoft Yahei
	@ 微软正黑体 Microsoft JhengHei
	@ 新宋体    NSimSun
	@ 新细明体  MingLiU
	@ 细明体    MingLiU
	@ 标楷体    DFKai-SB
	@ 仿宋     FangSong
	@ 楷体     KaiTi
	@ 仿宋_GB2312  FangSong_GB2312
	@ 楷体_GB2312  KaiTi_GB2312  
	@
	@ 说明：中文字体多数使用宋体、雅黑，英文用Helvetica
	 
	body { font-family: Microsoft Yahei,SimSun,Helvetica; } 
```

* 移动端点击事件（touch，click）
```
	click事件会产生300ms的延时

	历史原因（来源于网上）：
	2007年苹果发布首款iphone上IOS系统搭载的safari为了将适用于PC端上大屏幕的网页能比较好的展示在手机端上，使用了双击缩放(double tap to zoom)的方案，比如你在手机上用浏览器打开一个PC上的网页，你可能在看到页面内容虽然可以撑满整个屏幕，但是字体、图片都很小看不清，此时可以快速双击屏幕上的某一部分，你就能看清该部分放大后的内容，再次双击后能回到原始状态。
 
	双击缩放是指用手指在屏幕上快速点击两次，iOS 自带的 Safari 浏览器会将网页缩放至原始比例。
	 
	原因就出在浏览器需要如何判断快速点击上，当用户在屏幕上单击某一个元素时候，例如跳转链接<a href="#"></a>，此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链接还是要双击该部分区域进行缩放操作，所以，捕获第一次单击后，浏览器会先Hold一段时间t，如果在t时间区间里用户未进行下一次点击，则浏览器会做单击跳转链接的处理，如果t时间里用户进行了第二次单击操作，则浏览器会禁止跳转，转而进行对该部分区域页面的缩放操作。那么这个时间区间t有多少呢？在IOS safari下，大概为300毫秒。这就是延迟的由来。造成的后果用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，对于web开发者来说是，页面js捕获click事件的回调函数处理，需要300ms后才生效，也就间接导致影响其他业务逻辑的处理。
	 
	//解决方案：
	fastclick可以解决在手机上点击事件的300ms延迟
	zepto的touch模块，tap事件也是为了解决在click的延迟问题
```

* 点击元素产生背景或边框怎么去掉
```
	//ios用户点击一个链接，会出现一个半透明灰色遮罩, 如果想要禁用，可设置-webkit-tap-highlight-color的alpha值为0去除灰色半透明遮罩；
	//android用户点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样，可设置-webkit-tap-highlight-color的alpha值为0去除部分机器自带的效果；
	//winphone系统,点击标签产生的灰色半透明背景，能通过设置<meta name="msapplication-tap-highlight" content="no">去掉；
	//特殊说明：有些机型去除不了，如小米2。对于按钮类还有个办法，不使用a或者input标签，直接用div标签
	a,button,input,textarea { 
	    -webkit-tap-highlight-color: rgba(0,0,0,0); 
	    -webkit-user-modify:read-write-plaintext-only; //-webkit-user-modify有个副作用，就是输入法不再能够输入多个字符
	}   
	// 也可以 
	* { -webkit-tap-highlight-color: rgba(0,0,0,0); }
	//winphone下
	<meta name="msapplication-tap-highlight" content="no">
```

* 计量单位：rem、 em 和 px
```
	px: 就是屏幕的像素（独立像素）
	em: 相对于父级元素设定的大小单位
	rem: 相对于根元素<html>设定的大小单位

	如果要适配多种尺寸的size，又不想像em那样一层一层的计算大小，rem无疑是最方便的。只要设置根元素<html>的font-size: 16px; 后面所有设置的大小都是基于这个根元素的16px来计算。
```

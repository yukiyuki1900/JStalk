## H5常见问题 & 解决方案

> 从毕业到现在一直在从事移动端H5和hybrid的开发，今天看到一篇关于H5开发的常见问题和解决方案的汇总，感觉总结的不错，确实是工作这几年来经常会遇到的问题。所以便摘录到这里作为自己的一些积累，并结合自己总结的一些经验。

### 移动端适配方案

* 设备像素比
	设备像素比即 **window.devicePixelRatio**，是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。可以看下浏览器的兼容性，[http://caniuse.com/#search=window.devicePixelRatio](http://caniuse.com/#search=window.devicePixelRatio)，为所有的webkit内核的浏览器所兼容。

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
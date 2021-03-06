## 前端性能优化

> 作为直接跑在客户端的语言，前端更容易遇到性能问题，而且性能问题往往会成为前端的一个不可避免的瓶颈，直接影响到用户的体验。在移动时代，同样的一段代码要在各厂商，各机型，低端机，高端机上运行，前端的性能问题便显得尤为重要，而且还会和PV和收入直接相关。

有一篇文章提到过一个[心理学研究](https://www.smashingmagazine.com/2015/09/why-performance-matters-the-perception-of-time/#the-need-for-performance-optimization-the-20-rule)，如果想让用户感觉到你的网站比别人的更快，那么至少页面的速度要比别人快20%。这个`加载速度快`，指的不是说整个页面的加载时间，而是首次有效渲染时间（如首屏），或者交互时间（页面主要内容加载完成，并具有与用户交互的时间）

性能优化一般思路

* 减少请求次数
* 减少请求体积
* 加快请求速度
* 缩短渲染时间

一个完整的页面展示需要经过**DNS查询**、**TCP连接**、**发送请求**、**等待响应**、**html传输**、**静态资源下载**、**解析文档**、**执行JS/CSS**、**计算布局**、**渲染完成** 多个环节。

用户对页面性能感知多出现在哪个环节上呢？
![image](https://github.com/yukiyuki1900/JStalk/blob/master/%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E6%A0%B8%E5%BF%83%E6%8C%87%E6%A0%87.png)

针对这些核心的性能指标，雅虎已经给出了常用的前端优化方案：[https://developer.yahoo.com/performance/](https://developer.yahoo.com/performance/)

简单来说就是分为7个分类：

<table>
	<tr>
		<td><strong>网页内容</strong></td>
		<td><strong>服务器</strong></td>
		<td><strong>Cookie</strong></td>
		<td><strong>CSS</strong></td>
		<td><strong>Javascript</strong></td>
		<td><strong>图片</strong></td>
		<td><strong>Mobile</strong></td>
	</tr>
	<tr>
		<td>减少http请求</td>
		<td>使用CDN</td>
		<td>减少cookie大小</td>
		<td>将CSS文件置顶</td>
		<td>将script脚本放在页面底部</td>
		<td>优化图片</td>
		<td>使单个内容小于25Kb</td>
	</tr>
	<tr>
		<td>减少DNS查询次数</td>
		<td>使用Expires或Cache-Control报文头</td>
		<td>页面内容使用无cookie域名</td>
		<td>避免CSS表达式</td>
		<td>使用外部的JavaScript或css文件</td>
		<td>优化CSS sprite</td>
		<td>Pack Components into a Multipart Document</td>
	</tr>
	<tr>
		<td>避免页面跳转</td>
		<td>Gzip压缩传输文件</td>
		<td></td>
		<td>使用link取代@import</td>
		<td>精简JavaScript和css文件</td>
		<td>不在html中缩放图片</td>
		<td></td>
	</tr>
	<tr>
		<td>避免页面跳转</td>
		<td>配置Etags</td>
		<td></td>
		<td>避免使用filters</td>
		<td>去掉重复的脚本</td>
		<td>使favicon.ico尽可能小而且可缓存</td>
		<td></td>
	</tr>
	<tr>
		<td>缓存Ajax response</td>
		<td>尽早Flush输出</td>
		<td></td>
		<td></td>
		<td>减少DOM访问</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>延时加载</td>
		<td>使用GET AJAX请求</td>
		<td></td>
		<td></td>
		<td>使用智能事件处理</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>提前加载</td>
		<td>避免空的图片src</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>减少DOM节点的数量</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>根据域名划分内容</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>减少iframe数量</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>避免404</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
</table>

### 可优化的环节

* **DNS查询**
	1. DNS缓存：
		* 浏览器
		* 操作系统
	2. 减少DNS数：
		* 不超过4个
* **建立连接**
	1. 使用CDN: 
		* 加速用户访问的速度，增强用户体验
		* 减轻服务器源站服务器的压力、保护源站
		* 不暴露源站。还能防止DDOS攻击。

	注：CDN是个分发网络，说的直白一点就是缓存服务器，全国有很多台服务器（术语叫节点）来替你处理请求。假如一个用户在广东，访问百度的服务器，请求一个js文件，如果直接访问百度在北京的服务器，经过的网络层级太多，就太慢了。有CDN以后，它会就近选择一个CDN的节点服务器（假如广东也有节点服务器），CDN节点服务器看一下他的服务器上又没有这个js文件的缓存，如果有直接给你返回了，就特别的快。

	所以可以结合项目的实际情况，将一部分的内容置于CDN上，从而避免过多的服务器请求。

* **发送请求**
	1. 减少HTTP请求
		* 打包js、css文件
		* 图片合并
	2. keep alive
		* 减少TCP请求连接数
* **内容传输**
	1. 文件压缩
		* js、css、图片
		* 代码混淆
	2. 代码精简
		* 减少无用代码，提高代码质量
	3. gzip
* **缓存**

### 代码性能--JS

* 避免with
* 避免eval
* 减少跨上下文查找：全局变量、属性
* 避免arguments、debugger

### 代码性能--CSS

* 删除没必要的css代码，尽量减少文件大小
* 快速执行关键部分的css，比如先收集页面首次可见部分的css文件作为关键css文件进行渲染，将它放在页面<head>中，关键css文件的大小最好小于14kb，因为tcp的慢启动阶段对交换包大小的限制，如果高于14kb，浏览器需要重复一些步骤来获取更多的样式。
* 使用工具打包按需加载文件（比如**webpack**中的**code-splitting**特性，只要在代码中定义了分离点，webpack便会处理好相关的输出文件，实现按需加载功能）

### DOM是影响性能的大头
* 避免频繁重绘
* 只有需要的时候才更新DOM

### 移动端的性能优化
* Lazyload懒加载
* 逐屏加载
* 滚动加载
* 减少首屏图片数量与大小，减少请求
* 使用其他方式替代图片（CSS3，iconFont，SVG）
* 避免使用DataURL
* 预加载（提前加载下一页）
* 异步加载广告等第三方资源
* 执行过程中的优化
	* 合理使用CSS 3D加速
	* 避免批量绑定时间，使用事件代理
	* 控制DOM数量，缓存数据而不是DOM
	* 使用touch事件而不是click事件
* 利用Native的能力
	* 模板资源本地化，极大的给首屏提速
	* 模板资源增量下发
	* 图片缓存
	* 利用NA的Request、socket长连
	* 利用NA获取用户信息、位置等

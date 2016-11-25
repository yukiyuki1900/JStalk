#前端性能优化

> 作为直接跑在客户端的语言，前端更容易遇到性能问题，而且性能问题往往会成为前端的一个不可避免的瓶颈，直接影响到用户的体验。在移动时代，同样的一段代码要在各厂商，各机型，低端机，高端机上运行，前端的性能问题便显得尤为重要，而且还会和PV和收入直接相关。

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
	</tr>
	<tr>
		<td>减少DNS查询次数</td>
		<td>使用Expires或Cache-Control报文头</td>
	</tr>
	<tr>
		<td>避免页面跳转</td>
		<td>Gzip压缩传输文件</td>
	</tr>
	<tr>
		<td>避免页面跳转</td>
		<td>配置Etags</td>
	</tr>
	<tr>
		<td>缓存Ajax response</td>
		<td>尽早Flush输出</td>
	</tr>
	<tr>
		<td>延时加载</td>
		<td>使用GET AJAX请求</td>
	</tr>
	<tr>
		<td>提前加载</td>
		<td>避免空的图片src</td>
	</tr>
	<tr>
		<td>减少DOM节点的数量</td>
		<td></td>
	</tr>
	<tr>
		<td>根据域名划分内容</td>
		<td></td>
	</tr>
	<tr>
		<td>减少iframe数量</td>
		<td></td>
	</tr>
	<tr>
		<td>避免404</td>
		<td></td>
	</tr>
</table>

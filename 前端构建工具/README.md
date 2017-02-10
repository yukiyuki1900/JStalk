## 前端构建工具

> 前端在工程化方向已经越来越成熟了，在项目搭建初期能选择到合适的构建解决方案，对项目后期开发维护便能提供极大的便捷。面对那么多的构建工具，到底如何选择出最适合自己项目的工具呢？现在来了解下一些比较热门的工具，和它们都能帮我们解决哪些问题~~

* fis、gulp、grunt、jspm 

* webpack、browserify 

* babel 

* npm，bower



### npm，bower

npm和bower都是包管理工具，npm是node的包管理工具，bower是前端包管理工具，用来安装管理一些可重用的框架/库/组件，解决包和包之间的依赖关系（基于版本的管理）

**bower目前还在维护**，并不是社区上有些人说的bower停止维护，bower官网也有blog解释了->[https://bower.io/blog/2015/bower-alive-looking-contributors/](https://bower.io/blog/2015/bower-alive-looking-contributors/)

在项目中bower和npm都用过，安装bower需要先安装npm。

npm和bower的最大的不同是npm的包依赖管理是**nested dependency tree(嵌套依赖)**的，也就是如果模块A和模块B同时依赖模块C，在模块A和模块B的目录下会同时存在两个一模一样的模块C。结构图如下：


npm的模块文件结构
```
├── dependency A
├── dependency B   		//B依赖A
|   └── dependency A
├── dependency C		//C依赖B
│   ├── dependency B	
|   	└── dependency A   
|   └── dependency D
```

因为是嵌套的模块结构，所以会导致非常的重

而bower的模块结构就显得非常的扁平，模块重用性很强

bower的模块文件结构
```
├── dependency A
├── dependency B   		//B依赖A
├── dependency C		//C依赖B和D
├── dependency D   		
```

更多npm与bower差异可看看[http://stackoverflow.com/questions/18641899/what-is-the-difference-between-bower-and-npm](http://stackoverflow.com/questions/18641899/what-is-the-difference-between-bower-and-npm)

但是在npm3里，模块的依赖关系已经不是嵌套性的了，具体可以见官网的文档[https://docs.npmjs.com/how-npm-works/npm3](https://docs.npmjs.com/how-npm-works/npm3)

![image](https://github.com/yukiyuki1900/JStalk/blob/master/%E5%89%8D%E7%AB%AF%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7/npmv3.png)
## 对象遍历

js的数据类型分为基本类型和引用类型，具体概念在[对象复制]()有详细说到。

在日常开发中，Object和Array恐怕是最常用的数据类型了，而遍历Object和Array也是常常会遇到。

Object是一个基础类型，其他所有类型都从Object继承了基本的行为，包括Array。所以typeof 一个数组的话，得到的是'object'。

```
    var arr = [];
    console.log(typeof arr);   // 'object'
```

这里再多说一句，除了Number，String，null，undefined，Boolean5个基本类型，其它的实例都会归为object。所以呢，typeof只能对基本类型有用哦~

### for

for遍历应该是我们最常用的对象遍历方式了。


### Array的迭代方法
every() 、fliter()、forEach()、map()、some()
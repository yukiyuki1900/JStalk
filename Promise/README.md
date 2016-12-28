## Promise

### 概念
ECMAScript6提供了Promise对象，这个对象是抽象的异步处理的对象，并提供了相应的操作api，可以用来处理异步消息，尤其是当存在多个异步请求并发且请求之间有依赖关系的时候，按照传统的层层嵌套异步请求的写法丝毫不优雅，而且可读性差。如果使用promise，则可使用链式的方式实现多个并发的异步请求。

一个promise有3中状态：
* pending：promise对象刚被创建的初始化状态
* fulfilled：已完成（操作成功，又称resolve），此时会调用 **onRejected**
* rejected：已失败（操作失败），此时会调用 **onFulfilled**

一旦一个promise达到了fulfilled或rejected状态的话，它就不会再发生改变。
也就是说，promise对象的状态发生改变只有两种：
* 从pending -》 fulfilled  成功
* 从pending -》 rejected   失败

只要状态发生了改变，这个状态就不会再变化。这个和Event事件监听不太一样，事件监听是一旦错过了事件的发生，再如何监听都不会得到结果，而如果对promise对象加一个回调函数，会立即得到结果。


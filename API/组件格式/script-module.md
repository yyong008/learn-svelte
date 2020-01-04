# script context = module

module 是在模块在第一运行的被评估的。这个是跟编译相关的。我们因为不是计算机专业的，所以对编译这一块，并不是特别的了解。

export 从这个块中进行绑定，他们将成为已编译模块的导出。

不能使用 export default， 因为默认导出是组件本身。

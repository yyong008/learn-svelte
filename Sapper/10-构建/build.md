# BUILDING

到目前为止，我们一直在使用它`sapper dev`来构建应用程序并运行开发服务器。但是当涉及到生产时，我们想创建一个独立的优化版本

## sapper build

此命令将您的应用程序打包到`__sapper__/build`目录中。（您可以将其更改为自定义目录，也可以控制其他各种选项，`sapper build --help`有关详细信息，请执行此操作。）

输出是可以从项目根目录运行的Node应用程序：

`node __sapper__/build`

# Chrome Bing Dict

基于Bing词典的Chrome插件, 中英词汇互译, 翻译结果可内联显示

![](https://raw.githubusercontent.com/DremyGit/ChromeBingDict/master/web.jpg)

![](https://raw.githubusercontent.com/DremyGit/ChromeBingDict/master/popup.png)

## 为什么选择Bing词典

+ Bing词典针对不同词性提供了不同的释义, 相较普通翻译功能只提供一个结果的情况, Bing词典更加适合翻译工作者对词语的揣度.

+ Bing词典提供了基于网络的释义, 在很多情况下, 技术类文章的专业词汇不能用普通的释义来翻译, 一般来说网络释义是更好的选择.

## 如何安装

因为各种原因, 此插件暂时无法上架到Chrome Web Store, 只能采用用户手动安装的方式, 并且无法自动更新, 需要使用以下安装步骤:

1. 从Release页面下载最新版本的`.crx`文件
1. 打开Chrome的设置页->扩展管理
1. 将`.crx`文件拖入扩展管理中, 弹出对话框, 点击允许后即可完成安装

## 使用说明

+ 选中页面中需要翻译的词语, 按下"V"键即可将翻译结果内联插入到词语后面, 双击可隐藏此结果, 按下"C"键可清除全部结果
+ 若快捷键有冲突导致没法正常使用, 请点击设置更换快捷键
+ 在插件内部提供了更为详细按照词性分类的查询结果, 输入词语后回车即可进行翻译

## 插件原理

由于Bing词典没有提供官方API, 故只能使用其Web版页面中的结果, 作为翻译的来源, 通过各种处理后即可显示结果

如果觉得好用欢迎Star!

## License

[GPL v3.0](https://raw.githubusercontent.com/DremyGit/ChromeBingDict/LICENSE) @ Dremy
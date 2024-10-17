## 一、开发环境准备

robotjs需要先安装一些编译环境，否则直接执行npm i 会报错

以下下两种方式二选一即可：

### 自动安装编译环境

首先安装其依赖的编译工具

```powershell
npm i -g windows-build-tools
```

如果能够成功安装就不用往下看了

直接执行
```powershell
npm ci
```

### 逐个安装编译环境

- 1.下载 python

  版本过高的python某些库不再自带，需要自己去安装

  ```ps
  python.exe -m pip install --upgrade pip
  pip install setuptools
  ```

- 2.安装node-gyp

  ```ps
  npm i -g node-gyp
  ```

-   3.安装 Visual Studio C++桌面端开发工具



编译环境安装完成后再执行，保证node版本一致：

```powershell
.\node_modules\.bin\electron-rebuild
```



至此开发环境准备准备完毕



后续计划集成到docker中...



## 二、环境变量配置

登录腾讯云控制台，找到自己的`SECRET_ID`和`SECRET_KEY`并替换根目录下的`.env`中的对应变量

更多服务后续扩展中...

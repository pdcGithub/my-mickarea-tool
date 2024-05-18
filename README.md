This repository is about some tools of my own. If you are interested, just take it.

这个资源库是用于存储我自己的一些软件工具用的。如果你对此感兴趣，你可以拿去用。

I build my tools by a cross-platform framework, which named Electron. Its homepage here : 

我使用了一个跨平台的框架 Electron 来构建我的软件工具。它的主页是如下：

https://www.electronjs.org/

If you are beginner, just start the Electron tutorials here:

如果你是一个初学者，那就从这个教程开始吧。

https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites

---

related project information:

与这个工具相关的项目信息如下:

https://github.com/pdcGithub/my-javabean-generator

---

How To Build This Project

如何构建此项目

1. 下载并安装一个叫做 Git 的版本管理工具, 网址如下: https://git-scm.com/downloads<br/>
   Download and install a version management tool called Git at the following URL: https://git-scm.com/downloads<br/>

2. 下载并安装一个叫做 NodeJS 的工具(它附带了一个javascript运行环境，以及一个软件包管理工具, 名为npm), 网址如下: https://nodejs.org/en/download<br/>
   Download and install a tool called NodeJS (which comes with a JavaScript runtime environment, and a package management tool called npm) at the following URL: https://nodejs.org/en/download<br/>

3. 在命令行终端下，检查软件版本信息(以 本人的 Windows 系统举例)<br/>
   In the command line terminal, check the software version information (take my environment as an example)<br/>
   `node -v`<br/>
   v18.17.1<br/>
   `npm -v`<br/>
   v9.6.7<br/>
4. 如果你需要配置本地 Git 工具, 参考: https://docs.github.com/en/get-started/getting-started-with-git<br/>
   If you need to configure Git, refer to: https://docs.github.com/en/get-started/getting-started-with-git<br/>
5. 创建一个文件夹作为本地的git存储库. 比如(本人是 Windows 系统):<br/>
   Create a folder as a Git local repository. (take my environment as an example):<br/>
   `D:`<br/>
   `mkdir mygit-repo`<br/>
   `cd mygit-repo`<br/>
6. 进入mygit-repo目录后，从GitHub把我的项目拉取到本地文件夹(建议以 SSH 的方式), 参考: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository<br/>
   After enter the directory mygit-repo, pull my project from GitHub to the local folder (it is recommended to the way SSH), refer to: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository<br/>
   `git clone git@github.com:pdcGithub/my-mickarea-tool.git`<br/>
7. 拉取后，在 mygit-repo 会多一个子文件夹 my-mickarea-tool。请进入文件夹查看信息<br/>
   After pulling, there will be a subfolder in mygit-repo, which named my-mickarea-tool. Please go into the folder to view the detail information.<br/>
   `cd my-mickarea-tool`<br/>
   如果是 Linux 或者 MacOS 系统，可以执行命令 `ls -la`, 如果是 windows 系统执行命令 `dir`<br/>
   If you are using Linux or MacOS, you can run commands `ls -la`, or `dir` for Windows.<br/>
8. 接下来较为简单，只需要配置本项目的 electron 环境(一般来说，为了避免版本冲突，只需要安装到本文件夹)<br/>
   take it easy, you only need to configure the electron environment of the project (in general, in order to avoid version conflicts, you only need to install it to this folder)<br/>
   以下脚本请顺序执行(请注意package.json文件，它可能在配置时被修改):<br/>
   The following scripts should be executed sequentially (note that package.json file, it may be modified when configuring):<br/>
   `npm install --save-dev electron`<br/>
   `npm install --save-dev @electron-forge/cli`<br/>
   `npx electron-forge import`
9. 测试启动<br/>
   The program starts<br/>
   `npm run start`<br/>
10. (可选) 如果需要打包安装，请执行<br/>
    (Optional) if you need to pack the installation, run command:<br/>
   `npm run make`<br/>
   打包后的程序在 out 文件夹下面<br/>
   The packaged program is under the out folder<br/>
11. (可选) 如果要升级 Electron 环境到最新，请执行<br/>
    (Optional) If you want to upgrade the Electron environment to the latest, run command:<br/>
    `npm install --save-dev electron@latest`<br/>


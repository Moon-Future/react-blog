---
title: Docker 部署 React 全栈应用
date: 2020-12-20 17:43:35
description: 之前使用 Vue 全家桶开发了个人博客，并部署在阿里云服务器上，最近在学习 React，于是使用 React 开发重构了自己的博客。

主要技术栈如下：

- 前台页面：Next.js 搭建服务端渲染页面，利于 SEO
- 后台管理界面：create-react-app 快速搭建
- 服务接口：Egg.js + Mysql
- 部署：Linux + Docker
categories: 
  - 前端
tags: 
  - React
  - Node
  - Docker
cover: https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/blog/cover-docker.jpg
top_img: https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/blog/top-docker.jpg
---

## 前言

之前使用 Vue 全家桶开发了个人博客，并部署在阿里云服务器上，最近在学习 React，于是使用 React 开发重构了自己的博客。

主要技术栈如下：

- 前台页面：Next.js 搭建服务端渲染页面，利于 SEO
- 后台管理界面：create-react-app 快速搭建
- 服务接口：Egg.js + Mysql
- 部署：Linux + Docker

React 搭建博客前后台部分，这里不会细讲，只会说说中间遇到的一些问题和一些解决方法，具体开发教程可参考 [React Hooks+Egg.js实战视频教程-技术胖Blog开发](https://jspang.com/detailed?id=52)。

部署部分这里会是重点讲解，因为也是第一次接触 Docker，这里只记录自己的学习心得，有不对的地方还请多多指教。

恰好本次项目里前台页面是 node 运行，后台界面是静态 HTML，服务接口需要连接 Mysql，我觉得 Docker 来部署这几种情况也是比较全面的例子了，可以给后来同学作为参考，内容比较啰嗦，希望能帮助后来的同学少走一点坑，因为有些是自己的理解，可能会有错误，还请大家指正，互相学习。



## 项目地址

源码地址：https://github.com/Moon-Future/react-blog

clone 下来参照目录哦~



## 一、React 篇

博客前台使用 Next.js 服务端渲染框架搭建，后台管理界面使用 create-react-app 脚手架搭建，服务接口使用 Egg 框架（基于 Koa）。后台管理和服务接口没什么好说的，就是一些 React 基础知识，这里主要说下 Next.js 中遇到的一些问题。

> 项目目录：
>
> blog：前台界面，Next.js
>
> admin：后台管理界面，create-react-app 脚手架搭建
>
> service：前后台服务接口

### 1. 获取渲染数据

因为是服务端渲染，所以页面初始数据会在服务器端获取后，渲染页面后返回给前端，这里有两个官方 API，`getStaticProps`，`getServerSideProps`，从名字可以稍微看出一点区别。（Next.js 9.3 版本以上，使用 `getStaticProps` 或 `getServerSideProps` 来替代 `getInitialProps`。）

**getStaticProps**：服务端获取静态数据，在获取数据后生成静态 HTML 页面，之后在每次请求时都重用此页面

```js
const Article = (props) => {

    return ()
}
/* 也可
export default class Article extends React.Component {

    render() {
        return
    }
}
*/

export async function getStaticProps(context) {
    try {
        const result = await axios.post(api.getArticleList)
        return {
            props: { articleList: result.data }, // will be passed to the page component as props
        }
    } catch (e) {
        return {
            props: { articleList: [] }, // will be passed to the page component as props
        }
    }
}

export default Article
```

**getServerSideProps**：每次请求时，服务端都会去重新获取获取生成 HTML 页面

```js
const Article = (props) => {

    return ()
}
/* 也可
export default class Article extends React.Component {

    render() {
        return
    }
}
*/

export async function getServerSideProps(context) {
    try {
        const result = await axios.post(api.getArticleList)
        return {
            props: { articleList: result.data }, // will be passed to the page component as props
        }
    } catch (e) {
        return {
            props: { articleList: [] }, // will be passed to the page component as props
        }
    }
}

export default Article
```

可以看到两者用法是一样的。  

**开发模式**下 `npm run dev`，两者没什么区别，每次请求页面都会重新获取数据。  

**生产环境**下，需要先`npm run build` 生成静态页面，使用 **getStaticProps** 获取数据的话就会在此命令下生产静态 HTML 页面，然后`npm run start`，后面每次请求都会重用静态页面，而使用 **getServerSideProps** 每次请求都会重新获取数据。

**返回数据** 都是对象形式，且只能是对象，key 是 props，会传递到类或函数里面的 props。   

博客这里因为是获取博客文章列表，数据随时可能变化，所以选用 **getServerSideProps** 。

这里使用 try，catch 捕获异常，防止获取数据失败或者后端接口报错，服务端渲染错误返回不了页面。



### 2. 页面加载后请求

还有一些数据，我们并不希望在服务端获取渲染到页面里，而是希望页面加载后再操作。  

**使用 React Hook**，可以在 `useEffect` 中操作：

```js
const Article = (props) => {

    useEffect(async () => {
		await axios.get('')
    }, [])

    return ()
}

export async function getServerSideProps(context) {
    try {
        const result = await axios.post(api.getArticleList)
        return {
            props: { articleList: result.data }, // will be passed to the page component as props
        }
    } catch (e) {
        return {
            props: { articleList: [] }, // will be passed to the page component as props
        }
    }
}

export default Article
```

这里**注意** `useEffect` 第二个参数，代表是否执行的依赖。

- 不传第二个参数：每次 return 重新渲染页面时，useEffect 第一个参数函数都会执行
- 传参 **[]**，如上：代表不依赖任何变量，只执行一次
- 传参 **[value]**，数组，可以依赖多个变量：代表依赖 value 变量（state 中的值），只在 value 值改变时，执行 useEffect 第一个参数函数



**使用 Class**，可以在 `componenDidMount` 中操作：

```js
export default class Article extends React.Component {

    componenDidMount() {
        await axios.get('')
    }
    
    render() {
        return
    }
}

export async function getServerSideProps(context) {
    try {
        const result = await axios.post(api.getArticleList)
        return {
            props: { articleList: result.data }, // will be passed to the page component as props
        }
    } catch (e) {
        return {
            props: { articleList: [] }, // will be passed to the page component as props
        }
    }
}

export default Article
```



### 3. 页面动画

页面进入、退出动画找到一个比较好用的库 **framer-motion**， [https://www.framer.com/api/motion/](https://www.framer.com/api/motion/)

先改造一下 pages/_app.js，引入 framer-motion

```shell
npm install framer-motion -S
```

```js
import { AnimatePresence } from 'framer-motion'

export default function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} route={router.route} key={router.route} />
    </AnimatePresence>
  )
}
```

在每个页面里通过在元素标签前加 motion 实现动画效果，如 pages/article.js 页面

```js
const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] } },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}

const sentenceVariants = {
  initial: { scale: 0.96, opacity: 1 },
  exit: {
    scale: 0.6,
    y: 100,
    x: -300,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}

const Article = (props) => {
  const { articleList, route } = props
  const [poetry, setPoetry] = useState(null)

  const getPoetry = (data) => {
    setPoetry(data)
  }

  return (
    <div className="container article-container">
      <Head>
        <title>学无止境，厚积薄发</title>
      </Head>

      <Header route={route} />

      <div className="page-background"></div>
      <div style={{ height: '500px' }}></div>

      <Row className="comm-main comm-main-index" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={0} lg={5} xl={4} xxl={3}>
          <Author />
          <Project />
          <Poetry poetry={poetry} />
        </Col>

        <Col className="comm-center" xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <motion.div className="sentence-wrap" initial="initial" animate="enter" exit="exit" variants={sentenceVariants}>
            <PoetrySentence staticFlag={true} handlePoetry={getPoetry} />
          </motion.div>
          <div className="comm-center-bg"></div>
          <motion.div initial="initial" animate="enter" exit="exit" variants={postVariants} className="comm-center-content">
            <BlogList articleList={articleList} />
          </motion.div>
        </Col>
      </Row>
    </div>
  )
}
```

需要实现动画效果的元素标签前加上 motion，在传入 initial，animate，exit，variants 等参数，variants 中 

```js
const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] } },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}
// initial 初始状态
// enter 进入动画
// exit 退出状态
// 不想有退出动画，不写 exit 变量即可
```

**注意**：这里使用 AnimatePresence 改造了 _app.js 后，每个页面都要使用到 motion，否则页面切换不成功，不想要动画的可以如下给默认状态即可：

```js
const Article = (props) =>{
    return (
    	<motion.div initial="initial" animate="enter" exit="exit">
        	...
        </motion.div>
    )
}
```



### 4. 页面切换状态

在 Next.js 中使用 `import Link from 'next/link'` 可以实现不刷新页面切换页面

```js
import Link from 'next/link'

const BlogList = (props) => {
  return (
    <>
      <Link href={'/detailed?id=' + item.id}>
        <div className="list-title">{item.title}</div>
      </Link>
    </>
  )
}

export default BlogList
```

因为是在服务端渲染，在点击 Link 链接时，页面会有一段时间没任何反应，Next.js 默认会在右下角有一个转动的黑色三角，但实在是引不起用户注意。

这里使用插件 **nprogress**，实现顶部加载进度条

```shell
npm install nprogress -S
```

还是改造 _app.js

```js
import 'antd/dist/antd.css'
import '../static/style/common.less'
import { AnimatePresence } from 'framer-motion'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
})
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} route={router.route} key={router.route} />
    </AnimatePresence>
  )
}
```

主要使用到 next/router 去监听路由切换状态，这里也可以自定义加载状态。



### 5. 页面 CSS 加载失败

在 Next.js 开发模式下，当第一次进入某个页面时，发现当前页面样式加载失败，必须刷新一下才能加载成功。

[next-css: Routing to another page doesn't load CSS in development mode](https://github.com/vercel/next-plugins/issues/263)

[Cant change page with 'next/link' & 'next-css'](https://github.com/vercel/next-plugins/issues/282)

在 Github 上也查到相关问题，说是在 _app.js 都引入一下，但是我试了下，还是不行，不过好在这种情况只在开发模式下，生产模式下没什么问题，所以也就没在折腾了，就这样刷新一下吧。



### 6. React Hoos 中实现 setInterval

在 components/PoetrySentence.js 中实现动态写一句诗的效果，在 class 中可以同通过 setInterval 简单实现，但在 React Hoot 中每次 render 重新渲染后都会执行 useEffect，或者 useEffect 依赖[] 就又只会执行一次，这里就通过依赖单一变量加 setTimeout 实现。

在 components/PoetrySentence.js 中

```js
import { useState, useEffect } from 'react'
import { RedoOutlined } from '@ant-design/icons'
import { getPoetry, formatTime } from '../util/index'

const PoetrySentence = (props) => {
  const [sentence, setSentence] = useState('')
  const [finished, setFinished] = useState(false)
  const [words, setWords] = useState(null)
  const { staticFlag, handlePoetry } = props // 是否静态展示

  useEffect(
    async () => {
      if (words) {
        if (words.length) {
          setTimeout(() => {
            setWords(words)
            setSentence(sentence + words.shift())
          }, 150)
        } else {
          setFinished(true)
        }
      } else {
        let tmp = await todayPoetry()
        if (staticFlag) {
          setFinished(true)
          setSentence(tmp.join(''))
        } else {
          setWords(tmp)
          setSentence(tmp.shift())
        }
      }
    },
    [sentence]
  )

  const todayPoetry = () => {
    return new Promise((resolve) => {
      const now = formatTime(Date.now(), 'yyyy-MM-dd')
      let poetry = localStorage.getItem('poetry')
      if (poetry) {
        poetry = JSON.parse(poetry)
        if (poetry.time === now) {
          handlePoetry && handlePoetry(poetry)
          resolve(poetry.sentence.split(''))
          return
        }
      }
      getPoetry.load((result) => {
        poetry = {
          time: now,
          sentence: result.data.content,
          origin: {
            title: result.data.origin.title,
            author: result.data.origin.author,
            dynasty: result.data.origin.dynasty,
            content: result.data.origin.content,
          },
        }
        handlePoetry && handlePoetry(poetry)
        localStorage.setItem('poetry', JSON.stringify(poetry))
        resolve(poetry.sentence.split(''))
      })
    })
  }

  const refresh = () => {
    getPoetry.load((result) => {
      const poetry = {
        time: formatTime(Date.now(), 'yyyy-MM-dd'),
        sentence: result.data.content,
        origin: {
          title: result.data.origin.title,
          author: result.data.origin.author,
          dynasty: result.data.origin.dynasty,
          content: result.data.origin.content,
        },
      }
      handlePoetry && handlePoetry(poetry)
      localStorage.setItem('poetry', JSON.stringify(poetry))
      if (staticFlag) {
        setSentence(poetry.sentence)
      } else {
        setFinished(false)
        setWords(null)
        setSentence('')
      }
    })
  }

  return (
    <p className="poetry-sentence">
      {sentence}
      {finished ? <RedoOutlined style={{ fontSize: '14px' }} onClick={() => refresh()} /> : null}
      <span style={{ visibility: finished ? 'hidden' : '' }}>|</span>
    </p>
  )
}

export default PoetrySentence
```

useEffect 依赖变量 sentence，在 useEffect 中又去更改 sentence，sentence 更新后触发重新渲染，又会重新执行 useEffect，在 useEffect 中加上 setTimeout 延迟，刚好完美实现了 setInterval 效果。

### 7. node-sass

原本项目中使用的是 sass，但在后面 docker 部署安装依赖时，实在时太慢了，还各种报错，之前也是经常遇到，所以索性直接换成了 less，语法也差不多，安装起来省心多了。



## 二、Docker 篇

### 1. 什么是 Docker

Docker 是一个开源的应用容器引擎，可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app），更重要的是容器性能开销极低。

### 2. 为什么要使用 Docker

对我而言，因为现在使用的是阿里云服务器，部署了好几个项目，如果服务器到期后，更换服务器的话，就需要将所有项目全部迁移到新服务器，每个项目又要去依次安装依赖，运行，nginx 配置等等，想想都头大。而使用 Docker 后，将单个项目与其依赖打包成镜像，镜像可以在任何 Linux 中生产一个容器，迁移部署起来就方便多了。

其他而已，使用 Docker 可以让开发环境、测试环境、生产环境一致，并且每个容器都是一个服务，也方便后端实现微服务架构。

### 3. 安装

Docker 安装最好是参照官方文档，避免出现版本更新问题。[https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/) 英文吃力的，这两推荐一款神奇词典 [欧陆词典](https://www.eudic.net/v4/en/app/eudic)，哪里不会点哪里，谁用谁说好。

Mac 和 Windows 都有客户端，可以很简单的下载安装，另外 Window 注意区分专业版、企业版、教育版、家庭版

[Window 专业版、企业版、教育版](https://docs.docker.com/docker-for-windows/install/)

[Window 家庭版](https://docs.docker.com/docker-for-windows/install-windows-home/)

因为我这里使用的是阿里云 Centos 7 服务器，所以简单介绍一下在 Centos 下的安装。



#### Centos 安装 Docker

首先若已经安装过 Docker，想再装最新版，先协助旧版

```shell
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

有三种安装方式：

1. **Install using the repository**
2. **Install from a package**
3. **Install using the convenience script**

这里选择官方推荐的第一种方式安装 **Install using the repository**。



1、**SET UP THE REPOSITORY**

安装 yum-utils 工具包，设置存储库

```shell
$ sudo yum install -y yum-utils
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

2、**安装 docker**

```shell
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

这样安装的是最新的版本，也可以选择指定版本安装

查看版本列表：

```shell
$ yum list docker-ce --showduplicates | sort -r

Loading mirror speeds from cached hostfile
Loaded plugins: fastestmirror
Installed Packages
docker-ce.x86_64            3:20.10.0-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.0-3.el7                    @docker-ce-stable
docker-ce.x86_64            3:19.03.9-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:19.03.8-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:19.03.7-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:19.03.6-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:19.03.5-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:19.03.4-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:19.03.3-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:19.03.2-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:19.03.14-3.el7                   docker-ce-stable
......
```

选择指定版本安装

```shell
$ sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
```

安装完成，查看版本

```shell
$ docker -v
Docker version 20.10.0, build 7287ab3
```

3、启动 docker

```shell
$ sudo systemctl start docker
```

关闭 docker

```shell
$ sudo systemctl stop docker
```

重启 docker

```shell
$ sudo systemctl restart docker
```



### 4. 镜像 Image

**Docker 把应用程序及其依赖，打包在 image 文件里面。**只有通过这个文件，才能生成 Docker 容器（**Container**）。image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

image 文件是通用的，一台机器的 image 文件拷贝到另一台机器，照样可以使用。一般来说，为了节省时间，我们应该尽量使用别人制作好的 image 文件，而不是自己制作。即使要定制，也应该基于别人的 image 文件进行加工，而不是从零开始制作。

官方有个镜像库 [Docker Hub](https://hub.docker.com/)，很多环境镜像都可以从上面拉取。



#### 4.1 查看镜像

```shell
$ docker images
```

或者

```shell
$ docker image ls
```

刚安装完 docker，是没有任何镜像的

```shell
$ docker image ls
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```

只**查看全部镜像 id**

```shell
$ docker images -q
# 或
$ docker image ls -q
```



#### 4.2 下载镜像

这里我们尝试从官方库下载一个 nginx 镜像，镜像有点类似与 npm 全局依赖，拉取后，后面所有需要使用的 nginx 的镜像都可以依赖此 nginx，不用再重新下载，刚开始学习时，我还以为每个使用到 nginx 的镜像都要重新下载呢。

下载 nginx 镜像 [https://hub.docker.com/_/nginx](https://hub.docker.com/_/nginx)

```shell
$ docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
6ec7b7d162b2: Pull complete 
cb420a90068e: Pull complete 
2766c0bf2b07: Pull complete 
e05167b6a99d: Pull complete 
70ac9d795e79: Pull complete 
Digest: sha256:4cf620a5c81390ee209398ecc18e5fb9dd0f5155cd82adcbae532fec94006fb9
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest

$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    ae2feff98a0c   13 hours ago   133MB

```

docker images 查看刚刚安装的 nginx 镜像，有 5 个title，分别为镜像名称，标签，id，创建时间，大小，其中 TAG 标签默认为 latest 最新版，如果下载指定版本，可以 : 后跟版本号

```shell
$ docker pull nginx:1.19
```



#### 4.3 删除镜像

删除镜像可以使用如下命令

```shell
$ docker rmi [image]
```

或者

```shell
$ docker image rm [image]
```

[image] 可以是镜像名称+标签，也可以是镜像 id，ru

```shell
$ docker rmi nginx:latest
$ docker rmi ae2feff98a0c
```

**删除所有镜像**

```shell
$ docker rmi $(docker images -q)
```

**删除所有 none 镜像**

后面有些操作会重复创建相同的镜像，原本的镜像就会被覆盖变为 <none> ，可以批量删除

```shell
$ docker rmi $(docker images | grep "none" | awk '{print $3}')
```



#### 4.4 制作镜像

上面我们下载了 nginx 镜像，但是要想运行我们自己的项目，我们还要制作自己项目的镜像，然后来生成容器才能运行项目。

制作镜像需要借助 Dockerfile 文件，以本项目 admin 后台界面为例（也可以任何 html 文件），因为其打包后只需使用到 nginx 即可访问。

先在 admin 下运行命令 `npm run build` 打包生成 build 文件夹，下面包好 index.html 文件，在 admin/docker 文件夹下创建 Dockerfile 文件，内容如下

```dockerfile
FROM nginx

COPY ../build /usr/share/nginx/html

EXPOSE 80
```

将 build，docker 两个文件夹放在服务器同一目录下，如 /dockerProject/admin

```
├─admin
  └─build
    └─index.html
  └─docker
    └─Dockerfile
```

在 docker 目录下运行命令

```shell
$ docker build ./ -t admin:v1

Sending build context to Docker daemon  4.096kB
Step 1/3 : FROM nginx
 > ae2feff98a0c
   Step 2/3 : COPY ./build /usr/share/nginx/html
    > 0e54c36f5d9a
   Step 3/3 : EXPOSE 80
    > 60db346d30e3
   Successfully built 60db346d30e3
   Successfully tagged admin:v1
   ```

2. **依然将 Dokcerfile 放入 docker 中统一管理**

   ```
   ├─admin
     └─build
       └─index.html
     └─docker
       └─Dockerfile
   ```

   Dockerfile：

   ```dockerfile
   FROM nginx
   
   COPY ./build /usr/share/nginx/html
   
   EXPOSE 80
   ```

   在 **admin 目录**下执行命令

   ```shell
   $ docker build -f docker/Dockerfile ./ -t admin:v1
   
   Sending build context to Docker daemon  3.094MB
   Step 1/3 : FROM nginx
    > Using cache
    > Using cache
    > ae2feff98a0c
Step 2/3 : RUN rm /etc/nginx/conf.d/default.conf
 > 282cb303dddf
Step 3/3 : EXPOSE 80
 > fbb18dda70af
Successfully built fbb18dda70af
Successfully tagged react_blog:nginx
WARNING: Image for service nginx was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Building admin
Step 1/3 : FROM nginx
 > Using cache
 > Using cache
 ---> fbb18dda70af
Successfully built fbb18dda70af
Successfully tagged react_blog:admin
WARNING: Image for service admin was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating react_blog_admin   ... done
Creating react_blog_service ... done
Creating react_blog_blog    ... done
Creating react_blog_nginx   ... done

$ docker ps -a
CONTAINER ID   IMAGE      			COMMAND    CREATED          STATUS         PORTS                    NAMES
1fbb15abdd30   react_blog:service   "docker"   13 seconds ago   Up 6 seconds   0.0.0.0:9002->9002/tcp   react_blog_service
fbee53e25c3a   react_blog:admin     "/docker"  13 seconds ago   Up 6 seconds   0.0.0.0:9001->80/tcp     react_blog_admin
70cb25f87d14   react_blog:blog      "docker"   13 seconds ago   Up 6 seconds   9000/tcp                 react_blog_blog
aa9fbf2afea4   react_blog:nginx     "/docker"  13 seconds ago   Up 6 seconds   0.0.0.0:9000->80/tcp     react_blog_nginx
```

运行成功~



## 结语

终于写完了，写之前已经学习尝试了好久，以为很有把握了，结果在写的过程中又遇到一堆问题，一个问题可能都会卡好久天，各种百度，Google，油管都用上啦，总算解决了遇到的所有问题，当然这些问题可能只满足了我现在的部署需求，其中还有很多知识点，没有接触到，不过没关系，我就是想成功部署前端项目就可以了。

以上便是 docker 部署前端项目的所有笔记，内容比较啰嗦，希望能帮助后来的同学少走一点坑，因为有些是自己的理解，可能会有错误，还请大家指正，互相学习，over。
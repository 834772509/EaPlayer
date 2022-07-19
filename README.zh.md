# EaPlayer

[简体中文](README.zh.md) [English](README.md)

## 介绍

使用原生 JS 编写的音乐播放器

- UI 界面来源于[蜜汁路易(louie)](https://www.cssplus.org/)的`EA Player`WrodPress 插件。
- 功能采用原生 JS
- 使用 WebPack 打包
- 兼用 TypeScript

## 安装

`$ npm install eaplayer`  
或  
`$ yarn add eaplayer`

## 使用

```JavaScript
import EaPlayer from "eaplayer";

new EaPlayer({
  playlist: {
    "歌单名称": [
      {name: "歌曲名称", artist: "歌手名称", src: "歌曲链接", image: "歌曲图片", lrc: "歌词链接"},
      {name: "歌曲名称", artist: "歌手名称", src: "歌曲链接", image: "歌曲图片", lrc: "歌词链接"},
    ],
  },
});
```

### 配置

| 参数            | 说明       | 类型    | 可选值 | 默认值                |
| --------------- | ---------- | ------- | ------ | --------------------- |
| title           | 标题       | string  | -      | EaPlayer              |
| open            | 展开播放器 | boolean | -      | false                 |
| color           | 背景颜色   | string  | -      | #333333               |
| autoplay        | 自动播放   | boolean | -      | false                 |
| volume          | 音乐音量   | number  | 0-100  | 100                   |
| playmode        | 播放模式   | string  | all    | onec / shuffle / all  |
| defaultPlayList | 默认歌单   | string  | -      | 「Welcome」默认的曲单 |
| playlist        | 歌单信息   | Object  | -      |                       |

### playlist

| 参数   | 说明     | 类型   |
| ------ | -------- | ------ |
| name   | 歌曲名称 | string |
| artist | 歌手名称 | string |
| src    | 歌曲链接 | string |
| image  | 歌曲图片 | string |
| lrc    | 歌曲歌词 | string |

## 编译

1. 安装 `npm install`
2. 编译: `npm run build`

## 引用

[audio API](https://www.zhangxinxu.com/wordpress/2019/07/html-audio-api-guide/)

## 许可

`EaPlayer` 使用 GPL V3.0 协议开源，请尽量遵守开源协议。

## 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

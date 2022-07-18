# EaPlayer

[Simplified Chinese](README.zh.md) [English](README.md)

## introduce

Music player written in native JS

- The UI interface comes from the `EA Player`WrodPress plugin of [Louis (louie)](https://www.cssplus.org/).
- Features are in native JS
- Packaged with WebPack
- Also use TypeScript

## Install

`npm install eaplayer`

## Use

```JavaScript
import EaPlayer from "eaplayer";

new EaPlayer({
  playlist: {
    "Playlist Name": [
      {name: "song name",artist: "artist name",src: "song link",image: "song picture",lrc: "lyric link"},
      {name: "song name",artist: "artist name",src: "song link",image: "song picture",lrc: "lyric link"},
    ],
  },
});
```

### Configuration

| parameter       | description                  | type    | optional value | default value              |
| --------------- | ---------------------------- | ------- | -------------- | -------------------------- | ------- | --- |
| title           | title                        | string  | -              | EaPlayer                   |
| open            | whether to expand the player | boolean | -              | false                      |
| color           | color                        | string  | -              | #333333                    |
| autoplay        | autoplay                     | boolean | -              | false                      |
| volume          | volume                       | number  | 0-100          | 100                        |
| playmode        | play mode                    | string  | all            | onec                       | shuffle | all |
| defaultPlayList | Default playlist             | string  | -              | "Welcome" default playlist |
| playlist        | Playlist information         | Object  | -              |                            |

- playlist:

  | parameter | description | type   |
  | --------- | ----------- | ------ |
  | name      | song name   | string |
  | artist    | Artist name | string |
  | src       | song link   | string |
  | image     | song image  | string |
  | lrc       | song lyrics | string |

## build

1. Install `npm install`
2. Compile: `npm run build`

## ref

[audio API](https://www.zhangxinxu.com/wordpress/2019/07/html-audio-api-guide/)

## License

`EaPlayer` is open source using GPL V3.0 protocol, please try to abide by the open source protocol.

## Participate in contribution

1. Fork this repository
2. Create a new Feat_xxx branch
3. Submit the code
4. Create a new Pull Request

import {
    formatDate,
    addClass,
    hasClass,
    removeClass,
    randomNum,
    parseLRC,
} from "./utils.js";
import ajax from "./require.js";

// 默认配置
const defaultConfig = {
    /**
     * Player title
     */
    title: "EA PLAYER",
    /**
     * default open
     */
    open: false,
    /**
     * Theme color
     * 推荐：
      #922542 棕色
      #7266ba 紫色
      #25928e 绿色
      #4e9225 绿色
      #255a92 蓝色
      #92257f
      #333333 黑色
     */
    color: "#333333",
    /**
     * autoplay
     */
    autoplay: false,
    /**
     * default volume
     */
    volume: 100,
    /**
     * all | once | shuffle
     */
    playmode: "all",
    /**
     * defaultPlayList
     */
    defaultPlayList: "「Welcome」默认的曲单",
    /**
     * PlayList Info
     */
    playlist: {
        "「Welcome」默认的曲单": [],
    },
};

class EaPlayer {
    /**
     *
     * @param {Object} config
     */
    constructor(config = {}) {
        // 更新配置
        let currentConfig = defaultConfig;
        for (const key in currentConfig) {
            if (config[key]) {
                currentConfig[key] = config[key];
            }
        }
        require("./css/player.css");
        // import("./css/player.css");
        createPlayerEl();
        EaplayerInit(defaultConfig);
    }
}

// 初始化播放器
function EaplayerInit(config) {
    const player = document.querySelector(".player-layer");
    const control = {
        // 当前歌单
        currentPlayList: "",
        currentPlayIndex: 0,

        audio: document.querySelector("#audio"),

        button_download: document.querySelector(".btn-download a"),
        button_prev: document.querySelector(".btn-prev i"),
        button_play: document.querySelector(".btn-play i"),
        button_next: document.querySelector(".btn-next i"),
        button_mode: document.querySelector(".btn-mode i"),
        button_volueMute: document.querySelector(".volume-mute i"),

        title: document.querySelector(".play-title"),
        showPlayer: document.querySelector(".btn-eaplayer"),
        showPlayerIcon: document.querySelector(".btn-eaplayer i"),
        volueHandle: document.querySelector(".ui-slider-handle"),
        voluebackground: document.querySelector(".volume-sider"),
        currentVolue: document.querySelector(".volume-sider .sider-pace"),

        showEnlarge: document.querySelector(".btn-enlarge i"),
        enlargeBox: document.querySelector(".player-hide-box"),
    };
    const playInfo = {
        // 当前歌词
        lrcInfo: [],

        songname: document.querySelector(".song-title"),
        songartist: document.querySelector(".song-artist"),
        image: document.querySelector(".cover-disc img"),
        playlist: document.querySelector(".history-list"),
        songlist: document.querySelector(".play-list"),
        lrcBox: document.querySelector("#lrcBox ul"),

        progress: document.querySelector(".progress-sider"),
        currentProgress: document.querySelector(".progress-sider .sider-pace"),

        timer: document.querySelector(".player-timer"),
    };

    control.button_play.addEventListener("click", function(event) {
        if (control.audio.paused) {
            removeClass(event.target, "ea-play");
            addClass(event.target, "ea-pause");
            control.audio.play();
        } else {
            removeClass(event.target, "ea-pause");
            addClass(event.target, "ea-play");
            control.audio.pause();
        }
    });
    control.button_prev.addEventListener("click", function(event) {
        switch (config.playmode) {
            case "all":
            case "once":
                control.currentPlayIndex =
                    control.currentPlayIndex <= 0 ?
                    config.playlist[control.currentPlayList].length - 1 :
                    control.currentPlayIndex - 1;
                break;
            case "shuffle":
                control.currentPlayIndex = randomNum(
                    0,
                    config.playlist[control.currentPlayList].length
                );
                break;
        }
        playSong();
    });
    control.button_next.addEventListener("click", function(event) {
        switch (config.playmode) {
            case "all":
            case "once":
                control.currentPlayIndex =
                    control.currentPlayIndex + 1 >=
                    config.playlist[control.currentPlayList].length ?
                    0 :
                    control.currentPlayIndex + 1;
                break;
            case "shuffle":
                control.currentPlayIndex = randomNum(
                    0,
                    config.playlist[control.currentPlayList].length
                );
                break;
        }
        playSong();
    });

    // 按钮——静音
    control.button_volueMute.addEventListener("click", function(event) {
        if (control.audio.muted) {
            control.audio.muted = false;
            control.currentVolue.style.width = `${control.audio.volume * 100}%`;
            control.volueHandle.style.left = `${control.audio.volume * 100}%`;

            removeClass(event.target, "ea-mute");
            addClass(event.target, "ea-volume");
        } else {
            control.audio.muted = true;

            control.currentVolue.style.width = "0%";
            control.volueHandle.style.left = "0%";

            removeClass(event.target, "ea-volume");
            addClass(event.target, "ea-mute");
        }
    });

    // 播放中事件
    control.audio.addEventListener("timeupdate", function(event) {
        if (!control.audio.duration) {
            playInfo.timer.innerHTML = "loading...";
            return;
        }
        const percentage = parseInt(
            (control.audio.currentTime / control.audio.duration) * 100
        );
        playInfo.currentProgress.style.width = `${percentage}%`;

        playInfo.timer.innerHTML = `${formatDate(
      new Date(control.audio.currentTime * 1000),
      "mm:ss"
    )}/${formatDate(new Date(control.audio.duration * 1000), "mm:ss")}`;

        // 当前播放时间大于等于i行的时间，并且小于下一行的时间 则高亮歌词
        for (let i = 0; i < playInfo.lrcInfo.length - 1; i++) {
            if (
                control.audio.currentTime >= playInfo.lrcInfo[i][0] &&
                control.audio.currentTime < playInfo.lrcInfo[i + 1][0]
            ) {
                let lrcHeight;
                for (let li of playInfo.lrcBox.children) {
                    lrcHeight = li.offsetHeight;
                    if (li.getAttribute("data-time") == playInfo.lrcInfo[i][0]) {
                        removeClass(li, "geci_moonlight");
                        addClass(li, "geci_attention");
                    } else {
                        removeClass(li, "geci_attention");
                        addClass(li, "geci_moonlight");
                    }
                }
                playInfo.lrcBox.scrollTo({
                    top: lrcHeight * (i - 5),
                    behavior: "smooth",
                });
            }
        }
    });
    control.audio.addEventListener("ended", function(event) {
        switch (config.playmode) {
            case "all":
                control.currentPlayIndex =
                    control.currentPlayIndex + 1 >=
                    config.playlist[control.currentPlayList].length ?
                    0 :
                    control.currentPlayIndex + 1;
                break;
            case "once":
                break;
            case "shuffle":
                control.currentPlayIndex = randomNum(
                    0,
                    config.playlist[control.currentPlayList].length
                );
                break;
        }
        playSong();
    });

    // 按钮——切换播放模式
    control.button_mode.addEventListener("click", function(event) {
        switch (config.playmode) {
            case "all":
                removeClass(event.target, "ea-all");
                config.playmode = "shuffle";
                addClass(event.target, "ea-shuffle");
                break;
            case "shuffle":
                removeClass(event.target, "ea-shuffle");
                config.playmode = "once";
                addClass(event.target, "ea-once");
                break;
            case "once":
                removeClass(event.target, "ea-once");
                config.playmode = "all";
                addClass(event.target, "ea-all");
                break;
            default:
                config.playmode = "all";
                break;
        }
    });
    // 按钮——设置播放进度
    playInfo.progress.addEventListener("click", function(event) {
        const percentage = parseInt(
            (event.offsetX / event.target.offsetWidth) * 100
        );
        control.audio.currentTime = (control.audio.duration * percentage) / 100;
        playInfo.currentProgress.style.width = `${percentage}%`;
    });

    // 按钮——显示音乐播放器
    control.showPlayer.addEventListener("click", function() {
        if (hasClass(this, "enable")) {
            player.style.left = window.innerWidth > 769 ? "-97%" : "-94%";

            removeClass(this, "enable");
            removeClass(control.showPlayerIcon, "ea-left");
            addClass(control.showPlayerIcon, "ea-right");

            // 隐藏播放列表
            if (hasClass(control.showEnlarge, "enable")) {
                control.enlargeBox.style.height = "0px";
                removeClass(control.showEnlarge, "enable");
            }
        } else {
            player.style.left = "0";
            addClass(this, "enable");
            removeClass(control.showPlayerIcon, "ea-right");
            addClass(control.showPlayerIcon, "ea-left");
        }
    });

    // 按钮——显示音乐列表信息
    control.showEnlarge.addEventListener("click", function() {
        if (hasClass(this, "enable")) {
            control.enlargeBox.style.height = "0px";
            removeClass(this, "enable");
        } else {
            control.enlargeBox.style.height =
                window.innerWidth > 769 ? "400px" : "296px";
            addClass(this, "enable");
        }
    });

    // 音量滑块
    control.voluebackground.addEventListener("mousedown", changeVolume);

    function changeVolume(event) {
        control.volueHandle.style.left = `${event.offsetX}%`;
        control.currentVolue.style.width = `${event.offsetX}%`;

        const move = (event) => {
            if (0 <= event.offsetX && event.offsetX <= 100) {
                control.volueHandle.style.left = `${event.offsetX}%`;
                control.currentVolue.style.width = `${event.offsetX}%`;
                control.audio.volume = event.offsetX / 100;
            }
            event.preventDefault();
        };

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", move);
        });
    }

    /**
     * 加载歌单曲目列表
     * @param {String} playListName 歌单名称
     */
    function loadSongList(playListName) {
        playInfo.songlist.innerHTML = null;
        // 显示当前歌单的歌曲列表
        for (let i = 0; i < config.playlist[playListName].length; i++) {
            const songInfo = config.playlist[playListName][i];
            const li = document.createElement("li");
            li.innerHTML = `<span class="li-title">${i + 1}. ${
        songInfo.name
      }</span> - <span class="li-artist">${songInfo.artist}</span>`;

            control.currentPlayList = playListName;
            control.currentPlayIndex = i;

            // 单击音乐播放列表事件
            li.addEventListener("click", function(event) {
                control.currentPlayList = playListName;
                control.currentPlayIndex = i;
                playSong();
            });

            playInfo.songlist.appendChild(li);
        }
    }

    function playSong(play = true) {
        const songInfo =
            config.playlist[control.currentPlayList][control.currentPlayIndex];

        control.audio.src = songInfo.src;
        playInfo.image.src = songInfo.image;
        // playInfo.image.onerror = playInfo.image.style.display = "none";
        playInfo.songname.innerHTML = songInfo.name;
        playInfo.songartist.innerHTML = `- ${songInfo.artist}`;
        control.button_download.href = songInfo.src;

        playInfo.lrcBox.innerHTML = null;
        // 显示歌词信息
        if (songInfo.lrc) {
            ajax({
                type: "get",
                url: songInfo.lrc,
                success: function(lrcText) {
                    const lrcInfo = parseLRC(lrcText);
                    playInfo.lrcInfo = lrcInfo;
                    for (const info of lrcInfo) {
                        const [time, lrc] = info;
                        const li = document.createElement("li");
                        li.className = "geci_moonlight";
                        li.setAttribute("data-time", time);
                        li.innerHTML = lrc;
                        playInfo.lrcBox.appendChild(li);
                    }
                },
                error: function() {
                    playInfo.lrcInfo = [];
                    const li = document.createElement("li");
                    li.className = "geci_moonlight";
                    li.innerHTML = "暂无歌词";
                    playInfo.lrcBox.appendChild(li);
                },
            });
        } else {
            playInfo.lrcInfo = [];
            const li = document.createElement("li");
            li.className = "geci_moonlight";
            li.innerHTML = "暂无歌词";
            playInfo.lrcBox.appendChild(li);
        }

        for (let index = 0; index < playInfo.songlist.children.length; index++) {
            const songItem = playInfo.songlist.children[index];
            if (index == control.currentPlayIndex) {
                addClass(songItem, "playing");
            } else {
                removeClass(songItem, "playing");
            }
        }

        // 开始播放音乐
        if (play) {
            const playPromise = control.audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then((_) => {
                        removeClass(control.button_play, "ea-play");
                        addClass(control.button_play, "ea-pause");
                    })
                    .catch((error) => {
                        // 无法自动播放
                        removeClass(control.button_play, "ea-pause");
                        addClass(control.button_play, "ea-play");
                    });
            }
        }
    }

    // 应用配置
    player.style.background = config.color;
    control.audio.autoplay = config.autoplay;
    if (config.open) control.showPlayer.click();
    control.title.innerHTML = config.title;
    removeClass(control.button_mode, "ea-all");
    addClass(control.button_mode, `ea-${config.playmode}`);

    // 显示歌单信息
    for (const listName in config.playlist) {
        const playList = document.createElement("li");
        playList.innerHTML = listName;

        // 增加歌单点击事件
        playList.addEventListener("click", (event) => {
            // 遍历全部歌单按钮，取消选中状态
            for (let listItem of playInfo.playlist.children) {
                removeClass(listItem, "now");
            }
            // 切换当前歌单选中状态
            addClass(event.target, "now");
            // 显示当前歌单歌曲列表
            loadSongList(listName);
        });

        playInfo.playlist.appendChild(playList);
    }

    // 选择默认歌单
    for (const listName of playInfo.playlist.children) {
        if (listName.innerText == config.defaultPlayList) {
            addClass(listName, "now");
            loadSongList(listName.innerText);
            break;
        }
    }
    // 选择默认歌曲
    if (
        config.playlist[control.currentPlayList] &&
        config.playlist[control.currentPlayList].length > 0
    ) {
        control.currentPlayIndex =
            config.playmode == "shuffle" ?
            randomNum(0, config.playlist[control.currentPlayList].length) :
            0;

        playSong(false);
    }
}

// 创建播放器界面
function createPlayerEl() {
    const element = document.createElement("template");
    element.innerHTML = `
  <div class="player-layer">
  <div class="player-container">
    <div class="player-hide-box">
      <section class="player-header">
        <div class="play-title">EA PLAYER</div>
        <!-- <div class="player-music-search">
          <div class="music-search-form">
            <span class="ea-icon ea-search"></span>
            <input
              type="search"
              name="ms"
              class="music-search-input"
              size="26"
              placeholder="搜索 ..."
            />
          </div>
        </div> -->
      </section>
      <section class="player-info">
        <div class="history-record">
          <!-- 曲单列表 -->
          <ul class="history-list">
            <!-- <li class="now">「Welcome」默认的曲单</li> -->
          </ul>
        </div>
        <div class="current-record">
          <!--音乐列表-->
          <ul class="play-list"></ul>
        </div>
        <div class="lyric-text">
          <div id="lrcWrap" class="lrc-wrap lrc-wrap-open">
            <div id="lrcBox" class="lrc-box">
              <ul></ul>
            </div>
          </div>
          <div class="lyric-script"></div>
        </div>
        <div class="cover-photo">
          <div class="cover-disc">
            <!-- 歌曲图片 -->
            <img
              src=""
              alt=""
              onerror="this.style.display='none'"
              onload="this.style.display='block'"
            />
            <!-- onerror="this.src='./assets/images/cover.jpg';this.onerror=null" -->
          </div>
        </div>
        <div class="bg-player"></div>
        <div class="bg-player-mask"></div>
      </section>
    </div>
    <div class="player-control">
      <!-- 上一首 按钮 -->
      <div class="btn-prev ea-icon">
        <i class="ea-prev" title="上一首"></i>
      </div>
      <!-- 播放/暂停 按钮 -->
      <div class="btn-play ea-icon"><i class="ea-play"></i></div>
      <!-- 下一首 按钮 -->
      <div class="btn-next ea-icon">
        <i class="ea-next" title="下一首"></i>
      </div>
      <div class="player-progress">
        <div class="progress-sider">
          <div class="sider-loaded"></div>
          <!-- 播放进度条 -->
          <div class="sider-pace"></div>
        </div>
        <div class="song-info">
          <!-- 当前播放音乐名称 -->
          <span class="song-title"></span>
          <!-- 当前播放音乐歌手 -->
          <span class="song-artist"></span>
        </div>
      </div>
      <div class="player-timer">00:00/00:00</div>
      <!--循环按钮-->
      <div class="btn-mode ea-icon"><i class="ea-all"></i></div>
      <!--下载按钮-->
      <div class="btn-download ea-icon">
        <a href="#" download><i class="ea-download"></i></a>
      </div>
      <!--展开播放列表按钮-->
      <div class="btn-enlarge ea-icon"><i class="ea-enlarge"></i></div>
      <div class="player-volume ea-icon">
        <!--静音按钮-->
        <div class="volume-mute"><i class="ea-volume"></i></div>
        <!--音量滑动条-->
        <div class="volume-sider">
          <div class="sider-pace" style="width: 100%"></div>
          <a
            class="ui-slider-handle ui-state-default ui-corner-all"
            style="left: 100%"
          ></a>
        </div>
      </div>
      <!--展开/收缩播放器按钮-->
      <div class="btn-eaplayer">
        <i class="ea-icon ea-right"></i>
      </div>
    </div>
  </div>
  <audio id="audio" type="audio/mpeg" preload="auto"></audio>
</div>
  `;
    document.body.appendChild(element.content);
}

export default EaPlayer;
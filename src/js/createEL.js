export default function createPlayerEl() {
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

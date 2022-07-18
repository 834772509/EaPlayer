const createPlayerEl = require("./js/createEL.js").default;
const EaplayerInit = require("./js/index.js").default;

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
   * all | onec | shuffle
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

module.exports = class {
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
    createPlayerEl();
    EaplayerInit(defaultConfig);
  }
};

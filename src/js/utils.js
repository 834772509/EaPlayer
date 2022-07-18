/**
 * 格式化时间
 * @param {Date} date 时间
 * @param {String} fmt 需要格式化的格式
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

/**
 * 增加样式
 * @param {Object} obj DOM对象
 * @param {String} cls 类名
 */
export function addClass(obj, cls) {
  if (!hasClass(obj, cls)) obj.className = (obj.className + " " + cls).trim();
}

/**
 * 移除样式
 * @param {Object} obj DOM对象
 * @param {String} cls 类名
 */
export function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    obj.className = obj.className.replace(reg, " ");
  }
}

export function hasClass(obj, cls) {
  return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * 切换样式
 * @param {Object} obj DOM对象
 * @param {String} cls 类名
 * @returns 增加样式则返回true，移除返回false
 */
export function toggleClass(obj, cls) {
  if (hasClass(obj, cls)) {
    removeClass(obj, cls);
    return false;
  } else {
    addClass(obj, cls);
    return true;
  }
}

/**
 * 取随机数，区间为：[最小值,最大值]
 * @param min 最小值
 * @param max 最大值
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// 解析LRC歌词
export function parseLRC(lrcText) {
  let result = new Array();

  // 分割歌词
  const lrcArr = lrcText.split("\n");
  for (let i = 0; i < lrcArr.length; i++) {
    // 分割时间和歌词
    const info = lrcArr[i].split("]");
    if (info.length > 1) {
      // 去掉左边的[
      const timeInfo = info[0].split("[");
      let seconds = 0;
      if (timeInfo.length > 1) {
        const tempArr = timeInfo[1].split(":");
        seconds = parseInt(tempArr[0]) * 60 + parseFloat(tempArr[1]);
      }
      result.push([seconds, info[1]]);
    }
  }

  // 正则表达式版本（matchAll 属于 ES6，不兼容IOS）
  // const match = LRC.matchAll("([0-9]{2}:[0-9]{2}.[0-9]{1,3})](.+)/gm");
  // const match = Array.from(lrcText.matchAll(/\[(.+)\](.+)/gm));
  // match.forEach((info, index) => {
  //   const [total, time, lrc] = info;
  //   const tempArr = time.split(":");
  //   const seconds = parseInt(tempArr[0]) * 60 + parseFloat(tempArr[1]);
  //   result.push([seconds, lrc]);
  // });

  return result;
}

class InitalizeUtil {
  constructor() {}

  isMobile() {
    return navigator.userAgent.indexOf("Mobi") > -1 ? "ph" : "pc";
  }
}

export default new InitalizeUtil();

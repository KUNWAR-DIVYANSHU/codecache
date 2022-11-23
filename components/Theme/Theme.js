export function setLight() {
    document
      .querySelector(":root")
      .style.setProperty("--background", "#dddddd");
    document
      .querySelector(":root")
      .style.setProperty("--backgroundElevated", "#ffffff");

    document.getElementsByTagName("body")[0].style.backgroundColor = "#EEEEEE";
    document.getElementsByTagName("body")[0].style.color = "#000000";
}

export function setDark() {
    document
      .querySelector(":root")
      .style.setProperty("--background", "#111111");
    document
      .querySelector(":root")
      .style.setProperty("--backgroundElevated", "#181818");

    document.getElementsByTagName("body")[0].style.backgroundColor = "#111111";
    document.getElementsByTagName("body")[0].style.color = "#FFFFFF";
}
function main() {
    debug.log("novelApp main run", G.appBid);
    addcss = function (css) {
        var cs = document.createElement("style");
        cs.rel = "stylesheet";
        cs.type = "text/css";
        cs.textContent = css;
        document.getElementsByTagName("head")[0].appendChild(cs);
    }
    addcss(bootstarpcss);
    G.novelApp = angular.module('novelApp', ["ui.router"]);
    var div = document.getElementById("LeitherBody");
    div.innerHTML = mainhtml;
    InitNovelRelease();
    debug.log("InitNovelRelease run end")
  //  app.controller("UserInfoCtrl", ["$scope", UserInfoCtrl]);
    angular.bootstrap(document, ['novelApp']);
    debug.log("main run end")
}
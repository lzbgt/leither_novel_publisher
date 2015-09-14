function InitNovelRelease(){

G.novelApp

.config(["$stateProvider", "$logProvider", "$urlRouterProvider", "$compileProvider",
         function($stateProvider, $logProvider, $urlRouterProvider, $compileProvider) {
	$stateProvider
	.state("publish", {
		url : "/publish",
		templateUrl : "publish.html",
		controller:"novelCtrl"
	})	
	.state("update", {
		url : "/update",
		templateUrl : "update.html",
		controller:"novelUpdateCtrl"
	})	
	var update= getUrlPara()["update"];
	if(update!=null){
		$urlRouterProvider.otherwise("/update");
	}else{
		$urlRouterProvider.otherwise("/publish");	
	}

}])

.controller('novelCtrl', function($scope) {
	$scope.novelName = "";
	$scope.chapName = "";
	$scope.author = "";
	$scope.novelContent = "";
	$scope.releaseAfter = false;
	$scope.releaseNovel = function() {
		if ($scope.novelContent) {
			var novelone = new novelObj();
			novelone.field = "chapName";
			novelone.value = $scope.chapName;
			var noveltwo = new novelObj();
			noveltwo.field = "novelName";
			noveltwo.value = $scope.novelName;
			var novelthree = new novelObj();
			novelthree.field = "author";
			novelthree.value = $scope.author;
			var novelfour = new novelObj();
			novelfour.field = "timestamp";
			novelfour.value = Math.floor(Date.now() / 1000);
			var novelfive = new novelObj();
			novelfive.field = "body";
			novelfive.value = $scope.novelContent;
			var key=getKeyForHmset();
			var readerAppbid="uF7lXiB_MBsGSxt6GUUwBteqiV3vSqYQyq_iLgVGN8s";
			var publishAppbid="gwTLMKAl5kpqoLwlmeVzqmHzJNMuEzRTLfD0YHYB20g";
			console.log("key="+key);
			console.log("G.sid="+G.sid);	
			console.log("G.bid="+G.bid);	
			G.leClient.hmset(G.sid, G.bid,key, novelone, noveltwo,
					novelthree, novelfour, novelfive, function() {
						$scope.novelName = "";
						$scope.chapName = "";
						$scope.author = "";
						$scope.novelContent = "";
						$scope.releaseAfter = true;
						$scope.edit='http://' + G.I.IPList[G.I.IPNum] + '/loadres?type=text/html&AppName=publishApp&AppBid='+publishAppbid+'&ip='+G.I.IPList[G.I.IPNum]+'&bid=' + G.I.SystemBid + '&name=AppTemplate&ver=last&novelKey='+key+'&nodeBid='+G.bid+'&novelSid='+G.sid+'&userid='+G.bid+'&update=update';
						$scope.preview='http://' + G.I.IPList[G.I.IPNum] + '/loadres?type=text/html&AppName=NovelReader&AppBid='+readerAppbid+'&ip='+G.I.IPList[G.I.IPNum]+'&bid=' + G.I.SystemBid + '&name=AppTemplate&ver=last&novelKey='+key+'&nodeBid='+G.bid+'&userid='+G.bid;						
						$scope.$apply();
						console.log("release success");
					}, function(name, err) {
						debug.warn(err);
						
					})
		}
	
	}
	var novelObj=function(){};
	var getKeyForHmset= function() {
		   return Date.now();
		}
})
.controller('novelUpdateCtrl', function($scope) {	
	$scope.updateAfter = false;
	G.leClient.hmget(G.I.novelSid, G.I.nodeBid, G.I.novelKey, "chapName","novelName","author","body",function(data){
	//	debugger;
			$scope.chapName =  data[0];
			$scope.novelName = data[1];			
			$scope.author = data[2];
			$scope.novelContent = data[3];
			$scope.$apply();
		
	},function(name, err){
		debug.warn(err);
		
	})
	$scope.releaseNovel = function() {
		if ($scope.novelContent) {
			var novelone = new novelObj();
			novelone.field = "chapName";
			novelone.value = $scope.chapName;
			var noveltwo = new novelObj();
			noveltwo.field = "novelName";
			noveltwo.value = $scope.novelName;
			var novelthree = new novelObj();
			novelthree.field = "author";
			novelthree.value = $scope.author;
			var novelfour = new novelObj();
			novelfour.field = "timestamp";
			novelfour.value = Math.floor(Date.now() / 1000);
			var novelfive = new novelObj();
			novelfive.field = "body";
			novelfive.value = $scope.novelContent;
			var key=getKeyForHmset();
			var readerAppbid="uF7lXiB_MBsGSxt6GUUwBteqiV3vSqYQyq_iLgVGN8s";
			var publishAppbid="gwTLMKAl5kpqoLwlmeVzqmHzJNMuEzRTLfD0YHYB20g";
			console.log("key="+key);
			console.log("G.sid="+G.sid);	
			console.log("G.bid="+G.bid);	
			G.leClient.hmset(G.sid, G.bid,key, novelone, noveltwo,
					novelthree, novelfour, novelfive, function() {
						$scope.novelName = "";
						$scope.chapName = "";
						$scope.author = "";
						$scope.novelContent = "";
						$scope.updateAfter = true;
						$scope.edit='http://' + G.I.IPList[G.I.IPNum] + '/loadres?type=text/html&AppName=publishApp&AppBid='+publishAppbid+'&ip='+G.I.IPList[G.I.IPNum]+'&bid=' + G.I.SystemBid + '&name=AppTemplate&ver=last&novelKey='+key+'&nodeBid='+G.bid+'&novelSid='+G.sid+'&userid='+G.bid+'&update=update';
						$scope.preview='http://' + G.I.IPList[G.I.IPNum] + '/loadres?type=text/html&AppName=NovelReader&AppBid='+readerAppbid+'&ip='+G.I.IPList[G.I.IPNum]+'&bid=' + G.I.SystemBid + '&name=AppTemplate&ver=last&novelKey='+key+'&nodeBid='+G.bid+'&userid='+G.bid;						
						$scope.$apply();
						console.log("update success");
					}, function(name, err) {
						debug.warn(err);
						
					})
		}
	
	}
	var novelObj=function(){};
	var getKeyForHmset= function() {
		   return Date.now();
		}

})


;
}
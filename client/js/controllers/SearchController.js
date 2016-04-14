app.controller('SearchCtrl',function($scope, $state, SearchService, IssuesService, $mdDialog){
	$scope.searchUrl = "";
	var noIssues = "No issues";
	var noIssuesDesc = "Yayyy! No open issues ";
	var url = "";
	$scope.today = [];
	$scope.thisWeek = [];
	$scope.prev = [];
	$scope.total = 0;
	$scope.search = function(){
		$scope.today = [];
		$scope.thisWeek = [];
		$scope.prev = [];
		$scope.total = 0;
		url = SearchService.getRepoName($scope.searchUrl);
		if(url == ""){
			showAlert("popupContainer","Validation failed","The url entered is an invalid url for a git repository.", $mdDialog);
			return;
		}
		var page = 1;
		var date = new Date();
		//Until the promise is fulfilled(getIssues returning a response), the progress bar will indicate progress
		$scope.promise = SearchService.getIssues(url, page, 0, [], [], [],date)
		.then(function(data){
			console.log(data);
			$scope.today = data.today;
			$scope.thisWeek = data.thisWeek;
			$scope.prev = data.prev;
			$scope.total = data.total;
		}, function(data){
			showAlert("popupContainer","Validation failed","The url entered is an invalid url for a git repository.", $mdDialog);
		});
	};
	
	//displays the different open issues in a different screen, differentiated based on when it was opened.
	$scope.listIssues = function(when){
		var date = new Date();
		var date_in_ms = date.getTime();
		var q = "";
		var title = url+" - ";
		var data;
		if(when == "today"){
			if($scope.today.length == 0){
				showAlert("popupContainer",noIssues, noIssuesDesc+" from the past 24 hours!", $mdDialog);
				return;
			}
			data = $scope.today;
			title+= "Issues opened in the last 24 hours";
		} else if(when == "thisWeek"){
			if($scope.thisWeek == 0){
				showAlert("popupContainer",noIssues, noIssuesDesc+" from the past week!", $mdDialog);
				return;
			}
			data = $scope.thisWeek;
			title+= "Issues opened more than 24 hours ago but less than 7 days ago";
		} else if(when == "prev"){
			if($scope.prev == 0){
				showAlert("popupContainer",noIssues, noIssuesDesc+" from the week before last!", $mdDialog);
				return;
			}
			data = $scope.prev;
			title+= "Issues opened before 7 days";
		} else {
			title+= "Open issues";
			data = $scope.today.concat($scope.thisWeek).concat($scope.prev);
		}
		if($scope.total == 0){
			showAlert("popupContainer",noIssues, noIssuesDesc+" at all!!!", $mdDialog);
			return;
		}
		console.log(data);
		IssuesService.setData(data, title);
		sessionStorage.searchUrl = url; //storing the url in the sessionStorage, so that when the user returns back from the next page, the results will be displayed without his input
		$state.go('issues');
	};
	
	//if there is an url stored in the session, then, the search is conducted again for fresh results on visiting this page/refreshing it
	if(sessionStorage.searchUrl){
		$scope.searchUrl = sessionStorage.searchUrl;
		$scope.search();
	}
});
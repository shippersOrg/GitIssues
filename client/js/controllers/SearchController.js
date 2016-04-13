app.controller('SearchCtrl',function($scope, $state, SearchService, IssuesService, $mdDialog){
	$scope.searchUrl = "";
	$scope.today = 0;
	$scope.thisWeek = 0;
	$scope.prev = 0;
	$scope.total = 0;
	var noIssues = "No issues";
	var noIssuesDesc = "Yayyy! No open issues ";
	var url = "";
	$scope.search = function(){
		url = SearchService.getRepoName($scope.searchUrl);
		if(url == ""){
			showAlert("popupContainer","Validation failed","The url entered is an invalid url for a git repository.", $mdDialog);
			return;
		}
		$scope.today = 0;
		$scope.thisWeek = 0;
		$scope.prev = 0;
		$scope.total = 0;
		var page = 1;
		var date = new Date();
		
		$scope.promise = SearchService.getIssues(url, page,0,0,0,date)
		.then(function(data){
			$scope.today = data.today;
			$scope.thisWeek = data.thisWeek;
			$scope.prev = data.prev;
			$scope.total = data.total;
		}, function(data){
			showAlert("popupContainer",data.message, data.errors[0].message, $mdDialog);
		});
	};
	
	$scope.listIssues = function(when){
		var date = new Date();
		var date_in_ms = date.getTime();
		var q = "";
		var title = url+" - ";
		if(when == "today"){
			if($scope.today == 0){
				showAlert("popupContainer",noIssues, noIssuesDesc+" from the past 24 hours!", $mdDialog);
				return;
			}
			var temp_date_in_ms = date_in_ms - 86400000;
			var tempDate = new Date(temp_date_in_ms);
			q = "+updated:>="+tempDate.toISOString();
			title+= "Issues opened in the last 24 hours";
		} else if(when == "thisWeek"){
			if($scope.thisWeek == 0){
				showAlert("popupContainer",noIssues, noIssuesDesc+" from the past week!", $mdDialog);
				return;
			}
			var temp_date_in_ms1 = date_in_ms - 86400000;
			var temp_date_in_ms2 = date_in_ms - 604800000;
			var tempDate1 = new Date(temp_date_in_ms1);
			var tempDate2 = new Date(temp_date_in_ms2);
			q = "+updated:"+tempDate2.toISOString()+".."+tempDate1.toISOString();
			title+= "Issues opened more than 24 hours ago but less than 7 days ago";
		} else if(when == "prev"){
			if($scope.prev == 0){
				showAlert("popupContainer",noIssues, noIssuesDesc+" from the week before last!", $mdDialog);
				return;
			}
			var temp_date_in_ms = date_in_ms - 604800000;
			var tempDate = new Date(temp_date_in_ms);
			q = "+updated:<"+tempDate.toISOString();
			title+= "Issues opened before 7 days";
		} else {
			title+= "Open issues"
		}
		if($scope.total == 0){
			showAlert("popupContainer",noIssues, noIssuesDesc+" at all!!!", $mdDialog);
			return;
		}
		IssuesService.setData(url, q, title);
		sessionStorage.searchUrl = url;
		$state.go('issues');
	};
	
	if(sessionStorage.searchUrl){
		$scope.searchUrl = sessionStorage.searchUrl;
		$scope.search();
	}
});
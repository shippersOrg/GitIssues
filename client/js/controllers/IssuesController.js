app.controller('IssuesCtrl',function($scope, $state, IssuesService, $mdDialog, $window){
	$scope.issues = [];
	$scope.query = {
    	limit: 100,
    	page: 1
  	}
  	$scope.total;
  	$scope.title = IssuesService.getTitle();
	$scope.listIssues = function(){
		$scope.promise = IssuesService.listIssues($scope.query.page)
		.then(function(data){
			$scope.issues = data.items;
			$scope.total = data.total_count;
		}, function(data){
			showAlert("issuePage",data.message, data.errors[0].message, $mdDialog);
		});
	};
	$scope.listIssues();
	
	$scope.getDate = function(date){
		return new Date(date).toDateString();
	};

	$scope.getAssignedTo = function(assignee){
		if(assignee == null) return "";
		return assignee.login;
	};

	$scope.issueDescribe = function(title, description){
		showAlert("issuePage",title, description, $mdDialog);
	};

	$scope.openInNewTab = function(url){
		if(url == "") return;
		$window.open(url, '_blank');
  	}

	$scope.getAssigneeUrl = function(assignee){
		if(assignee == null) return "";
		return assignee.html_url;
	}

	$scope.getAssigneeAvatar = function(assignee){
		if(assignee == null) return "";
		return assignee.avatar_url;
	}
});
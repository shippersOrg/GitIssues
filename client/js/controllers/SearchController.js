app.controller('SearchCtrl',function($scope, $state, SearchService){
	$scope.searchUrl = "";
	$scope.today = [];
	$scope.thisWeek = [];
	$scope.beforeThisWeek = [];
	$scope.total = "";
	$scope.search = function(){
		getIssues();
	}
	function getIssues(){
		var date = new Date();
		SearchService.getIssues($scope.searchUrl, 1)
		.then(function(data){
			$scope.total = data.total_count;
			for(var i=0; i<data.items.length; i++){
				//console.log(item);
				console.log(data.items[i].updated_at);
				var openedDate = new Date(data.items[i].updated_at);
				console.log(date - openedDate);
				if(date - openedDate <= 86400000){
					$scope.today.push(data.items[i]);
				} else if((date - openedDate > 86400000) && (date - openedDate < 604800000)){
					$scope.thisWeek.push(data.items[i]);
				} else {
					$scope.beforeThisWeek.push(data.items[i]);
					break;
				}
			}
		}, function(error){
			console.log(error)
		});
	}
});
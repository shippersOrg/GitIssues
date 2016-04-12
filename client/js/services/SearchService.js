app.service('SearchService', function ($http,$q) {
    return {
		getIssues : function(repo, pageNo){
            var repo = "repo:"+repo;
			return $http.get(url+open+repo+params+pageNo)
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        return $q.reject(response.data);
                    });
		}
	}
});
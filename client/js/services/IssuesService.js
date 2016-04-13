app.service('IssuesService', function ($http,$q) {
    var data = {
        q : "",
        repo : "",
        title : ""
    };
    return {
        setData : function(repo, q, title){
            data.q = q;
            data.repo = "repo:"+repo;
            data.title = title;
        },
        getTitle: function(){
            return data.title;
        },
        listIssues : function(pageNo){
            return $http.get(url+openState+data.repo+data.q+params+pageNo)
                    .then(function(response) {
                        var flag = true;
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
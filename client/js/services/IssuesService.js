app.service('IssuesService', function ($http,$q) {
    var data = {
        q : "",
        repo : "",
        title : ""
    };
    return {
        //The data that has to be passed between two controllers(SearchCtrl & IssuesCtrl is set here)
        setData : function(repo, q, title){
            data.q = q;
            data.repo = "repo:"+repo;
            data.title = title;
        },
        //The title of the page(repo name & issue description is returned here)
        getTitle: function(){
            return data.title;
        },
        //Lists the issues based on the query and page number.
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
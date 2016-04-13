app.service('SearchService', function ($http,$q) {
    return {
		getIssues : function(repo, pageNo, total, today, thisWeek, date){
            var self = this;
            var repository = "repo:"+repo;
			return $http.get(url+openState+repository+params+pageNo)
                    .then(function(response) {
                        var flag = true;
                        if (typeof response.data === 'object') {
                            total = response.data.total_count;
                            for(var i=0; i<response.data.items.length; i++){
                                var openedDate = new Date(response.data.items[i].updated_at);
                                if(date - openedDate <= 86400000){
                                    today++;
                                } else if((date - openedDate > 86400000) && (date - openedDate < 604800000)){
                                    thisWeek++;
                                } else {
                                    flag = false;
                                    break;
                                }
                            }
                            if(flag && (thisWeek+today != total)){
                                return self.getIssues(repo, pageNo++, total, today, thisWeek);
                            } else {
                                var data = {
                                    total : total,
                                    thisWeek: thisWeek,
                                    today : today,
                                    prev : total - (thisWeek+today)
                                };
                                return data;
                            }
                        } else {
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        return $q.reject(response.data);
                    });
		},
        getRepoName : function(val){
            if(/(https:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(val)){
                return val.substring(19);
            } else if(/(http:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(val)){
                return val.substring(18);
            } else if(/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(val)){
                return val;
            }
            return "";
        }
	}
});
app.service('SearchService', function ($http,$q) {
    return {
        //Gets the issues and differentiates them based on when it was opened.
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
                                if(date - openedDate <= 86400000){ //checks whether the issue is opened within 24 hours
                                    today++;
                                } else if((date - openedDate > 86400000) && (date - openedDate < 604800000)){ //checks whether the issue was opened >24h && <7d
                                    thisWeek++;
                                } else { //opened before 7 days
                                    flag = false;
                                    break;
                                }
                            }
                            //if there are more issues which are opened within the current week then the getIssues function is called again till there are no more issues to be retreived
                            if(flag && (thisWeek+today != total)){ 
                                return self.getIssues(repo, pageNo++, total, today, thisWeek);
                            } else { //if there are no more issues to be retreived, then the data is returned to the controller.
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
        //checks whether the entered repository is valid or not
        getRepoName : function(val){
            if(/(https:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(val)){ //eg: https://github.com/docker/docker
                return val.substring(19);
            } else if(/(http:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(val)){ //eg: http://github.com/docker/docker
                return val.substring(18);
            } else if(/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(val)){ //eg: docker/docker
                return val;
            }
            return "";
        }
	}
});
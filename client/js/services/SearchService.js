app.service('SearchService', function ($http,$q) {
    return {
        //Gets the issues and differentiates them based on when it was opened and stores them in their respective list.
		getIssues : function(repo, pageNo, total, today, thisWeek, prev, date){
            var self = this;
            var repository = repo+"/issues";
			return $http.get(url+repository+params+pageNo)
                    .then(function(response) {
                        var flag = true;
                        if (typeof response.data === 'object') {
                            if(response.data.length == 0){
                                var data = {
                                    total : total,
                                    thisWeek: thisWeek,
                                    today : today,
                                    prev : prev
                                };
                                return data;
                            }
                            total+=response.data.length;
                            for(var i=0; i<response.data.length; i++){
                                var openedDate = new Date(response.data[i].updated_at);
                                if(date - openedDate <= 86400000){ //checks whether the issue is opened within 24 hours
                                    today.push(response.data[i]);
                                } else if(((date - openedDate) > 86400000) && ((date - openedDate) < 604800000)){
                                    thisWeek.push(response.data[i]);
                                } else { //opened before 7 days
                                    prev.push(response.data[i]);
                                }
                            }
                            //if there are no more issues to be retreived, then the data is passed back to the controller
                            if(response.data.length < 100){ 
                                var data = {
                                    total : total,
                                    thisWeek: thisWeek,
                                    today : today,
                                    prev : prev
                                };
                                return data;
                            } else { 
                                //if there are more issues to be retreived, then the getIssues method is called again with the pageNo param incremented
                                return self.getIssues(repo, ++pageNo, total, today, thisWeek, prev, date);
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
            if(/(https:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/issues)$/.test(val)){ //eg: https://github.com/docker/docker/issues
                return val.substring(19,val.indexOf('/issues'));
            } else if(/(https:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(val)){   //eg: https://github.com/docker/docker
                return val.substring(19);
            } else if(/(http:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/issues)$/.test(val)){ //eg: http://github.com/docker/docker/issues
                return val.substring(18,val.indexOf('/issues'));
            } else if(/(http:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(val)){ //eg: http://github.com/docker/docker
                return val.substring(18);
            } else if(/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/issues)$/.test(val)){ //eg: docker/docker/issues
                return val.substring(0,val.indexOf('/issues'));
            } else if(/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(val)){ //eg: docker/docker
                return val;
            } 
            return "";
        }
	}
});
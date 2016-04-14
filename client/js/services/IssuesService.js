app.service('IssuesService', function ($http,$q) {
    var issues = [];
    var title = "";
    return {
        //The data that has to be passed between two controllers(SearchCtrl & IssuesCtrl is set here)
        setData : function(d, t){
            issues = d;
            title = t;
        },
        //The title of the page(repo name & issue description is returned here)
        getTitle: function(){
            return title;
        },
        //Lists the issues
        listIssues : function(){
            return issues;
		}
    }
});
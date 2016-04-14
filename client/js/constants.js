/*var url = "https://api.github.com/search/issues?q=";
var openState = "state:open+";
var params = "&per_page=100&sort=updated&order=desc&page="; *///queries the database for 100 items sorted with most recenlty opened issues at the beginning.
var url = "https://api.github.com/repos/"; //docker/docker/issues1&since=2016-04-13T09:00:00.000Z;
var params = "?direction=desc&sort=updated&per_page=100&state=open&page=";
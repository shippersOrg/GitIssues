The solution implemented is in the following manner:
	- query the GitHub api and get the open issues in descending order.
	- increase the count for issues raised on the current day, current week and previous week accordingly.
	- keep querying the api until, all the open issues are got.
	

I have also implemented displaying the open issues on clicking of the numbers displayed in the table after the search results, by using the data I have received from the previous api call. The page opens in a different page and lists down all the issues which are open with the bug number, bug title, opened on, opened by and assigned to data displayed in the table. The following is implemented on this page:
	- On clicking on the bug number, the bug is opened in GitHub in a new tab. 
	- On clicking the assigned by, the person's profile who opened the bug, is opened in a new tab.
	- On clicking on the assignee if present, the assignee's profile is opened in a new tab. On clicking the bug title, the bug description is opened in a dialog box.
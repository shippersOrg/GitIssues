//Show alert is a common function used by different controllers. It displays a md-dialog with a title, message and a button.
function showAlert(id, title, description, $mdDialog){
		$mdDialog.show(
      		$mdDialog.alert()
      		  .parent(angular.element(document.querySelector('#'+id)))
      		  .clickOutsideToClose(true)
      		  .title(title)
      		  .textContent(description)
      		  .ariaLabel('Alert Dialog Demo')
      		  .ok('Done!')
    	);		
	}
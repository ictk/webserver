

function mainController($scope, $window, $http) {
  console.log('myApp');
  showHideForm($scope, showCompanyList = true);
  init_body($scope);
  init_event($scope);
  $scope.page_navigation = 'page_navigation.html';
  $scope.warning = '';
  $scope.indent_types = ['android', 'ios'];
  $scope.list_comp_names = ['ogi_uid', 'org_code', 'ftk_uid', 'org_name', 'description', 'url', 'url_img']
  $scope.cookie_name = 'compnay_page';

  console.log(document.cookie);
  console.log(window.page);
  $scope.bodyInit = function() {


  }
  

  function fail_process(response) {
    $scope.warning = response.data.error;
  }
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}
	$scope.sample = function() {
    init_event($scope);
	}





};

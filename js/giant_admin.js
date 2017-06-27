
angular.module('myApp', []).controller('userCtrl', function($scope, $http) {
  console.log('myApp');
$scope.fName = '';
$scope.lName = '';
$scope.passw1 = '';
$scope.passw2 = '';
$scope.chips = {};
$scope.master_keys = {};
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;
$scope.hideform = true;
$scope.editUser = function(id) {
  $scope.hideform = false;
  if (id == 'new') {
    $scope.edit = true;
    $scope.incomplete = true;
    $scope.fName = '';
    $scope.lName = '';
    } else {
    $scope.edit = false;
    $scope.sn = $scope.chips[id].sn;
    $scope.msk_uid = $scope.chips[id].msk_uid;
		$scope.chp_uid = $scope.chips[id].chp_uid;
  }
};

$scope.$watch('passw1',function() {$scope.test();});
$scope.$watch('passw2',function() {$scope.test();});
$scope.$watch('fName', function() {$scope.test();});
$scope.$watch('lName', function() {$scope.test();});

$scope.test = function() {
  if ($scope.passw1 !== $scope.passw2) {
    $scope.error = true;
    } else {
    $scope.error = false;
  }
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.fName.length ||
  !$scope.lName.length ||
  !$scope.passw1.length || !$scope.passw2.length)) {
     $scope.incomplete = true;
  }
};

$http.get("giant_auth/admin?cmd=LIST_MASTERKEY")
.then(function (response) {
	//console.log(response);
	$.each(response.data.list_param, function(key,value) {
		//console.log(key,value);
	//	dictObject.sn =comp[1];
		$scope.master_keys[value.msk_uid] = value

	});

	console.log($scope.master_keys);
});

$http.get("giant_auth/admin?cmd=LIST_CHIP")
.then(function (response) {
	console.log(response);
	$.each(response.data.list_param, function(key,value) {
		console.log(key,value);
		var dictObject = {}
		dictObject.chp_uid =value.chp_uid;
		dictObject.value =value;

		value.version =$scope.master_keys[value.msk_uid].version;
	//	dictObject.sn =comp[1];

		$scope.chips[value.chp_uid] = value;
	});
	console.log($scope.chips);
  // key is the key
  // value is the value
});


});

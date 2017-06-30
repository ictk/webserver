function update_masterkey($scope, $http){
	$scope.master_keys = {};
	$http.get("/giant_auth/admin?cmd=LIST_MASTERKEY")
	.then(function (response) {
		console.log('LIST_MASTERKEY');
		$.each(response.data.list_param, function(key,value) {
			//console.log(key,value);
		//	dictObject.sn =comp[1];
			$scope.master_keys[value.msk_uid] = value
			//$scope.list_msk_uid.push(value.msk_uid);

		});

		console.log($scope.master_keys);
	});


}

angular.module('myApp', []).controller('userCtrl', function($scope, $http) {
  console.log('myApp');
$scope.chips = {};
$scope.master_keys = {};
$scope.list_msk_uid = [];
$scope.TEST = ['fasd','afsafasf','afsdasfasfsa'];
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;
$scope.hideform = true;
$scope.sn = '';
$scope.master_key = '';
$scope.iswarning = false;
$scope.warning = '';
$scope.msg = '';
$scope.map_link = {CHIP:"/giant_admin/chip.html",MASTERKEY:"/giant_admin/masterkey.html",MAIN:"/main.php"};

update_masterkey($scope, $http);


$scope.chipInit= function() {
	console.log('chipInit');;


	$http.get("/giant_auth/admin?cmd=LIST_CHIP")
	.then(function (response) {
		console.log('LIST_CHIP');
		$.each(response.data.list_param, function(key,value) {
			console.log(key,value);
			var dictObject = {}
			dictObject.chp_uid =value.chp_uid;
			dictObject.value =value;

			value.version =$scope.master_keys[value.msk_uid].version;
			value.key_value=$scope.master_keys[value.msk_uid].key_value;
		//	dictObject.sn =comp[1];

			$scope.chips[value.chp_uid] = value;

		});
	});
};
$scope.showContainerChip = function(id) {
	console.log('showContainer');
  $scope.hideform = false;
	var version =0;
  if (id == 'new') {
		console.log('new',$scope.master_keys);

    $scope.edit = true;
    $scope.incomplete = true;
		$scope.sn = '';
    $scope.msk_uid = '';
		$scope.chp_uid = '';
		$scope.selectedName = '';

    } else {
		var version = $scope.chips[id].version;
    $scope.edit = false;
    $scope.sn = $scope.chips[id].sn;
    $scope.msk_uid = $scope.chips[id].msk_uid;
		$scope.chp_uid = $scope.chips[id].chp_uid;
		$scope.selectedName = $scope.msk_uid;
		console.log($scope.selectedName);

  }
	$scope.list_msk_uid = [];

	$.each($scope.master_keys, function(key,value) {
		//if(Number(version) > Number(value.version)) return;
		console.log(typeof(version),typeof(value.version));
		$scope.list_msk_uid.push(value.msk_uid);

	// 	//console.log(key,value);
	// //	dictObject.sn =comp[1];
	// 	$scope.master_keys[value.msk_uid] = value
	// 	$scope.list_msk_uid.push(value.msk_uid);

	});

};
$scope.showContainerMasterKey = function(id) {
	console.log('showContainerMasterKey');
  $scope.hideform = !$scope.hideform;
	//$scope.edit = true;
	//$scope.incomplete = true;
	//$scope.master_key = '';



};
$scope.modifyChip = function(id) {
	console.log('modifyChip');
	console.log($scope.sn);
	list_sn = [];
	$scope.warning ='';
	$.each($scope.chips, function(key,value) {
		list_sn.push(value.sn);
	});
	console.log(list_sn);

	if($scope.chp_uid != '')//chip master_key change
	{

		var msk_uid = $scope.selectedName;

			$http.get("/giant_auth/admin?cmd=MODIFY_MASTERKEY_CHIP&sn="+$scope.sn+"&msk_uid="+msk_uid)
			.then(function (response) {
				console.log('MODIFY_MASTERKEY_CHIP');
				console.log(response.data);
				if(response.data.params.Result == 'OK'){
					location.reload();
					return ;
				}
				$scope.warning = response.data.params.ERR;

			},function errorCallback(response) {
				$scope.warning = response.status;
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
			}
		);


		return;
	}

	// if(list_sn.indexOf($scope.sn)>=0){
	// 	console.log('sn is already exist');
	// 	$scope.warning ='sn is already exist';
	// 	return;
	// }


	$http.get("/giant_auth/admin?cmd=INSERT_CHIP&sn="+$scope.sn)
	.then(function (response) {
		console.log('INSERT_CHIP');
		console.log(response.data);
		if(response.data.params.Result == 'OK'){
			location.reload();
			return ;
		}
		$scope.warning = response.data.params.ERR;

	},function errorCallback(response) {
		$scope.warning = response.status;
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	}
);



};

$scope.goulr = function(url) {
	console.log(url);

	//window.location.path(url);
	window.location.href = url;

}
$scope.test_select = function(id) {
	console.log('test_select');
	//console.log(Object.getOwnPropertyNames($scope.selectedName));
	//$scope.selectedName = 'msk_5';
	console.log(typeof( $scope.selectedName));
	console.log($scope.selectedName);
	$scope.msg ='aaaaa';


};

$scope.deleteMasterKey = function(id) {
	console.log('deleteMasterKey');

};

$scope.insertMasterKey = function(id) {
	$scope.warning ='';
	console.log('insertMasterKey');

	$http.get("/giant_auth/admin?cmd=INSERT_MASTERKEY&key_value="+$scope.master_key)
	.then(function (response) {
		console.log('INSERT_MASTERKEY');
		console.log(response.data);
		if(response.data.params.Result == 'OK'){
			//location.reload();
			update_masterkey($scope, $http);
			$scope.hideform = false;
			return ;
		}
		$scope.warning = response.data.params.ERR;

	},function errorCallback(response) {
		$scope.warning = response.status;
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	});


};
$scope.findMasterKey = function(id) {
	$scope.warning ='';
	$scope.msg ='';
	console.log('insertMasterKey');

	$http.get("/giant_auth/admin?cmd=FIND_MASTERKEY&key_value="+$scope.master_key)
	.then(function (response) {
		console.log('FIND_MASTERKEY');
		console.log(response.data);
		if(response.data.params.Result == 'OK'){
			$scope.msg = 'version:'+response.data.params.version+' msk_uid:'+response.data.params.msk_uid;
			return ;
		}
		$scope.warning = response.data.params.ERR;

	},function errorCallback(response) {
		$scope.warning = response.status;
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	});


};

$scope.generateMasterKey = function(id) {
	console.log('generateMasterKey');

	$scope.master_key = generateHexRandom(32);;




};
function isHexString(str){
	var ret = str.replace(/[a-fA-F0-9]+/, '');
	if(ret == ''){
		return true
	}
	console.log(ret == '',ret);
	return false;
}

$scope.checkSnChip = function(id) {
	console.log('checkSnChip');

	console.log($scope.sn);
	console.log($scope.selectedName);

	isHexString($scope.sn);

	$scope.incomplete = false;
	if($scope.sn.length != 18){
		$scope.incomplete = true;
	}
	if(!isHexString($scope.sn)){
			$scope.incomplete = true;
	}

};
$scope.checkMasterKey = function() {
	console.log('checkMasterKey');
	$scope.incomplete = false;
	if($scope.master_key.length != 64){
		$scope.incomplete = true;
	}
	if(!isHexString($scope.master_key)){
			$scope.incomplete = true;
	}

	//
	//
  // if ($scope.passw1 !== $scope.passw2) {
  //   $scope.error = true;
  //   } else {
  //   $scope.error = false;
  // }
  // $scope.incomplete = false;
  // if ($scope.edit && (!$scope.fName.length ||
  // !$scope.lName.length ||
  // !$scope.passw1.length || !$scope.passw2.length)) {
  //    $scope.incomplete = true;
  // }
};

$scope.$watch('master_key',function() {$scope.checkMasterKey();});
$scope.$watch('sn',function() {$scope.checkSnChip();});
// $scope.$watch('fName', function() {$scope.test();});
// $scope.$watch('lName', function() {$scope.test();});


console.log(window.location.host);
//$http.get("http://"+window.location.host+"/giant_auth/admin?cmd=LIST_MASTERKEY")


	console.log($scope.chips);
  // key is the key
  // value is the value



});

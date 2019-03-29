
function showHideForm($scope,showCompanyList=false,showCompanyForm=false,showUrlForm=false){
	console.log(
		'showHideForm'
	);
	console.log(
		showCompanyList,
		showCompanyForm,
		showUrlForm
	);
	$scope.showCompanyList = showCompanyList;
	$scope.showCompanyForm = showCompanyForm;
	$scope.showUrlForm = showUrlForm;

	console.log(
		$scope.showCompanyList,
		$scope.showCompanyForm,
	);
	$scope.showUrlForm


}



function mainController($scope, $window,$http) {
 console.log('myApp');
showHideForm($scope,showCompanyList = true);
init_body($scope);
init_event($scope);
$scope.page_navigation ='page_navigation.html';
$scope.warning = '';
$scope.indent_types = ['android','ios'];
$scope.list_comp_names = ['ogi_uid','org_code','ftk_uid','org_name','description','url','url_img']
$scope.cookie_name = 'compnay_page';
$scope.showAuth = false;
$scope.showReg = false;
$scope.showSetFigure = true;
console.log(document.cookie);
console.log(window.page);
$scope.bodyInit= function() {
	console.log('bodyInit');
	$scope.page = getCookie($scope.cookie_name);
	var response = get_list_from_server($http,{cmd : 'LIST_DATA',params : {type:'all',table_name:'view_organization_info'}	} ,function(response) {

		$scope.list_company =response.data.list_params;
		$scope.map_company =make_map_from_list($scope.list_company,'org_code');



	},fail_process);
	angular.element(".input_readonly").attr('readonly');






}
$scope.toggle= function(form_name) {
	init_event($scope);
	$scope[form_name] ^= true;


}
$scope.generate= function() {
	init_event($scope);
	console.log('generate');
	$scope.puf=	 generateHexRandom(32);
	// do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'GENERATE_FEATURE',params : {}	} ,function(response) {
	// 	console.log(response.data);
	// 	$scope.puf=	response.data.params.puf;
	// 	//$scope.factory_key_rtl=	response.data.params.factory_key_rtl;
	//
	//
	//
	//
	//
	// },fail_process);

}

$scope.set_feature= function() {



	init_event($scope);
	$scope.sn=	"";
	$scope.ascii_sn=	"";
	console.log('set_feature');
	if($scope.selectedName == null){
		alert("기관이 선택되어야 합니다. ")
		return;
	}
	org_code = $scope.selectedName.org_code;

	console.log('map_company',$scope.map_company,$scope.map_company[org_code]);

	ndef_option = $scope.map_company[org_code].ndef_option;
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'SET_FEATURE',params : {
		puf:$scope.puf,
		factory_key_rtl:$scope.factory_key_rtl,
	ndef_option:ndef_option}	} ,
	function(response) {
		console.log(response.data);
		$scope.factory_key_rtl=	"";
		$scope.sn=	response.data.params.sn;
		$scope.ascii_sn=	response.data.params.ascii_sn;
		$scope.showReg = true;
		$scope.showSetFigure = false;
		//alert("성공");


	},fail_process);

}

$scope.get_sn= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'GET_SN',params : {}	} ,function(response) {
		console.log(response.data);
		$scope.sn=	response.data.params.sn;
		$scope.ascii_sn=	response.data.params.ascii_sn;

		$scope.showReg = true;
		$scope.showSetFigure = false;
		//alert("성공");





	},fail_process);

}


$scope.get_factory_key_id= function() {
	init_event($scope);
	console.log('get_factory_key_id');
	console.log($scope.selectedName);
	if($scope.selectedName == null){
		alert("기관이 선택되어야 합니다. ")
		return;
	}

	do_from_server($http,'/giant_se/reg.do',{cmd : 'FACTORY_KEY_ID',params : {sn:$scope.sn,org_code:$scope.selectedName.org_code}	} ,function(response) {
		console.log(response.data);
		$scope.factory_key_id = response.data.params.factory_key_id;
		$scope.input_auth = response.data.params.input_auth;
		$scope.ogi_uid= response.data.params.ogi_uid;
		//alert("성공");

	},fail_process);

}

$scope.get_reg_key= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'GET_AUTH_KEY',params : {factory_key_id:$scope.factory_key_id}	} ,function(response) {
		$scope.nonce = response.data.params.nonce;
		$scope.cipher = response.data.params.cipher;
		$scope.mac = response.data.params.mac;
		//alert("성공");

		console.log(response.data);
	},fail_process);


}
$scope.get_calc_mac= function() {
	init_event($scope);

	do_from_server($http,'/giant_se/reg.do',{cmd : 'REGISTER',params : {ogi_uid:$scope.ogi_uid,
		sn:$scope.sn,
		nonce:$scope.nonce,cipher:$scope.cipher,mac:$scope.mac}	} ,function(response) {

		console.log(response.data);
		$scope.calc_mac = response.data.params.calc_mac;
		$scope.result = response.data.result;
		$scope.error = response.data.error;

		$scope.showAuth = true;
		//alert("성공");

	},fail_process);

}
$scope.get_random_values= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/auth.do',{cmd : 'RANDOM_VALUES',params : {}	} ,function(response) {
		console.log(response.data);
		$scope.random = response.data.params.random_server;
		//alert("성공");
	},fail_process);

}
$scope.auth_status = 'init';

$scope.get_authentication= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'AUTHENTICATION',params : {random:$scope.random}	} ,function(response) {
		console.log(response.data);
		$scope.chip_auth = response.data.params;
		$scope.auth_status = "CHIP_AUTH";

		//alert("성공");
	},fail_process);


}
$scope.req_athentication= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/auth.do',{cmd : 'AUTHENTICATION',params :
	{
		sn:$scope.chip_auth.sn,
		random:$scope.chip_auth.random,
		auth_code:$scope.chip_auth.auth_code}
	} ,function(response) {
		console.log(response.data);
		$scope.auth_result = response.data.params
		//alert("성공");
		$scope.auth_status = "SERVER_AUTH";

	},fail_process);

}
var interval;
var st_time =0;
var max_time =5000;
status_check_function =  function() {
	cur_time =get_curtime();
	console.log("status_check_function",$scope.auth_status,cur_time -st_time ,max_time);

	if(cur_time -st_time  > max_time) {
		clearInterval(interval);
		return;
	}
	count ++;

		switch ($scope.auth_status) {
			case "INIT":
				$scope.get_authentication();
				$scope.auth_status = "on_process";
				break;
			case "CHIP_AUTH":
				$scope.req_athentication();
				$scope.auth_status = "on_process";
				break;
			case "FAIL":
			clearInterval(interval);
				return
			case "SERVER_AUTH":
				clearInterval(interval);
				return
				break;
			default:

		}




}
$scope.auto_auth= function() {
	init_event($scope);
	console.log("get_curtime()",get_curtime());
	st_time =get_curtime();
	$scope.auth_status = 'INIT';
	count =0;
	interval = setInterval(status_check_function,10);

}
$scope.sample= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'GET_SN',params : {}	} ,function(response) {
		console.log(response.data);
	},fail_process);

}
$scope.sample= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'GET_SN',params : {}	} ,function(response) {
		console.log(response.data);
	},fail_process);

}

$scope.sample= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'GET_SN',params : {}	} ,function(response) {
		console.log(response.data);
	},fail_process);

}


$scope.sample= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'GET_SN',params : {}	} ,function(response) {
		console.log(response.data);
		$scope.sn=	response.data.params.sn;
		$scope.ascii_sn=	response.data.params.ascii_sn;






	},fail_process);

}
function get_curtime(){
	var d = new Date();
	return d.getTime();
}
function scrollTo(id) {
	console.log('scrollTo');
	console.log(document.location.hash);
		 document.location.hash =id;
		 //$anchorScroll();
	}
function fail_process(response){
	console.log('fail_process');
	$scope.warning = response.data.error;
	$scope.auth_status = 'FAIL';
	//console.log($('#warning_id'));
	//document.location.href = '#warning_id';
	//sample();
	alert("실패:\n"+response.data.error);
	scrollTo('warning_id');
}




};

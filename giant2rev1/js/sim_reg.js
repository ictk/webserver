
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
	var response = get_list_from_server($http,{cmd : 'LIST_DATA',params : {type:'all',table_name:'organization_info'}	} ,function(response) {

		$scope.list_company =response.data.list_params;



	},fail_process);




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
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'SET_FEATURE',params : {puf:$scope.puf,factory_key_rtl:$scope.factory_key_rtl}	} ,
	function(response) {
		console.log(response.data);
		$scope.factory_key_rtl=	"";
		$scope.sn=	response.data.params.sn;
		$scope.ascii_sn=	response.data.params.ascii_sn;
		$scope.showReg = true;
		$scope.showSetFigure = false;
		alert("성공");


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
		alert("성공");





	},fail_process);

}


$scope.get_factory_key_id= function() {
	init_event($scope);
	console.log('get_factory_key_id');
	console.log($scope.selectedName);
	if($scope.selectedName == null){
		return;
	}
	do_from_server($http,'/giant_se/reg.do',{cmd : 'FACTORY_KEY_ID',params : {sn:$scope.sn,org_code:$scope.selectedName.org_code}	} ,function(response) {
		console.log(response.data);
		$scope.factory_key_id = response.data.params.factory_key_id;
		$scope.atd_uid= response.data.params.atd_uid;
		alert("성공");

	},fail_process);

}

$scope.get_reg_key= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'GET_REG_KEY',params : {factory_key_id:$scope.factory_key_id}	} ,function(response) {
		$scope.nonce = response.data.params.nonce;
		$scope.cipher = response.data.params.cipher;
		$scope.mac = response.data.params.mac;
		alert("성공");

		console.log(response.data);
	},fail_process);


}
$scope.get_calc_mac= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/reg.do',{cmd : 'REGISTER',params : {atd_uid:$scope.atd_uid,nonce:$scope.nonce,cipher:$scope.cipher,mac:$scope.mac}	} ,function(response) {
		console.log(response.data);
		$scope.calc_mac = response.data.params.calc_mac;
		$scope.result = response.data.result;
		$scope.error = response.data.error;

		$scope.showAuth = true;
		alert("성공");

	},fail_process);

}
$scope.get_random_values= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/auth.do',{cmd : 'RANDOM_VALUES',params : {sn:$scope.sn}	} ,function(response) {
		console.log(response.data);
		$scope.random = response.data.params.random;
		$scope.random_server = response.data.params.random_server;
		$scope.atd_uid = response.data.params.atd_uid;
		alert("성공");
	},fail_process);

}

$scope.get_authentication= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/sim_chip.do',{cmd : 'AUTHENTICATION',params : {random:$scope.random,random_server:$scope.random_server}	} ,function(response) {
		console.log(response.data);
		$scope.cipher_auth = response.data.params.cipher;
		$scope.mac_auth = response.data.params.mac;
		alert("성공");
	},fail_process);

}
$scope.req_athentication= function() {
	init_event($scope);
	do_from_server($http,'/giant_se/auth.do',{cmd : 'AUTHENTICATION',params : {atd_uid:$scope.atd_uid,cipher:$scope.cipher_auth,mac:$scope.mac_auth}	} ,function(response) {
		console.log(response.data);
		$scope.calc_mac_auth = response.data.params.calc_mac;
		$scope.result_auth = response.data.result;
		$scope.error_auth = response.data.error;
		alert("성공");


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
function scrollTo(id) {
	console.log('scrollTo');
	console.log(document.location.hash);
		 document.location.hash =id;
		 $anchorScroll();
	}
function fail_process(response){
	console.log('fail_process');
	$scope.warning = response.data.error;
	//console.log($('#warning_id'));
	//document.location.href = '#warning_id';
	//sample();
	alert("실패:\n"+response.data.error);
	scrollTo('warning_id');
}




};

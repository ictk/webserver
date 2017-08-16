
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
		$scope.showUrlForm
	);


}



function mainController($scope, $window,$http) {
 console.log('myApp');
showHideForm($scope,showCompanyList = true);
init_body($scope);
init_event($scope);

$scope.warning = '';
$scope.indent_types = ['android','ios'];
$scope.list_comp_names = ['ogi_uid','org_code','ftk_uid','org_name','description','url','url_img']


$scope.bodyInit= function() {


	var response = get_list_from_server($http,{cmd : 'LIST_COMAPANY_NO',params : {}	} ,function(response) {

		$scope.list_company =response.data.list_param;
		$scope.map_list_company = make_map_from_list($scope.list_company,'ogi_uid');

	},fail_process);



	var response = get_list_from_server($http,{cmd : 'LIST_FACTORY_KEY_ID',params : {}	} ,function(response) {

		$scope.list_factory_key =response.data.list_param;
		$scope.map_list_factory_key = make_map_from_list($scope.list_factory_key,'ftk_uid');
		console.log($scope.map_list_factory_key);


	},fail_process);


//
//
//   $http.post('/giant_se/admin.do', $.param({json:JSON.stringify( {cmd : 'LIST_COMAPANY_NO',params : {}	})} ) ,{ headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}})
// //$http.get("/giant_auth/admin?cmd=MODIFY_MASTERKEY_CHIP&sn="+$scope.sn+"&msk_uid="+msk_uid)
//   .then(function (response) {
//     console.log('get_company_list');
//     console.log(response.data);
//
// 		$scope.list_company =response.data.list_param;
// 		console.log('test',response.data.list_param);
// 		console.log('test',$scope.list_company);
//
// 		$scope.map_list_company = make_map_from_list($scope.list_company,'ogi_uid');
// 		console.log('test 1',$scope.map_list_company);
//
//   },function errorCallback(response) {
//     $scope.warning = response.status;
//   }
// );
//
// $http.post('/giant_se/admin.do', $.param({json:JSON.stringify( {cmd : 'LIST_FACTORY_KEY_ID',params : {}	})} ) ,{ headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}})
// //$http.get("/giant_auth/admin?cmd=MODIFY_MASTERKEY_CHIP&sn="+$scope.sn+"&msk_uid="+msk_uid)
// .then(function (response) {
// 	console.log('get_company_list');
// 	console.log(response.data);
//
// 	$scope.list_company =response.data.list_param;
// 	console.log('test',response.data.list_param);
// 	console.log('test',$scope.list_company);
//
// 	$scope.map_list_company = make_map_from_list($scope.list_company,'ogi_uid');
// 	console.log('test 1',$scope.map_list_company);
//
// },function errorCallback(response) {
// 	$scope.warning = response.status;
// }
// );
//
// $http.post('dbhandler.php', $.param({option:'get_factory_key_list'}) ,{ headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}})
// //$http.get("/giant_auth/admin?cmd=MODIFY_MASTERKEY_CHIP&sn="+$scope.sn+"&msk_uid="+msk_uid)
// .then(function (response) {
// 	console.log('get_contents');
// 	console.log(response.data);
// 	$.each(response.data.list_param, function( index, value ) {
// 		//$('#org_code_select').append(String.format("<li class='select_comp'><a href='#' id='{0}' class='org_code_option' >{1}</a></li>",value.org_code,value.name));
// 		console.log(value);
// 	});
// 	$scope.list_factory_key =response.data.list_contents;
//
// 	$scope.map_list_factory_key = make_map_from_list($scope.list_factory_key,'ftk_uid');
//
//
//
//
// },function errorCallback(response) {
// 	$scope.warning = response.status;
// }
// );




}
$scope.editable= function() {
	console.log('editable');
	console.log('editable',$scope.check_save);
	//$scope.edit = true;

}

$scope.editCompany= function(uid) {
	init_event($scope);
	showHideForm($scope,showCompanyList=false,showCompanyForm=true,showUrlForm=false);


$scope.warning = '';

console.log('editCompany',uid);
console.log($scope.map_list_company);
var company_info = $scope.map_list_company[uid];
console.log(company_info);
if(company_info == null){
	console.log('not define FUCK');
	company_info = {
		org_code:'',
		ftk_uid:'',
		org_name:'',
		factory_key_id:'',
		factory_key:'',
		description:'',
		url:'',
		url_img:'',
	}
	update_scope_company(company_info);
	$scope.form_type = 'new';
	$scope.check_save = true;

	$scope.list_urls=[
		{type:'android',indent:'',store:''},
		{type:'ios',indent:'',store:''},
	];


}else {
	$scope.check_save = false;
	$scope.form_type = 'update';
	get_list_from_server($http,{cmd : 'GET_COMPANY_INFO',params : {ogi_uid:uid}	} ,function(response) {
		console.log(response.data);
		update_scope_company(response.data.params);


	},fail_process);



}










}





$scope.editIndent= function(uid) {
	init_event($scope);
	$scope.ogi_uid = uid;
console.log('editIndent');
showHideForm($scope,showCompanyList=false,showCompanyForm=false,showUrlForm=true );
$scope.showUrlForm = true;
var company_info = $scope.map_list_company[uid];
console.log(company_info);
$scope.intent_title = company_info.org_name+"("+company_info.org_code+")";

get_list_from_server($http,{cmd : 'LIST_INTENT_URL',params : {ogi_uid:uid}	} ,function(response) {
	console.log(response.data);
	$scope.list_urls=response.data.list_param;
	$scope.hash_intent_input = get_hash_intent();
	// if(response.data.result != "OK"){
	// 	$scope.warning =  response.data.error;
	// }



},fail_process);

}

$scope.modifyCompany= function() {
	init_event($scope);
	console.log('modifyCompany');


	ftk_uid = $scope.selectedName.ftk_uid;
	$scope.ftk_uid =ftk_uid;


	hashname = get_Hash_name($scope.list_comp_names);

	if($scope.company_hashname == hashname){
		$scope.warning = "변경된 값이 없습니다.";
		return;
	}
	console.log($scope.company_hashname);


params ={
	ogi_uid:$scope.ogi_uid,
org_code:$scope.org_code,
ftk_uid:ftk_uid,
org_name:$scope.org_name,
description:$scope.description,
url:$scope.url,
url_img:$scope.url_img,


}
console.log(params);


	get_list_from_server($http,{cmd : 'UPDATE_COMAPANY',params :params	} ,function(response) {
		console.log(response.data);
		$scope.list_urls=response.data.list_param;
		if(response.data.result == "OK"){
			location.reload();
		}



	},fail_process);

}
$scope.modifyIntent= function() {
	init_event($scope);
	console.log('modifyIntent');

	hashname = get_hash_intent();


	console.log(hashname,$scope.hash_intent_input);

	if($scope.hash_intent_input == hashname){
		$scope.warning = "변경된 값이 없습니다.";
		return;
	}

ogi_uid = $scope.ogi_uid

	get_list_from_server($http,{cmd : 'UPDATE_INTENT_URL',params :{ogi_uid:ogi_uid},list_param: $scope.list_urls}	 ,function(response) {
		console.log(response.data);
		$scope.list_urls=response.data.list_param;
		if(response.data.result == "OK"){
			location.reload();
		}
		else {
			$scope.warning =  response.data.error;
		}



	},fail_process);
	//
	//
	// $.each($scope.list_urls, function(key,value) {
	// 	tmp_str += value.intent;
	// 	tmp_str += value.store;
	// });



}


$scope.update= function() {
console.log('update',$scope.selectedName);

}





$scope.toggle= function() {
	init_event($scope);
  console.log('toggle');
	showHideForm($scope,showCompanyList=true,showCompanyForm=false,showUrlForm=false );



}




function get_Hash_name(list_string){
	var tmp_str = '';
	$.each(list_string, function(key,value) {
		tmp_str += $scope[value];
	});
	console.log('tmp_str hash before:',tmp_str);
	return Sha256.hash(tmp_str);
}

function get_hash_intent(){
	tmp_str = '';
	console.log($scope.list_urls);
	$.each($scope.list_urls, function(key,value) {
		tmp_str += value.intent;
		tmp_str += value.store;
	});
	console.log('get_hash_intent',tmp_str);
	return Sha256.hash(tmp_str);

}
function update_scope_company(company_info){
	console.log(
		'update_scope_company',company_info
	);

	$scope.ogi_uid = company_info.ogi_uid;
	$scope.org_code = company_info.org_code;
	$scope.ftk_uid = company_info.ftk_uid;
	$scope.org_name = company_info.org_name;

	console.log($scope.map_list_factory_key);
	console.log(company_info.ftk_uid);

	console.log($scope.selectedName);

	$scope.selectedName = $scope.map_list_factory_key[company_info.ftk_uid];
	console.log($scope.selectedName);


	$scope.description = company_info.description;
	$scope.url = company_info.url;
	$scope.url_img = company_info.url_img;
	console.log(
		'test 2',
		$scope.showCompanyForm
	);
	console.log('$scope.list_comp_names',$scope.list_comp_names);

	$scope.company_hashname = get_Hash_name($scope.list_comp_names);
	console.log($scope.company_hashname);


	//$scope.total_input = $scope.ogi_uid




}

function fail_process(response){
	$scope.warning = response.data.error;
}




};

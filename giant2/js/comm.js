function sleep(num) { //[1/1000초]
  var now = new Date();
  var stop = now.getTime() + num;
  while (true) {
    now = new Date();
    if (now.getTime() > stop) return;
  }
}

function errorCallback(response) {
  console.log('errorCallback');
  //$scope.warning = response.status;
}
function do_from_server($http,address, param, do_process, fail_process = function(response) {}, erro_process = errorCallback) {

  jQuery.ajaxSetup({
    async: false
  });
  console.log('get_list_from_server', JSON.stringify(param));
  iscomplete = false;
  var ret = {};

  $http.post(address, $.param({
      json: JSON.stringify(param)
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    })
    //$http.get("/giant_auth/admin?cmd=MODIFY_MASTERKEY_CHIP&sn="+$scope.sn+"&msk_uid="+msk_uid)
    .then(function(response) {
      console.log('response');
      console.log(response.data);
      if (response.data.result == 'OK') {
        ret = do_process(response);
      } else {

        fail_process(response);
      }

    }, erro_process);
  console.log(iscomplete);


  //console.log(ticks);


  return ret;


}
function get_list_from_server($http, param, do_process, fail_process = function(response) {}, erro_process = errorCallback) {

  return do_from_server($http,'/giant_se/admin.do', param, do_process,fail_process,erro_process);

  //return ret;


}

function get_list_data($scope,$http,table_name,type,uid_name,process){
  console.log('get_list_data');
  function fail_process(response){
  	$scope.warning = response.data.error;
  }


  var response = get_list_from_server($http,{cmd : 'LIST_DATA',params : {page:$scope.page,type:type,table_name:table_name}	} ,function(response) {



    $scope.list_data =response.data.list_params;
    $scope.map_list_data = make_map_from_list($scope.list_data,uid_name);

    $scope.max_page = response.data.params.max_page;
    $scope.page = response.data.params.page;
    $scope.page_info = $scope.max_page+"페이지 중 "+$scope.page;

    process();
    console.log($scope.page_info);
    console.log('max_page',$scope.max_page);


  },fail_process);
  return response;

}


function init_body($scope) {
	$scope.map_link={
		company:{name:'업체관리',link:'company.html'},
		factory_key:{name:'팩토리키관리',link:'factory_key.html'},
    chip:{name:'칩관리',link:'chip.html'},
		main:{name:'MAIN',link:'/'},

	}
	$scope.gourl = function(key){
		console.log('gourl',key,$scope.map_link[key]);
		window.location.href = $scope.map_link[key].link;
	}

}
function init_event($scope) {
  $scope.warning = '';
	$scope.msg = '';

}


function cal_hash(str) {
  if (str == '') {
    return '';
  }
  return Sha256.hash(str);
}


function setCookie(cname, cvalue, exdays) {

  var d = new Date();

  d.setDate(d.getDate() + exdays); //1일 뒤 이 시간

  var expires = "expires=" + d.toGMTString();

  document.cookie = cname + "=" + cvalue + "; " + expires;

}

// 쿠키명 (cname), 쿠키 값(cvalue), 쿠키 만료 날짜(exdays)





function getCookie(cname) {

  var name = cname + "=";

  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {

    var c = ca[i];

    while (c.charAt(0) == ' ') c = c.substring(1);

    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);

  }

  return "";

}

function page_refreash($scope,dstpage,cookie_name){



	//dstpage = Number($scope.page) + Number(direct_page);
  console.log('curpage',$scope.page);
	if(Number(dstpage) <1){
		dstpage =1;
	}

  console.log('dstpage',dstpage);

	if(Number(dstpage) > Number($scope.max_page)){
		dstpage = $scope.max_page;
	}
	if(Number(dstpage) == Number($scope.page)){
		return;
	}

	setCookie(cookie_name,dstpage)
  location.reload();

}

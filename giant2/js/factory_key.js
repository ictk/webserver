function mainController($scope, $window, $http) {
  console.log('myApp');
  $scope.showCompanyDiv = true;
  $scope.showFactoryKeyDiv = true;
  $scope.showCompanyForm = false;
  $scope.showFactoryKeyForm = false;
  $scope.warning = '';
  $scope.isNewFactoryKey = false;
  init_body($scope);
  init_event($scope);

  $scope.bodyInit = function() {

    $scope.page = getCookie('factory_key_page')


    get_list_data($scope,$http,'factory_key','','ftk_uid',function() {
        $scope.list_factory_key = $scope.list_data;
        $scope.map_list_factory_key ;

    });



    //
    //
    // var response = get_list_from_server($http, {
    //   cmd: 'LIST_DATA',
    //   params: {type:'all',table_name:'factory_key'}
    // }, function(response) {
    //
    //   $scope.list_factory_key = response.data.list_params;
    //   $scope.map_list_factory_key = make_map_from_list($scope.list_factory_key, 'ftk_uid');
    //   console.log($scope.map_list_factory_key);
    //
    //   $scope.max_page = response.data.params.max_page
    //   $scope.page = response.data.params.page
    //   $scope.page_info = $scope.max_page+"페이지 중 "+$scope.page;
    //
    //
    //
    // },fail_process);
    //





  }

  $scope.editFactoryKey = function(uid) {
    init_event($scope);
    console.log('editFactoryKey');

    factory_key_rtl = getCookie('factory_key_rtl');
    console.log('factory_key_rtl',factory_key_rtl);
    $scope.isNewFactoryKey = (uid == '');
    if (uid != '') {
      var curfactoryKey = $scope.map_list_factory_key[uid];

      $scope.factory_key = JSON.parse(JSON.stringify(curfactoryKey));
      $scope.factory_key.factory_key = '';
      // $scope.factory_key = $scope.map_list_factory_key[uid];
    } else {


      $scope.factory_key = {
        ftk_uid: '',
        factory_key_id: '',
        factory_key: '',

      };

    }
    //$scope.factory_key.factory_key_rtl = getCookie('factory_key_rtl');

    $scope.hash_value = cal_hash($scope.factory_key.factory_key_id + $scope.factory_key.factory_key_rtl);
    console.log($scope.hash_value);
    $scope.showFactoryKeyForm = true;

  }
  $scope.deleteFactoryKey = function(uid) {
    init_event($scope);
    console.log('deleteFactoryKey');

    if(!confirm("정말로 삭제 하시겠습니까?")){
      $scope.warning = 'no confirm';
      return;
    }

    var response = get_list_from_server($http, {
      cmd: 'DELETE_DATA',
      params: {
        ftk_uid:uid,
        table_name:'factory_key'
      }
    }, function(response) {

      location.reload();


    },fail_process);
  }

  $scope.generate_factory_key_id = function() {
    console.log('generate_factory_key_id');
    init_event($scope);
    if ($scope.factory_key.ftk_uid != '') {
      return;
    }
    $scope.factory_key.factory_key_id = generateHexRandom(2);


  }
  $scope.modify = function() {
    init_event($scope);
    console.log('modify', $scope.factory_key.factory_key_rtl);

    hashvalue = cal_hash($scope.factory_key.factory_key_id + $scope.factory_key.factory_key_rtl);
    console.log($scope.factory_key);

    //
    // if ($scope.hash_value == hashvalue) {
    //   $scope.warning = 'not change value';
    //
    //   return;
    // }
    // if (hashvalue == '') {
    //   $scope.warning = 'must be filled ';
    //
    //   return;
    // }


    if ($scope.factory_key.factory_key == "") {
      $scope.warning = 'factory_key_rtl is empty';

      return;
    }
    if(!confirm("정말로 수정하시겠습니까?")){
      $scope.warning = 'no confirm';
      return;
    }



    var response = get_list_from_server($http, {
      cmd: 'UPDATE_DATA',
      params: {
        ftk_uid:$scope.factory_key.ftk_uid,
        factory_key_id:$scope.factory_key.factory_key_id,
        factory_key:$scope.factory_key.factory_key,
        table_name:'factory_key'

      }
    }, function(response) {
      console.log('test','test2');
//      console.log('setCookie',$scope.factory_key.factory_key_rtl);
//      setCookie('factory_key_rtl',$scope.factory_key.factory_key_rtl,1);

//      console.log('getCookie',getCookie('factory_key_rtl'));


      //document.cookie="factory_key_rtl="$scope.factory_key.factory_key_rtl;

      location.reload();


    },fail_process);



  }

  $scope.check = function() {
    console.log('check');

    init_event($scope);


    hashvalue = cal_hash($scope.factory_key.factory_key_id + $scope.factory_key.factory_key_rtl);
    console.log($scope.factory_key);


    if (hashvalue == '') {
      $scope.warning = 'must be filled ';

      return;
    }


    if ($scope.factory_key.factory_key_rtl == "") {
      $scope.warning = 'factory_key_rtl is empty';

      return;
    }


    var response = get_list_from_server($http, {
      cmd: 'CHECK_FACTORY_KEY',
      params: {
        ftk_uid:$scope.factory_key.ftk_uid,
        factory_key_rtl:$scope.factory_key.factory_key_rtl

      }
    }, function(response) {

      $scope.msg ='KEY id and value is MATCH by RTL';


    },fail_process);




  }





  $scope.toggle = function(id) {
    console.log('toggle', id);


    switch (id) {
      case 'toggle_input':
        console.log('1');
        $scope.shwoContents = !$scope.shwoContents;

        break;
      case 'toggle_list':
        console.log('2');
        $scope.showlist = !$scope.showlist;
        break;
      case 'toggle_all':
        console.log('3');
        if ($scope.shwoContents || $scope.showlist) {
          $scope.shwoContents = false;
          $scope.showlist = false;

        } else {
          $scope.shwoContents = true;
          $scope.showlist = true;
        }

        break;
      default:

    }
  }



  $scope.move_page= function(dst_page) {
  	console.log('move_page');
  	page_refreash($scope,dst_page,'factory_key_page');

  }
  $scope.move_page_rel= function(direction) {
  	console.log('move_page_rel');
  	page_refreash($scope,Number($scope.page) + Number(direction),'factory_key_page');

  }

  function fail_process(response){
  	$scope.warning = response.data.error;
  }






};

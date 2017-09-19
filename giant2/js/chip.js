function showHideForm($scope, showCompanyList = false, showCompanyForm = false, showUrlForm = false) {
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
    $scope.page = getCookie($scope.cookie_name)
    setCookie('test1', '1');
    setCookie('test2', '2');
    console.log(document.cookie);
    console.log('compnay_page', $scope.page);
    console.log('test2', getCookie('test2'));

    get_list_data($scope, $http, 'athentication_data', '', 'atd_uid', function() {
      $scope.list_chip = $scope.list_data;
      $scope.map_list_chip = $scope.map_list_data;;
      console.log($scope.map_list_chip);

    });


  }
  $scope.editable = function() {
    console.log('editable');
    console.log('editable', $scope.check_save);
    //$scope.edit = true;

  }

  $scope.viewChip = function(uid) {
    init_event($scope);
    showHideForm($scope, showCompanyList = false, showCompanyForm = true, showUrlForm = false);



    $scope.warning = '';

    console.log('viewChip', uid);
    console.log($scope.map_list_chip);
    var chip_info = $scope.map_list_chip[uid];

		var response = get_list_from_server($http,{cmd : 'LIST_DATA',params : {type:'uid',table_name:'organization_info','ogi_uid':chip_info.ogi_uid}	} ,function(response) {


			console.log(response.data.list_params);
			$scope.company_code = response.data.list_params[0].org_code;


		},fail_process);


    console.log(chip_info);
		$scope.sn = chip_info.sn;
		$scope.auth_code = chip_info.auth_code;
		$scope.random = chip_info.random;
		$scope.reg_date = chip_info.reg_date;
		$scope.ogi_uid;






  }





  $scope.update = function() {
    console.log('update', $scope.selectedName);

  }

  $scope.move_page = function(dst_page) {
    console.log('move_page');
    page_refreash($scope, dst_page, 'compnay_page');

  }
  $scope.move_page_rel = function(direction) {
    console.log('move_page_rel');
    page_refreash($scope, Number($scope.page) + Number(direction), 'compnay_page');

  }

  $scope.toggle = function() {
    init_event($scope);
    console.log('toggle');
    showHideForm($scope, showCompanyList = true, showCompanyForm = false, showUrlForm = false);



  }




  function fail_process(response) {
    $scope.warning = response.data.error;
  }




};

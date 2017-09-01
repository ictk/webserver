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
  $scope.cookie_name = 'issue_info_page';

  console.log(document.cookie);
  console.log(window.page);
  $scope.bodyInit = function() {
    $scope.page = getCookie($scope.cookie_name)
    console.log('compnay_page', $scope.page);



    var response = get_list_from_server($http, {
      cmd: 'LIST_ISSUE_INFO',
      params: {
        page: $scope.page
      }
    }, function(response) {

      $scope.map_list_company = make_map_from_list($scope.list_company, 'isi_uid');
      $scope.list_issue_info = response.data.list_params;
      $scope.max_page = response.data.params.max_page
      $scope.page = response.data.params.page
      $scope.page_info = $scope.max_page + "페이지 중 " + $scope.page;
      console.log($scope.page_info);
      console.log('max_page', $scope.max_page);


    }, fail_process);

		//
		//
    // var response = get_list_from_server($http, {
    //   cmd: 'LIST_FACTORY_KEY_ID',
    //   params: {
    //     type: 'all'
    //   }
    // }, function(response) {
		//
    //   $scope.list_factory_key = response.data.list_params;
    //   $scope.map_list_factory_key = make_map_from_list($scope.list_factory_key, 'ftk_uid');
    //   console.log($scope.map_list_factory_key);
		//
		//
    // }, fail_process);
		//



  }
  $scope.editable = function() {
    console.log('editable');
    console.log('editable', $scope.check_save);
    //$scope.edit = true;

  }

  $scope.editCompany = function(uid) {
    init_event($scope);
    showHideForm($scope, showCompanyList = false, showCompanyForm = true, showUrlForm = false);


    $scope.warning = '';

    console.log('editCompany', uid);
    console.log($scope.map_list_company);
    var company_info = $scope.map_list_company[uid];
    console.log(company_info);
    if (company_info == null) {
      console.log('not define FUCK');
      company_info = {
        org_code: '',
        ftk_uid: '',
        org_name: '',
        factory_key_id: '',
        factory_key: '',
        description: '',
        url: '',
        url_img: '',
      }
      update_scope_company(company_info);
      $scope.form_type = 'new';
      $scope.check_save = true;

      $scope.list_urls = [{
          type: 'android',
          indent: '',
          store: ''
        },
        {
          type: 'ios',
          indent: '',
          store: ''
        },
      ];


    } else {
      $scope.check_save = false;
      $scope.form_type = 'update';
      get_list_from_server($http, {
        cmd: 'GET_COMPANY_INFO',
        params: {
          ogi_uid: uid
        }
      }, function(response) {
        console.log(response.data);
        update_scope_company(response.data.params);


      }, fail_process);



    }









  }





  $scope.modifyCompany = function() {
    init_event($scope);
    console.log('modifyCompany');


    ftk_uid = $scope.selectedName.ftk_uid;
    $scope.ftk_uid = ftk_uid;


    hashname = get_Hash_name($scope.list_comp_names);

    if ($scope.company_hashname == hashname) {
      $scope.warning = "변경된 값이 없습니다.";
      return;
    }
    console.log($scope.company_hashname);


    params = {
      ogi_uid: $scope.ogi_uid,
      org_code: $scope.org_code,
      ftk_uid: ftk_uid,
      org_name: $scope.org_name,
      description: $scope.description,
      url: $scope.url,
      url_img: $scope.url_img,


    }
    console.log(params);


    get_list_from_server($http, {
      cmd: 'UPDATE_COMAPANY',
      params: params
    }, function(response) {
      console.log(response.data);
      $scope.list_urls = response.data.list_params;
      if (response.data.result == "OK") {
        //location.reload();
        //page_refreash($scope,$scope.max_page,'compnay_page');
        setCookie($scope.cookie_name, $scope.max_page + 1);
        location.reload();
      }



    }, fail_process);

  }

  $scope.update = function() {
    console.log('update', $scope.selectedName);

  }

  $scope.move_page = function(dst_page) {
    console.log('move_page');
    page_refreash($scope, dst_page, $scope.cookie_name);

  }
  $scope.move_page_rel = function(direction) {
    console.log('move_page_rel');
    page_refreash($scope, Number($scope.page) + Number(direction), $scope.cookie_name);

  }

  $scope.toggle = function() {
    init_event($scope);
    console.log('toggle');
    showHideForm($scope, showCompanyList = true, showCompanyForm = false, showUrlForm = false);



  }




  function get_Hash_name(list_string) {
    var tmp_str = '';
    $.each(list_string, function(key, value) {
      tmp_str += $scope[value];
    });
    console.log('tmp_str hash before:', tmp_str);
    return Sha256.hash(tmp_str);
  }

  function get_hash_intent() {
    tmp_str = '';
    console.log($scope.list_urls);
    $.each($scope.list_urls, function(key, value) {
      tmp_str += value.intent;
      tmp_str += value.store;
    });
    console.log('get_hash_intent', tmp_str);
    return Sha256.hash(tmp_str);

  }

  function update_scope_company(company_info) {
    console.log(
      'update_scope_company', company_info
    );

    $scope.ogi_uid = company_info.ogi_uid;
    $scope.org_code = company_info.org_code;
    $scope.ftk_uid = company_info.ftk_uid;
    $scope.org_name = company_info.org_name;

    //console.log($scope.map_list_factory_key);
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
    console.log('$scope.list_comp_names', $scope.list_comp_names);

    $scope.company_hashname = get_Hash_name($scope.list_comp_names);
    console.log($scope.company_hashname);


    //$scope.total_input = $scope.ogi_uid




  }

  function fail_process(response) {
    $scope.warning = response.data.error;
  }




};

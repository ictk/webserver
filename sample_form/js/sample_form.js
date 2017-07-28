


function mainController($scope, $window,$http) {
 console.log('myApp');
 // console.log('chipInit',$window.list_contents);;
 // $scope.list_contents = $window.list_contents
 $scope.shwoContents = false;
 $scope.warning = "";
 $scope.msg = "";
 $scope.contents_title = "Insert New CONTENTS:";
$scope.check_save = false;
$scope.showlist = true ;
 console.log($scope.list_contents);
$scope.bodyInit= function() {


	$scope.map_list_contents = {
		'1':{
			'title':'title',
			'updt_date':'updt_date',
		}

	};





}


$scope.toggle= function(id) {
  console.log('toggle',id);


  switch(id) {
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
      if( $scope.shwoContents || $scope.showlist){
        $scope.shwoContents = false;
        $scope.showlist = false;

      }
      else{
        $scope.shwoContents = true;
        $scope.showlist = true;
      }

        break;
    default:

	}
}





};

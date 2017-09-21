

function UpdateToListContents($scope) {
$scope.list_contents = [];
  var idx = 0;
  $.each($scope.map_project, function(key,obj_project) {
    $scope.list_contents.push({id:idx++,project:key});
    $.each(obj_project, function(idx,value) {
      value.this_week;
      value.next_week;

      $scope.list_contents.push({id:idx++,project:'',this_week:value.this_week,next_week:value.next_week });
      console.log(value);
    });

  });





}
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
$scope.contents_rows = 10 ;
$scope.test_contents = '';
$scope.hashkey = '';
$scope.map_project = {
    "name1":[
      {
        this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},
        next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""},
      },

      {
        this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},
        next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""},
      },
      {this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},  next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
      {this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},  next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
    ],

    "name2":[
      {this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},  next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
      {this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},  next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
      {this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},  next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
      {this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},  next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
    ]

  };

$scope.list_contents = [

  // {id:0,project:"name1",row_span:"3",this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
  // {id:1,project:"",row_span:"3",this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
  // {id:2,project:"",row_span:"3",this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
  // {id:3,project:"name2",row_span:"2",this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
  // {id:4,project:"",row_span:"2",this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
  // {id:5,project:"name3",row_span:"2",this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},
  // {id:6,project:"",row_span:"2",this_week:{subtitle:"this_week_subtitle",detail:"detail",due:""},next_week:{subtitle:"next_week_subtitle",detail:"detail",due:""}},

];

$scope.selected ={};

$scope.friends = [
   {name:'John', age:25, gender:'boy'},
   {name:'Jessie', age:30, gender:'girl'},
   {name:'Johanna', age:28, gender:'girl'},
   {name:'Joy', age:15, gender:'girl'},
   {name:'Mary', age:28, gender:'girl'},
   {name:'Peter', age:95, gender:'boy'},
   {name:'Sebastian', age:50, gender:'boy'},
   {name:'Erika', age:27, gender:'girl'},
   {name:'Patrick', age:40, gender:'boy'},
   {name:'Samantha', age:60, gender:'girl'}
 ];
 console.log($scope.list_contents);

$scope.bodyInit= function() {

console.log("bodyInit",$scope.list_contents);

UpdateToListContents($scope);


}

$scope.ConvertContents= function(text) {
  return text;//text.replace("\n","<br>\n");





}

$scope.getTemplate = function (content) {
    if (content.project != '') return 'project';
    if (content.id === $scope.selected.id) return 'edit';
    return 'display';
};
$scope.editContent = function (content) {
    $scope.selected = angular.copy(content);
    console.log($scope.selected);
};

$scope.saveContent = function (idx) {
    console.log("Saving contact");
    console.log($scope.list_contents[idx]);
    $scope.list_contents[idx] = angular.copy($scope.selected);
    $scope.reset();

    console.log($scope.list_contents);

};

$scope.reset = function () {
    $scope.selected = {};
};
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

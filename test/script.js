angular.module('testApp',['ngClipboard'])
  .controller('testController',['$scope','ngClipboard',function($scope,ngClipboard){
    this.toClipboard = ngClipboard.toClipboard;

    $scope.sample= function(idx) {
      console.log('sample');
      base_url = 'g2aiha1z-a.com/'



      list_ascii_sn = [
        'ofenjicpmgcffjomfilglgegjggljcbn',
        'bmaefpdcmnganhakffjgehenchbpbmhl',
        'lflgfdakoeamfopfkpefpfphpmcdjbio',

      ];

      url = base_url+list_ascii_sn[idx];
      $scope.model=url;
      $scope.url="http://"+url;
      $scope.url_rel="/redirect.php?sn="+list_ascii_sn[idx];


      console.log(url);
      ngClipboard.toClipboard(url);


    }


  }]);

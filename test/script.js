angular.module('testApp',['ngClipboard'])
  .controller('testController',['$scope','ngClipboard',function($scope,ngClipboard){
    this.toClipboard = ngClipboard.toClipboard;

    $scope.sample= function(idx) {
      console.log('sample');
      base_url = 'g2aiha1z-a.com/'



      list_ascii_sn = [
        'ofenjicpmgcffjomfilglgegjggljcbn',
        'lflgfdakoeamfopfkpefpfphpmcdjbio',
        'bmaefpdcmnganhakffjgehenchbpbmhl'
      ];

      url = base_url+list_ascii_sn[idx]
      $scope.model=url;
      $scope.url="http://"+url;

      console.log(url);
      ngClipboard.toClipboard(url);


    }


  }]);

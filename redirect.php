<?php
$sn= $_REQUEST["sn"];

?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Bootstrap Example</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
  <script 		src="js/util.js" type="text/javascript"></script>
	<script type="text/javascript">

  $(function() {
    console.log('ready');
    var sn = '<?php echo $sn; ?>';
    var jscd =  get_naviinfo();

		ajax_templtate('giant_se/admin.do',
		function() {

			return   {cmd : 'GET_REDIRECT_INFO',params : {
				ascii_sn:sn,
        os:jscd.os
			}	}

		},
		function(data) {
			console.log("rcv:",data);

			$('#url_img').attr('src',data.params.url_img);
			//$('#goto_app').attr('href',data.params.intent);
			$('#description').text(data.params.description);

			window.intent = data.params.intent;
			window.store = data.params.store;




		});

		console.log(sn);

		$('#goto_app').click(function(){
			console.log('goto_app');
			alert(jscd.os +" " +window.intent);
			if(jscd.os == 'iOS'){
				var clickedAt = +new Date;

						naverAppCheckTimer = setTimeout(function() {
								if (+new Date - clickedAt < 2000){
										if (window.confirm("앱 최신 버전이 설치되어 있지 않습니다.   \n설치페이지로 이동하시겠습니까?"))
										{ location.href = window.store; }
								}
						}, 1500);
						//window.location.href = window.intent;
			}
			else {
					window.location.href = window.intent;
			}

		})





  });
  </script>
<div class="">
<img src="/img/ictk_logo.jpg" id = 'url_img' class="img-rounded" alt="Cinque Terre" >
</div>
<div class="well">
        <p id ='description' >NO COMPANY</p>
        <h2><a id ='goto_app' href="#">앱으로 이동</a></h2>
</div>


</body>

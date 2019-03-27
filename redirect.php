<?php
$sn= $_REQUEST["sn"];
$random= $_REQUEST["random"];
$auth_code= $_REQUEST["auth_code"];

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

</head>

<body>
  <script src="js/util.js" type="text/javascript"></script>
  <script type="text/javascript">
    $(function() {
      console.log('ready');

      var sn = '<?php echo $sn; ?>';
      var random = '<?php echo $random; ?>';
      var auth_code = '<?php echo $auth_code; ?>';

      var jscd = get_naviinfo();

      ajax_templtate('giant_se/auth.do',
        function() {

          return {
            cmd: 'AUTHENTICATION',
            params: {
              mode: 'ascii',
              sn: sn,
              random: random,
              auth_code: auth_code,
              os: jscd.os

            }
          }

        },
        function(data) {
          console.log("rcv:", data);


          $('#url_img').attr('src', data.params.url_img);
          $('#goto_app').attr('href',data.params.intent);
          $('#description').text(data.params.description);
					$('#org_name').text(data.params.org_name);


          window.intent = data.params.intent;
          window.store = data.params.store;
          console.log(window.intent);
          // if(window.intent != ''){
          // 	window.location.href = window.intent;
          // 	// console.log('goto_app');
          // 	// alert(jscd.os +" " +window.intent);
          // 	//
          // 	// window.location.href = window.intent;
          //
          // }




        });

      console.log(sn);

      //window.location.href = window.intent;

      $('#goto_app').click(function() {
        console.log('goto_app');
        //alert(jscd.os +" " +window.intent);
        if (jscd.os == 'iOS') {
          var clickedAt = +new Date;

          naverAppCheckTimer = setTimeout(function() {
            if (+new Date - clickedAt < 2000) {
              if (window.confirm("앱 최신 버전이 설치되어 있지 않습니다.   \n설치페이지로 이동하시겠습니까?")) {
                location.href = window.store;
              }
            }
          }, 1500);
          //window.location.href = window.intent;
        } else {
          window.location.href = window.intent;
        }

      })





    });
  </script>
  <div class="container">

  </div>
<!--
	<div class="w3-container w3-gray w3-center">
	  <h1 id="org_name">Header</h1>

	</div>

<div class="w3-container w3-center">

	<p id='description'>The w3-container class can be used to display headers.</p>
	<div class="">
		<img src="" id='url_img' alt="Chania">
	</div>
	<hr>

</div> -->
<div class="w3-row w3-border">
	<div class="w3-center">
		  <img class="w3-image" id='url_img' src="img_fjords.jpg" alt="Norway" >
	</div>
  <br/>
<div class="w3-center">
  <h2 id="org_name">Responsive Images</h2>
  <p  id='description'>The w3-image class makes the image scale down if it has to, but never scale up to be larger than its original size (<strong>resize the browser window to see the effect</strong>):</p>

</div>

</div>
<!--
<div class="w3-row w3-border">
	<div class="w3-container w3-half">
	  <img src="" id='url_img' alt="Chania">
	</div>
<div class="w3-container w3-half w3-gray">
  <h2 id="org_name">w3-half</h2>
  <p id='description'>The w3-half class uses 50% of the parent container.</p>
	<p></p>
	<p></p>

</div> -->

<hr>
<div class=" w3-center">
  <!-- <p>'<?php echo $sn; ?>';</p>
  <p>'<?php echo $random; ?>';</p>
  <p>'<?php echo $auth_code; ?>';</p> -->

<button class="w3-btn w3-green w3-center"  id='goto_hompage'>앱으로 이동</button>
</div>

</div>

</body>

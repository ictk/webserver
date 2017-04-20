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

	<!-- jQuery (부트스트랩의 자바스크립트 플러그인을 위해 필요합니다) -->
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<!-- 모든 컴파일된 플러그인을 포함합니다 (아래), 원하지 않는다면 필요한 각각의 파일을 포함하세요 -->
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<script type="text/javascript">

  $(function() {
    console.log('ready');
    var sn = '<?php echo $sn; ?>';
    console.log(sn);
    var jsoncontents = {
      cmd:"GET_REDIRECT_INFO",
      params : {
        ascii_sn:sn,
      }
    }
    $.ajax({
      type : 'post',
      dataType : 'json',
      url : "giant_se/admin.do",

      data : {json:JSON.stringify(jsoncontents)} ,

      success :
        function(data) {
        console.log("rcv:",data);

        //succes_function(data);

      },
      error : function(request, status, error) {
        console.log('code: ' + request.status + "\n"
            + 'message: ' + request.responseText
            + "\n" + 'error: ' + error);
      }
    });



  });
  </script>
<div class="">
<img src="img/잘가요미안해요.jpg" class="img-rounded" alt="Cinque Terre" width="304" height="236">
</div>
<div class="well">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur.</p>
        <h2><a href="#">앱으로 이동</a></h2>
</div>


</body>

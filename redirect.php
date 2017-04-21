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
    <script 		src="js/util.js" type="text/javascript"></script>
	<script type="text/javascript">

  $(function() {
    console.log('ready');
    var sn = '<?php echo $sn; ?>';
    var jscd =  get_naviinfo();
    console.log(sn);
    var jsoncontents = {
      cmd:"GET_REDIRECT_INFO",
      params : {
        ascii_sn:sn,
        os:jscd.os
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
				alert(jscd.os +" " +data.params.url);
        $('#url_img').attr('src',data.params.url_img);
        $('#goto_app').attr('href',data.params.url);
        $('#description').text(data.params.description);

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
<img src="img/잘가요미안해요.jpg" id = 'url_img' class="img-rounded" alt="Cinque Terre" width="304" height="236">
</div>
<div class="well">
        <p id ='description' >NO COMPANY</p>
        <h2><a id ='goto_app' href="#">앱으로 이동</a></h2>
</div>


</body>

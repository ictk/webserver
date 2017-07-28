<?php

include("library.php");  // library.php 파일 포함
defMeta();

$option = getsaftyReq('option');
echo 'LOGIN';

if($option == "confirm"){
	confirm();
	exit();
}
else if($option == "logout"){\
	logout();
	exit();
}

loginform('TRUE');

?>



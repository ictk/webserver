<?php

//$_ENV_G = array();



function loadEnv(){
	#$fb = open("../config.json","r");
	//print "env is: ".getenv('LOGIN_DEBUG')."\n";
	//phpinfo(INFO_ENVIRONMENT);
	return;

	print getenv('MY_PROJECT_PATH') . "\n" .
			getenv('MY_PROJECT_ENV') . "\n" .
			getenv('MY_PROJECT_MAIL') . "\n";

	$filename = "../config.json";
	$myfile = fopen($filename, "r") or die("Unable to open file!");
	echo fread($myfile,filesize($filename));
	fclose($myfile);
	$_ENV_G["test"] = "fasfsadfsdfadsf";
}



function makeSingleCommaArrayFrom($uidarray){
	$scommaarrayform = '';
	$i = 0;
	foreach ($uidarray as $v){
		if($v == '') continue;
		if($i > 0) $scommaarrayform .= ",";
		$scommaarrayform .= "'$v'";
		$i++;
	}
	return $scommaarrayform;
}


function pagego($url){

	//header("Location: /$url");
	echo "<meta http-equiv='refresh' content='0;url=$url'>";
	echo "\n";
}
function getcurpage(){
	return $_SERVER['REQUEST_URI'];
}
function getbaseurl(){


	return 'http://' . $_SERVER['SERVER_NAME'];
}
function appendLn($str){
	echo $str;
	echo "\n";
}
function appendLnBr($str){
	echo $str;
	pnl();
}

function appendWithTag($tag,$str){
	echo "<$tag>$str</$tag>";
	echo "\n";
}
function pnl(){
	echo "<br />\n";
}


function defMeta(){
	echo '<!DOCTYPE html>';
	echo "\n";
	echo '<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">';
	echo "\n";
	echo '<meta charset="utf-8" />';
	echo "\n";
	echo '<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, height=device-height">';
	echo "\n";

	echo '<head>';
	echo "\n";
	echo '<link rel="stylesheet" type="text/css" href="../comm/css/style.css">';
	echo "\n";
	echo '</head>';
	echo "\n";

}

function MakeLink($linkarray){
	echo "\n";
	echo "<ul>";
	echo "\n";
	foreach ($linkarray as $k => $v ){
		echo "<li class='st'><a href='$v'>$k</a></li>";
	}
	echo "\n";
	echo "</ul>";
	echo "\n";

}
function sampleTable(){
	echo "\n";
	echo "<table border>";
	echo "\n";
	// 머릿글 출력
	echo "<tr>";
	echo "\n";







	echo "<th>";
	echo '1';
	echo "</th>";

	echo "<th>";
	echo '2';
	echo "</th>";



	//echo "<td>수정</td>";
	echo "</tr>";
	echo "\n";


	echo "<tr>";
	echo "<td>aa</td>";
	echo "<td>aa2</td>";
	echo "</tr>";




	// 테이블 끝
	echo "</table>";
	echo "\n";


}
function alertBoxAndBack($msg){
	echo "<script>alert('$msg');history.back();</script>";
	echo "\n";
}
function getsaftyReq($key){
	if(!isset($_REQUEST[$key])) {
		return "";
	}
	return $_REQUEST[$key];

}
function getsaftySession($key){
	if(!isset($_SESSION[$key])) {
		return "";
	}
	return $_SESSION[$key];

}
function base64_url_decode($input)
{
	return base64_decode(strtr($input, '-_,', '+/='));
}
?>

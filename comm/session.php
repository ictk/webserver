<?php
require_once 'commlib.php';
function startSession(){
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
}


function get_login_state($catagory){


	startSession();

	if(!isset($_SESSION['user_id']) || !isset($_SESSION['user_name'])) {
		return "NOT_LOGIN";
	}

	$regdate =getsaftySession('date');

	$date = date('Y-m-d.H:i:s');

	$tdifftime = strtotime(date('Y-m-d.H:i:s')) - strtotime($regdate);

	if($tdifftime >10*60){
		session_destroy();
		return "LOGIN_TIME_OUT";
	}


  return "OK";

}



function checkSessionCatagory($catagory){


	startSession();

	$login_status = get_login_state($catagory);

	switch ($login_status) {
		case 'NOT_LOGIN':
			pagego('login.php');
			exit;
		case 'LOGIN_TIME_OUT':
			pagego('login.php');
			exit;

		default:
			# code...
			break;
	}
	//
	//
	// if(!isset($_SESSION['user_id']) || !isset($_SESSION['user_name'])) {
	// 	pagego('login.php');
	// 	exit;
	// }

	$user_id = $_SESSION['user_id'];
	$user_name = $_SESSION['user_name'];

	//$regdate =getsaftySession('date');
// 	pnl();
// 	echo $user_id;
// 	pnl();

// 	echo $ret;
// 	pnl();
// 	echo $catagory;
// 	pnl();

	$ret = strpos($user_id, 'VISIT');
	$rettest = strpos($user_id, 'TESTER');
	if ((0 === $ret || 0 === $rettest) && $catagory =='PWD') {
//		echo 'test';
//		exit;
		pagego('login.php');
		logout();
		exit;
	}
	$regdate =getsaftySession('date');

	$date = date('Y-m-d.H:i:s');
	pnl();
	//echo date("Y-m-d H:i:s") . "<br />\n";
	echo"로그인 날짜 ".$regdate;
	pnl();


	$tdifftime = strtotime(date('Y-m-d.H:i:s')) - strtotime($regdate);
	echo "login time: ".$tdifftime." msec";
	pnl();
	if($tdifftime >10*60){
		pagego('login.php');
//		logout();
		exit;

	}


	pnl();



	echo "<p>안녕하세요. $user_name($user_id)님</p>";

}

function setSession($id,$name){

	startSession();

	$_SESSION['user_id'] = $id;
	$_SESSION['user_name'] = $name;
	$_SESSION['debug'] = 'FALSE';
	$_SESSION['date'] = date('Y-m-d.H:i:s');





}


function setHome($url){
	if (session_status() == PHP_SESSION_NONE) {
	    session_start();
	}
	if($url==''){
		$url = $_SERVER['REQUEST_URI'];
	}

	$_SESSION['homeurl'] = $url;

}
function commBackHome(){
	if (session_status() == PHP_SESSION_NONE) {
	    session_start();
	}


	$homeurl ='main.php';
	if(isset($_SESSION['homeurl']) ) {
		$homeurl =$_SESSION['homeurl'];

	}
	pagego($homeurl);

}
function vewSessionState(){
	return ;
	echo ("session state:");
	appendLnBr(session_status());
	echo( "PHP_SESSION_ACTIVE:");
	appendLnBr( PHP_SESSION_ACTIVE);
	echo( "PHP_SESSION_NONE:");
	appendLnBr( PHP_SESSION_NONE);
}
?>

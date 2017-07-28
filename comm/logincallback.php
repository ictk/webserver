<?php
$baseroot =$_SERVER['DOCUMENT_ROOT'];
$HTTP_HOST =$_SERVER['HTTP_HOST'];

require_once("$baseroot/comm/library.php");
require_once "$baseroot/vendor/autoload.php";


$listmpap = QueryString2Map("SELECT id,rn FROM user;");
$mapidRn = getMapFromResultDB('id','rn',$listmpap);

$state = getsaftyReq('state');
$code = getsaftyReq('code');
$precheck = getsaftyReq('precheck');

if(!session_id()) {
	session_start();
}
$fb = getFaceBook();


$helper = $fb->getRedirectLoginHelper();
try {
	$accessToken = $helper->getAccessToken();
	//$fb->setDefaultAccessToken($accessToken);
	$response = $fb->get('/me?fields=id,name,email',$accessToken);
	$userNode = $response->getGraphUser();

	//$helper->
	echo $accessToken;
	pnl();
	echo $userNode;
	pnl();
	$pw= $userNode["id"];
	$id = $userNode["email"];
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	// When Graph returns an error
	echo 'Graph returned an error: ' . $e->getMessage();
	exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
	// When validation fails or other local issues
	echo 'Facebook SDK returned an error: ' . $e->getMessage();
	exit;
}

if (isset($accessToken)) {
	// Logged in!
	$_SESSION['facebook_access_token'] = (string) $accessToken;



	$rn = $mapidRn[$id];

	echo $pw.$rn;
	pnl();
	echo $precheck;
	pnl();
	$ = strtoupper(('sha256', $pw.$rn));
	$pw = $.$precheck;
	//$2 = strtoupper(('sha256', $precheck));
	pagego("login.php?option=confirm&user_id=$id&user_pw=$pw&precheck=$precheck");

	// Now you can redirect to another page and use the
	// access token from $_SESSION['facebook_access_token']
}

<?php 
require 'SimpleImage.php';

$AllPlaceFile="data/place.json";


session_start(); 
if (!isset($_SESSION['manage'])) $_SESSION['manage']=false;
$type=isset($_GET["type"])?$_GET["type"]:null;
$data = json_decode(file_get_contents("php://input"));
$ans=null;

switch ($type) {
	// ------------ admin ------------
	case "login":
		$ans = login($data->pass);
        break;
	case "logout":
		$ans = logout();
        break;
	case "isLogin":
		$ans = isLogin();
        break;
	case "setInfo":
		$ans = setInfo($data->data);
        break;
	// ------------ admin & site -------------	
	case "getInfo":
		$ans = getInfo();
        break;	
	// ------------ site -------------
	case "uploadImage":
		$ans = array("path" => uploadImage($data->base64));
		break;
	case "getimageText":
		$ans = array("path" => makeImage($data->text));
		break;
	default:
       $ans= array("error" => "not valid type");
}

header('Content-Type: application/json');
echo json_encode($ans);

function login($pass){
	logout();
	//if (sha1($pass) =="f27c815a4a838899f650ac081e64261beada79cc")
	if ($pass =="T3eAmCJa")
		$_SESSION['manage']=true;
	return isLogin();
}

function logout(){
	$_SESSION['manage']=false;
	return isLogin();
}

function isLogin(){
	return $_SESSION['manage']?true:false;
}

function getInfo(){ 
	return json_decode(file_get_contents("info.json"), false);
}

function setInfo($data){
	$time=round(microtime(true) * 1000);
	file_put_contents("archive/info-".$time.".json", json_encode($data));
	$ans=file_put_contents("info.json", json_encode($data));
	return $ans>0;
}

function uploadImage($base64){
	$data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64));
	$time=round(microtime(true) * 1000);
	$fileName=($time%10000).rand().".png";
	file_put_contents('../upload_image/'.$fileName, $data);	
	return 'upload_image/'.$fileName;
}

function makeImage($text){
	try {
		$img = new abeautifulsite\SimpleImage("image/comedy2.jpg");
		$y=30;
		$maxCharInLine=85;
		foreach($text as $line){
			while(strlen($line)>0){
				$i=$maxCharInLine;
				if(strlen($line)>$maxCharInLine){
					$i=strrpos(substr($line,0,$maxCharInLine), ' ', -1)+1;
					if($i==false) $i=$maxCharInLine;
				}
				$str=substr($line,0,$i);
				if(preg_match("/\p{Hebrew}/u", $str))
					$str=utf8_strrev($str);
				$img->text($str, 'fonts/FbKanuba-Light.otf', 18, '#000000', 'top right',-30,$y);
				$line=substr($line,$i);
				$y+=28;
			}
			//$img->text($line, 'fonts/FbKanuba-Light.otf', 13, '#000000', 'top right',-30,$y);
			$y+=18;
		}

		$fileName=md5(json_encode($text)).".jpg";
		$img->save('../upload_image/'.$fileName);
		return 'upload_image/'.$fileName;
	} catch(Exception $e) {
		return null;
	}
}

function utf8_strrev($str){
	return iconv("ISO-8859-8", "UTF-8", hebrev(iconv("UTF-8", "ISO-8859-8", $str)));
	//return hebrev($str);
	//return iconv("UTF-16LE", "UTF-8", strrev(iconv("UTF-8", "UTF-16BE", $str)));
    //preg_match_all('/./us', $str, $ar);
    //return join('',array_reverse($ar[0]));
}

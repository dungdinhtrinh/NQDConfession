<?php
	function format_input_str($str){	
		$for_replace = array(
			"&acute;"	=>	"'",
			"&quot;"	=>	"\"",
			"'" => "\'",
			"&lt;"	=>	"&amp;lt;",
			"&gt;"	=>	"&amp;gt;",
			"<"	=>	"&lt;",
			">"	=>	">"
		);
		return strtr($str, $for_replace);
	}
	if(isset($_POST)){
		include './config/config.php';

        $confess = format_input_str($_POST['confess']);
        // $confess = $_POST['confess'];
        $captcha = $_POST['captcha'];
        $time = $_POST['time'];
       
		if(!isset($_POST['captcha']) || $_POST['captcha'] == ''){
			echo json_encode(array('code' => '0', 'mess' => 'Captcha error!'));
		}
		else if(!isset($_POST['confess']) || $_POST['confess'] == ''){
			echo json_encode(array('code' => '0', 'mess' => 'Confession error!'));
		}
		else{
			$nowdate = date('d/m/Y');
			 $sql = "INSERT INTO cfs (confess,time,date, captcha) VALUES (N'".$confess."', '".$time."', '".$nowdate."', '".$captcha."')";
			if (mysqli_query($conn, $sql)) {
			     echo json_encode(array('code' => '1', 'mess' => 'Done!'));
			}
			else {
			    echo json_encode(array('code' => '0', 'mess' => 'Into Sql Error!'));
			}
		}
	}
?>
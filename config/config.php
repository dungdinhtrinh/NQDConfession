<?php
	$server = '127.0.0.1';
	$userdb = 'markandr';
	$passdb = '';
	$namedb = 'test';
	$port   = '3306';

	$conn = mysqli_connect($server,$userdb,$passdb,$namedb) or die("error");

    mysqli_set_charset($conn, 'UTF8');
    date_default_timezone_set("Asian/Ho_Chi_Minh"); 
?>
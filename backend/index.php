<?php
// this will be your backend
// some things this file should do
// get query string 
// handle get requests
// open and read data.csv file
// handle post requests
// (optional) write to csv file. 
// format data into an array of objects 
// return all data for every request. 
// set content type of response.
// return JSON encoded data
header('Access-Control-Allow-Origin: *');
header("Content-Type:application/json");

function get_list() {
	$fname = 'data.csv';
    if (!($fp = fopen($fname, 'r'))) {
        die("Can't open file...");
    }
    $key = fgetcsv($fp,"1024",",");
    $json = array();
    while ($row = fgetcsv($fp,"1024",",")) {
        $json[] = array_combine($key, $row);
    }
    fclose($fp);
    echo json_encode($json);
    die();
}

function save(){
	if(isset($_POST)){
		$fname = 'data.csv';
	    if (!($fp = fopen($fname, 'a'))) {
	        die("Can't open file...");
	    }
		$newId = date('YmdHis');
	    $line = array($newId,$_POST['name'], $_POST['state'], $_POST['zip'], $_POST['amount'], $_POST['qty'], $_POST['item']);
	    // fputcsv($fp, ["\r\n"]);
	    fputcsv($fp, $line);
	    fclose($fp);
	    get_list();
	    die();
	}
    
}

function update(){
	if(isset($_POST)){
		$id = $_POST['id'];//$_GET['id'];
		if($id) {
			$fname = 'data.csv';
		    if (!($fp = fopen($fname, 'r'))) {
		        die("Can't open file...");
		    }
		    $key1 = fgetcsv($fp,"1024",",");
		    $json = array();
		    while ($row = fgetcsv($fp,"1024",",")) {
		        $json[] = array_combine($key1, $row);
		    }
		    fclose($fp);
		    $file_handle = fopen("data.csv", "w+");
		    fputcsv($file_handle, array('id','name','state','zip','amount','qty','item'));
		    foreach ($json as $key => $value) {
		    	$line_of_text = array($value['id'], $value['name'],$value['state'],$value['zip'],$value['amount'],$value['qty'],$value['item']);
		        if ($id != $line_of_text[0]) {
		            fputcsv($file_handle, $line_of_text);
		        } else {
		        	$line = array($id,$_POST['name'], $_POST['state'], $_POST['zip'], $_POST['amount'], $_POST['qty'], $_POST['item']);
		        	fputcsv($file_handle, $line);
		        }
		    }
		    fclose($file_handle);
		    get_list();
	    	die();
		}	
	}
}

function delete(){
	if(isset($_POST)){
		$id = $_POST['id'];//$_GET['id'];
		if($id) {
			$fname = 'data.csv';
		    if (!($fp = fopen($fname, 'r'))) {
		        die("Can't open file...");
		    }
		    $key1 = fgetcsv($fp,"1024",",");
		    $json = array();
		    while ($row = fgetcsv($fp,"1024",",")) {
		        $json[] = array_combine($key1, $row);
		    }
		    fclose($fp);
		    $file_handle = fopen("data.csv", "w+");
		    fputcsv($file_handle, array('id','name','state','zip','amount','qty','item'));
		    foreach ($json as $key => $value) {
		    	$line_of_text = array($value['id'], $value['name'],$value['state'],$value['zip'],$value['amount'],$value['qty'],$value['item']);
		        if ($id != $line_of_text[0]) {
		            fputcsv($file_handle, $line_of_text);
		        }
		    }
		    fclose($file_handle);
		    get_list();
	    	die();
		}	
	}
}

$url_parameter = explode("/", $_SERVER['REQUEST_URI']);
$param = end($url_parameter);
if($param == 'get_list'){
	get_list();
} else if($param == 'update'){
	update();
} else if($param == 'save'){
	save();
} else if($param == 'delete'){
	delete();
}


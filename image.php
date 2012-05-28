<?php 
$data = $_POST['data'];
$name = $_POST['name'];
$uri =  substr($data,strpos($data,",")+1);
file_put_contents($name.'.png', base64_decode($uri));
if(file_exists($name.'.png')){
  header('Content-type: image/png');
  header('Content-Disposition: attachment; filename="'.$name.'.png"');
  readfile($name.'.png');
} ?>
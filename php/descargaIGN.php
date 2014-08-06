<?php

$codigo = $_REQUEST['codigo'];
$faja = $_REQUEST['faja'];
$path = 'E:/DatosGis/imagenes/Cartas050IGM/';
$file = $path.$codigo.'.tif';
$file2 = $path.$codigo.'.tfw';
$man = 'E:/DatosGis/imagenes/manual.rar';

$zipname = 'c:/ms4w/tmp/descarga.zip';
if (file_exists($zipname)) {
unlink($zipname);
}

if (file_exists($file)) {

$zip = new ZipArchive;
$zip->open($zipname, ZipArchive::CREATE);
$zip->addFile($file,$codigo.'.tif');
$zip->addfile($man,'manual y herramientas.rar');
if (file_exists($file2)) { 
	$zip->addFile($file2,$codigo.'.tfw');
	if ($faja=='4'){
	$file3 = $path.'faja4/'.$codigo.'.tif';
	$file4 = $path.'faja4/'.$codigo.'.tfw';
	if (file_exists($file3)) { 
		$zip->addFile($file3,$codigo.'-faja4.tif');
		$zip->addFile($file4,$codigo.'-faja4.tfw');
		}
	}
	if ($faja=='6'){
	$file3 = $path.'faja6/'.$codigo.'.tif';
	$file4 = $path.'faja6/'.$codigo.'.tfw';
	if (file_exists($file3)) { 
		$zip->addFile($file3,$codigo.'-faja6.tif');
		$zip->addFile($file4,$codigo.'-faja6.tfw');
		}	
	}
}
$zip->close();

if (file_exists($zipname)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.$codigo.'.zip');
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($zipname));
    ob_clean();
    flush();
    readfile($zipname);
    exit;
}

} else{
Echo 'No se encuentra el archivo.';
}
?>
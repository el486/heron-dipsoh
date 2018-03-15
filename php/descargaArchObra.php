<?php

$codigo = $_REQUEST['codigo'];
$path = 'E:/DatosGis/documentos/'.$codigo.'-*.*';
$zipname = 'c:/ms4w/tmp/'.$codigo.'.zip';

if (file_exists($zipname)) {
unlink($zipname);
}

$zip = new ZipArchive;
$zip->open($zipname, ZipArchive::CREATE);
foreach (glob($path) as $filename)
{
	if (file_exists($filename)) {
    $zip->addFile($filename);
    echo 'ok';
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
}else{
	header("Content-type: text/plain");
    echo 'Error: No se encuentran archivos para el codigo de obra '.$codigo;
}
?>
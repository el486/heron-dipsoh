<?php
//$file = 'monkey.gif';
$codigo = $_REQUEST['codigo'];
$fajaOrig = $_REQUEST['fajaOrig'];
$path = 'E:/DatosGis/rar/';
if($fajaOrig=='NO'){
$file = $path.$codigo.'.rar';
}else{
$file = $path.$codigo.'-fajaOrig.rar';
}

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename($file));
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    ob_clean();
    flush();
    readfile($file);
    exit;
}else{
Echo 'No se encuentra el archivo.';
if($fajaOrig=='SI'){echo 'Intente la descarga en faja 5.';}
}
?>
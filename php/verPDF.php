<?php
//$file = 'monkey.gif';
$codigo = $_REQUEST['codigo'];
$path = 'E:/DatosGis/pdf/';
$file = $path.$codigo.'.pdf';

if (file_exists($file)) {
    header('Content-type: application/pdf');
    header('Content-Disposition: inline; filename='. basename($file));
    header('Content-Transfer-Encoding: binary');
    header('Content-Length: ' . filesize($file));
    header('Accept-Ranges: bytes');

    @readfile($file);
    exit;
}else{
Echo 'No se encuentra el archivo.';
}
?>


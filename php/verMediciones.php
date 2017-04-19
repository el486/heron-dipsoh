<?php
/* importa el archivo de configuracion */
require_once("include/config.php");

$link = pg_connect(PG_CONNECTION_STRING);

$cod = $_REQUEST['cod'];
$tipo= $_REQUEST['tipo'];

if ($tipo=='h'){
$sql = "select * from dipsoh.mediciones_historico_salado where codest=$cod";
$fecha='fechavar';
$valor='valorvar';
$descrip='descrivar';
}else if ($tipo=='1'){
$sql = "select * from dipsoh.mediciones_pegasus where estacion=$cod";
$fecha='fecha';
$valor='valor';
$descrip='variable';
}else if ($tipo=='2'){
$sql = "select * from dipsoh.mediciones_minplan where estacion=$cod";
$fecha='fecha';
$valor='v1';
$descrip='variable';
}else{
$sql="select 'nada' where 1=0";
echo 'No hay mediciones para esta estación<br>';
}

$res = pg_query($link, $sql);
//echo var_dump($res);

echo '<html><body>Estacion: '.$cod.'<br>Resultados: '.pg_num_rows($res);
echo '<table>';

while ($row = pg_fetch_array($res)) {  
//echo var_dump($row);
echo '<tr><td>'.$row[$fecha].'</td><td>'.$row[$valor].'</td><td>'.$row[$descrip].'</td></tr>';
}
echo '</table></body></html>';
?>

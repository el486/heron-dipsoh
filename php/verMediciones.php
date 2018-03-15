<?php
/* importa el archivo de configuracion */
require_once("include/config.php");

$link = pg_connect(PG_CONNECTION_STRING);
$salida='';
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
		$sub= substr($cod, 0, 3);
		$sql = "select * from dipsoh.mediciones_minplan where estacion like '$sub%'";
		$fecha='fecha';
		$valor='v1';
		$descrip='variable';
	}else if ($tipo=='3'){
		$sql="select 'nada' where 1=0";
		if ($cod=='Mar_chiquita'){
		header('Location: http://junin:datos@junin.gob.ar/util/limnigrafo/xls-marchiquita.php');
		die();
		}else{
		header('Location: http://junin:datos@junin.gob.ar/util/limnigrafo/gomez.php');
		die();
		}
	}else{
		$sql="select 'nada' where 1=0";
		$salida.= 'No hay mediciones para esta estacion';
	}
	$res = pg_query($link, $sql);
	//echo var_dump($res);
	if (pg_num_rows($res)>0){
		//$salida='<html><body>Estacion: '.$cod.'<br>Resultados: '.pg_num_rows($res);
		$salida.= 'Fecha;valor;descripcion'.PHP_EOL;
		//$salida.= '<table>';

		while ($row = pg_fetch_array($res)) {  
		//echo var_dump($row);
		//$salida.= '<tr><td>'.$row[$fecha].'</td><td>'.$row[$valor].'</td><td>'.$row[$descrip].'</td></tr>';
		$salida.= $row[$fecha].';'.$row[$valor].';'.$row[$descrip].PHP_EOL;
		}
		//$salida.= '</table></body></html>';

		header("Content-Type: application/csv ; charset=iso-8859-1");
		header("Content-Transfer-Encoding: binary");
		header('Content-Disposition: attachment; filename="'.$cod.'.csv"');
	}
	echo $salida;
	
?>

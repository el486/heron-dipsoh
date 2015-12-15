<?php

require_once("include/config.php");

$link = pg_connect(PG_CONNECTION_STRING);

$numPlano = $_REQUEST['plano'];

$sql = "
	select fecha from dipsoh.mediciones_minplan order by fecha desc limit 1
";
$res = pg_query($link, $sql);
$row = pg_fetch_array($res);
$fecha = substr($row['fecha'],0,10);

echo 'Fecha de ultima actualizacion: '.$fecha.'<br>';

$sql = "
    DELETE FROM dipsoh.mediciones_minplan
	WHERE fecha like '$fecha%'
	";
	
	$res = pg_query($link, $sql);
	echo 'Filas borradas:'.pg_affected_rows($res).'<br>';

function curl($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_PROXY, '10.46.3.4:80'); 
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }

    $feed = 'http://re.minplan.gob.ar/alertas_tempranas/public/index/data/desde/'.$fecha.'/hasta/2100-01-01';
    $data = curl($feed);

//echo var_dump(json_decode($data));
$json=json_decode($data, TRUE);
echo 'Filas agregadas:<br>';// <br>"estacion";"variable";"valor";"fecha"'."<br>";
$index=1;
foreach ($json as $key => $value)
 {
   foreach($value as $key2 => $v)
   {   
       foreach($v as $w)
	   {
			echo $index.' "'.$key.'";"'.$key2.'";"'.$w['valor'].'";"'.$w['FechaHora']."\"<br>";
			$sql = "
			INSERT INTO dipsoh.mediciones_minplan(estacion,variable,v1,v2,fecha)
			VALUES('{$key}','{$key2}',{$w['valor']},0,'{$w['FechaHora']}');
			";
			//"INSERT INTO `orders` (`OrderNo`, `BookName`, `Quantity`, `TotalPrice`, `ISBN`, `StudentID`) 
			//VALUES (NULL, '{$obj->Title}', '{$cart_itm['quantity']}', '{$total}', '{$ISBN}', '{$_SESSION['login_user']}');";
			$res = pg_query($link, $sql);
			echo pg_last_error($link);
			$index++;
		}
   }
}
$index--;
echo 'Total: '.$index;
?>
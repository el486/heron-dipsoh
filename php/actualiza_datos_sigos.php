<?php
/* importa el archivo de configuracion */


require_once("include/config3.php");


$linkpg = pg_connect(PG_CONNECTION_STRING);

$sino = "select obras_sigos_ultupd()";
$res_sino = pg_query($linkpg, $sino);

$fila = pg_fetch_result($res_sino, 0, 0);

if ($fila == 't') {
 	
$qry = "EXEC PG_OBRAS_GetAll";
$cr = 0;   
 if($rs = ejecutarQuery($qry,true))
     {     $cr = count($rs);  }
      pg_set_client_encoding($linkpg,"LATIN9");    
      for($i=0;$i<count($rs);$i++){
      	  
      	  $idobra = $rs[$i]['IDObra'];
      	  $reparticion = $rs[$i]['Reparticion'];
      	  $denominacion = $rs[$i]['Denominacion'];
      	  $partido = $rs[$i]['Partido'];
      	  $expediente = $rs[$i]['Expediente'];
      	  $etapa = $rs[$i]['Etapa'];
      	  $estado = $rs[$i]['Estado'];
      	  $codigo = $rs[$i]['Codigo'];
      	  $monto_obra = $rs[$i]['MontoObra'];
      	  if ($monto_obra != '') {$monto_obra=number_format($monto_obra,2,",",".");
			$monto_obra = str_replace('.','',$monto_obra); }
      	  
      	  $contratista = $rs[$i]['Contratista'];
          
          echo 'idobra '. $idobra;
    	  $upd = "select obras_sigos_upd('$idobra','$reparticion','$denominacion','$partido','$expediente','$etapa','$estado','$codigo','$monto_obra','$contratista')";
    
		 $resupd = pg_query($linkpg, $upd);
	 }
}
die;
 pg_close($linkpg);

?>

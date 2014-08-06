<?php
    /* importa el archivo de configuracion */
	require_once("include/config.php");
	
	// Open log file
    $logfh = fopen("GeoserverPHP.log", 'w') or die("can't open log file");

    // Initiate cURL session
    $service = "http://www.mosp.gba.gov.ar/sig_hidraulica/ms/geoserver/dipsoh/wms?"; // replace with your URL
    $request ="LAYERS=dipsoh%3Adepartamentos&TRANSPARENT=TRUE&FORMAT=image%2Fpng&SINGLETILE=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG%3A900913&BBOX=-5943762.6800744,-4395236.4393942,-5630676.6122619,-4082150.3715817&WIDTH=256&HEIGHT=256"; // to add a new workspace
    $url = $service . $request;
    $ch = curl_init($url);

    // Optional settings for debugging
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //option to return string
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    curl_setopt($ch, CURLOPT_STDERR, $logfh); // logs curl messages

    //POST return code
    $successCode = 200;

    $buffer = curl_exec($ch); // Execute the curl request

    // Check for errors and process results
    $info = curl_getinfo($ch);
    if ($info['http_code'] != $successCode) {
      $msgStr = "# Unsuccessful cURL request to ";
      $msgStr .= $url." [". $info['http_code']. "]\n";
      fwrite($logfh, $msgStr);
    } else {
      $msgStr = "# Successful cURL request to ".$url."\n";
		  if (substr($buffer,2,3)=="xml") {
			//$msgStr .= "Error en geoserver. Aqui debería correr el reload\n";
			    // Initiate cURL session
				$service = "http://localhost:8888/geoserver/"; // replace with your URL
				$request = "rest/reload"; // to add a new workspace
				$url = $service . $request;
				$ch = curl_init($url);

				// Optional settings for debugging
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //option to return string
				curl_setopt($ch, CURLOPT_VERBOSE, true);
				curl_setopt($ch, CURLOPT_STDERR, $logfh); // logs curl messages

				//Required POST request settings
				curl_setopt($ch, CURLOPT_POST, True);
				$passwordStr = $passGeo; // replace with your username:password
				curl_setopt($ch, CURLOPT_USERPWD, $passwordStr);

				//POST return code
				$successCode = 201;

				$buffer = curl_exec($ch); // Execute the curl request

				// Check for errors and process results
				$info = curl_getinfo($ch);
				if ($info['http_code'] != $successCode) {
				  $msgStr .= "# Unsuccessful cURL request to ";
				  echo "No se pudo recargar el catalogo, intentelo nuevamente mas tarde.";
				  $msgStr .= $url." [". $info['http_code']. "]\n";
				  fwrite($logfh, $msgStr);
				} else {
				  $msgStr .= "# Successful cURL request to ".$url."\n";
				  echo "Error solucionado en el servidor de capas, <a href='' onclick=javascript:window.history.back();>regrese al visor</a> para continuar.";
				  fwrite($logfh, $msgStr);
				}
				fwrite($logfh, $buffer."\n");
		  } else {
		    $msgStr .= "Geoserver OK. Nada que hacer\n";
			echo "El servidor de capas esta funcionando. No es necesario recargar el catalogo.\n"."Pruebe <a href='' onclick=javascript:window.history.back();>regresando a la pagina del visor</a>";
		  }
	  fwrite($logfh, $msgStr."\n" );
    }
    fwrite($logfh, $buffer."\n");

    curl_close($ch); // free resources if curl handle will not be reused
    fclose($logfh);  // close logfile

?>
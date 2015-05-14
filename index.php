<!--
  ~ This program is free software: you can redistribute it and/or modify
  ~ it under the terms of the GNU General Public License as published by
  ~ the Free Software Foundation, either version 3 of the License, or
  ~ (at your option) any later version.
  ~
  ~ This program is distributed in the hope that it will be useful,
  ~ but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~ GNU General Public License for more details.
  ~
  ~ You should have received a copy of the GNU General Public License
  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.
  -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
		"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
	<meta http-equiv="x-ua-compatible" content="IE=EmulateIE8">
	<title>Visor SIG Hidraulica</title>

		
	<?php
	$plano=$_GET['plano']; //php para capturar el parámetro pasado por URL
	$idobra=$_GET['idobra']; //php para capturar el parámetro pasado por URL
	?>
	<script type="text/javascript" >
	if(navigator.appName.indexOf("Internet Explorer")!=-1){alert('Usted está usando Internet Explorer. Si tiene problemas con alguna de las funciones del visor, le recomendamos probarlo con otro navegador (Firefox o  Chrome).');}
	var planoUrl,obraUrl,serverURL;
	planoUrl='<?php echo $plano ?>'; //Pasaje del parámetro a JS para uso en buscarPlano()
	obraUrl='<?php echo $idobra ?>'; //Pasaje del parámetro a JS para uso en buscarObra()
	serverURL='http://www.mosp.gba.gov.ar/sig_hidraulica/ms'; 
	</script>

	<!-- utilizado para el ajax -->
    <script type="text/javascript" src="./js/prototype.js"></script>

	<!-- Script and css resources for ExtJS-->
	<link rel="stylesheet" type="text/css" href="./css/ext-all.css"/>
	<link rel="stylesheet" type="text/css" href="./css/xtheme-gray.css"/>
	<script type="text/javascript" src="./js/ext-base.js"></script>
	<script type="text/javascript" src="./js/ext-all.js"></script>
	
	<!-- Script and css resources jsts (buffer)-->
	<script type="text/javascript" src="./js/javascript.util.js"></script>
    <script type="text/javascript" src="./js/jsts.js"></script>
    <script type="text/javascript" src="./js/attache.array.min.js"></script>

	<!-- External lib: Google Maps -->
	<script src="http://maps.google.com/maps/api/js?v=3.2&sensor=false"></script>
	
	<!-- External lib: OpenLayers -->
	<script type="text/javascript" src="./js/OpenLayers.js"></script>
	<link rel="stylesheet" type="text/css" href="./css/style.css"/>
	
	<!-- External lib: Stamen Maps (cargar despues de openlayers)-->	
	<script type="text/javascript" src="./js/tile.stamen.js?v1.2.4"></script>
	
	<!-- External lib: GeoExt 1.0 -->
	<script type="text/javascript" src="./js/GeoExt.js"></script>
	
	<!-- Lang y css resources for GXP.js (necesaria para las busquedas) -->
	<link rel="stylesheet" type="text/css" href="./ux/gxp/git/src/theme/all.css"/>
	<script type="text/javascript" src="./js/lang/gxp-es.js"></script>
	
	<!-- para convertir entre proyecciones-->
	<script type="text/javascript" src="./js/proj4js-compressed.js"></script>
	<script type="text/javascript" src="./js/proj4js-22195.js"></script>
	
	<!-- Script and css resources for printpreview ux -->
	<script type="text/javascript" src="./js/lang/PrintPreview-es.js"></script>
	<link rel="stylesheet" type="text/css" href="./ux/printpreview/resources/css/printpreview.css" />

	<!-- Script, lang and css resources for geoext-viewer (heron) -->
	<link rel="stylesheet" type="text/css" href="./resources/css/default.css"/>
	<script type="text/javascript" src="./js/lang/es_ES.js"></script>
	<script type="text/javascript" src="./js/Heron-with-ux.js"></script>
	
	<!-- Lang y css para Editor -->
    <script type="text/javascript" src="./js/lang/editor-es.js"></script>
    <link rel="stylesheet" href="./ux/oleditor/ole/client/theme/geosilk/geosilk.css" type="text/css" />

	<!-- Script and css resources for context menu info/search with buffer (old)
	<script type="text/javascript" src="./js/mod/SpatialSearchPanel_mod.js"></script>
	<script type="text/javascript" src="./js/mod/SearchByFeaturePanel_mod.js"></script>
	-->
	
	<script type="text/javascript" src="./js/mod/LayerNodeMenuItem_mod.js"></script> <!-- Mas info en context menu -->
	<script type="text/javascript" src="./js/mod/FeaturePanel_mod.js"></script> <!-- buffer en info panel -->
	
	<!-- Script and css resources for main app -->
	<link rel="stylesheet" type="text/css" href="./css/m-style.css"/>
	<script type="text/javascript" src="toolbar.js"></script>
	<script type="text/javascript" src="Config.js"></script>
	<script type="text/javascript" src="Funciones.js"></script>

</head>
<body>

</body>

</html>

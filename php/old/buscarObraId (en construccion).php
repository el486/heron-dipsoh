<?php
/* importa el archivo de configuracion */
require_once("include/config.php");

$link = pg_connect(PG_CONNECTION_STRING);

$numPlano = $_REQUEST['plano'];

$sql = "
    select st_astext(transform(the_geom, 900913)) AS the_geom_text, num_plano, partida, obra, ST_X(transform(centroid(the_geom), 900913)) AS x, ST_Y(transform(centroid(the_geom), 900913)) AS y 
	from parcelas_rt_22195
	WHERE num_plano LIKE '$numPlano%' OR num_plano LIKE '%$numPlano'
";
$res = pg_query($link, $sql);
?>

<script>
textoDiv='';
	var myFormPanel = new Ext.form.FormPanel({
		title: 'Resultado de la busqueda',
		renderTo: 'infoDIV',
		items: []
	});
	myFormPanel.getForm().load();
	
textoDiv='<table class="ext"><tr><th>Numero Plano</th><th>Partida</th></tr>';
//alert('<? echo $numPlano ?>');
//alert('hola');

    function agregarEntidadLayerParcelas(wkt,numpla,obra){
        
		poly = new OpenLayers.Format.WKT().read(wkt);
		poly.attributes = {
                name: numpla,
				description:obra,
				favColor: 'black',
                align: 'rt'
            };
		//alert(poly.attributes.name);
		layerParcelas.addFeatures(poly);
		//alert('agregada');
		/* var parser = new OpenLayers.Format.WKT();
        var feature = parser.read(wkt);
        
        /* transforma a la projection del map 
        var geometry = feature.geometry.clone();
        geometry.transform(projBase, map.getProjectionObject());
        feature.geometry = geometry  */ 

        //layerProvincia.addFeatures(feature);
    };


		
<?php while ($row = pg_fetch_array($res)) {  ?>
		textoDiv+='<tr><td><a href="javascript:centrar(<?php echo $row['x']; ?> ,<?php echo $row['y']; ?> )" ><?php echo $row['num_plano']; ?> </a></td><td> <?php echo $row['partida']; ?> </td></tr>';
		var numpla = '<?php echo $row['num_plano']; ?>';
		var obra = '<?php echo $row['obra']; ?>';
		//alert(fid);
		agregarEntidadLayerParcelas('<?php echo $row['the_geom_text'] ?>',numpla,obra);
<?php } // END while($row = pg_fetch_array($res)){  ?>
		textoDiv+='</table><br><table class="ext"><tr><th><a href="javascript:bajarKML()">Generar KML</a></th><th><a href="javascript:limpiarLayerParcelas()">Limpiar Layer</a></th></tr></table><br>';
		document.getElementById('infoDIV').innerHTML+=textoDiv;
		
		bounds=layerParcelas.getDataExtent();
		//selectKML.deactivate();
		//mapPanel.map.zoomToExtent(bounds); 
		mapa=Heron.App.map;
		if (bounds){
		mapa.zoomToExtent(bounds); 
		}
/*	var layers = map.getLayersByName('Parcelas_RT');
    if (layers.length > 0){
        var parcelas = layers[0];
		parcelas.setVisibility(true);
	}*/	
	
	function renderId(val) {
    return '<a href="javascript:test(' + val + ')">'+val+'</a>';
	}
	
	var store = new Ext.data.Store({
        // load using HTTP
        url: 'xml.php',
		//data:''; //opcional si no se pasa url
		
        // the return will be XML, so lets set up a reader
        reader: new Ext.data.XmlReader({
               // records will have an "Item" tag
               record: 'row',
               id: 'astext',
               totalRecords: '@total'
           }, [
               // set up the fields mapping into the xml doc
               // The first needs mapping, the others are very basic
               {name: 'id', mapping: 'id'},
               'astext'
           ])
	});
	var grid = new Ext.grid.GridPanel({
        store: store,
        columns: [
            {header: "ID", width: 120, dataIndex: 'id', sortable: true,renderer: renderId},
            {header: "Geom", width: 180, dataIndex: 'astext', sortable: true}
        ],
        renderTo:'infoDIV',
		height:500
    });
	
	store.load({params:{id:1205}});
</script>

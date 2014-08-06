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

	//textoDiv='<table class="ext"><tr><th><a href="javascript:bajarKML()">Generar KML</a></th><th><a href="javascript:limpiarLayerParcelas()">Limpiar Layer</a></th></tr></table><br>';
	//document.getElementById('infoDIV').innerHTML=textoDiv;
	
		var barraHerramientas = new Ext.Panel({
			
			title: 'Herramientas',
			border:false,
			collapsible: true,
			renderTo: 'infoDIV',
			items: [
					{
					xtype:'toolbar',
					buttonAlign:'center',
					items:[
							{
							text:'Generar KML',
							handler: function(){
								bajarKML();
							}
						},{
							text: 'Limpiar Layer',
							handler: function(){
								limpiarLayerParcelas();
							}
						}]
					}
					]
		});
		barraHerramientas.show();

    function agregarEntidadLayerParcelas(wkt,numpla,obra){
        
		poly = new OpenLayers.Format.WKT().read(wkt);
		poly.attributes = {
                name: numpla,
				description:obra,
				favColor: 'black',
                align: 'rt',
				geom:wkt
            };
		//alert(poly.attributes.name);
		layerParcelas.addFeatures(poly);
		
    };
	
	var store = new Ext.data.ArrayStore({
        fields: [
           {name: 'num_plano'},
           {name: 'partida'},
           {name: 'obra'},
		   {name: 'the_geom_text'}
           ]
    });

		
<?php while ($row = pg_fetch_array($res)) {  ?>  
		
		var numpla = '<?php echo $row['num_plano']; ?>';
		var obra = '<?php echo $row['obra']; ?>';
		var partida = '<?php echo $row['partida']; ?>';
		var geom = '<?php echo $row['the_geom_text']; ?>';
		//crea el registro para agregar al store
		var defaultData = {
			num_plano: numpla,
			partida: partida,
			obra: obra,
			the_geom_text: geom
			};
		var recId = geom; // provide unique id for the record
		var r = new store.recordType(defaultData, ++recId); // create new record
		store.insert(0, r); // insert a new record into the store - store.add(r) funca igual
		
				
		agregarEntidadLayerParcelas(geom,numpla,obra);
		
<?php } pg_free_result($res); pg_close($link); ?>// END while + free memory + close connection   
		
		bounds=layerParcelas.getDataExtent();
		mapa=Heron.App.map;
		if (bounds){
		mapa.zoomToExtent(bounds); 
		}
		
	var myFormPanel = new Ext.form.FormPanel({
		title: 'Resultado de la busqueda',
		renderTo: 'infoDIV',
		items: []
	});
	myFormPanel.getForm().load();
        
	var gridPlano = new Ext.grid.GridPanel({
        store: store,
		id:'gridPlano',
		bbar : [
				{
				xtype:'button',
				text:'Export',
				store: store,
	   			formatter:'CSVFormatter',
				fileName:'planos.csv',
				mimeType:'text/csv',
				exportFunction:'exportGrid',
				//disabled:true,
				text:'Exportar CSV',
				//cls:'download',
				handler: function(config){
					//alert(config.formatter+config.fileName+config.mimeType);
					var formatter=new Ext.ux.Exporter['CSVFormatter']();
					var data=formatter.format(store,config);
					data=Base64.encode(data);
					Heron.data.DataExporter.download(data,config)}
				}
			],
        columns: [
            {header: "Plano", width: 80, dataIndex: 'num_plano', sortable: true,
			renderer: function (val,params,record) {
						//return '<a href="javascript:centrar(' + record.get('x')+','+ +record.get('y') +')">'+val+'</a>';
						return '<a href="javascript:zoomToGeometry(\''+record.get('the_geom_text')+'\')">'+val+'</a>';
					}
			},
            {header: "Partida", width: 50, dataIndex: 'partida', sortable: true},
			{header: "Obra", width: 180, dataIndex: 'obra', sortable: true}
        ],
        renderTo:'infoDIV',
		height:500
    });

	var layers = Heron.App.map.getLayersByName('Parcelas_RT');
	//alert(layers.length);
    if (layers.length > 0){
        var layer = layers[0];
		//alert(layer.getVisibility());
        layer.setVisibility(true);
	}
	
	store.load();

</script>

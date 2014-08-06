<?php
/* importa el archivo de configuracion */

require_once("include/config2.php");

$link = pg_connect(PG_CONNECTION_STRING);

$idObra = $_REQUEST['idobra'];
$etapa = $_REQUEST['etapa'];
$nombre = $_REQUEST['nombre'];


$sql = "
    select st_astext(transform(the_geom, 900913)) AS the_geom_text, id_obra, nombre,etapa, geom
	from dipsoh.dipsoh_obras_sigos_total
	WHERE ";

if  ($idObra) { $sql.="id_obra = '$idObra' "; };
if  ($etapa) {	if ($idObra){$sql.=" AND ";}; $sql.="etapa = '$etapa' "; 	};
if  ($nombre) { if ($idObra || $etapa){$sql.=" AND ";}; $sql.="nombre like upper('%$nombre%') "; };

//echo $sql;
	
	$res = pg_query($link, $sql);

?>

<script>

	//textoDiv='<table class="ext"><tr><th><a href="javascript:bajarKMLObras()">Generar KML</a></th><th><a href="javascript:limpiarLayerObras()">Limpiar Layer</a></th></tr></table><br>';
	//document.getElementById('infoDIV').innerHTML=textoDiv;
	
			var barraHerramientasObras = new Ext.Panel({
			
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
								bajarKMLObras();
							}
						},{
							text: 'Limpiar Layer',
							handler: function(){
								limpiarLayerObras();
							}
						}]
					}
					]
		});
		barraHerramientasObras.show();

    function agregarEntidadLayerObras(wkt,idobra,nombre,tipo){
        
		poly = new OpenLayers.Format.WKT().read(wkt);
		poly.attributes = {
                name: idobra,
				description:nombre,
				favColor: 'black',
                align: 'rt',
				type:tipo,
				geom:wkt
            };
		//alert(poly.attributes.name);
		layerObras.addFeatures(poly);
		
    };
	
	var store = new Ext.data.ArrayStore({
        fields: [
           {name: 'id_obra'},
           {name: 'tipo'},
		   {name: 'nombre'},
		   {name: 'etapa'},
           {name: 'the_geom_text'}
           ]
    });

		
<?php while ($row = pg_fetch_array($res)) {  ?>  
		
		var idobra = '<?php echo $row['id_obra']; ?>';
		var tipo = '<?php echo $row['geom']; ?>';
		var geom = '<?php echo $row['the_geom_text']; ?>';
		var nombre = '<?php echo $row['nombre']; ?>';
		var etapa = '<?php echo $row['etapa']; ?>';
		//crea el registro para agregar al store
		var defaultData = {
			id_obra: idobra,
			tipo: tipo,
			nombre:nombre,
			etapa:etapa,
			the_geom_text: geom
			};
		var recId = idobra; // provide unique id for the record
		var r = new store.recordType(defaultData, ++recId); // create new record
		store.insert(0, r); // insert a new record into the store - store.add(r) funca igual
		
				
		agregarEntidadLayerObras(geom,idobra,nombre,tipo);
		
<?php } pg_free_result($res); pg_close($link); ?>// END while + free memory + close connection   
		
		bounds=layerObras.getDataExtent();
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
        
	var gridObra = new Ext.grid.GridPanel({
        store: store,
		id:'gridObra',
		bbar : [
				{
				xtype:'button',
				text:'Export',
				store: store,
	   			formatter:'CSVFormatter',
				fileName:'obras.csv',
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
            {header: "ID_Obra", width: 80, dataIndex: 'id_obra', sortable: true,
			renderer: function (val,params,record) {
						//return '<a href="javascript:centrar(' + record.get('x')+','+ +record.get('y') +')">'+val+'</a>';
						return '<a href="javascript:zoomToGeometry(\''+record.get('the_geom_text')+'\')">'+val+'</a>';
					}
			},
            {header: "Nombre", width: 180, dataIndex: 'nombre', sortable: true},
			{header: "etapa", width: 80, dataIndex: 'etapa', sortable: true},
			{header: "Tipo", width: 80, dataIndex: 'tipo', sortable: true}
        ],
        renderTo:'infoDIV',
		height:500
    });

	var layers = Heron.App.map.getLayersByName('Trazas+Obras_SIGOS');
	//alert(layers.length);
    if (layers.length > 0){
        var layer = layers[0];
		//alert(layer.getVisibility());
        layer.setVisibility(true);
	}
	
	store.load();
	
</script>

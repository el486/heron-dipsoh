<?php
/* importa el archivo de configuracion */

require_once("include/config.php");


$link = pg_connect(PG_CONNECTION_STRING);

$origen = $_REQUEST['origen'];
$cruce = $_REQUEST['cruce'];
$buffer = $_REQUEST['buffer'];
$x1 = $_REQUEST['x1'];
$x2 = $_REQUEST['x2'];
$y1 = $_REQUEST['y1'];
$y2 = $_REQUEST['y2'];


$sql = "
  SELECT DISTINCT astext(transform(a.the_geom,900913)) AS the_geom_text,
				  a.geom AS tipo, 
				  a.id_obra, 
				  a.nombre, 
				  a.estado, 
				  astext(transform(st_buffer(b.the_geom, $buffer::double precision),900913)) AS buffer
  FROM  $origen a,
		$cruce b
  WHERE st_dwithin(a.the_geom, b.the_geom, $buffer::double precision) 
  AND a.the_geom && st_makeenvelope(($x1)::double precision, ($y1)::double precision, ($x2)::double precision, ($y2)::double precision, 22195);";

//echo $sql;
	
	$res = pg_query($link, $sql);

?>

<script>

	//textoDiv='<table class="ext"><tr><th><a href="javascript:bajarKMLObras()">Generar KML</a></th><th><a href="javascript:limpiarLayerObras()">Limpiar Layer</a></th></tr></table><br>';
	//document.getElementById('infoDIV').innerHTML=textoDiv;
	
			var barraHerramientasBuffer = new Ext.Panel({
			
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
								bajarKMLBuffer();
							}
						},{
							text: 'Limpiar Layer',
							handler: function(){
								limpiarLayerBuffer();
							}
						}]
					}
					]
		});
		barraHerramientasBuffer.show();

    function agregarEntidadLayerBuffer(wkt,idobra,nombre,tipo,buffer){
        
		buff = new OpenLayers.Format.WKT().read(buffer);
		buff.attributes = {
                name: idobra,
				description:nombre,
				favColor: 'black',
                align: 'rt',
				type:'BUFF',
				geom:wkt
            };
		layerBuffer.addFeatures(buff);
		
		feat = new OpenLayers.Format.WKT().read(wkt);
		feat.attributes = {
                name: idobra,
				description:nombre,
				favColor: 'black',
                align: 'rt',
				type:tipo,
				geom:wkt
            };
		//alert(poly.attributes.name);
		layerBuffer.addFeatures(feat);
		
		
		
    };
	
	var store = new Ext.data.ArrayStore({
        fields: [
           {name: 'id_obra'},
           {name: 'tipo'},
		   {name: 'nombre'},
		   {name: 'estado'},
           {name: 'the_geom_text'}
           ]
    });

		
<?php while ($row = pg_fetch_array($res)) {  ?>  
		
		var idobra = '<?php echo $row['id_obra']; ?>';
		var tipo = '<?php echo $row['tipo']; ?>';
		var the_geom = '<?php echo $row['the_geom_text']; ?>';
		var nombre = '<?php echo $row['nombre']; ?>';
		var estado = '<?php echo $row['estado']; ?>';
		var buffer = '<?php echo $row['buffer']; ?>';
		//crea el registro para agregar al store
		var defaultData = {
			id_obra: idobra,
			tipo: tipo,
			nombre:nombre,
			estado:estado,
			the_geom_text: the_geom
			};
		var recId = idobra; // provide unique id for the record
		var r = new store.recordType(defaultData, ++recId); // create new record
		store.insert(0, r); // insert a new record into the store - store.add(r) funca igual
		
				
		agregarEntidadLayerBuffer(the_geom,idobra,nombre,tipo,buffer);
		
<?php } pg_free_result($res); pg_close($link); ?>// END while + free memory + close connection   
		
		bounds=layerBuffer.getDataExtent();
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
        
	var gridBuffer = new Ext.grid.GridPanel({
        store: store,
		id:'gridBuffer',
		bbar : [
				{
				xtype:'button',
				text:'Export',
				store: store,
	   			formatter:'CSVFormatter',
				fileName:'buffer.csv',
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
			{header: "Estado", width: 80, dataIndex: 'estado', sortable: true},
			{header: "Tipo", width: 80, dataIndex: 'tipo', sortable: true}
        ],
        renderTo:'infoDIV',
		height:500
    });

	store.load();
	
</script>
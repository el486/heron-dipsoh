<?php
/* importa el archivo de configuracion */
require_once("include/config.php");

$link = pg_connect(PG_CONNECTION_STRING);

$x = $_REQUEST['x'];
$y = $_REQUEST['y'];

$sql = "
select round(st_distance(the_geom, geomfromtext('POINT($x $y)',22195))) as distancia, 
						ST_X(transform(the_geom, 900913)) AS x, ST_Y(transform(the_geom, 900913)) AS y,
						ST_X(the_geom) AS xorig, ST_Y(the_geom) AS yorig,
						codigo,carta,observ,punto_fijo 
from red_geoba_22195 
where estado is null 
order by distancia 
limit 10
";
$res = pg_query($link, $sql);
?>

<script>
textoDiv='Punto Origen: <br>x:<? echo intval($x) ?> y:<? echo intval($y) ?><br>';
textoDiv+='<table border=1 width="300%" cellpadding=3><tr ><td><b>Dist(m) </b></td><td><b>Codigo </b></td><td><b>Carta IGN </b></td><td><b>Obs. </b></td><td><b>Punto Fijo </b></td><td><b>x:</b></td><td><b>y:</b></td></tr>';

var store = new Ext.data.ArrayStore({
        fields: [
           {name: 'distancia'},
           {name: 'codigo'},
		   {name: 'carta'},
		   {name: 'observ'},
           {name: 'punto_fijo'},
		   {name: 'xorig'},
		   {name: 'yorig'},
		   {name: 'x'},
		   {name: 'y'}
		   
           ]
    });
		
		
<?php while ($row = pg_fetch_array($res)) {  ?>

	var x = '<?php echo $row['x']; ?>';
	var y = '<?php echo $row['y']; ?>';
	var distancia = '<?php echo $row['distancia']; ?>';
	var codigo = '<?php echo $row['codigo']; ?>';
	var carta = '<?php echo $row['carta']; ?>';
	var observ = '<?php echo $row['observ']; ?>';
	var punto_fijo = '<?php echo $row['punto_fijo']; ?>';
	var xorig= '<?php echo $row['xorig']; ?>';
	var yorig= '<?php echo $row['yorig']; ?>';

	textoDiv+='<tr><td>'+distancia+'</td><td><a href="javascript:centrar('+x+' ,'+y+')" > '+codigo+'</a> </td><td> '+carta+'</td><td> '+observ+'</td><td> '+punto_fijo+'</td><td> '+xorig+'</td><td> '+yorig+'</td></tr>';
	
	//crea el registro para agregar al store
	var defaultData = {
			distancia: distancia,
			codigo: codigo,
			carta:carta,
			observ:observ,
			punto_fijo: punto_fijo,
			xorig:xorig,
			yorig:yorig,
			x:x,
			y:y
			};
		var recId = codigo; // provide unique id for the record
		var r = new store.recordType(defaultData, ++recId); // create new record
		store.insert(0, r); // insert a new record into the store - store.add(r) funca igual 
	
<?php } // END while($row = pg_fetch_array($res)){  ?>
		textoDiv+='</table>';
		
		//document.getElementById('infoDIV').innerHTML=textoDiv;
		
		var myFormPanel = new Ext.form.FormPanel({
		title: 'Puntos mas cercanos a',
		renderTo: 'infoDIV',
		html:'x:<? echo intval($x) ?> y:<? echo intval($y) ?><br>',
		items: []
	});
	myFormPanel.getForm().load();
        
	var gridGeoba = new Ext.grid.GridPanel({
        store: store,
		id:'gridGeoba',
		bbar : [
				{
				xtype:'button',
				store: store,
	   			formatter:'CSVFormatter',
				fileName:'puntos.csv',
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
				},
				{
				xtype:'button',
				text:'Desactivar',
				handler: function(){
					//alert(config.formatter+config.fileName+config.mimeType);
					layers = Heron.App.map.getLayersByName('Red_Geoba');
					geoba = layers[0];
					geoba.setVisibility(false);
					Ext.getCmp('layertree').expand(true);
					}
				
				
				}
			],
        columns: [
            {header: "Codigo", width: 50, dataIndex: 'codigo', sortable: true,
			renderer: function (val,params,record) {
						return '<a href="javascript:centrar(' + record.get('x')+','+ +record.get('y') +')">'+val+'</a>';
						}
			},
            {header: "Distancia", width: 70, dataIndex: 'distancia', sortable: true},
			{header: "Carta", width: 60, dataIndex: 'carta', sortable: true},
			{header: "Punto Fijo", width: 80, dataIndex: 'punto_fijo', sortable: true},
			{header: "Observaciones", width: 100, dataIndex: 'observ', sortable: true}
        ],
        renderTo:'infoDIV',
		height:500
    });

	store.load();
		
</script>

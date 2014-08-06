<?php
/* importa el archivo de configuracion */
$id=$_GET['idobra']; //php para capturar el parámetro pasado por URL
?>

<script>

defObras = new OpenLayers.Style({},
				{
					rules : [
						new OpenLayers.Rule({
							name: "Obras_Sigos", // <--- this is what will display in legend panel
							symbolizer: {fillColor: 'yellow',fillOpacity: 0.05,strokeColor:'darkViolet'}							
						})
					]
				});
				
//selPlano = new OpenLayers.Style({fillColor: 'red',fillOpacity: 0.2});
styleIdObras = new OpenLayers.StyleMap({
	'default':defObras//,
	//'selected':selPlano
	});

layerwfs = new OpenLayers.Layer.Vector("Obras Seleccionadas",{
								strategies: [new OpenLayers.Strategy.Fixed()]
								,projection: new OpenLayers.Projection("EPSG:900913")
								,styleMap:styleIdObras
								,protocol: new OpenLayers.Protocol.WFS({
									version: "1.1.0"
									,srsName: "EPSG:900913"
									,url: "http://www.mosp.gba.gov.ar/sig_hidraulica/ms/geoserver/wfs"
									,featureNS :  "http://www.mosp.gba.gov.ar/sig_hidraulica/ms/geoserver/dipsoh_postgis"
									,featureType: "dipsoh_obras_sigos_total"
									,featurePrefix: "dipsoh"
									,geometryName: "the_geom"
									,schema: "http://www.mosp.gba.gov.ar/sig_hidraulica/ms/geoserver/wfs/DescribeFeatureType?typename=dipsoh.public:dipsoh_obras_sigos_total"
									,filter: new OpenLayers.Filter.Comparison({
										type: OpenLayers.Filter.Comparison.EQUAL_TO,
										property: "id_obra",
										value: '<?php echo $id ?>'
									})
								})
							});

Heron.App.map.addLayer(layerwfs);

var selectCtrl = new OpenLayers.Control.SelectFeature(layerwfs);
var popup
    // define "createPopup" function
    function createPopup(feature) {
        popup = new GeoExt.Popup({
            title: 'Informacion',
            location: feature,
            width:300,
			anchored: true,
			anchorPosition: 'auto',
            html: "<div style='font-size:.9em'>Feature: " + feature.id 
									 +"<br>ID: " + feature.attributes.id_obra +'<a href="javascript:void(0)" onclick="popupObras(\''+feature.attributes.id_obra+'\');">' + '<b>+info</b>' + '</a>'
									 +"<br>Nombre: "+ feature.attributes.nombre
									 +"<br>Etapa: "+ feature.attributes.etapa
									 +"<br>Reparticion: "+ feature.attributes.reparticion
									 +"<br>Geometria: "+ feature.attributes.geom
									 +"</div>",
            maximizable: false,
            collapsible: true
        });
        // unselect feature when the popup
        // is closed
        popup.on({
            close: function() {
                selectCtrl.unselectAll();
            }
        });
        popup.show();
    }

    // create popup on "featureselected"
layerwfs.events.on({
	featureselected: function(e) {
		createPopup(e.feature);
	}
});

layerwfs.events.on({
	featureunselected: function(e) {
		popup.close();
	}
});

Heron.App.map.addControl(selectCtrl);
selectCtrl.activate();

var layers= Heron.App.map.getLayersByName('Obras Seleccionadas');
layerVector=layers[0];
layerVector.events.register('loadend', layerVector, function(evt){
				if(layerVector.features.length>0){
				 Heron.App.map.zoomToExtent(layerVector.getDataExtent());
				 Heron.App.map.zoomOut();
				 selectCtrl.select(layerVector.features[0]);
				 //alert(layerVector.getDataExtent());
				 }else{
				alert('No se encontraron elementos que coincidan con la búsqueda');
				}
}); 

</script>

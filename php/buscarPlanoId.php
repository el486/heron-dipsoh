<?php
/* importa el archivo de configuracion */
$id=$_GET['numpla']; //php para capturar el parámetro pasado por URL
$id2=explode('-',$id);
?>

<script>

defPlano = new OpenLayers.Style({},
				{
					rules : [
						new OpenLayers.Rule({
							name: "Parcelas_rt", // <--- this is what will display in legend panel
							symbolizer: {fillColor: 'yellow',fillOpacity: 0.05,strokeColor:'green'}							
						})
					]
				});
				
//selPlano = new OpenLayers.Style({fillColor: 'red',fillOpacity: 0.2});
styleIdPlanos = new OpenLayers.StyleMap({
	'default':defPlano//,
	//'selected':selPlano
	});

layerwfs = new OpenLayers.Layer.Vector("Plano Relevamiento",{

								strategies: [new OpenLayers.Strategy.Fixed()]
								,projection: new OpenLayers.Projection("EPSG:900913")
								,styleMap: styleIdPlanos
								,protocol: new OpenLayers.Protocol.WFS({
									version: "1.1.0"
									,srsName: "EPSG:900913"
									,url: "http://www.mosp.gba.gov.ar/sig_hidraulica/ms/geoserver/wfs"
									,featureNS :  "http://www.mosp.gba.gov.ar/sig_hidraulica/ms/geoserver/dipsoh_postgis"
									,featureType: "parcelas_rt"
									,featurePrefix: "dipsoh"
									,geometryName: "the_geom"
									,schema: "http://www.mosp.gba.gov.ar/sig_hidraulica/ms/geoserver/wfs/DescribeFeatureType?typename=dipsoh.public:parcelas_rt"
									,filter: new OpenLayers.Filter.Comparison({
												type: OpenLayers.Filter.Comparison.EQUAL_TO,
												property: "num_plano",
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
									 +"<br>Numero de plano: " + feature.attributes.num_plano
									 +"<br>Nomenclatura: "+ feature.attributes.nomcat
									 +"<br>Partida Inmobiliaria: "+ feature.attributes.partida
									 +"<br>Obra: "+ feature.attributes.obra
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

var layers= Heron.App.map.getLayersByName('Plano Relevamiento');
layerVector=layers[0];
layerVector.events.register('loadend', layerVector, function(evt){
             Heron.App.map.zoomToExtent(layerVector.getDataExtent());
			 Heron.App.map.zoomOut();
    		 selectCtrl.select(layerVector.features[0]);
			 //alert(layerVector.getDataExtent());
            }); 
			

</script>

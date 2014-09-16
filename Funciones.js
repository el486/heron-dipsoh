/*FUNCIONES GENERALES*/

function getAjax(url,pars,idSucess){
                /**/
                var ajax = new Ajax.Updater(
                {
                    success: idSucess
                },
                url,
                {
                    method: 'get',
                    evalScripts:true,
                    parameters: pars,
                    onLoading: document.getElementById(idSucess).innerHTML = 'Cargando...<br>' + document.getElementById(idSucess).innerHTML,
                    onFailure: errorAjax
                });
                /**/
            }

            function errorAjax(){
                alert('Se produjo un error al cargar, intente nuevamente.');
            }

function popupObras(value){
    
	Ext.Ajax.request({
    url: 'http://www.mosp.gba.gov.ar/sistemas/sigos/ind.php?mod=obra/obraDatos_link&idobra='+value,
    success: function(response){
        // response.responseText will have your html content
        // you can then feed it into your component using update()
	response.responseText = response.responseText.replace('img/SistemaSIGOS.jpg','images/SistemaSIGOS.jpg');	   
			
			var win;
			if(!win){
				win = new Ext.Window({
					//applyTo     : 'hello-win',
					//layout      : 'fit',
					title:'Informacion de la Obra',
					width: 900,
					height: 500,
					closeAction :'hide',
					//plain: true,
					modal: true, 
					html: response.responseText,
					//overflow:'auto', 
					autoScroll:'true',
					buttons: [{
						text     : 'Close',
						handler  : function(){
							win.hide();
						}
					}]
				});
				win.show();
			} 
	  }
	});
}
			
function test (id){
alert(id);
}

function limpiarMiniDIV(){
document.getElementById('infoMiniDIV').innerHTML='';
}

Ext.onReady(function() {
	var mapa = Heron.App.map;
	Heron.App.map.addControl(new OpenLayers.Control.ScaleLine());
	//url='/wms_hidraulica/cgi-bin/heron.cgi';
	//Ext.getCmp('map_editor').olEditorOptions.UploadFeature.url='/wms_hidraulica/cgi-bin/heron.cgi';
	//alert(Ext.getCmp('map_editor').olEditorOptions.DownloadFeature.url);

	var partidosOver = new OpenLayers.Layer.WMS("Partidos",wmsURL,
								{layers: 'dipsoh:departamentos',transparent: true, format:'image/png', singleTile: true }, 
								{visibility: true, displayInLayerSwitcher:true,isBaseLayer:true}); 
	
	var overviewOptions = {
		numZoomLevels:1,
        projection: "EPSG:900913",
        units: 'm',
        maxExtent: new OpenLayers.Bounds(-7196781, -5036226, -6200364, -3906201),
		restrictedExtent: new OpenLayers.Bounds(-7196781, -5036226, -6200364, -3906201),
		layers:[partidosOver]
	    };
	
    Heron.App.map.addControl(new OpenLayers.Control.OverviewMap({maximized: true, size: new OpenLayers.Size(100,100) , mapOptions:overviewOptions}));
	
	
	if (planoUrl!=""){	
		params='numpla='+planoUrl;
		getAjax('./php/buscarPlanoId.php',params,'infoDIV');
		}
	if (obraUrl!=""){	
		params='idobra='+obraUrl;
		getAjax('./php/buscarObraId.php',params,'infoDIV');
		}
	
	Ext.Ajax.on('beforerequest', function(conn,opts){
		//alert(opts.url);
		if (opts.url=='http://192.168.1.13/print/pdf/create.json'){
			//rawString = Ext.encode(opts.jsonData);
			//opts.url='http://www.mosp.gba.gov.ar/wms_hidraulica/print/pdf/print.pdf';
			opts.url=serverURL+'/print/pdf/create.json';
			//alert(printProvider);
			//opts.method='GET';
			//opts.params={spec:rawString}
			if(opts.jsonData.layers[0].baseURL==wmsURL){
				Ext.MessageBox.show({
					title: String.format('Advertencia'),
					msg: String.format('Por cuestiones de copyright las capas de Google no pueden usarse en la salida impresa. Elija OpenStreetMap o Cartas IGN para imprimir con capa base, o intente con la impresion de pantalla.'),
					buttons: Ext.Msg.OK,
					fn: function (btn) {
							if(btn == 'ok'){
							}
					},
					icon: Ext.MessageBox.INFO,
					maxWidth: 300
					})
				};
			//Ext.Ajax.abort();
			//prev=Ext.WindowMgr.getActive();
			//prev.close();
			//newWin=window.open(opts.url+'?spec='+opts.params.spec,'Genera PDF','width=200,height=50');
			}
		});
	Ext.Ajax.on('requestcomplete', function(conn, response, opts){
			//alert(response.responseText);
			response.responseText = response.responseText.replace('http://192.168.1.13',serverURL);
			//alert(response.responseText);
	});
	//Ext.Ajax.on('beforerequest',interceptPrint(null,{single:true}));
	//printProvider.print(mapPanel,printPage);
	
	Heron.App.map.events.register('changelayer', null, function(evt){
				   if(evt.property === "visibility") {
					  //alert(map.getScale())
					    
					if (evt.layer.name =='Red_Geoba' && evt.layer.visibility == true){
						//alert(evt.layer.name + " layer visibility changed to " +	evt.layer.visibility );
					  
						//registra el evento click
						Heron.App.map.events.register('click', this , fnclick);
						
						Ext.getCmp('hr-info-west').expand(true);
						document.getElementById('infoDIV').innerHTML="Haga click sobre el mapa para obtener la lista de puntos cercanos de Red Geoba";
					}
					if (evt.layer.name =='Red_Geoba' && evt.layer.visibility == false){
						//desregistra el evento click
						Heron.App.map.events.unregister('click', this, fnclick);
						layerOculto.removeFeatures(layerOculto.features);
						document.getElementById('infoDIV').innerHTML='info';
						 }
<<<<<<< HEAD
					/*if (evt.layer.name =='Parcelas' && evt.layer.visibility == true && Heron.App.map.getScale()>100000){
						alert('La capa de parcelas ARBA solo es visible por debajo del zoom 1:100.000');
						//layerParcelas.visibility=false;
						}*/
=======
					/*
					if (evt.layer.name =='Parcelas' && evt.layer.visibility == true && Heron.App.map.getScale()>100000){
						alert('La capa de parcelas ARBA solo es visible por debajo del zoom 1:100.000');
						//layerParcelas.visibility=false;
						}
						*/
>>>>>>> origin/master
					
				   }
			   }
			);
	
});

function fnclick(e){
	var lonlat = Heron.App.map.getLonLatFromViewPortPx(e.xy);
	//alert(lonlat.lon+' - '+lonlat.lat);
	//alert(lonlat.lon);
	var point = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);

	if(!layerOculto){
					// layer Oculto, se usa solo en esta funcion
					layerOculto = new OpenLayers.Layer.Vector("layerOculto", {
						projection: new OpenLayers.Projection("EPSG:900913"),
						displayInLayerSwitcher:false,
						styleMap: new OpenLayers.StyleMap({
							"point": new OpenLayers.Style(OpenLayers.Util.applyDefaults({
								fillColor: "#ffff00",
								strokeColor: "#660000"
							}, OpenLayers.Feature.Vector.style["point"]))
						})
					});
					Heron.App.map.addLayer(layerOculto);
				};

	var pointFeature = new OpenLayers.Feature.Vector(point,null,null);
	pointFeature.style = OpenLayers.Util.applyDefaults({fillColor: "#ff0000",strokeColor:"#000000"}, OpenLayers.Feature.Vector.style["default"]); 
	layerOculto.removeFeatures(layerOculto.features);
	layerOculto.addFeatures([pointFeature]);
	proj22195=new OpenLayers.Projection("EPSG:22195");
	lonlat22195 = lonlat.transform(Heron.App.map.projection,proj22195);

		params = 'x='+lonlat22195.lon+'&y='+lonlat22195.lat;
		//alert(params);
		getAjax('./php/buscarPuntosGeoba.php',params,'infoDIV');

	//alert(lonlat22195.lon + " E, "+lonlat22195.lat + " N");
	//map.events.unregister("click", map, fnclick );
}

/*FUNCIONES DE LAYER OCULTO - Ver si se usan fuera de buscarPuntosGeoba.php*/

function centrar (x,y){

    var pointCenter = new OpenLayers.LonLat(x,y);
	mapa=Heron.App.map;
	//mapa.zoomToExtent(bounds); 
	mapa.setCenter(pointCenter);
	var point = new OpenLayers.Geometry.Point(x,y);
    var pointFeature = new OpenLayers.Feature.Vector(point,null,null);
    layerOculto.addFeatures([pointFeature]);
	
}

function zoomToGeometry (wkt){
	//alert(wkt);
	var mapa=Heron.App.map;
	var feature = new OpenLayers.Format.WKT().read(wkt);
	layerOculto.addFeatures(feature);
	var bounds = feature.geometry.getBounds();
	//alert(bounds);
	if (bounds){
			mapa.zoomToExtent(bounds); 
			mapa.zoomOut()
			}

}


/*FUNCIONES PARA BAJAR KML*/
		
function GetKMLFromFeatures(features) {
    var format = new OpenLayers.Format.KML({
        'maxDepth':10,
        'extractStyles':true,
		'extractAttributes': true,
        'internalProjection': new OpenLayers.Projection("EPSG:900913"),
        'externalProjection': new OpenLayers.Projection("EPSG:4326")
    });

    return format.write(features);
}	

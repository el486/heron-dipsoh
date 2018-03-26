/*FUNCIONES GENERALES*/

/*
function getAjax(url,pars,idSucess){
                
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
}

            function errorAjax(){
                alert('Se produjo un error al cargar, intente nuevamente.');
            }
*/
function popupObras(value){ //popup con informacion de la obra del SIGOS
    
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
					width: 300,
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

function popupFoto(value){ //popup con foto
    var win;
	if(!win){
		win = new Ext.Window({
			//applyTo     : 'hello-win',
			//layout      : 'fit',
			title:value,
			width: 500,
			height: 600,
			closeAction :'hide',
			//plain: true,
			modal: true, 
			html: '<br><img src="../imagenes/mantenimiento/zonaVIII/'+value+'" height="450" width="450"><br>',
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
			
function test (id){ //test
alert(id);
}

function limpiarMiniDIV(){ 
document.getElementById('infoMiniDIV').innerHTML='';
}

Ext.onReady(function() {  //carga después de terminar de cargar el mapa. Se usa para cargar las busquedas por url
	var mapa = Heron.App.map;
	//aca iba el overview, ahora se carga directamente en el config
	
	if (planoUrl!=""){	//dispara busqueda por numero de plano
		params='numpla='+planoUrl;
		//getAjax('./php/buscarPlanoId.php',params,'infoDIV');  //Se cambio getajax (prototype) por ext.ajax.request
		Ext.Ajax.request({ 
			url: './php/buscarPlanoId.php?'+params,
			success: function(response){
			//console.log(response.responseText)
			var scripts, scriptsFinder=/<script[^>]*>([\s\S]+)<\/script>/gi; //necesario para ejecutar scripts dentro de la respuesta
                        while(scripts=scriptsFinder.exec(response.responseText)) {
                            eval(scripts[1]);
                       }
			}
		});
		}
	if (obraUrl!=""){ //dispara busqueda por idobra
		params='idobra='+obraUrl;
		//getAjax('./php/buscarObraId.php',params,'infoDIV');
		Ext.Ajax.request({ 
			url: './php/buscarObraId.php?'+params,
			success: function(response){
			//console.log(response.responseText)
			var scripts, scriptsFinder=/<script[^>]*>([\s\S]+)<\/script>/gi;
                        while(scripts=scriptsFinder.exec(response.responseText)) {
                            eval(scripts[1]);
                       }
			}
		})
		}
	
	Ext.Ajax.on('beforerequest', function(conn,opts){ //captura el request de impresion para cambiar la url y repara request de mapbox y esri. 
		//alert(opts.url);
		if (opts.url=='http://192.168.1.13/print/pdf/create.json'){
			//rawString = Ext.encode(opts.jsonData);
			//opts.url='http://www.mosp.gba.gov.ar/wms_hidraulica/print/pdf/print.pdf';
			opts.url=serverURL+'/print/pdf/create.json';
			//alert(printProvider);
			//opts.method='GET';
			if(opts.jsonData.layers[0].extension=='BIKNGrVqVAilUH7g0dsmxg'){
			opts.jsonData.layers[0].extension='png';
			opts.jsonData.layers[0].customParams={"access_token":"pk.eyJ1IjoiNDg2IiwiYSI6IkNadnAwUk0ifQ.BIKNGrVqVAilUH7g0dsmxg"};
			}
			
			if(opts.jsonData.layers[0].extension=='$%7Bx%7D'){
			opts.jsonData.layers[0].extension='png';
			opts.jsonData.layers[0].path_format='${z}/${y}/${x}';
			}
			
			//opts.jsonData.replace('extension: "BIKNGrVqVAilUH7g0dsmxg"','"extension":"png","customParams":{"access_token":"pk.eyJ1IjoiNDg2IiwiYSI6IkNadnAwUk0ifQ.BIKNGrVqVAilUH7g0dsmxg"}');
			//console.log(opts.jsonData.layers[0].baseURL.substring(7,10));
			//opts.params={spec:rawString}
			if(opts.jsonData.layers[0].baseURL==wmsURL || opts.jsonData.layers[0].baseURL.substring(7,10)=='ecn') {  //Muestra un cartel si se quiere usar bing o google como basemap
				Ext.MessageBox.show({
					title: String.format('Advertencia'),
					msg: String.format('Por cuestiones de copyright las capas de Google y Bing no pueden usarse en la salida impresa. Elija OpenStreetMap, MapBox o capas IGN para imprimir con capa base, o intente con la impresion de pantalla.'),
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
			}
		});
	Ext.Ajax.on('requestcomplete', function(conn, response, opts){ //vuelve a capturar la url de respuesta del print request para apuntar al pdf en internet
			//alert(response.responseText);
			response.responseText = response.responseText.replace('http://192.168.1.13',serverURL);
			//alert(response.responseText);
	});
	//Ext.Ajax.on('beforerequest',interceptPrint(null,{single:true}));
	//printProvider.print(mapPanel,printPage);
	/*
	Heron.App.map.events.register('changelayer', null, function(evt){ //dispara la funcion de busqueda de puntos cercanos si se enciende la capa red geoba
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
					if (evt.layer.name =='Parcelas' && evt.layer.visibility == true && Heron.App.map.getScale()>100000){
						alert('La capa de parcelas ARBA solo es visible por debajo del zoom 1:100.000');
						//layerParcelas.visibility=false;
						}
					
				   }
			   }
			);*/
			
			
			var files = ["./js/jsts.min.js","./js/mod/FeaturePanel_mod.js"]; 
			var onload = function () {   
			// do something onload
			}
			var scope = this;
			Ext.Loader.load(files, onload, scope, true); //carga los archivos necesarios para la funcion buffer (500k) despues de cargar la interfaz
	
});

function fnclick(e){ //busca puntos cercanos al lugar en donde se hizo click. Consulta directamente el postgres
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
		//getAjax('./php/buscarPuntosGeoba.php',params,'infoDIV');
		Ext.Ajax.request({ 
			url: './php/buscarPuntosGeoba.php?'+params,
			success: function(response){
			//console.log(response.responseText)
			var scripts, scriptsFinder=/<script[^>]*>([\s\S]+)<\/script>/gi;
                        while(scripts=scriptsFinder.exec(response.responseText)) {
                            eval(scripts[1]);
                       }
			}
		});

	//alert(lonlat22195.lon + " E, "+lonlat22195.lat + " N");
	//map.events.unregister("click", map, fnclick );
	Heron.App.map.events.unregister('click', this, fnclick);
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

function desactivarDist(){
	Ext.getCmp('layertree').expand(true);
	layerOculto.removeFeatures(layerOculto.features);
	document.getElementById('infoDIV').innerHTML='info';
	Heron.App.map.events.unregister('click', this, fnclick);
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

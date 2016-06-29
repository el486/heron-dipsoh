function armarNomencla(){ //arma la nomenclatura para la busqueda por nomencla
	var part = Ext.getCmp('form_part').getValue();
	var circ = Ext.getCmp('form_circ').getValue();
	var secc = Ext.getCmp('form_secc').getValue();
	var otro = Ext.getCmp('form_otro').getValue();
	var pnum = Ext.getCmp('form_pnum').getValue();
	var plet = Ext.getCmp('form_plet').getValue();
	Ext.getCmp('form_nomencla').setValue(part+circ+secc+"%"+otro+"%"+pnum+plet);
}
			
function convertNomencla(value){ //funcion para convertir la nomenclatura en un formato legible
				var nomencla='';
				var convert=[
					["Pt:",0,3],[" Circ:",3,5],[" Secc:",5,7],
					[" Ch:",7,11],["",11,14],[" Qt:",14,18],["",18,21],
					[" Fr:",21,25],["",25,28],[" Mz:",28,32],["",32,35],
					[" Pc:",35,39],["",39,42]
					];
				for (var i=0; i<13; i++) {
					var k=convert[i][2];
					for (var j=convert[i][1]; j<k;j++){
						if(value.substring(j,j+1)!='0'){
						nomencla+=convert[i][0]+value.substring(j,k);
						j=k;
						}
					}
				}
			   return nomencla;
}

var partidos=[  
["Adolfo Alsina","1"],["Alberti","2"],["Almirante Brown","3"],["Ameghino","128"],["Arrecifes","10"],["Avellaneda","4"],["Ayacucho","5"],["Azul","6"],
["Bahia Blanca","7"],["Balcarce","8"],["Baradero","9"],["Berazategui","120"],["Berisso","114"],["Bolivar","11"],["Bragado","12"],
["Brandsen","13"],["CaÃ±uelas","15"],["Campana","14"],["Capitan Sarmiento","121"],["Carlos Casares","16"],["Carlos Tejedor","17"],
["Carmen de Areco","18"],["Castelli","20"],["Chacabuco","26"],["Chascomus","27"],["Chivilcoy","28"],["Colon","21"],["Coronel Dorrego","22"],
["Coronel Pringles","23"],["Coronel Rosales","113"],["Coronel Suarez","24"],["Daireaux","19"],["Dolores","29"],["Ensenada","115"],
["Escobar","118"],["Esteban Echeverria","30"],["Exaltacion de la Cruz","31"],["Ezeiza","130"],["Florencio Varela","32"],["General Alvarado","33"],
["General Alvear","34"],["General Arenales","35"],["General Belgrano","36"],["General Guido","37"],["General Lamadrid","40"],
["General Las Heras","41"],["General Lavalle","42"],["General Madariaga","39"],["General Paz","43"],["General Pinto","44"],["General Pueyrredon","45"],
["General Rodriguez","46"],["General San Martin","47"],["General Viamonte","49"],["General Villegas","50"],["Gonzalez Chavez","51"],["Guamini","52"],
["Hipolito Yrigoyen","119"],["Hurlingham","135"],["Islas Baradero","309"],["Islas Campana","314"],["Islas Ramallo","387"],["Islas San Fernando","396"],
["Islas San Nicolas","398"],["Islas San Pedro","399"],["Islas Tigre","357"],["Islas Zarate","338"],["Ituzaingo","136"],["Jose C. Paz","132"],["Juarez","53"],
["Junin","54"],["La Costa","123"],["La Plata","55"],["Lanus","25"],["Laprida","56"],["Las Flores","58"],["Leandro N. Alem","59"],["Lezama","137"],["Lincoln","60"],
["Loberia","61"],["Lobos","62"],["Lomas de Zamora","63"],["Lujan","64"],["Magdalena","65"],["Maipu","66"],["Malvinas Argentinas","133"],["Mar Chiquita","69"],
["Marcos Paz","68"],["Matanza","70"],["Mercedes","71"],["Merlo","72"],["Monte","73"],["Monte Hermoso","126"],["Moreno","74"],["Moron","101"],["Navarro","75"],
["Necochea","76"],["Nueve de Julio","77"],["Olavarria","78"],["Patagones","79"],["Pehuajo","80"],["Pellegrini","81"],["Pergamino","82"],["Pila","83"],["Pilar","84"],
["Pinamar","124"],["Pte. Peron","129"],["Puan","85"],["Punta Indio","134"],["Quilmes","86"],["Ramallo","87"],["Rauch","88"],["Rivadavia","89"],["Rojas","90"],["Roque Perez","91"],
["Saavedra","92"],["Saladillo","93"],["Salliquelo","122"],["Salto","67"],["San Andres de Giles","94"],["San Antonio de Areco","95"],["San Cayetano","116"],["San Fernando","96"],
["San Isidro","97"],["San Miguel","131"],["San Nicolas","98"],["San Pedro","99"],["San Vicente","100"],["Suipacha","102"],["Tandil","103"],["Tapalque","104"],["Tigre","57"],
["Tordillo","105"],["Tornquist","106"],["Trenque Lauquen","107"],["Tres Arroyos","108"],["Tres de Febrero","117"],["Tres Lomas","127"],["Veinticinco de Mayo","109"],
["Vicente Lopez","110"],["Villa Gesell","125"],["Villarino","111"],["Zarate","38"]
];
	
var gridCellRenderers=[
{
   featureType: 'LimpiezaCooperativas2015', 
   attrName: 'expediente',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				  var val2=value.replace('/','-').replace(' Alc:','-').replace(' Cpo:','-').replace(' ','');
				  var array=val2.split('-');
				  return '<a href="http://sistemas.gba.gov.ar/consulta/expedientes/movimientos.php?caract='+array[0]+'&nroexp='+array[1]+'&anioexp='+array[2]+'&alcance=0&nrocuerpo=1" target="_blank">'+value+'</a>';
		   }
	}
},
{
   featureType: 'parcelas_rt_geom',
   attrName: 'plano_rt',
    renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.mosp.gba.gov.ar/sig_hidraulica/planos/planos.asp?partido=0&todos=s&numpla='+value+'" target="_new">'+ value +'</a>';
			}
   }
},
{
   featureType: 'parcelas_rt_geom',
   attrName: 'ultimo_plano',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.mosp.gba.gov.ar/sistemas/geodesia/ugeodesia/Geodesia/'+value+'(PA).dwf" target="_blank">'+ value +'</a>';
		   },
   }
},
{
   featureType: 'parcelas_con_plano_geom',
   attrName: 'plano',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.mosp.gba.gov.ar/sistemas/geodesia/ugeodesia/Geodesia/'+value+'(PA).dwf" target="_blank">'+ value +'</a>';
		   }
   }
},
{
   featureType: 'parcelas_con_plano_geom',
   attrName: 'nomencla',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) { //funcion para convertir nomencla en human friendly
			  return convertNomencla(value);
		   },
		   options : {}
   }
},
{
   featureType: 'departamentos',
   attrName: 'PARTIDO',
   renderer: {
		   fn : Heron.widgets.GridCellRenderer.directLink,
		   options : {
				   url: 'http://www.mosp.gba.gov.ar/sig_hidraulica/planos/planos.asp?partido={PARTIDO}',
				   target: '_new'
		   }
   }
},
{
   featureType: 'dipsoh_obras_ref',
   attrName: 'id_obra',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
																				
				   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'obras_sigos_line',
   attrName: 'id_obra',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
																				
				   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'dipsoh_obras_sigos_total',
   attrName: 'id_obra',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if(value.substring(0,7)!='Buffer:'){															
				   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
				}else return value;
				},
		   options : {}
			}
},
{
   featureType: 'obras_dipsoh_por_etapa',
   attrName: 'id_obra',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'cartas050igm',
   attrName: 'CODIGO',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if(value.substring(0,7)!='Buffer:'){
				   return '<a href="./php/descargaIGN.php?codigo='+value+'&faja='+record.data.Faja+'" target="_blank">'+ value +'</a>';
				   }else return value;
		   },
		   options : {}
   }
},
{
   featureType: 'cartas100igm',
   attrName: 'codigo_0',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if(value.substring(0,7)!='Buffer:'){
				   return '<a href="http://ramsac.ign.gob.ar/posgar07_pg_web/modelo_100000_descarga.php?p=1&c='+value+'" target="_blank">'+ value +'</a>';
				   }else return value;
		   },
		   options : {}
   }
},
{
   featureType: 'departamentos_descarga',
   attrName: 'nomencla',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="./php/descargaDWG.php?codigo='+value+'&fajaOrig=NO" target="_blank">Faja 5</a> - <a href="./php/descargaDWG.php?codigo='+value+'&fajaOrig=SI" target="_blank">Faja Origen</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'parcelas',
   attrName: 'plano',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.mosp.gba.gov.ar/sistemas/geodesia/ugeodesia/Geodesia/'+value+'(PA).dwf" target="_blank">'+ value +'</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'parcelas',
   attrName: 'nomencla',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				return convertNomencla(value);
		   },
		   options : {}
   }
}];
							
var downloadFormats=['CSV',
					 'XLS',
					{
						name: 'Esri Shapefile (Campo Inchauspe faja 4 - EPSG:22194)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'ESRI Shapefile',
						targetSrs: 'EPSG:22194',
						fileExt: '.zip',
						mimeType: 'application/zip'
					},
					{
						name: 'Esri Shapefile (Campo Inchauspe faja 5 - EPSG:22195)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'ESRI Shapefile',
						targetSrs: 'EPSG:22195',
						fileExt: '.zip',
						mimeType: 'application/zip'
					},{
						name: 'Esri Shapefile (Campo Inchauspe faja 6 - EPSG:22196)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'ESRI Shapefile',
						targetSrs: 'EPSG:22196',
						fileExt: '.zip',
						mimeType: 'application/zip'
					},
					{
						name: 'DXF (Campo Inchauspe faja 4 - EPSG:22194)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22194',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'DXF (Campo Inchauspe faja 5 - EPSG:22195)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22195',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'DXF (Campo Inchauspe faja 6 - EPSG:22196)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22196',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'KML (Google Earth)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'KML',
						targetSrs: 'EPSG:4326',
						fileExt: '.kml',
						mimeType: 'application/kml'
					}
					];
							
var resultPanel={
					xtype: 'hr_featurepanel',
					id: 'hr-featurepanel',
					header: false,
					border: false,
					autoConfig: true,
					showBottomToolbar:true,
					showTopToolbar:true,
					exportFormats: downloadFormats,
					gridCellRenderers: gridCellRenderers,
					hropts: {
						zoomOnRowDoubleClick: true,
						zoomOnFeatureSelect: false,
						zoomLevelPointSelect: 8,
						zoomToDataExtent: false
					}
				};
							
var toolBarItems=[
		{type: "any",
			options: {
				text: 'Información',
				tooltip: "Herramienta de información",
				enableToggle: false
			}
		},
		{type: "featureinfo", options: {
        pressed: true,
        popupWindow: {
            width: 320,
            height: 200,
            featureInfoPanel: {
				showTopToolbar: true,
				showBottomToolbar: true,
                //displayPanels: ['Table'],
				displayPanels: ['Table','Detail'],
                exportFormats: downloadFormats,
                hideColumns: ['objectid', 'gid'],
                maxFeatures: 10,
                autoConfigMaxSniff: 10,
				gridCellRenderers: gridCellRenderers,
                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true
				}
			}
		}},
		//{type: "scale", options: {width: 110}},
		{type: "-"} ,
		{type: "any",
			options: {
				text: 'Navegación',
				tooltip: "Herramientas de zoom y navegación",
				enableToggle: false
			}
		},
		{type: "pan"},
		{type: "zoomin"},
		{type: "zoomout"},
		{type: "zoomvisible"},
		{type: "zoomprevious"},
		{type: "zoomnext"},
		{type: "-"},
		{type: "any",
			options: {
				text: 'Medición',
				tooltip: "Herramientas de medición",
				enableToggle: false
			}
		},
		{type: "measurelength", options: {geodesic: true}},
		{type: "measurearea", options: {geodesic: true}},
		{type: "-"}, 
		{type: "any",
			options: {
				text: 'Búsqueda',
				tooltip: "Herramientas búsqueda y consultas",
				enableToggle: false
			}
		},
		{type: "coordinatesearch", options: {

				// see ToolbarBuilder.js
					  formWidth: 320
					, formPageX: 15
					, formPageY: 200
				// see CoordSearchPanel.js
					// , title: 'My title'
					, titleDescription: 'Elija la proyección de entrada...<br><br>Luego ingrese los valores Lon/Lat o las coordenadas<br>X/Y.<br>&nbsp;<br>'
					, titleDescriptionStyle: 'font-size:11px; color:dimgrey;'
					, bodyBaseCls: 'x-form-back'
					, bodyItemCls: 'hr-html-panel-font-size-11'
					, bodyCls: 'hr-html-panel-font-size-11'
					, fieldMaxWidth: 200
					, fieldLabelWidth: 80
					, fieldStyle: 'color: blue;'
					, fieldLabelStyle: 'color: darkblue'
					, layerName: 'Lon/Lat'
					, onProjectionIndex: 1
					, onZoomLevel: -1
					, showProjection: true
					, showZoom: true
					, showAddMarkers: true
					, checkAddMarkers: true
					, showHideMarkers: true
					, checkHideMarkers: false
					, showResultMarker: true
					, fieldResultMarkerStyle: 'color: green;'
					, fieldResultMarkerText: 'Posicion del marcador: '
					, fieldResultMarkerSeparator: ' | '
					, fieldResultMarkerPrecision: 4
					, removeMarkersOnClose: true
					, showRemoveMarkersBtn: true
					, buttonAlign: 'center'		// left, center, right
					, hropts: [
						{
							  projEpsg: 'EPSG:22195'
							, projDesc: 'EPSG:22195 - Campo Inchauspe/Faja5'
							, fieldLabelX: 'X [m]'
							, fieldLabelY: 'Y [m]'
							, fieldEmptyTextX: 'Ingrese coordenada X...'
							, fieldEmptyTextY: 'Ingrese coordenada Y...'
							, fieldMinX: 4500000
							, fieldMinY: 5000000
							, fieldMaxX: 6500000
							, fieldMaxY: 7000000
							, fieldDecPrecision: 2
							, iconWidth: 32
							, iconHeight: 32
							, localIconFile: 'redpin.png'
							, iconUrl: null
						},
						{
							  projEpsg: 'EPSG:4326'
							, projDesc: 'EPSG:4326 - WGS 84'
							, fieldLabelX: 'Lon [Grad]'
							, fieldLabelY: 'Lat [Grad]'
							, fieldEmptyTextX: 'Ingrese Longitud...'
							, fieldEmptyTextY: 'Ingrese Latitud...'
							, fieldMinX: -180
							, fieldMinY: -90
							, fieldMaxX: 180
							, fieldMaxY: 90
							, fieldDecPrecision: 6
							, iconWidth: 32
							, iconHeight: 32
							, localIconFile: 'bluepin.png'
							, iconUrl: null
						}
					]

		// ====================================

	}},
	GObec.streetview.toolbar,
	{
		type: "any",
		options: {
			text: '',
			tooltip: 'Buscar con Google Places',
			iconCls: 'icon-map-magnify',
			id: "googleSearch",
			handler: function (objRef) {
				if (!searchWin) {
					searchWin = new Ext.Window({
						title: "Find",
						layout: 'fit',
						width: 400,
						height: 70,
						plain: true,
						closeAction: 'hide',
						html: '<div style="padding: 5px" id="searchContent"><input style="width: 370px" type="text" id="gAddress" name="gAddress" value="" /></div>',
						x: 300,
						y: 100
					});
				}
				if (typeof(objRef) === "object") {
					searchWin.show(objRef);
				} else {
					searchWin.show();
				}//end if object reference was passed
				var input = document.getElementById('gAddress');
				var options = {
					//bounds: defaultBounds
					//types: ['establishment']
				};
				var autocomplete = new google.maps.places.Autocomplete(input, options);
				//console.log(autocomplete.getBounds());
				google.maps.event.addListener(autocomplete, 'place_changed', function () {
					var place = autocomplete.getPlace();
					var transformPoint = function (lat, lon, s, d) {
						var p = [];
						if (typeof Proj4js === "object") {
							var source = new Proj4js.Proj(s);    //source coordinates will be in Longitude/Latitude
							var dest = new Proj4js.Proj(d);
							p = new Proj4js.Point(lat, lon);
							Proj4js.transform(source, dest, p);
						}
						else {
							p.x = null;
							p.y = null;
						}
						return p;
					};
					var p = transformPoint(place.geometry.location.lng(), place.geometry.location.lat(), "EPSG:4326", "EPSG:900913");
					var point = new OpenLayers.LonLat(p.x, p.y);
					Heron.App.map.setCenter(point, 12);
					try {
						placeMarkers.destroy();
					} catch (e) {
					}

					placeMarkers = new OpenLayers.Layer.Markers("Markers");
					Heron.App.map.addLayer(placeMarkers);
					placeMarkers.addMarker(new OpenLayers.Marker(point));
					});

			}
		}
	},
	{
        type: "searchcenter",
        // Options for SearchPanel window
        options: {
            show: false,
				searchWindow: {
					title: __('Multiple Searches'),
					x: 100,
					y: undefined,
					width: 360,
					height: 440,
					items: [
						{
						xtype: 'hr_multisearchcenterpanel',
						height: 600,
						hropts: [
								{
									searchPanel: { 						 //busqueda de mediciones
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda de mediciones',
										description: 'Busqueda de mediciones por fecha',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/dipsoh/wfs"
											,featureType: "mediciones_geom"
											,featurePrefix: "dipsoh"
											,featureNS : serverURL+"/geoserver/dipsoh_postgis"
										}),
										downloadFormats: [],
										items: [
											{	
												xtype:'combo',
												fieldLabel: '  Estacion',
												name: "estacion",
												typeAhead: true,
												width: 200,
												triggerAction: 'all',
												lazyRender:true,
												mode: 'local',
												tpl: '<tpl for="."><div ext:qtip="{tip}" class="x-combo-list-item">{display}</div></tpl>',
												store: new Ext.data.ArrayStore({
													id: 0,
													fields: [
														'display',
														'tip'
													],
													data: [['Mar del Tuyu1 - limnigrafo','232'],
													['Mar del Tuyu2 - pluviografo','240'],
													['Briales La Plata - pluviografo','287'],
													['Briales La Plata1 - pluviografo','288'],
													['DiPSOH2 - pluviografo','311'],
													['DiPSOH1 - pluviografo','312'], 
													['LIMNI01 Berisso - limnigrafo','314'], 
													['LIMNI02 Berisso - limnigrafo','315'], 
													['LIMNI03 Berisso - limnigrafo','316'], 
													['LIMNI04 Berisso - limnigrafo','317'],
													['San_Antonio_de_Areco','San_Antonio_de_Areco'],
													['Carmen_de_Areco','Carmen_de_Areco'],
													['Rawson','Rawson']]

												}),
												//valueField: 'display',
												//displayField: 'tip',
												listeners: { 'select': function(combo, record, index){ 
														//console.log(record.data['display']);
														combo.setValue(record.data['tip']);
														}  
													}
											},
											{
												xtype: 'datefield'
												, name: "fecha__ge"
												, width: 200
												, format: 'Y-m-d\\TH:i:s'   // the format of date with time.
												, value: new Date()
												, fieldLabel: "  Fecha desde"
											},
											{
												xtype: 'datefield'
												, name: "fecha__le"
												, width: 200
												, format: 'Y-m-d\\TH:i:s'   // the format of date with time.
												, value: new Date()
												, fieldLabel: "  Fecha hasta"
											},
											{	
												xtype:'combo',
												fieldLabel: '  Variable',
												name: "variable__like",
												typeAhead: true,
												width: 200,
												triggerAction: 'all',
												lazyRender:true,
												mode: 'local',
												tpl: '<tpl for="."><div ext:qtip="{tip}" class="x-combo-list-item">{display}</div></tpl>',
												store: new Ext.data.ArrayStore({
													id: 0,
													fields: [
														'display',
														'tip'
													],
													data: [['Temperatura Ambiente Interior (°C)','Temp'],
															['Presión Atmosférica (hPa)','Pres'], 
															['Nivel de Agua (cm)','Nivel'], 
															['Lluvia Caída (mm)','Lluvia'],
															['Lluvia Acumulada (mm) (Areco)','Precip'],
															['Lluvia Caída (mm) (Areco)','Diff']
															]

												}),
												//valueField: 'myId',
												//displayField: 'display'
												listeners: { 'select': function(combo, record, index){ 
														//console.log(record.data['display']);
														combo.setValue(record.data['tip']);
														}  
													}
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Formato de fecha: AAAA-MM-DD<br>Formato de hora: HH:MM:SS',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											},
											{
												xtype:"button",
												//anchor: "20%",
												text: 'Actualizar datos',
												//tooltip: __('Start a new search'),
												listeners: {
													click: function () {
															Ext.Ajax.request({
																url: './php/actualizaDatosMinPlan.php?',
																disableCaching:false,
																success: function(response){
																var data = response.responseText;	   
																	
																		var win;
																		if(!win){
																			win = new Ext.Window({
																				title:'Data',
																				width: 900,
																				height: 500,
																				closeAction :'hide',
																				modal: true, 
																				html: data,
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
																})
													}
												}
											}
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {							//busqueda de planos
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda de planos Rel Territorial',
										description: 'Busqueda de planos Rel Territorial',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/dipsoh/wfs"
											,featureType: "parcelas_rt_geom"
											,featurePrefix: "dipsoh"
											,featureNS : serverURL+"/geoserver/dipsoh_postgis"
										}),
										downloadFormats: [],
										items: [
											/*{
												xtype: "textfield",
												name: "nomcat__like",
												value: 'Part:',
												fieldLabel: "  Nomcat",
												listeners: { 'change': function(e){ 
														var str=(e.getValue());    
														str=str.split(' ').join('%');
														//console.log(str);
														e.setValue(str);
														}  
													}
											},*/
											{
												xtype: "textfield",
												name: "plano_rt__like",
												value: '55-',
												fieldLabel: "  Num.Plano"
											},
											{
												 xtype: "textfield",
												 name: "obra__like",
												 fieldLabel: "  Obra"
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Escriba una parte o un numero de plano completo para buscar.<br/>',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											}
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {					//busqueda de obras sigos
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda de Obras Sigos',
										description: 'Busqueda de Obras Sigos',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/dipsoh/wfs"
											,featureType: "dipsoh_obras_ref"
											,featurePrefix: "dipsoh"
											,featureNS : serverURL+"/geoserver/dipsoh_postgis"
										}),
										downloadFormats: [],
										items: [
											{
												xtype: "textfield",
												name: "nombre__like",
												//value: '',
												fieldLabel: "  Nombre"
											},
											{	
												xtype:'combo',
												fieldLabel: '  Etapa',
												name: "etapa__like",
												typeAhead: true,
												width: 125,
												triggerAction: 'all',
												lazyRender:true,
												mode: 'local',
												store: new Ext.data.ArrayStore({
													id: 0,
													fields: [
														'myId',
														'displayText'
													],
													data: [[0,''],[1, 'FINALIZACION'], [2, 'LICITACION'], [3, 'PROYECTO'], [4, 'EJECUCION'], [5, 'ADJUDICACION'], [6, 'CONTRATACION']]

												}),
												valueField: 'myId',
												displayField: 'displayText'
											},
											{
												 xtype: "textfield",
												 name: "contratista__like",
												 fieldLabel: "  Contratista"
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Escriba algun dato para buscar<br/>',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											}
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: { 						//busqueda de parcelas por partida/partido
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda parcelas Arba por partido y partida',
										description: 'Busqueda de parcelas Arba por partido y partida inmobiliaria',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/dipsoh/wfs"
											,featureType: "parcelas"
											,featurePrefix: "dipsoh"
											,featureNS :  serverURL+"/geoserver/dipsoh_postgis"
										}),
										downloadFormats: [],
										items: [
											/*{
												xtype: "textfield",
												name: "partido",
												value: '55',
												fieldLabel: "  Partido"//,
												//listeners: { 'change': function(){      alert('you changed the text of this input field');    }  }
											},*/
											{	
												xtype:'combo',
												fieldLabel: '  Partido',
												name: "partido",
												typeAhead: true,
												width: 150,
												triggerAction: 'all',
												lazyRender:true,
												mode: 'local',
												tpl: '<tpl for="."><div ext:qtip="{tip}" class="x-combo-list-item">{display}</div></tpl>',
												store: new Ext.data.ArrayStore({
													id: 0,
													fields: ['display',	'tip'],
													data: partidos
												}),
												listeners: { 'select': function(combo, record, index){ 
														combo.setValue(record.data['tip']);
														}  
												}
											},
											{
												 xtype: "textfield",
												 name: "partida",
												 fieldLabel: "  Partida"
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Ingrese partido y partida inmobiliaria.<br/>La busqueda puede tardar 10-20 segundos. <br/>Si demora mas es posible que los datos ingresados sean incorrectos',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											}
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {								//busqueda de parcelas por nomenclatura
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda de parcelas Arba por nomenclatura',
										description: 'Busqueda de parcelas Arba por nomenclatura',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/dipsoh/wfs"
											,featureType: "parcelas"
											,featurePrefix: "dipsoh"
											,featureNS : serverURL+"/geoserver/dipsoh_postgis"
										}),
										downloadFormats: [],
										items: [
											{	
												xtype:'combo',
												fieldLabel: '  Partido',
												name: "partido",
												typeAhead: true,
												width: 150,
												triggerAction: 'all',
												lazyRender:true,
												mode: 'local',
												tpl: '<tpl for="."><div ext:qtip="{tip}" class="x-combo-list-item">{display}</div></tpl>',
												store: new Ext.data.ArrayStore({
													id: 0,
													fields: ['display',	'tip'],
													data: partidos
												}),
												listeners: { 
														'select': function(combo, record, index){ 
														combo.setValue(record.data['tip']);
														},
														'change': function(e){ 
														var str=(e.getValue());
														str="00"+str;
														str=str.substr(str.length - 3);
														str=str.split(' ').join('%');
														e.setValue(str);
														armarNomencla();
														}
												}
											},
											/*{
												xtype: "textfield",
												name: "partido",
												value: '',
												id:'form_part',
												fieldLabel: "  Partido",
												listeners: { 'change': function(e){ 
														var str=(e.getValue());
														str="00"+str;
														str=str.substr(str.length - 3);
														str=str.split(' ').join('%');
														e.setValue(str);
														armarNomencla();
														}}
											},*/
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_circ',
												fieldLabel: "  Circunscripcion",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val="00"+val;
														val=val.substr(val.length - 2);
														val=val.split(' ').join('%');
														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_secc',
												fieldLabel: "  Seccion",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val="00"+val;
														val=val.substr(val.length - 2);
														val=val.split(' ').join('%');
														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_otro',
												fieldLabel: "  Ch/Qt/Fr/Mz",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val=val.split(' ').join('%');
														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Escriba los datos de Chacra / Quinta o Fracción en ese orden, separando por espacios numeros y letras. Ej: 3 A 1 B',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_pnum',
												fieldLabel: "  Parcela Numero",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val="000"+val;
														val=val.substr(val.length - 4);
														val=val.split(' ').join('%');
														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_plet',
												fieldLabel: "  Parcela Letra",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val="00"+val;
														val=val.substr(val.length - 3);
														val=val.split(' ').join('%');
														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "textfield",
												name: "nomencla__like",
												value: '',
												id:'form_nomencla',
												hidden:true,
												fieldLabel: "  Nomenclatura:",
												listeners: { 'specialkey': function(e){ armarNomencla();}}
											}
											
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_searchbydrawpanel',
										name: __('Search by Drawing'),
										header: false
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_searchbyfeaturepanel',
										name: __('Search by Feature Selection'),
										description: 'Seleccione objetos espaciales de una capa y realize una busqueda espacial basada en ellos en otra capa.',
										header: false,
										border: false,
										bodyStyle: 'padding: 6px',
										style: {
											fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
											fontSize: '12px'
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_searchbybuffer',
										name: __('Busqueda por buffer'),
										description: 'Seleccione objetos espaciales de una capa y realize una busqueda espacial basada en un buffer.',
										header: false,
										border: false,
										bodyStyle: 'padding: 6px',
										style: {
											fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
											fontSize: '12px'
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_gxpquerypanel',
										name: __('Build your own searches'),
										description: 'Busqueda por recuadro y por atributos',
										header: false,
										border: false,
										caseInsensitiveMatch: true,
										autoWildCardAttach: true
									},
									resultPanel: resultPanel
								}
							]
						}
					]
				}
			}
		},
		{type: "-"},
		{type: "any",
			options: {
				text: 'Impresión',
				tooltip: "Interfaces de impresión",
				enableToggle: false
			}
		},
		{type: "printdialog", options: {url: serverURL+'/print/pdf' , windowWidth: 360, id:'prevImpresion'
			// , showTitle: true
			 , mapTitle: 'Sig DiPSOH'
			// , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
			// , showComment: true
			 , mapComment: 'Provincia de Buenos Aires'
			// , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
			// , showFooter: true
			// , mapFooter: 'My Footer - Print Dialog'
			// , mapFooterYAML: "mapFooter"	// MapFish - field name in config.yaml - default is: 'mapFooter'
			// , showRotation: true
			// , showLegend: true
			, showLegendChecked: true
			, showOutputFormats: true
			// , mapLimitScales: false
		  }
		},
		{  //print screen
			
			create : function(mapPanel, options) {
				// A trivial handler
				options.handler = function() {
				window.print();
				};
				// Provide an ExtJS Action object
				// If you use an OpenLayers control, you need to provide a GeoExt Action object.
				return new Ext.Action(options);
			},

			/* Options to be passed to your create function. */
			options : {
				tooltip: 'Imprimir Pantalla',
				iconCls: "icon-printscr",
				enableToggle : false,
				pressed : false,
				id: "print",
				toggleGroup: "toolGroup",
				msg: 'Imprimir Pantalla'
			 }
			
		},
		{type: "-"},
		{type: "any",
			options: {
				text: 'Edición',
				tooltip: "Herramientas para agregar geometrias"
				}
		},
		{type: "upload", options: {
			upload: {
             layerName: __('My Upload'),
             visibleOnUpload: true,
             url: serverURL+'/cgi-bin/heron.cgi',
             params: {
                 action: 'upload',
                 mime: 'text/html',
                 encoding: 'escape'
             },
             formats: [
                 {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
                 //{name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                 {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML'},
                 {name: 'CSV (with X,Y)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                 {name: 'ESRI Shape (zip, WGS84/EPSG:4326)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
				 {name: 'ESRI Shape (zip, EPSG:3857, EPSG:900913 - Google)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:900913')},
                 {name: 'ESRI Shape (zip, Campo Inchauspe faja 5 - EPSG:22195)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:22195')}
             ],
             // For custom projections use Proj4.js
             fileProjection: new OpenLayers.Projection('EPSG:4326')
			}

		  }
		},
		{type: "oleditor", options: {
			pressed: false,
			// Options for OLEditor
			olEditorOptions: {
					activeControls: ['UploadFeature', 'DownloadFeature', 'Separator', 'Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteAllFeatures', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
					featureTypes: ['text', 'regular', 'polygon', 'path', 'point'],
					language: 'en',
					DownloadFeature: {
							url: serverURL+'/cgi-bin/heron.cgi',
							formats: [
									{name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
									//{name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
									{name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')},
									//{name: 'ESRI Shapefile (zipped, WGS84)', fileExt: '.zip', mimeType: 'application/zip', formatter: 'OpenLayers.Format.GeoJSON', targetFormat: 'ESRI Shapefile', fileProjection: new OpenLayers.Projection('EPSG:4326')}
							],
							// For custom projections use Proj4.js
							fileProjection: new OpenLayers.Projection('EPSG:4326')
					},
					UploadFeature: {
							url: serverURL+'/cgi-bin/heron.cgi',
							formats: [
									{name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
									//{name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
									{name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')},
									//{name: 'ESRI Shapefile (zipped, WGS84)', fileExt: '.zip', mimeType: 'application/zip', formatter: 'OpenLayers.Format.GeoJSON', targetFormat: 'ESRI Shapefile', fileProjection: new OpenLayers.Projection('EPSG:4326')}
							],
							// For custom projections use Proj4.js
							fileProjection: new OpenLayers.Projection('EPSG:4326')
					}
				}
			}
         },
		{type: "-"},
		{type: "help", options: {tooltip: 'Ayuda', contentUrl: 'help.html'}}//,
	]
//variables que cargan con los layers

var apiKey = "ApjNQIT6SLCoD48dofLod3eQBSMsM933Yoe-GDn1uE3aVZjSCjgQxLWifL1Iic6_" //visor
var mBpos="/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiNDg2IiwiYSI6IkNadnAwUk0ifQ.BIKNGrVqVAilUH7g0dsmxg";
var wmsURL=serverURL+'/geoserver/dipsoh/wms?'; //gwc/service/wms
var gwcURL=serverURL+'/geoserver/dipsoh/gwc/service/wms?'; //gwc/service/wms

Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [
    /*{
        name: 'CSV',
        outputFormat: 'csv',
        fileExt: '.csv'
    },
    {
        name: 'Esri SHP (zip, EPSG:3857 - EPSG:900913)',
        outputFormat: 'SHAPE-ZIP',
        fileExt: '.zip'
    },*/
    {
        name: 'GeoJSON - EPSG:900913',
        outputFormat: 'json',
        fileExt: '.json'
    }
];

var treeTheme = [
	{
		text:'Capas Base', expanded: true, children:
			[
				{nodeType: "gx_layer", layer: "Cartas IGN" },
				{nodeType: "gx_layer", layer: "Bing Hibrido"},
				{nodeType: "gx_layer", layer: "OpenStreetsMap" },
				{nodeType: "gx_layer", layer: "mdt_ign" , text:"Modelo digital IGN" },
				{text:'Mas...', children:
						[
							//{nodeType: "gx_layer", layer: "Google Streets" },
							//{nodeType: "gx_layer", layer: "toner", text:"Stamen Toner" },
							{nodeType: "gx_layer", layer: "ESRI Satelital" },
							{nodeType: "gx_layer", layer: "ESRI Topografico"},
							{nodeType: "gx_layer", layer: "Bing Aereo"},
							{nodeType: "gx_layer", layer: "Bing Callejero"},
							{nodeType: "gx_layer", layer: "Mapbox - High Contrast"},
							{nodeType: "gx_layer", layer: "Mapbox - Dark"},
							{nodeType: "gx_layer", layer: "Mapbox - Streets/Satellite"},
							//{nodeType: "gx_layer", layer: "Google Hybrid" },
							{nodeType: "gx_layer", layer: "Geo5000_Faja5",text:"Geodesia 1:5000 Faja5"},
							{nodeType: "gx_layer", layer: "Geo5000_Faja6",text:"Geodesia 1:5000 Faja6"},
							{nodeType: "gx_layer", layer: "Blanco"}
						]
				}
			]
	},
	{
		text:'Capas de informacion', expanded: true, children:[]
	}
];

var layerItems=[
		
		/*
		 * Basemaps OpenStreetMap
		 */
		//new OpenLayers.Layer.Stamen("toner"),
		new OpenLayers.Layer.OSM("OpenStreetsMap"),
		
		/*
		 * Basemaps MapBox
		 */
		new OpenLayers.Layer.XYZ( "Mapbox - High Contrast",
			[
				"http://a.tiles.mapbox.com/v4/mapbox.high-contrast"+mBpos,
				"http://b.tiles.mapbox.com/v4/mapbox.high-contrast"+mBpos,
				"http://c.tiles.mapbox.com/v4/mapbox.high-contrast"+mBpos,
				"http://d.tiles.mapbox.com/v4/mapbox.high-contrast"+mBpos
			], {
				attribution: "Tiles &copy; <a href='http://mapbox.com/'>MapBox</a>",
				sphericalMercator: true,
				wrapDateLine: true,
				displayInLayerSwitcher:false
		}),
		new OpenLayers.Layer.XYZ( "Mapbox - Streets/Satellite",
			[
				"http://a.tiles.mapbox.com/v4/mapbox.streets-satellite"+mBpos,
				"http://b.tiles.mapbox.com/v4/mapbox.streets-satellite"+mBpos,
				"http://c.tiles.mapbox.com/v4/mapbox.streets-satellite"+mBpos,
				"http://d.tiles.mapbox.com/v4/mapbox.streets-satellite"+mBpos
			], {
				attribution: "Tiles &copy; <a href='http://mapbox.com/'>MapBox</a>",
				sphericalMercator: true,
				wrapDateLine: true,
				displayInLayerSwitcher:false
		}),
		new OpenLayers.Layer.XYZ( "Mapbox - Dark",
			[
				"http://a.tiles.mapbox.com/v4/mapbox.dark"+mBpos,
				"http://b.tiles.mapbox.com/v4/mapbox.dark"+mBpos,
				"http://c.tiles.mapbox.com/v4/mapbox.dark"+mBpos,
				"http://d.tiles.mapbox.com/v4/mapbox.dark"+mBpos
			], {
				attribution: "Tiles &copy; <a href='http://mapbox.com/'>MapBox</a>",
				sphericalMercator: true,
				wrapDateLine: true,
				displayInLayerSwitcher:false
		}),

		/*
		 * Basemap Tilecache y geoserver
		 */
		
		new OpenLayers.Layer.WMS( "Cartas IGN", 
			serverURL+"/tilecache/tilecache.cgi", 
			{
			layers: 'basic', 
			reproyect:true,
			format: 'image/png'
			},
			{transitionEffect: 'resize',isBaseLayer:true,displayInLayerSwitcher:false}
		),
		 new OpenLayers.Layer.WMS("mdt_ign",gwcURL,
			{layers: 'dipsoh:mdt',transparent: true, format:'image/png', tiled: true }, 
			{isBaseLayer:true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 


		new OpenLayers.Layer.WMS("Geo5000_Faja5",gwcURL,
			{layers: 'dipsoh:Geo5000_F5',transparent: true, format:'image/png', tiled: true }, 
			{visibility: false,isBaseLayer:false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 
		
		new OpenLayers.Layer.WMS("Geo5000_Faja6",gwcURL,
			{layers: 'dipsoh:Geo5000_F6',transparent: true, format:'image/png', tiled: true }, 
			{visibility: false,isBaseLayer:false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 
		
		/*
		 * Basemap Google Maps
		
		new OpenLayers.Layer.Google(
			  "Google Streets", // the default
			  {'sphericalMercator': true, numZoomLevels: 20,displayInLayerSwitcher:false}
		),
		
		new OpenLayers.Layer.Google(
				"Google Hybrid",
				{type: google.maps.MapTypeId.HYBRID, visibility: true,'sphericalMercator': true, numZoomLevels: 20,displayInLayerSwitcher:false}
		),
		 */
		 
		/*
		 * Basemaps ESRI
		 */
		new OpenLayers.Layer.XYZ("ESRI Topografico",
				"http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}",
				{sphericalMercator: true, attribution: "Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a>", isBaseLayer: true, displayInLayerSwitcher:false} 
		),
		new OpenLayers.Layer.XYZ("ESRI Satelital",
				"http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}",
				{sphericalMercator: true, attribution: "<font color='white'>Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a></font>", isBaseLayer: true,displayInLayerSwitcher:false} 
		),
		
		/*
		BING
		*/
								
		 new OpenLayers.Layer.Bing({
			name: "Bing Callejero",
			key: apiKey,
			type: "Road",
			displayInLayerSwitcher:false
		}),
		new OpenLayers.Layer.Bing({
			name: "Bing Hibrido",
			key: apiKey,
			type: "AerialWithLabels",
			displayInLayerSwitcher:false
		}),
		new OpenLayers.Layer.Bing({
			name: "Bing Aereo",
			key: apiKey,
			type: "Aerial",
			displayInLayerSwitcher:false
		}),
		

		/*
		 * Basemap Blanco
		 */
		
		new OpenLayers.Layer.Image(
				"Blanco",
				Ext.BLANK_IMAGE_URL,
				new OpenLayers.Bounds(-7822279.086949371,-5021408.575019243,-5346607.805595686,-3837573.972371518),
				new OpenLayers.Size(10, 10),
				{isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize',numZoomLevels: 18}
		),
	]	
		/*
		 * Layers nuestros: Provincia
		 */
provincia=[	
		layerPartidos = new OpenLayers.Layer.WMS("Partidos",gwcURL,
			{layers: 'dipsoh:departamentos',transparent: true, format:'image/png', singleTile: true }, 
			{visibility: true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
			 
		), 
				
		new OpenLayers.Layer.WMS("Hidrografia",wmsURL,
			{layers: 'dipsoh:hidro_view',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Hidrografia_detalle",wmsURL,
			{layers: 'dipsoh:hidro_detalle',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Hidrografia_detalle_OSM",wmsURL,
			{layers: 'dipsoh:hidro_detalle_OSM',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Lagos_y_lagunas",wmsURL,
			{layers: 'dipsoh:lagunas',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		), 
		
		new OpenLayers.Layer.WMS("Cuencas",wmsURL,
			{layers: 'dipsoh:cuencas',transparent: true, format:'image/png', singleTile: true },{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),

		new OpenLayers.Layer.WMS("Cuencas Detalle",wmsURL,
			{layers: 'dipsoh:cuencas_detalle',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Rutas",wmsURL,
			{layers: 'dipsoh:rutas_filter',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			} 
		), 
				
		
		new OpenLayers.Layer.WMS("Censo_2010",wmsURL,
			{layers: 'dipsoh:indec_2010',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Estaciones de medicion",wmsURL,
			{layers: ['dipsoh:estaciones_medicion','dipsoh:estaciones_historico_salado'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
	]

layerItems=layerItems.concat(provincia);
treeTheme[1].children.push({
					text:'Provincia', expanded: true, children:
						[
							{nodeType: "gx_layer", layer: "Partidos" },
							{nodeType: "gx_layer", layer: "Hidrografia",text:"Hidrografia escala 1:250.000" },
							{nodeType: "gx_layer", layer: "Hidrografia_detalle" },
							{nodeType: "gx_layer", layer: "Hidrografia_detalle_OSM" },
							{nodeType: "gx_layer", layer: "Lagos_y_lagunas",text:"Lagos y lagunas",legend:true },
							{nodeType: "gx_layer", layer: "Cuencas",text:"Cuencas (actualizado el 12/4/2017)" },
							{nodeType: "gx_layer", layer: "Cuencas Detalle"},
							{nodeType: "gx_layer", layer: "Rutas" ,legend:true },
							{nodeType: "gx_layer", layer: "Censo_2010",text:"Censo 2010 INDEC",legend:true },
							{nodeType: "gx_layer", layer: "Estaciones de medicion",legend:true} 
							
						]
				});
	
		/*
		 * Layers nuestros: ARBA
		 */
arba=[
		 layerCircunscripcionesArba = new OpenLayers.Layer.WMS("Partidos y Circunscripciones",gwcURL,
			{layers: ['dipsoh:secciones_vista_2018','dipsoh:circunscripciones_vista_2018','dipsoh:partidos_vista_2018'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),		
		layerMacizosArba = new OpenLayers.Layer.WMS("Macizos",gwcURL,
			{layers: 'dipsoh:macizos_vista_2018',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerParcelasArba = new OpenLayers.Layer.WMS("Parcelas",gwcURL,
			{layers: 'dipsoh:parcelas_vista_2018',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerCallesArba = new OpenLayers.Layer.WMS("Calles",gwcURL,
			{layers: 'dipsoh:calles_2018',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerBarriosCerradosArba = new OpenLayers.Layer.WMS("Urbanizaciones Cerradas",gwcURL,
			{layers: ['	dipsoh:urbanizaciones_cerradas_2018'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(arba);
treeTheme[1].children.push({
					text:'Parcelario Arba 2018', nodeType: 'hr_cascader', expanded: false, children:
						[
							{nodeType: "gx_layer", layer: "Partidos y Circunscripciones" },
							{nodeType: "gx_layer", layer: "Macizos" },
							{nodeType: "gx_layer", layer: "Parcelas" },
							{nodeType: "gx_layer", layer: "Calles" },
							{nodeType: "gx_layer", layer: "Urbanizaciones Cerradas" }
						]
				});

		/*
		 * Layers nuestros: Obras
		 */
obras=[
		 new OpenLayers.Layer.WMS("Obras con planilla",wmsURL,
			{layers: 'dipsoh:conductos_con_planilla',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Trazas DiPSOH",wmsURL,
			{layers: 'dipsoh:obras_sigos_line',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Obras_SIGOS",wmsURL,
			{layers: 'dipsoh:dipsoh_obras_ref',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerTrazas = new OpenLayers.Layer.WMS("Trazas+Obras_SIGOS",wmsURL,
			{layers: ['dipsoh:dipsoh_obras_sigos_total'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(obras);
treeTheme[1].children.push({
					text:'Obras Hidraulica',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Obras con planilla" , text:"Antecedentes en PDF",legend:true },
							{nodeType: "gx_layer", layer: "Trazas DiPSOH" , text:"Obras DPH",legend:true },
							{nodeType: "gx_layer", layer: "Obras_SIGOS", text:"Obras Sigos - Referencia",legend:true  },
							{nodeType: "gx_layer", layer: "Trazas+Obras_SIGOS" ,text:"Obras Sigos - Trazas",legend:true }
						]
				});

		/*
		 * Layers nuestros: Relevamiento
		 */
relevamiento=[
		new OpenLayers.Layer.WMS("Red_Geoba",wmsURL,
			{layers: 'dipsoh:red_geoba_22195',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Estaciones permanentes IGN",wmsURL,
			{layers: 'dipsoh:estaciones_permanentes_IGN',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerParcelasRT = new OpenLayers.Layer.WMS("Parcelas_RT",wmsURL,
			{layers: 'dipsoh:parcelas_rt_geom',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Parcelas_con_plano",gwcURL,
			{layers: 'dipsoh:parcelas_con_plano_geom',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Puntos_acotados_IGN",wmsURL,
			{layers: 'dipsoh:puntosacotados_22195',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Curvas_de_nivel",wmsURL,
			{layers: 'dipsoh:curvas_de_nivel',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("puntosGeodesia5000",wmsURL,
			{layers: 'dipsoh:puntosGeodesia5000',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Cartas_Geodesia_1:5000",wmsURL,
			{layers: 'dipsoh:cartas_geodesia_5000',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Red de nivelacion IGN",wmsURL,
			{layers: 'dipsoh:nivelacion_IGN',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(relevamiento);
treeTheme[1].children.push({
					text:'Relevamiento',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Red_Geoba",legend:true },
							{nodeType: "gx_layer", layer: "Estaciones permanentes IGN",legend:true },
							{nodeType: "gx_layer", layer: "Parcelas_RT",text:"Planos en Rel. Territorial" },
							{nodeType: "gx_layer", layer: "Parcelas_con_plano",text:"Planos en Geodesia" },
							{nodeType: "gx_layer", layer: "Puntos_acotados_IGN",legend:true  },
							{nodeType: "gx_layer", layer: "Curvas_de_nivel",legend:true  },
							{nodeType: "gx_layer", layer: "puntosGeodesia5000",legend:true,text:"Puntos fijos Geodesia 5000"},
							{nodeType: "gx_layer", layer: "Cartas_Geodesia_1:5000",legend:true  },
							{nodeType: "gx_layer", layer: "Red de nivelacion IGN",legend:true  }
						]
				});
 		/*
		 * Layers nuestros: Mantenimiento
		 */
mantenimiento=[
		new OpenLayers.Layer.WMS("Limpiezas Cooperativas 2015",wmsURL,
			{layers: 'dipsoh:LimpiezaCooperativas2015',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Limpiezas Cooperativas 2017",wmsURL,
			{layers: 'dipsoh:LimpiezaCooperativasNov2017',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Relevamiento canales",wmsURL,
			{layers: 'dipsoh:mantenimiento_relevamientos_kml',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Analisis Zona VIII",wmsURL,
			{layers: 'dipsoh:Mantenimiento_AnalisisZonaVIII',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(mantenimiento);
treeTheme[1].children.push({
					text:'Direccion de mantenimiento',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Limpiezas Cooperativas 2015"},
							{nodeType: "gx_layer", layer: "Limpiezas Cooperativas 2017"}, 
							{nodeType: "gx_layer", layer: "Relevamiento canales"},
							{nodeType: "gx_layer", layer: "Analisis Zona VIII" ,text:"Analisis zona VIII"},
						]
				});
		/*
		 * Layers nuestros: Cuenca Lujan
		 */
lujan=[
		new OpenLayers.Layer.WMS("Urbanizaciones e industrias",wmsURL,
			{layers: 'dipsoh:lujan_urbanizaciones-industrias-asentamientos',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		), 
		//dipsoh:lujan_parques_industriales
		new OpenLayers.Layer.WMS("Parques Industriales",wmsURL,
			{layers: 'dipsoh:lujan_parques_industriales',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("MDE Palsar Lujan",wmsURL,
			{layers: 'dipsoh:MDE_PALSAR_LUJAN',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),		
		//dipsoh:Lujan_ManchaSituacionActual-Rec100
		new OpenLayers.Layer.WMS("Mancha de inundacion - Recurrencia 100 años",wmsURL,
			{layers: 'dipsoh:Lujan_ManchaSituacionActual-Rec100',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Mancha de inundacion - Recurrencia 50 años",wmsURL,
			{layers: 'dipsoh:Lujan_ManchaSituacionActual-Rec50',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Mancha de inundacion - Recurrencia 25 años",wmsURL,
			{layers: 'dipsoh:Lujan_ManchaSituacionActual-Rec25',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Mancha de inundacion - Recurrencia 10 años",wmsURL,
			{layers: 'dipsoh:Lujan_ManchaSituacionActual-Rec10',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Mancha de inundacion - Recurrencia 5 años",wmsURL,
			{layers: 'dipsoh:Lujan_ManchaSituacionActual-Rec5',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Mancha de inundacion - Recurrencia 2 años",wmsURL,
			{layers: 'dipsoh:Lujan_ManchaSituacionActual-Rec2',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(lujan);
treeTheme[1].children.push({
					text:'Cuenca Lujan',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Urbanizaciones e industrias"},
							{nodeType: "gx_layer", layer: "Parques Industriales"},
							{nodeType: "gx_layer", layer: "MDE Palsar Lujan",legend:true  },
							{
							text:'Manchas de inundacion',expanded:false, children:
								[
									{nodeType: "gx_layer", layer: "Mancha de inundacion - Recurrencia 100 años",text:"Sin obra - Rec100"},
									{nodeType: "gx_layer", layer: "Mancha de inundacion - Recurrencia 50 años",text:"Sin obra - Rec50"},
									{nodeType: "gx_layer", layer: "Mancha de inundacion - Recurrencia 25 años",text:"Sin obra - Rec25"},
									{nodeType: "gx_layer", layer: "Mancha de inundacion - Recurrencia 10 años",text:"Sin obra - Rec10"},
									{nodeType: "gx_layer", layer: "Mancha de inundacion - Recurrencia 5 años",text:"Sin obra - Rec5"},
									{nodeType: "gx_layer", layer: "Mancha de inundacion - Recurrencia 2 años",text:"Sin obra - Rec2"},
								]
							}
						]
				});	
		/*
		 * Layers nuestros: Capas meteorologicas
		 */
meteorologicas=[
		new OpenLayers.Layer.WMS("Temperaturas",wmsURL,
			{layers: 'dipsoh:capa_temperatura',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Isotermas",wmsURL,
			{layers: 'dipsoh:isotermas_v',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Niveles",wmsURL,
			{layers: 'dipsoh:niveles',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Viento actual",wmsURL,
			{layers: 'dipsoh:vientos_00',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Viento +03hs",wmsURL,
			{layers: 'dipsoh:vientos_03',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Viento +06hs",wmsURL,
			{layers: 'dipsoh:vientos_06',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Viento +12hs",wmsURL,
			{layers: 'dipsoh:vientos_12',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Viento +24hs",wmsURL,
			{layers: 'dipsoh:vientos_24',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Ola calor +24hs",wmsURL,
			{layers: 'dipsoh:ola_calor_24',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Ola calor +48hs",wmsURL,
			{layers: 'dipsoh:ola_calor_48',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Ola calor +72hs",wmsURL,
			{layers: 'dipsoh:ola_calor_72',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Ola calor +96hs",wmsURL,
			{layers: 'dipsoh:ola_calor_96',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +03hs",wmsURL,
			{layers: 'dipsoh:prevision_03_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +06hs",wmsURL,
			{layers: 'dipsoh:prevision_06_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +12hs",wmsURL,
			{layers: 'dipsoh:prevision_12_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +24hs",wmsURL,
			{layers: 'dipsoh:prevision_24_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +36hs",wmsURL,
			{layers: 'dipsoh:prevision_36_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +48hs",wmsURL,
			{layers: 'dipsoh:prevision_48_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +72hs",wmsURL,
			{layers: 'dipsoh:prevision_72_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +96hs",wmsURL,
			{layers: 'dipsoh:prevision_96_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +03hs",wmsURL,
			{layers: 'dipsoh:prevision_03_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +06hs",wmsURL,
			{layers: 'dipsoh:prevision_06_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +12hs",wmsURL,
			{layers: 'dipsoh:prevision_12_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +24hs",wmsURL,
			{layers: 'dipsoh:prevision_24_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +36hs",wmsURL,
			{layers: 'dipsoh:prevision_36_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +48hs",wmsURL,
			{layers: 'dipsoh:prevision_48_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +72hs",wmsURL,
			{layers: 'dipsoh:prevision_72_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +96hs",wmsURL,
			{layers: 'dipsoh:prevision_96_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(meteorologicas);
treeTheme[1].children.push({
					text:'Capas meteorologicas',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Temperaturas"},
							{nodeType: "gx_layer", layer: "Isotermas"}, 
							{nodeType: "gx_layer", layer: "Niveles"},
							{text:'Viento',expanded:false, children:
									[
										{nodeType: "gx_layer", layer: "Viento actual"},
										{nodeType: "gx_layer", layer: "Viento +03hs"}, 
										{nodeType: "gx_layer", layer: "Viento +06hs"},
										{nodeType: "gx_layer", layer: "Viento +12hs"}, 
										{nodeType: "gx_layer", layer: "Viento +24hs"}
									]
							},
							{text:'Prevision ola de calor',expanded:false, children:
									[
										{nodeType: "gx_layer", layer: "Ola calor +24hs"},
										{nodeType: "gx_layer", layer: "Ola calor +48hs"}, 
										{nodeType: "gx_layer", layer: "Ola calor +72hs"},
										{nodeType: "gx_layer", layer: "Ola calor +96hs"}
									]
							},
							{text:'Prevision de precipitaciones',expanded:false, children:
									[
										{nodeType: "gx_layer", layer: "Prevision +03hs"},
										{nodeType: "gx_layer", layer: "Prevision +06hs"}, 
										{nodeType: "gx_layer", layer: "Prevision +12hs"},
										{nodeType: "gx_layer", layer: "Prevision +24hs"}, 
										{nodeType: "gx_layer", layer: "Prevision +36hs"},
										{nodeType: "gx_layer", layer: "Prevision +48hs"},
										{nodeType: "gx_layer", layer: "Prevision +72hs"},
										{nodeType: "gx_layer", layer: "Prevision +96hs"}
									]
							},
							{text:'Precipitaciones acumuladas',expanded:false, children:
									[
										{nodeType: "gx_layer", layer: "Acumulada +03hs"},
										{nodeType: "gx_layer", layer: "Acumulada +06hs"},
										{nodeType: "gx_layer", layer: "Acumulada +12hs"},
										{nodeType: "gx_layer", layer: "Acumulada +24hs"},
										{nodeType: "gx_layer", layer: "Acumulada +36hs"},
										{nodeType: "gx_layer", layer: "Acumulada +48hs"},
										{nodeType: "gx_layer", layer: "Acumulada +72hs"},
										{nodeType: "gx_layer", layer: "Acumulada +96hs"}										
									]
							},
						]
				});

		/*
		 * Layers nuestros: Descargas
		 */
descargas=[		 
		layerPartidos_descarga = new OpenLayers.Layer.WMS("Descarga_Partidos_DWG",wmsURL,
			{layers: 'dipsoh:departamentos_descarga',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),

		new OpenLayers.Layer.WMS("Descarga_Cartas_IGN50000",wmsURL,
			{layers: 'dipsoh:cartas050igm',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Descarga_MDT_IGN",wmsURL,
			{layers: 'dipsoh:cartas100igm',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(descargas);
treeTheme[1].children.push({
					text:'Descargas',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Descarga_Cartas_IGN50000" ,text:"Descarga cartas IGN 1:50K",legend:true },
							{nodeType: "gx_layer", layer: "Descarga_Partidos_DWG" ,text:"Descarga de partidos en DWG",legend:true },
							{nodeType: "gx_layer", layer: "Descarga_MDT_IGN" ,text:"Descarga MDT IGN 1:50K",legend:true }
						]
				});	

		//http://www.geobasig.com.ar:8080/geoserver/Geodesia/wms?SERVICE=WMS&LAYERS=Parcelario_Transparente (layer geodesia) http://geobasig.com.ar/geoserver29/Geodesia/wms?
		//http://www.geoinfra.minfra.gba.gov.ar/geoserver/Geoinfra/wms?LAYERS=parcelario_completo
otras=[
		new OpenLayers.Layer.WMS("Parcelas_Geo_WFS",
			"http://www.geoinfra.minfra.gba.gov.ar/geoserver/Geoinfra/wms?",
			{layers: 'parcelario_completo',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(otras);
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
				{nodeType: "gx_layer", layer: "Google Hybrid" },
				{nodeType: "gx_layer", layer: "OpenStreetsMap" },
				{nodeType: "gx_layer", layer: "mdt_ign" , text:"Modelo digital IGN" },
				{text:'Mas...', children:
						[
							{nodeType: "gx_layer", layer: "Google Streets" },
							//{nodeType: "gx_layer", layer: "toner", text:"Stamen Toner" },
							{nodeType: "gx_layer", layer: "ESRI Satelital" },
							{nodeType: "gx_layer", layer: "ESRI Topografico"},
							{nodeType: "gx_layer", layer: "Bing Aereo"},
							{nodeType: "gx_layer", layer: "Bing Callejero"},
							{nodeType: "gx_layer", layer: "Bing Hibrido"},
							{nodeType: "gx_layer", layer: "Mapbox - High Contrast"},
							{nodeType: "gx_layer", layer: "Mapbox - Dark"},
							{nodeType: "gx_layer", layer: "Mapbox - Streets/Satellite"},
							{nodeType: "gx_layer", layer: "Blanco"}
						]
				}
			]
	},
	{
		text:'Capas de informacion', expanded: true, children:
			[
				{
					text:'Provincia', expanded: true, children:
						[
							{nodeType: "gx_layer", layer: "Partidos" },
							{nodeType: "gx_layer", layer: "Hidrografia",text:"Hidrografia escala 1:250.000" },
							{nodeType: "gx_layer", layer: "Hidrografia_detalle" },
							{nodeType: "gx_layer", layer: "Hidrografia_detalle_OSM" },
							{nodeType: "gx_layer", layer: "Cuencas",text:"Cuencas (actualizado el 4-3-2016)" },
							{nodeType: "gx_layer", layer: "Cuencas Detalle"},
							{nodeType: "gx_layer", layer: "Lagos_y_lagunas",text:"Lagos y lagunas",legend:true },
							{nodeType: "gx_layer", layer: "Rutas" ,legend:true },
							{nodeType: "gx_layer", layer: "Censo_2010",text:"Censo 2010 INDEC",legend:true },
							{nodeType: "gx_layer", layer: "Estaciones de medicion"} 
							
						]
				},
				{
					text:'Parcelario Arba 2016', nodeType: 'hr_cascader', expanded: true, children:
						[
							{nodeType: "gx_layer", layer: "Partidos y Circunscripciones" },
							{nodeType: "gx_layer", layer: "Macizos" },
							{nodeType: "gx_layer", layer: "Parcelas" },
							{nodeType: "gx_layer", layer: "Calles" }
						]
				},
				{
					text:'Obras Hidraulica',expanded:true, children:
						[
							{nodeType: "gx_layer", layer: "Obras con planilla" ,legend:true },
							{nodeType: "gx_layer", layer: "Trazas DiPSOH" ,legend:true },
							{nodeType: "gx_layer", layer: "Limpiezas Cooperativas"},
							{nodeType: "gx_layer", layer: "Obras_SIGOS", text:"Obras Sigos - Referencia",legend:true  },
							{nodeType: "gx_layer", layer: "Trazas+Obras_SIGOS" ,text:"Obras Sigos - Trazas",legend:true }
						]
				},
				{
					text:'Relevamiento',expanded:true, children:
						[
							{nodeType: "gx_layer", layer: "Red_Geoba",legend:true },
							{nodeType: "gx_layer", layer: "Parcelas_RT",text:"Planos en Rel. Territorial" },
							{nodeType: "gx_layer", layer: "Parcelas_con_plano",text:"Planos en Geodesia" },
							{nodeType: "gx_layer", layer: "Puntos_acotados_IGN",legend:true  },
							{nodeType: "gx_layer", layer: "Curvas_de_nivel",legend:true  },
							{nodeType: "gx_layer", layer: "Cartas_Geodesia_1:5000",legend:true  },
							{nodeType: "gx_layer", layer: "Geo5000_Faja5",text:"Geodesia 1:5000 Faja5"},
							{nodeType: "gx_layer", layer: "Geo5000_Faja6",text:"Geodesia 1:5000 Faja6"}

						]
				},{
					text:'Descargas',expanded:true, children:
						[
							{nodeType: "gx_layer", layer: "Descarga_Cartas_IGN50000" ,text:"Descarga cartas IGN 1:50K",legend:true },
							{nodeType: "gx_layer", layer: "Descarga_Partidos_DWG" ,text:"Descarga de partidos en DWG",legend:true },
							{nodeType: "gx_layer", layer: "Descarga_MDT_IGN" ,text:"Descarga MDT IGN 1:50K",legend:true }
						]
				}

			]
	}
];

var layerItems=[
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
				wrapDateLine: true
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
				wrapDateLine: true
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
				wrapDateLine: true
		}),
		/*
		 * Basemaps OpenStreetMap
		 */
		//new OpenLayers.Layer.Stamen("toner"),
		new OpenLayers.Layer.OSM("OpenStreetsMap"),
		
		
		/*
		 * Google Maps
		 */
		new OpenLayers.Layer.Google(
			  "Google Streets", // the default
			  {'sphericalMercator': true, numZoomLevels: 20,displayInLayerSwitcher:false}
		),
		
		new OpenLayers.Layer.Google(
				"Google Hybrid",
				{type: google.maps.MapTypeId.HYBRID, visibility: true,'sphericalMercator': true, numZoomLevels: 20,displayInLayerSwitcher:false}
		),
								
		/*
		 * Basemaps ESRI
		 */
		new OpenLayers.Layer.XYZ("ESRI Topografico",
				"http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}",
				{sphericalMercator: true, attribution: "Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a>", isBaseLayer: true} 
		),
		new OpenLayers.Layer.XYZ("ESRI Satelital",
				"http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}",
				{sphericalMercator: true, attribution: "<font color='white'>Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a></font>", isBaseLayer: true} 
		),
		
		/*
		BING
		*/
								
		 new OpenLayers.Layer.Bing({
			name: "Bing Callejero",
			key: apiKey,
			type: "Road"
		}),
		new OpenLayers.Layer.Bing({
			name: "Bing Hibrido",
			key: apiKey,
			type: "AerialWithLabels"
		}),
		new OpenLayers.Layer.Bing({
			name: "Bing Aereo",
			key: apiKey,
			type: "Aerial"
		}),
		
		/*
		 * Basemap Tilecache
		 */
		new OpenLayers.Layer.WMS("mdt_ign",gwcURL,
			{layers: 'dipsoh:mdt',transparent: true, format:'image/png', tiled: true }, 
			{isBaseLayer:true, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 
		
		new OpenLayers.Layer.WMS( "Cartas IGN", 
			serverURL+"/tilecache/tilecache.cgi", 
			{
			layers: 'basic', 
			reproyect:true,
			format: 'image/png'
			},
			{transitionEffect: 'resize',isBaseLayer:true,displayInLayerSwitcher:false}
			),
			
		new OpenLayers.Layer.WMS( "Geo5000_Faja5", 
			serverURL+"/tilecache/tilecache.cgi", 
			{
			layers: ['geo5000_22195'], 
			reproyect:true,
			format: 'image/png'
			},{
			transitionEffect: 'resize',isBaseLayer:false,displayInLayerSwitcher:true,visibility:false
			}),
			
		new OpenLayers.Layer.WMS( "Geo5000_Faja6", 
			serverURL+"/tilecache/tilecache.cgi", 
			{
			layers: 'geo5000_22196', 
			reproyect:true,
			format: 'image/png'
			},{
			transitionEffect: 'resize',isBaseLayer:false,displayInLayerSwitcher:true,visibility:false
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
		
		/*
		 * Layers nuestros
		 */
		
		layerPartidos = new OpenLayers.Layer.WMS("Partidos",gwcURL,
			{layers: 'dipsoh:departamentos',transparent: true, format:'image/png', singleTile: true }, 
			{visibility: true, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
			 
		),
		layerCallesArba = new OpenLayers.Layer.WMS("Calles",gwcURL,
			{layers: 'dipsoh:calles',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerParcelasArba = new OpenLayers.Layer.WMS("Parcelas",gwcURL,
			{layers: 'dipsoh:parcelas_vista_2016',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerMacizosArba = new OpenLayers.Layer.WMS("Macizos",gwcURL,
			{layers: 'dipsoh:macizos_vista_2016',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerCircunscripcionesArba = new OpenLayers.Layer.WMS("Partidos y Circunscripciones",gwcURL,
			{layers: ['dipsoh:secciones_vista_2016','dipsoh:circunscripciones_vista_2016','dipsoh:partidos_vista_2016'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),							
		layerPartidos_descarga = new OpenLayers.Layer.WMS("Descarga_Partidos_DWG",wmsURL,
			{layers: 'dipsoh:departamentos_descarga',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),

		new OpenLayers.Layer.WMS("Descarga_Cartas_IGN50000",wmsURL,
			{layers: 'dipsoh:cartas050igm',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Descarga_MDT_IGN",wmsURL,
			{layers: 'dipsoh:cartas100igm',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Cartas_Geodesia_1:5000",wmsURL,
			{layers: 'dipsoh:cartas_geodesia_5000',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		), 
		
		layerParcelasRT = new OpenLayers.Layer.WMS("Parcelas_RT",wmsURL,
			{layers: 'dipsoh:parcelas_rt_geom',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Red_Geoba",wmsURL,
			{layers: 'dipsoh:red_geoba_22195',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Estaciones de medicion",wmsURL,
			{layers: 'dipsoh:estaciones_medicion',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Puntos_acotados_IGN",wmsURL,
			{layers: 'dipsoh:puntosacotados_22195',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Curvas_de_nivel",wmsURL,
			{layers: 'dipsoh:curvas_area_metropolitana_22195',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Cuencas",wmsURL,
			{layers: 'dipsoh:cuencas',transparent: true, format:'image/png', singleTile: true },{opacity: 0.75,visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Censo_2010",wmsURL,
			{layers: 'dipsoh:indec_2010',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Hidrografia",wmsURL,
			{layers: 'dipsoh:hidro_view',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Hidrografia_detalle",wmsURL,
			{layers: 'dipsoh:hidro_detalle',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Hidrografia_detalle_OSM",wmsURL,
			{layers: 'dipsoh:hidro_detalle_OSM',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Lagos_y_lagunas",wmsURL,
			{layers: 'dipsoh:lagunas',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		), 
		
		new OpenLayers.Layer.WMS("Rutas",wmsURL,
			{layers: 'dipsoh:rutas_filter',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			} 
		), 
		
		layerTrazas = new OpenLayers.Layer.WMS("Trazas+Obras_SIGOS",wmsURL,
			{layers: ['dipsoh:dipsoh_obras_sigos_total'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),

		new OpenLayers.Layer.WMS("Obras_SIGOS",wmsURL,
			{layers: 'dipsoh:dipsoh_obras_ref',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Trazas DiPSOH",wmsURL,
			{layers: 'dipsoh:obras_sigos_line',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Limpiezas Cooperativas",wmsURL,
			{layers: 'dipsoh:LimpiezaCooperativas2015',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Cuencas Detalle",wmsURL,
			{layers: 'dipsoh:cuencas_detalle',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Parcelas_con_plano",gwcURL,
			{layers: 'dipsoh:parcelas_con_plano_geom',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Obras con planilla",wmsURL,
			{layers: 'dipsoh:conductos_con_planilla',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		
		//http://www.geobasig.com.ar:8080/geoserver/Geodesia/wms?SERVICE=WMS&LAYERS=Parcelario_Transparente (layer geodesia)
		new OpenLayers.Layer.WMS("Parcelas_Geo_WFS",
			"http://geobasig.com.ar/geoserver/Geodesia/wms?",
			{layers: 'Geodesia:parcelas',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	];
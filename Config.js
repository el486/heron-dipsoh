/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/** api: example[googlemaps]
 *  Google Maps
 *  -----------
 *  Use Google Maps within a Heron app.
 */

//serverURL='http://www.mosp.gba.gov.ar/sig_hidraulica/ms';  //se define en index
var apiKey = "ApjNQIT6SLCoD48dofLod3eQBSMsM933Yoe-GDn1uE3aVZjSCjgQxLWifL1Iic6_" //visor
var wmsURL=serverURL+'/geoserver/dipsoh/wms?'; 
Ext.namespace("Heron");
Ext.namespace("Heron.globals");
Heron.globals.serviceUrl=serverURL+'/cgi-bin/heron.cgi';
OpenLayers.ProxyHost = serverURL+'/cgi-bin/proxy.cgi?url=';
//var layerKML;
//var layerParcelas;
//var layerObras;
//var layerBuffer;
var layerOculto;
var mapPanel;
var textoDIV;

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

var layerOptions = {visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
										wfs: {
											protocol: 'fromWMSLayer',
											downloadFormats:Heron.options.wfs.downloadFormats
											}
										}
								};

var treeTheme = [
	{
		text:'Capas Base', expanded: true, children:
			[
				{nodeType: "gx_layer", layer: "Cartas IGN" },
				{nodeType: "gx_layer", layer: "Google Hybrid" },
				{nodeType: "gx_layer", layer: "toner", text:"Stamen Toner" },
				{text:'Mas...', children:
						[
							{nodeType: "gx_layer", layer: "Google Streets" },
							{nodeType: "gx_layer", layer: "OpenStreetsMap" },
							{nodeType: "gx_layer", layer: "ESRI Satelital" },
							{nodeType: "gx_layer", layer: "ESRI Topografico"},
							{nodeType: "gx_layer", layer: "Bing Aereo"},
							{nodeType: "gx_layer", layer: "Bing Callejero"},
							{nodeType: "gx_layer", layer: "Bing Hibrido"},
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
							{nodeType: "gx_layer", layer: "Hidrografia" },
							{nodeType: "gx_layer", layer: "Lagos_y_lagunas",text:"Lagos y lagunas",legend:true },
							{nodeType: "gx_layer", layer: "Rutas" ,legend:true }
						]
				},
				{
					text:'Parcelario Arba', nodeType: 'hr_cascader', expanded: true, children:
						[
							{nodeType: "gx_layer", layer: "Partidos y Circunscripciones" },
							{nodeType: "gx_layer", layer: "Macizos" },
							{nodeType: "gx_layer", layer: "Parcelas" }
						]
				},
				{
					text:'SIGOS Hidraulica',expanded:true, children:
						[
							{nodeType: "gx_layer", layer: "Obras_SIGOS", text:"Obras Sigos - Referencia",legend:true  },
							{nodeType: "gx_layer", layer: "Trazas+Obras_SIGOS" ,text:"Obras Sigos - Trazas",legend:true },
							{nodeType: "gx_layer", layer: "Trazas por Etapa" ,legend:true }
						]
				},
				{
					text:'Relevamiento',expanded:true, children:
						[
							{nodeType: "gx_layer", layer: "Red_Geoba",legend:true },
							{nodeType: "gx_layer", layer: "Parcelas_RT",text:"Planos en Rel. Territorial " },
							{nodeType: "gx_layer", layer: "Puntos_acotados_IGN",legend:true  },
							{nodeType: "gx_layer", layer: "Cartas_Geodesia_1:5000",legend:true  },
							{nodeType: "gx_layer", layer: "Geo5000_Faja5",text:"Geodesia 1:5000 Faja5"},
							{nodeType: "gx_layer", layer: "Geo5000_Faja6",text:"Geodesia 1:5000 Faja6"}

						]
				},{
					text:'Descargas',expanded:true, children:
						[
							{nodeType: "gx_layer", layer: "Descarga_Cartas_IGN50000" ,text:"Descarga cartas IGN 1:50K",legend:true },
							{nodeType: "gx_layer", layer: "Descarga_Partidos_DWG" ,text:"Descarga de partidos en DWG",legend:true }
						]
				}

			]
	}
];

// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
Ext.namespace("Heron.options.layertree");

Heron.options.layertree.tree = treeTheme;
//alert(Heron.options.layertree.tree);

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
	xtype: 'panel',
	id: 'hr-container-main',
	layout: 'border',

	items: [
		{	xtype: 'panel',
					id: 'hr-container-north',
					region: 'north',
					layout: 'border',
					width: '100%',
					height: 65,
					bodyBorder: false,
					border: true,
					items : [
							{
							xtype: 'hr_htmlpanel',
							id: 'hr-logo-panel',
							region: 'center',
							bodyBorder: false,
							border: false,
							autoLoad: {
								url: 'header.html'//,
							},
							height: 55
							}
					]
		},		
		{
			xtype: 'panel',
			id: 'hr-menu-left-container',
			layout: 'accordion',
			region : "west",
			width: 240,
			collapsible: true,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_layertreepanel',
					id:'layertree',
					title: 'Arbol de Capas Predefinidas',
					layerIcons: 'bylayertype',
					contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ],
					hropts: Heron.options.layertree
				},
				{
					xtype: 'hr_gxplayerpanel',
					title: 'Arbol de capas agregadas',
					id: 'gxplayerpanel',
					// configuration of all tool plugins for this application
					tools: [
						{
							// ptype: "gxp_layertree",
							ptype: "gxp_layermanager",

							outputConfig: {
								id: "gxp_layertree",
								//title: __('Layers'),
								//border: false,
								tbar: [] // we will add buttons to "tree.bbar" later
							},
							outputTarget: "gxplayerpanel"
						},
						{
							ptype: "gxp_addlayers",
							actionTarget: "gxp_layertree.tbar",
							addActionText: __('Add layers'),
							templatedLayerGrid: true,
							layerGridWidth: 440,
							layerGridHeight: 540,
							layerPreviewWidth: 40,
							layerPreviewHeight: 40,
							owsPreviewStrategies: ['attributionlogo', 'getlegendgraphic', 'randomcolor'],
							defaultSrs: null
							/*,search: {selectedSource: "opengeosuite"}   */
						},
						{
							ptype: "gxp_removelayer",
							actionTarget: "gxp_layertree.tbar",
							removeActionText: __('Remove layer')
						},
						{
							ptype: "gxp_removelayer",
							actionTarget: "gxp_layertree.contextMenu"
						},
						{
							ptype: "gxp_layerproperties",
							outputConfig: {defaults: {autoScroll: true}, width: 400, autoHeight: true},
							actionTarget: ["gxp_layertree.tbar", "gxp_layertree.contextMenu"]
		//                    actionTarget: ["layertree.contextMenu"]
		//                    outputTarget: "layertree"
						},
						{
							ptype: "gxp_styler",
							outputConfig: {autoScroll: true, width: 320},
							actionTarget: ["gxp_layertree.tbar", "gxp_layertree.contextMenu"]
		//                    actionTarget: ["layertree.contextMenu"],
		//                    outputTarget: "layertree"
						},

						{
							ptype: "gxp_zoomtolayerextent",
							actionTarget: {target: "gxp_layertree.contextMenu", index: 0}
						},
						{
							 ptype: "gxp_opacityslider",
							actionTarget: ["gxp_layertree.tbar", "gxp_layertree.contextMenu"]
						 }
					],

					// layer sources
					defaultSourceType: "gxp_wmssource",
					sources: {
						arbawms: {
							url: "http://cartoservices.arba.gov.ar/geoserver/cartoservice/wms",
							version: "1.3.0",
							title: "Arba",
							group: 'ideba'
						},
						cdiwms: {
							url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/cdi/wms",
							version: "1.3.0",
							title: "CDI",
							group: 'ideba'
						},
						dcwms: {
							url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/cdi/wms",
							version: "1.3.0",
							title: "Defensa Civil",
							group: 'ideba'
						},
						geodesiawms: {
							url: "http://www.mosp.gba.gov.ar/geoserver/wms",
							version: "1.1.1",
							title: "Direccion de Geodesia pcia. de Bs.As.",
							group: 'ideba'
						},
						escuelaswms: {
							url: "http://190.210.101.129/cgi-bin/mapaescolar",
							version: "1.3.0",
							title: "Mapa Escolar",
							group: 'ideba'
						},
						opdswms: {
							url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/opds/wms",
							version: "1.3.0",
							title: "O.P.D.S.",
							group: 'ideba'
						},
						saludwms: {
							url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/salud/wms",
							version: "1.3.0",
							title: "Salud",
							group: 'ideba'
						},
						transportewms: {
							url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/apt/wms",
							version: "1.3.0",
							title: "Transporte",
							group: 'ideba'
						},
						urbasigwms: {
							url: "http://sig.gobierno.gba.gov.ar:8080/geoserver/urbasig/wms",
							version: "1.3.0",
							title: "UrbaSig",
							group: 'ideba'
						},
						opengeotms: {
							ptype: "gxp_tmssource",
							url: "http://maps.opengeo.org/geowebcache/service/tms",
							title: "OpenGeo TMS",
							isBaseLayer: true,  // default is true
							group: 'background' // 'background' or 'default', default value is 'background'
						}
					}
				},
				{
					xtype: 'panel',
					id: 'hr-info-west',
					html: String.format('<div id="infoMiniDIV" align="center"></div><div id="infoDIV" align="center">'+
										'<input type="hidden" id="numPlano" value="'+planoUrl+'">'+
										'<input type="hidden" id="idObra" value="'+obraUrl+'">'+
										'<input type="hidden" id="etapa">'+
										'<input type="hidden" id="nombre"></div>'),
					preventBodyReset: true,
					title: 'Informacion',
					items:[
							{
								xtype: "grid",
								id: "capasGrid", // makes the grid available as app.capsGrid
								//title: "Capas DiPSOH",
								header:false,
								visible:false,
								collapsible:true,
								collapsed:true,
								viewConfig: {
									stripeRows: true,
									enableTextSelection: true
								},
								store: new GeoExt.data.WMSCapabilitiesStore({
									url: serverURL+"/geoserver/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.1.1",
									autoLoad: true
								}),
								columns: [
									{header: "Titulo",width: 80, dataIndex: "title", sortable: true, renderer: function(value, metaData, record, rowIndex, colIndex, store) {metaData.css = 'multilineColumn'; return value; }},
									{header: "Resumen",width: 160, dataIndex: "abstract", renderer: function(value, metaData, record, rowIndex, colIndex, store) {metaData.css = 'multilineColumn'; return value; }},
									{header: "SRS",width: 80, dataIndex: "bbox"},
									{header: "capaWms",width: 80, dataIndex: "name"}
								]
							}
					]
				}
			]
		},
		{
			xtype: 'panel',

			id: 'hr-map-and-info-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			collapsible: false,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_mappanel',
					id: 'hr-map',
					region: 'center',
					collapsible : false,
					border: false,
					hropts: {
						settings :
						{
							projection: 'EPSG:900913',
							displayProjection: new OpenLayers.Projection("EPSG:22195"),
							units: 'm',
							//maxExtent: '-20037508.34, -20037508.34, 20037508.34, 20037508.34',
							tileSize: new OpenLayers.Size(256, 256),
							maxResolution:2445.984904688, 
							//resolutions:[2445.984904688,1222.992452344,611.496226172,305.748113086,152.874056543,76.437028271,38.218514136,19.109257068,9.554628534,4.777314267,2.388657133,1.194328567],  //desactivados para imprimir OSM
							numZoomLevels: 12,
							maxExtent:new OpenLayers.Bounds(-7822279.086949371,-5021408.575019243,-5346607.805595686,-3837573.972371518), //pcia 900913
							restrictedExtent: new OpenLayers.Bounds(-7822279.086949371,-5021408.575019243,-5346607.805595686,-3837573.972371518),
							center: '-6500000, -4500000',
							//maxResolution: 'auto',
							xy_precision: 5,
							zoom: 7,
							theme: null
						},

						layers : [
							/*
							 * Basemaps OpenStreetMap
							 */
							new OpenLayers.Layer.Stamen("toner"),
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
							 * Basemap Cartas IGN
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
							
							layerPartidos = new OpenLayers.Layer.WMS("Partidos",wmsURL,
								{layers: 'dipsoh:departamentos',transparent: true, format:'image/png', singleTile: true }, 
								{visibility: true, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
										wfs: {
											protocol: 'fromWMSLayer',
											downloadFormats:Heron.options.wfs.downloadFormats
											}
										}
								}
								 
							),
							
							layerParcelasArba = new OpenLayers.Layer.WMS("Parcelas",wmsURL,
								{layers: 'dipsoh:parcelas_vista',transparent: true, format:'image/png', singleTile: true },layerOptions
							),
							layerMacizosArba = new OpenLayers.Layer.WMS("Macizos",wmsURL,
								{layers: 'dipsoh:macizos_vista',transparent: true, format:'image/png', singleTile: true },layerOptions
							),
							layerCircunscripcionesArba = new OpenLayers.Layer.WMS("Partidos y Circunscripciones",wmsURL,
								{layers: ['dipsoh:secciones_vista','dipsoh:circunscripciones_vista','dipsoh:partidos_vista'],transparent: true, format:'image/png', singleTile: true },layerOptions
							),							
							layerPartidos_descarga = new OpenLayers.Layer.WMS("Descarga_Partidos_DWG",wmsURL,
								{layers: 'dipsoh:departamentos_descarga',transparent: true, format:'image/png', singleTile: true },layerOptions
							),

							new OpenLayers.Layer.WMS("Descarga_Cartas_IGN50000",wmsURL,
								{layers: 'dipsoh:cartas050igm',transparent: true, format:'image/png', singleTile: true },layerOptions
							),

							new OpenLayers.Layer.WMS("Cartas_Geodesia_1:5000",wmsURL,
								{layers: 'dipsoh:cartas_geodesia_5000',transparent: true, format:'image/png', singleTile: true },layerOptions
							), 
							
							layerParcelasRT = new OpenLayers.Layer.WMS("Parcelas_RT",wmsURL,
								{layers: 'dipsoh:parcelas_rt',transparent: true, format:'image/png', singleTile: true },layerOptions
							),
							
							new OpenLayers.Layer.WMS("Red_Geoba",wmsURL,
								{layers: 'dipsoh:red_geoba_22195',transparent: true, format:'image/png', singleTile: true },layerOptions
							),
							
							new OpenLayers.Layer.WMS("Puntos_acotados_IGN",wmsURL,
								{layers: 'dipsoh:puntosacotados_22195',transparent: true, format:'image/png', singleTile: true },layerOptions
							),
							
							new OpenLayers.Layer.WMS("Hidrografia",wmsURL,
								{layers: 'dipsoh:hidro_view',transparent: true, format:'image/png', singleTile: true },layerOptions
							),
							
							new OpenLayers.Layer.WMS("Lagos_y_lagunas",wmsURL,
								{layers: 'dipsoh:lagunas',transparent: true, format:'image/png', singleTile: true },layerOptions
							), 
							
							new OpenLayers.Layer.WMS("Rutas",wmsURL,
								{layers: 'dipsoh:rutas_filter',transparent: true, format:'image/png', singleTile: true },layerOptions 
							), 
							
							layerTrazas = new OpenLayers.Layer.WMS("Trazas+Obras_SIGOS",wmsURL,
								{layers: ['dipsoh:dipsoh_obras_sigos_total'],transparent: true, format:'image/png', singleTile: true },layerOptions
							),

							new OpenLayers.Layer.WMS("Obras_SIGOS",wmsURL,
								{layers: 'dipsoh:dipsoh_obras_ref',transparent: true, format:'image/png', singleTile: true },layerOptions
							),
							new OpenLayers.Layer.WMS("Trazas por Etapa",wmsURL,
								{layers: 'dipsoh:obras_dipsoh_por_etapa',transparent: true, format:'image/png', singleTile: true },layerOptions
							),
							new OpenLayers.Layer.WMS("Parcelario_Geodesia",
								"http://www.mosp.gba.gov.ar/geoserver/wms?",
								{layers: 'Parcelario_Transparente',transparent: true, format:'image/png', singleTile: true },layerOptions
							)
						],
						toolbar: toolBarItems
					}
				}
			]
		}
	]
};





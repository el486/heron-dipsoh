<?php
function curl($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_PROXY, '10.46.3.4:80'); 
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }


    $feed = $_REQUEST['url'].'?service=WMS&request=getCapabilities';
    $data = curl($feed);
	$wms = $_REQUEST['url'];

$xml = new SimpleXMLElement($data);
?>

<script>

 var store = new Ext.data.ArrayStore({
        fields: [
           {name: 'capa'},
           {name: 'wms'}
		   ]
	});
	
var myFormPanel = new Ext.form.FormPanel({
	title: '<?php echo $xml->Service->Title?>',
	renderTo: 'infoDIV',
	items: []
});
myFormPanel.getForm().load();

var wms = '<?php echo $wms ?>';
var textoDiv='';


textoDiv+='<?php echo '<table class="ext"><tr><th>'.$xml->Service->Title.'</th></tr>';?>';

<?php
$size=sizeof($xml->Capability->Layer->Layer->Layer);

for($i = 0; $i <= ($size-1); $i++) {$capa = $xml->Capability->Layer->Layer->Layer[$i]->Name; ?>

	textoDiv+='<?php echo '<tr><td><a href="javascript: agregaCapa(&apos;'.$wms.'&apos;,&apos;'.$capa.'&apos;)">'.$capa.'</a></td></tr>';?>';
	var capaWms = '<?php echo $capa; ?>';
	var defaultData = { capa: capaWms,	wms: wms}; //crea el registro para agregar al store
	var recId = capaWms; // provide unique id for the record
	var r = new store.recordType(defaultData, ++recId); // create new record
	store.insert(0, r); // insert a new record into the store - store.add(r) funca igual
<?php 
} 
$size=sizeof($xml->Capability->Layer->Layer);
for($i = 0; $i <= ($size-1); $i++) {$capa = $xml->Capability->Layer->Layer[$i]->Name;?>

	textoDiv+='<?php echo '<tr><td><a href="javascript: agregaCapa(&apos;'.$wms.'&apos;,&apos;'.$capa.'&apos;)">'.$capa.'</a></td></tr>';?>';
	var capaWms = '<?php echo $capa; ?>';
	var defaultData = { capa: capaWms,	wms: wms}; //crea el registro para agregar al store
	var recId = capaWms; // provide unique id for the record
	var r = new store.recordType(defaultData, ++recId); // create new record
	store.insert(0, r); // insert a new record into the store - store.add(r) funca igual

<?php
} 
$size=sizeof($xml->Capability->Layer);
for($i = 0; $i <= ($size-1); $i++) {$capa = $xml->Capability->Layer[$i]->Name;?>

	textoDiv+='<?php echo '<tr><td><a href="javascript: agregaCapa(&apos;'.$wms.'&apos;,&apos;'.$capa.'&apos;)">'.$capa.'</a></td></tr>';?>';
	var capaWms = '<?php echo $capa; ?>';
	var defaultData = { capa: capaWms,	wms: wms}; //crea el registro para agregar al store
	var recId = capaWms; // provide unique id for the record
	var r = new store.recordType(defaultData, ++recId); // create new record
	store.insert(0, r); // insert a new record into the store - store.add(r) funca igual

<?php } ?>
textoDiv+='</table>';
//document.getElementById('infoDIV').innerHTML+=textoDiv;
var titulo= '<?php echo $xml->Service->Title?>';


var gridWMS = new Ext.grid.GridPanel({
        store: store,
		id:'gridWMS',
        columns: [
            {header: "Capa", width: 300, dataIndex: 'capa', sortable: true,
			renderer: function (val,params,record) {
				return '<a href="javascript:agregaCapa(\''+record.get('wms')+'\',\''+val+'\',\''+titulo+'\')">'+val+'</a>';
				}
			}
        ],
        renderTo:'infoDIV',
		height:500
    });
	
store.load();
</script>

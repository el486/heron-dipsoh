<?php
/* importa el archivo de configuracion */
require_once("include/config.php");

$link = pg_connect(PG_CONNECTION_STRING);

$x = $_REQUEST['x'];
$y = $_REQUEST['y'];

$sql = "
select round(st_distance(the_geom, geomfromtext('POINT(5500000 6000000)',22195))) as distancia, 
						ST_X(transform(the_geom, 4326))::int AS lat, ST_Y(transform(the_geom, 4326))::int AS lon,
						ST_X(the_geom) AS xorig, ST_Y(the_geom) AS yorig,
						codigo,carta,observ,punto_fijo 
from red_geoba_22195 
where estado is null 
order by distancia 
limit 10
";
$res = pg_query($link, $sql);
$resultArray = pg_fetch_all($res);
echo '{"puntos":';
echo json_encode($resultArray);
echo '}'
?>
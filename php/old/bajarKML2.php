
<?
header("Content-Type: application/vnd.google-earth.kml+xml kml; charset=ISO-8859-1");
header("Content-Transfer-Encoding: binary");
header('Content-Disposition: attachment; filename="datos.kml"');

$kml = $_POST['kml'];
echo $kml
?>


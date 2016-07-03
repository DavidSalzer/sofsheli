<?php
	$img=$_GET["img"];
    //$description=$_GET["description"];
?>



<!DOCTYPE html>
<html>
    <head>
	    <meta property="og:site_name" content="מכונת הסטנדאפ של שחר חסון">
        <meta property="og:type" content="website" />
        <meta property="og:title" content="זה הסטנדאפ שאני הולך להופיע איתו היום בערב!" />
        <meta property="og:description" content="רוצים גם? היכנסו למכונת הסטנדאפ וצרו אחד משלכם" />
        <meta property="og:image" content="<?php echo "http://$_SERVER[HTTP_HOST]/".$img ?>" />
        <meta property="og:url" content="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>" />
        
		
        <!-- etc. -->
    </head>
    <body>
		<script type="text/javascript">
			window.location = "http://sofsheli.kidstv.co.il/";
		</script>
    </body>
</html>

<!DOCTYPE html>
<!--[if IE 6]>
<html id="ie6" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 7]>
<html id="ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html id="ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta name="viewport" content="width=device-width" />
  <title><?php bloginfo( 'name' ); ?></title>
  <link rel="profile" href="http://gmpg.org/xfn/11" />
  <link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
  
  <script>
    <?php
      $rEscaped = preg_replace("/\//", "\/", get_bloginfo("url") );
      $baseURL = preg_replace( "/" . $rEscaped . "/", "", get_bloginfo("template_url") );
      $baseURL = substr( $baseURL, 1 );
    ?>
    localStorage.setItem("jsRoot", "<?php echo $baseURL ?>/js/");
  </script>

<!-- development -->
  <script data-main="<?php bloginfo( 'template_url' ); ?>/js/app/config" src="<?php bloginfo( 'template_url' ); ?>/js/vendor/js/libs/require.js"></script>

<!-- debug --><!--
  <script src="<?php bloginfo( 'template_url' ); ?>/js/dist/debug/require.js"></script>
-->
<!-- release --><!--
  <script src="<?php bloginfo( 'template_url' ); ?>/js/dist/release/require.js"></script>
-->


  <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed">

  <div id="main">
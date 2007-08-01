<?php
/*
Plugin Name: Wordpress OpenID (+)
Plugin URI: http://willnorris.com/projects/wpopenid/
Description: Wordpress OpenID Registration, Authentication, and Commenting.   This is a fork of the <a href="http://verselogic.net/projects/wordpress/wordpress-openid-plugin/">original wpopenid project</a> by <a href="http://verselogic.net">Alan Castonguay</a> and Hans Granqvist, with hopes of merging it upstream in the near future.  (URLs and such have been changed so as not to confuse the two plugins.)
Author: Will Norris
Author URI: http://willnorris.com/
Version: $Rev$
Licence: Modified BSD, http://www.fsf.org/licensing/licenses/index_html#ModifiedBSD
*/

define ( 'WPOPENID_PLUGIN_PATH', '/wp-content/plugins/' . basename(dirname(__FILE__)) );  
define ( 'OPENIDIMAGE', get_option('siteurl') . WPOPENID_PLUGIN_PATH . '/images/openid.gif' );

define ( 'WPOPENID_PLUGIN_VERSION', preg_replace( '/\$Rev: (.+) \$/', 'svn-\\1', 
	'$Rev$') ); // this needs to be on a separate line so that svn:keywords can work its magic
define ( 'WPOPENID_DB_VERSION', 11258);

require_once('logic.php');
require_once('interface.php');

/* Turn on logging of process via error_log() facility in PHP.
 * Used primarily for debugging, lots of output.
 * For production use, leave this set to false.
 */

define ( 'WORDPRESSOPENIDREGISTRATION_DEBUG', true );
if( WORDPRESSOPENIDREGISTRATION_DEBUG ) {
	ini_set('display_errors', true);   // try to turn on verbose PHP error reporting
	if( ! ini_get('error_log') ) ini_set('error_log', ABSPATH . get_option('upload_path') . '/php.log' );
	ini_set('error_reporting', 2039);
}

@session_start();

if  ( !class_exists('WordpressOpenID') ) {
	class WordpressOpenID {

		var $logic;
		var $interface;

		function __construct() {
			$this->logic = new WordpressOpenIDLogic();
			$this->interface = new WordpressOpenIDInterface();
			$this->interface->logic =& $this->logic;
		}

		function startup() {
			if( WORDPRESSOPENIDREGISTRATION_DEBUG ) error_log("WPOpenID Status: userinterface hooks: " . ($this->interface->oid->enabled? 'Enabled':'Disabled' ) . ' (finished including and instantiating, passing control back to wordpress)' );

			$this->interface->startup();
		}


	}
}

if (isset($wp_version)) {
	$openid = new WordpressOpenID();
	$openid->startup();
}

?>

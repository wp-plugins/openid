<?php

/*
Plugin Name: OpenID
Plugin URI: http://www.lackoftalent.org/michael/blog/openid-for-wordpress/
Description: Implements OpenID link headers to associate a resource, your WP blog, with a verifiable OpenID
Version: 0.1
Author: Michael J. Giarlo
Author URI: http://purl.org/net/leftwing/blog

OpenID  for Wordpress
Copyright (C) 2007  Michael J. Giarlo

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

HISTORY:
Version: 0.1, 2007-01-31 [Michael J. Giarlo]
*/

add_action('wp_head', 'openid_link');
add_action('admin_menu', 'openid_admin_menu');
add_option('openid_server', 'http://www.myopenid.com/server', 'An OpenID server that verifies your identity');
add_option('openid_delegate', 'http://changeme.openid.com/', 'Your OpenID identity');

function openid_link() {
	echo "	<!-- OpenID -->\n";
	echo '	<link rel="openid.server" href="' . get_option('openid_server') . '"/>' . "\n";
	echo '	<link rel="openid.delegate" href="' . get_option('openid_delegate') . '"/>' . "\n";
}

function openid_admin_menu() {
	if ( function_exists('add_options_page') ) {
		add_options_page('OpenID Configuration', 'OpenID', 9, __FILE__, 'openid_manage');
	}
}

function openid_manage() {
	if ( isset($_POST['openid_delegate']) || isset($_POST['openid_server']) ) {
		if ( isset($_POST['openid_delegate']) ) 
			update_option('openid_delegate', $_POST['openid_delegate']);
		if ( isset($_POST['openid_server']) ) 
			update_option('openid_server', $_POST['openid_server']);
		echo '<div class="updated"><p><strong>Options saved.</strong></p></div>';
	}
	$oid_delegate = get_option('openid_delegate');
	$oid_server = get_option('openid_server');

	echo '<div class="wrap"> ' .
		'<h2>OpenID Options</h2>' .
		'<form name="form1" method="post" action="' . $_SERVER['REQUEST_URI'] . '">' .
		'<fieldset class="options"><legend>OpenID Delegate</legend><br/>' .
		'<input type="text" size="75" name="openid_delegate" value="' . $oid_delegate . '"/>' .
		'</fieldset>' .
		'<fieldset class="options"><legend>OpenID Server</legend><br/>' .
		'<input type="text" size="75" name="openid_server" value="' . $oid_server . '"/>' .
		'</fieldset>' .
		'<p class="submit">' .
		'<input type="submit" name="Submit" value="Update Options &raquo;" />' .
		'</p>' .
		'</form>' .
		'</div>';
}
?>
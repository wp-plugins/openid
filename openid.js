jQuery(document).ready( function() {
	jQuery('#openid_unobtrusive_text').hide();

	jQuery('#openid_enabled_link').click( function() {
		jQuery('#openid_unobtrusive_text').toggle(400); 
		return false;
	});


	jQuery('#openid_rollup dl').toggle();

	jQuery('#openid_rollup_link').click( function() {
		jQuery('#openid_rollup dl').toggle(); 
		return false;
	});
});

function add_openid_to_comment_form(unobtrusive_mode) {
	jQuery('#commentform').addClass('openid');

	if (unobtrusive_mode == true) {
		var unobtrusive_html = ' <a id="openid_enabled_link" href="http://openid.net">(OpenID Enabled)</a>' +
					'<div id="openid_unobtrusive_text">' +
						'If you have an OpenID, you may fill it in here.  If your OpenID provider provides ' + 
						'a name and email, those values will be used instead of the values here.  ' + 
						'<a href="http://openid.net">Learn more about OpenID</a> or ' + 
						'<a href="http://openid.net/wiki/index.php/Public_OpenID_providers">find an OpenID provider</a>.' +
					'</div>';

		jQuery('#commentform label[@for=url] small').append(unobtrusive_html);
	} else {
		// Move existing form into a fieldset
		jQuery('#commentform input:text:first/..').before('<fieldset id="anonymous_fieldset"><legend>Anonymous</legend></fieldset>');
		jQuery('#anonymous_fieldset').append( jQuery('#commentform input#author/..')[0] );
		jQuery('#anonymous_fieldset').append( jQuery('#commentform input#email/..')[0] );
		jQuery('#anonymous_fieldset').append( jQuery('#commentform input#url/..')[0] );

		// Add OpenID fieldset
		jQuery('#anonymous_fieldset').before('<fieldset id="openid_fieldset"><legend>OpenID</legend></fieldset>');
		// make a copy of an existing input element in case they've been customized
		jQuery('#commentform input#url/..').clone().appendTo( jQuery('#openid_fieldset') );
		jQuery('#openid_fieldset input').attr('id', 'openid_url').val("");
		jQuery('#openid_fieldset label').attr('for', 'openid_url');
		jQuery('#openid_fieldset label *').html('Sign in with your <a title="What is this?" href="http://www.openid.net">OpenID</a>');
	}
}



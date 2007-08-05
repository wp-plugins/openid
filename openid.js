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

		u = jQuery('#commentform label[@for=url]');
		if (u.children().length > 0) u=u.children(':last');
		u.append(unobtrusive_html);
	} else {
		// Move existing form into a fieldset
		jQuery('#commentform label:first/..').before('<fieldset id="openid_fieldset"><legend>OpenID</legend></fieldset>')
			.before('<fieldset id="anonymous_fieldset"><legend>Anonymous</legend></fieldset>')

		var fields = new Array('author', 'email', 'url');
		for (i=0; i<fields.length; i++) {
			label = jQuery('#commentform label[@for='+fields[i]+']/..');
			input = jQuery('#commentform input#'+fields[i]+'/..');

			jQuery('#anonymous_fieldset').append(label);
			if (input[0] != label[0]) jQuery('#anonymous_fieldset').append(input);

			if (fields[i] == 'url') {
				label.clone().appendTo(jQuery('#openid_fieldset'));
				if (input[0] != label[0]) input.clone().appendTo(jQuery('#openid_fieldset'));
			}
		}

		jQuery('#openid_fieldset input').attr('id','openid_url').attr('name','openid_url').val('');
		l = jQuery('#openid_fieldset label').attr('for', 'openid_url');
		if (l.children().length > 0) l=l.children(':last');
		l.html('Sign in with your <a title="What is this?" href="http://www.openid.net">OpenID</a>');
	}
}

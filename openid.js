jQuery(document).ready( function() {
	jQuery('#openid_unobtrusive_text').hide();

	jQuery('#openid_enabled_link').click( function() {
		jQuery('#openid_unobtrusive_text').toggle(400); 
		return false;
	});


	jQuery('#openid_rollup dl').toggle();

	jQuery('#openid_rollup_link').click( function() {
		jQuery('#openid_rollup dl').toggle(400); 
		return false;
	});
});

function add_unobtrusive_text() {

}

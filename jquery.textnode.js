jQuery.fn.appendToText = function(input) { 
	this.each(function(){ 
		if (input == null || input == '') return;
		if (this.childNodes == 0) { this.html(input); return; }

		var children = [];
		// have to wrap text in a single element in order 
		// to get all the child nodes (including text)
		var newNodes=jQuery('<i>'+input+'</i>')[0].childNodes;
		var appended = false;

		for (var i = this.childNodes.length-1; i >= 0; i--){ 
			if (!appended && this.childNodes[i].nodeType == 3) {
				for (var j = newNodes.length-1; j>=0; j--) {
					children.unshift(newNodes[j]);
				}
				appended = true;
			}
			children.unshift(this.childNodes[i]);
		} 
		jQuery(this).empty();
		for (var i=0; i<children.length; i++) {
			jQuery(this).append(children[i]);
		}
	}) 
}; 

jQuery.hasText = function(a) {
	for (var i=0; i<a.childNodes.length; i++) {
		if (a.childNodes[i].nodeType == 3) return true;
	} 
	return false;
};

jQuery.extend(jQuery.expr[':'], { 
	hastext: "jQuery.hasText(a)",
});


Ext.onReady(function() {
	Ext.Ajax.request({
		url: '../../test.json',
		success: function(response, options) {
			var result = eval('('+response.responseText+')');
			var filePath = result['basePath'];
			alert(filePath);
		}
	});
});
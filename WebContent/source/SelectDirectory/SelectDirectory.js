Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = '../../ext3/resources/images/default/s.gif';
	var fileBrowser = new Ext.hoo.component.FileBrowserWindow();
	// var fileBrowser = new Ext.hoo.component.FileBrowserPanel();
	fileBrowser.show();
	/*fileBrowser.tree.getSelectionModel().on("beforeselect", function(sm, node) {
		// 只能选择文件夹，如果要选择文件修改这里即可
		var flag = ((!node || (!!node && !!node.leaf)) || !(node.attributes.path
				.indexOf(":") != -1)) ? true : false;
		fileBrowser.buttons[0].setDisabled(flag);
		fileBrowser.buttons[1].setDisabled(flag);
	}, fileBrowser.tree);*/
});
Ext.onReady(function() {
	var num = new Ext.form.TextField({
		width: 140,
		fieldLabel: '编号'
	});
	
	var name = new Ext.form.TextField({
		width: 140,
		fieldLabel: '名称'
	});
	
	var viewPort = new Ext.Viewport({
		layout: 'border',
		renderTo: Ext.getBody(),
		items: [{
			xtype: 'form',
			title: '负债科目维护',
			region: 'north',
			frame: true,
			bodyStyle: 'padding:5px 5px 0',
			labelWidth: 75,
			split: false,
			height: 160,
			items: [num, name]
		}, {
			region: 'center'
		}]
	});
});
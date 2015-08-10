Ext.BLANK_IMAGE_URL = '../../ext3/resources/images/default/s.gif';

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var simple = new Ext.form.FormPanel({
		id: 'SimpleForm',
		title: 'Simple Form',
		labelWidth: 75,							// 子类容器中的标签宽度(以像素为单位)
		frame: true,
		bodyStyle: 'padding:5px 5px 0',
		width: 350,
		renderTo: Ext.getBody(),
		items: [{
			xtype: 'numberfield',
			fieldLabel: 'Port',
			
			minValue: 1024,
			maxValue: 50000
		}]
	});
});
Ext.onReady(function() {
	var win = new Ext.Panel({
		title: '测试DateTimeField控件',
		renderTo: Ext.getBody(),
		layout: 'form',
		width: 400,
		height: 300,
		frame: true,	// 使面板主体颜色与主题一致
		items: [{
			layout: 'form',
			height: '100%',
			frame: true,
			items: [{xtype: 'datetimefield', id: 'StartDate', fieldLabel: '开始日期', width: 150}]
		}, {
			text: '显示',
			xtype: 'button',
			handler: function(btn) {
				var date = new Date();
				Ext.getCmp('StartDate').setValue(new Date(date.getTime()-10*60*1000));
			}
		}]
	});	
	win.show();
});
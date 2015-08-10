Ext.onReady(function() {
	var panel_1 = new Ext.Panel({
		title: 'Panel_1',
		height: 100,
		anchor: '-50',
		html: '高度为100, 宽度=容器宽度-50'
	});
	var panel_2 = new Ext.Panel({
		title: 'Panel_2',
		height: 100,
		anchor: '50%',
		html: '高度为100, 宽度=容器宽度的50%'
	});
	var panel_3 = new Ext.Panel({
		title: 'Panel_3',
		anchor: '-10, -250',
		html: '宽度=容器宽度-10, 高度=容器高度-250'
	});
	var win = new Ext.Window({
		title: '测试Anchor的窗口',
		width: 800,
		height: 500,
		plain: true,	// 是窗口主体颜色与窗口颜色更为相近
		layout: 'anchor',
		items: [panel_1,panel_2,panel_3]
	});
	win.show();
});
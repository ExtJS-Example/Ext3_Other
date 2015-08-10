Ext.onReady(function() {
	var win;
	var button = Ext.get('show-btn');
	
	button.on('click', function() {
		// 创建一个TabPanel
		var tab = new Ext.TabPanel({
			id: '一个简单的TabPanel',
			region: 'center',
			margins: '3 3 3 0',
			defaults: {autoScroll: true},
			activeTab: 0,
			items: [{
				title: 'Bogus Tab',
				html: '第一个Tab的内容'
			}, {
				title: 'Another Tab',
				html: '另一个Tab的内容'
			}, {
				title: 'Collapse Tab',
				closable: true,
				html: '可关闭的Tab'
			}]
		});
		
		// 创建一个Panel
		var nav = new Ext.Panel({
			title: 'Navigation',
			region: 'west',
			split: true,
			collapsible: true,
			margins: '3 0 3 3',
			cmargins: '3 3 3 3'
		});
		
		// 如果窗口第一次被打开时才创建
		if(!win) {
			win = new Ext.Window({
				title: 'layout window',
				layout: 'border',
				width: 600,
				height: 350,
				plain: true,
				border: false,
				closeAction: 'hide',
				items: [nav, tab]
			});
		}
		win.show();
	});
});
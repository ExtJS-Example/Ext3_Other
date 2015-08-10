Ext.onReady(function() {
	Ext.QuickTips.init();
	
	groupTabPanel = [{
		id: 'GTP',
		xtype: 'grouptabpanel',
		tabWidth: 130,
		activeGroup: 0,
		items: [{
			expanded: true,
			items: [{
				title: 'TCP软件配置',
				layout: 'fit',
				tabTip: 'tips',
				style: 'padding: 10px;',
				items: [],
				buttons:[{
					text: '添加GroupTab',
					handler: function(btn) {
						var gtp = Ext.getCmp('GTP');
						gtp.add({
							expanded: true,
							items: [{
								title: 'tianjia',
								layout: 'fit',
								tabTip: 'tips',
								style: 'padding: 10px;',
								items: []
							}]
						});
					}
				}]
			}]
		}, {
			expanded: true,
			items: [{
				title: 'TCP转发配置',
				layout: 'fit',
				tabTip: 'tips',
				style: 'padding: 10px;',
				items: []
			}]
		}, {
			expanded: true,
            items: {
                title: 'Single item in third',
                bodyPadding: 10,
                html: '<h1>The third tab group only has a single entry.<br>This is to test the tab being tagged with both "first" and "last" classes to ensure rounded corners are applied top and bottom</h1>',
                border: false
            }
		}]
	}];

	var viewport = new Ext.Viewport({
		layout: 'fit',
		items: groupTabPanel
	});
});
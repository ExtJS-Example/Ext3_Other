/**
 * 一个展示边界布局的经典实例
 */
Ext.onReady(function() {
	new Ext.Viewport({
		layout: 'border',
		items: [{
			region: 'north',
			autoHeight: true,
			border: false,
			margins: '0 0 5 0',
			html: '<h1 class="x-panel-header">Page Titel</h1>'
		}, {
			title: 'Navigatioin',
			region: 'west',
			collapsible: true,
			split: true,
			width: 200
			// the west region might typically utilize a TreePanel or a Panel with Accordion layout
		}, {
			title: 'Title for Panel',
			region: 'south',
			collapsible: true,
			split: true,
			height: 100,
			minHeight: 100,
			html: 'Information goes here.'
		}, {
			region: 'center',
			xtype: 'tabpanel',		// TabPanel itself has no title
			items: {
				title: 'Default Tab',
				html: 'The first tab\'s content. Others may be added dynamically'
				
			}
		}]
	});
});
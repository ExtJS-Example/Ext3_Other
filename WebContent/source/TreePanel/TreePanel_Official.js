Ext.onReady(function() {
	new Ext.Viewport({
		layout: 'border',
		items: [{
			title: 'Navigation',
			region: 'west',
			xtype: 'treepanel',
			autoScroll: true,
			split: true,
			width: 200,
			loader: new Ext.tree.TreeLoader(),
			root: new Ext.tree.AsyncTreeNode({
				expanded: true,
				children: [{
					text: 'Menu Option 1',
					leaf: true
				}, {
					text: 'Menu Option 2',
					leaf: true
				}, {
					text: 'Menu Option 3',
					leaf: true
				}]
			}),
			listeners: {
				click: function(node) {
					Ext.Msg.alert('Navigation Tree Click', 'You clicked "'+node.attributes.text+'"');
				}
			}
		}, {
			region: 'center',
			xtype: 'tabpanel'
			// remaining code not shown...
		}]
	});
});
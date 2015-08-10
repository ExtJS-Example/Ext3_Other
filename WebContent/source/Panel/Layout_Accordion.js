Ext.onReady(function() {
	var panel = new Ext.Panel({
		renderTo: Ext.getBody(),
		width: 500,
		height: 300,
		layout: 'accordion',
		items: [
			{title: 'title1', html: '手风琴1'},
			{title: 'title2', html: '手风琴2'},
			{title: 'title3', html: '手风琴4'},
			{title: 'title4', html: '手风琴5'},
			{title: 'title5', html: '手风琴6'},
			{title: 'title6', html: '手风琴7'}
		]
	});
	panel.render('accordion');
});
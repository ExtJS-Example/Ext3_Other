Ext.onReady(function() {
	var pan = new Ext.Panel({
		title: 'Layout Fit',
		width: 500,
		height: 300,
		layout: 'fit',
		activeItem: 'child_2',
		items: [
			{id: 'child_1', title: '子元素1', html: 'first child element'},
			{id: 'child_2', title: '子元素2', html: 'second child element'},
			{id: 'child_3', title: '子元素3', html: 'third child element'},
			{id: 'child_4', title: '子元素4', html: 'forth child element'},
			{id: 'child_5', title: '子元素5', html: 'fifth child element'}
		]
	});
	pan.render('fit');
});
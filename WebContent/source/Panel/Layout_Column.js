Ext.onReady(function() {
	var win = new Ext.Window({
		title: 'Column Layout',
		width: 600,
		height: 300,
		plain: true,
		layout: 'column',
		items: [{
			title: 'width=50%',
			columnWidth: 0.5,
			height: 200,
			html: 'width=(容器宽度-容器内其它组件固定宽度)*50%<br/>(600-250-10)*0.5=170 因为还有其他一些border的宽度, 所以实际宽度应小于170'
		}, {
			title: 'width=250px',
			width: 250,
			height: 100,
			html: '固定宽度为250px'
		}]
	});
	win.show();

});
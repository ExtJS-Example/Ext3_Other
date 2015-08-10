/**
 * table布局
 * 如果子元素的个数超过columns, 会另起一行
 * 按照普通表格的方法布局子元素，用layoutConfig:{columns:3},将父容器分成3列 
 */

Ext.onReady(function() {
	var panel = new Ext.Panel({
		title: '容器组件',
		width: 500,
		height: 200,
		layout: 'table',
		layoutConfig: {
			columns: 3		// 将父容器分成3列
		},
		items: [
			{title: '元素1', html: 'element one', rowspan: 2, height: 100},
			{title: '元素2', html: 'element two', colspan: 2},
			{title: '元素3', html: 'element three'},
			{title: '元素4', html: 'element four'}
		]
	});
	panel.render('table');
});
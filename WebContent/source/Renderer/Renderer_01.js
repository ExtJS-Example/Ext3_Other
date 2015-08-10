/**
 * renderer可以格式化该列显示的数据格式或者按照你自定义的脚本显示最终数据样子（我目前是这么理解的）
 * 先看下renderer: function()里的参数
 * renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){}
 * 1.value是当前单元格的值
 * 2.cellmeta里保存的是cellId单元格id，id不知道是干啥的，似乎是列号，css是这个单元格的css样式。
 * 3.record是这行的所有数据，你想要什么，record.data["id"]这样就获得了。
 * 4.rowIndex是行号，不是从头往下数的意思，而是计算了分页以后的结果。
 * 5.columnIndex列号太简单了。
 * 6.store，这个厉害，实际上这个是你构造表格时候传递的ds，也就是说表格里所有的数据，你都可以随便调用，唉，太厉害了。
 */
Ext.onReady(function() {

	function renderSex(value, cellmeta) {
		if(value=='male') {
			return '<span style="color:red; font-weight:bold;">红男</span>';
		} else {
			return '<span style="color:green; font-weight:bold;">绿女</span>';
		}
	};
	
	function renderDesc(value, cellmeta, record, rowIndex, columnIndex, store) {
		return '<input type="button" value="查看详细信息"/>';
	}; 
	
	var cm = new Ext.grid.ColumnModel([
		{header: '编号', dataIndex: 'id'},
		{header: '性别', dataIndex: 'sex', renderer: renderSex},
		{header: '名称', dataIndex: 'name'},
		{header: '描述', dataIndex: 'desc', renderer: renderDesc}
	]);
	
	/********************************************************************************************************
	 * 第一种情况, store在gridpanel外定义并且取值, 必须使用MemoryProxy(data)的形式
	 ********************************************************************************************************
	 */
	var store = new Ext.data.ArrayStore({
		fields: ['id', 'sex', 'name', 'desc'],
		proxy: new Ext.data.MemoryProxy([
			[1, 'male', 'name1', 'desc1'],
			[2, 'female', 'name2', 'desc2'],
			[3, 'female', 'name3', 'desc3'],
			[4, 'male', 'name4', 'desc4'],
			[5, 'female', 'name5', 'desc5'],
			[6, 'female', 'name6', 'desc6'],
			[7, 'male', 'name7', 'desc7'],
			[8, 'female', 'nam8', 'desc8']
		])
	});
	store.load();
	
	var grid = new Ext.grid.GridPanel({
		title: '我是测试renderer方法的GridPanel',
		autoHeight: true,
		store: store,
		cm: cm,
		renderTo: 'grid'
	});
	
	
	
	/********************************************************************************************************
	 * 第二种情况, store在gridpanel里定义并且取值, 不必使用MemoryProxy(data)的形式
	 ********************************************************************************************************
	 */
/*	var grid = new Ext.grid.GridPanel({
		title: '我是测试renderer方法的GridPanel',
		autoHeight: true,
		renderTo: 'grid',
		cm: cm,
		store: new Ext.data.ArrayStore({
			fields: ['id', 'sex', 'name', 'desc'],
			data: [
				[1, 'male', 'name1', 'desc1'],
				[2, 'female', 'name2', 'desc2'],
				[3, 'female', 'name3', 'desc3'],
				[4, 'male', 'name4', 'desc4'],
				[5, 'female', 'name5', 'desc5'],
				[6, 'female', 'name6', 'desc6'],
				[7, 'male', 'name7', 'desc7'],
				[8, 'female', 'nam8', 'desc8']
			]
		})
	});*/
});
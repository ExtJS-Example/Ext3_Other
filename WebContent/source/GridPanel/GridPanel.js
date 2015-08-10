// EXt grid 的每行最后一列添加 '按钮'

Ext.onReady(function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
		sm,
		{header:'编号', dataIndex: 'id', sortable: true},
		{header:'性别', dataIndex: 'sex', sortable: true, renderer: renderSex},
		{header:'名称', dataIndex: 'name'},
		{header:'描述', dataIndex: 'descn', renderer: renderDescn}
	]);
	var data = [
		[1, 'male', 'name1', 'descn1'],
		[2, 'female', 'name2', 'descn2'],
		[3, 'male', 'name3', 'descn3'],
		[4, 'female', 'name4', 'descn4'],
		[5, 'male', 'name5', 'descn5']
	];
	var ds = new Ext.data.ArrayStore({
		proxy: new Ext.data.MemoryProxy(data),
		fields: ['id', 'sex', 'name', 'descn']
	});
	
	function renderSex(value) {
		if(value == 'male')	{
			return "<span style='color:red; font-weight:bold;'>男</span>";
		} else {
			return "<span style='color:green; font-weight:bold;'>女</span>";
		}
	};
	function renderDescn(value, cellmeta, record, rowIndex, columnIndex, store) {
		var str = "<input type='button' value='详细信息' onclick='alert(\"" + 
			"这个单元格的值是: " + value + "\\n" +
			"这个单元格的配置是: {cellAttr:" + cellmeta.attr + ", id:" + cellmeta.id + ",css:" + cellmeta.css + "}\\n" +
			"这个单元格对应行的record是: " + record.data["id"] + ", 一行的数据都在里面\\n" +
			"这是第" + rowIndex + "行\\n" +
			"这是第" + columnIndex + "列\\n" +
			"这个表格对应的Ext.data.Store在这里: " + store + ", 随便用吧"
			+"\")'>";
			return str;
	};
	
	var grid = new Ext.grid.GridPanel({
		ds: ds,
		cm: cm,
		sm: sm,
		title: 'GridPanle 最后一列加按钮',
		height: 300,
		autoScroll: true,
		bbar: new Ext.PagingToolbar({
			pageSize: 10,
			store: ds,
			displayInfo: true,
			displayMsg: '显示第{0}条到第{1}条记录, 一共{2}条',
			emptyMsg: '没有记录'
		})
	});
	ds.load({params: {start: 0, limit: 10}});
	grid.render('gridPanel');
});
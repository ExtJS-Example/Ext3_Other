/**
 * Ext 表格 GridPanel
 * 表格由类Ext.grid.Gripanel定义, 继承自Panel, 其xtype为grid. ExtJS中, 表格Grid必须包含列定义信息, 并指定表格的数据存储器.
 * 表格的列信息由类Ext.grid.ColumnModel定义, 而表格的数据存储器由Ext.data.Store定义, 数据存储器根据解析的数据不同分为JsonStore,SimpleStore,GroupingStore等
 */

// CloumnModel中'学员3'所对应的渲染函数
function showUrl(value) {
	return '<a href="http://www.baidu.com">' + value + '</a>';
};
Ext.onReady(function() {
	//*******************************给某列文字添加超链接***********************************************
	var store = new Ext.data.ArrayStore({
		data: [
			[1,"周文英","李静静","邢笑笑"],
		    [2,"王星","魏雪敏","杜江伟"],
		    [3,"王晨畅","杨谦","张小超"]
		],
		fields: ['id', 'name_1', 'name_2', 'name_3']
	});
	var colM = new Ext.grid.ColumnModel([
		{header: '学号', dataIndex: 'id', sortable: true},
		{header: '学员1', dataIndex: 'name_1'},
		{header: '学员2', dataIndex: 'name_2'},
		{header: '学员3', dataIndex: 'name_3', renderer: showUrl}
	]);
	
	var gridPanel = new Ext.grid.GridPanel({
		title: '2009届杨职院信息9班同学_给文字添加超链接',
		width: 400,
		height: 200,
		colModel: colM,
		store: store,
		autoExpandColumn: 2		// 自动伸展, 占满剩余区域(参数为id或序列号, 例如'name_1'或2)
	});
	gridPanel.render('gridPanel');
	
	
	//*******************************使数据可编辑***********************************************
	var store_edit = new Ext.data.ArrayStore({
		data:[
			[1, '周文英', '女', '1990-05-08'],
			[2, '王星', '男', '1990-06-04'],
			[3, '王晨畅', '男', '1990-08-17']
		],
		fields: ['id', 'name', 'gender', 'birthday']
	});
	function birthdayRender(value) {
		if(value instanceof Date) {
			return new Date(value).format('Y年m月d日');
		} else {
			return value;
		}
	};
	var col = new Ext.grid.ColumnModel([
		{header: '学号', dataIndex: 'id', sortable: true},
		{header: '姓名', dataIndex: 'name'},
		{header: '性别', dataIndex: 'gender', editor: new Ext.form.ComboBox({transform: 'select',
			triggerAction: 'all', layRender: true})},
		{header: '生日', dataIndex: 'birthday', width: 120, editor: new Ext.form.DateField({
			format: 'Y年m月d日'}), renderer: birthdayRender}
	]);
	var editorGridPanel = new Ext.grid.EditorGridPanel({
		title: '2009届杨职院信息9班同学_数据可编辑',
		width: 400,
		height: 200,
		colModel: col,
		store: store_edit,
		autoExpandColumn: 2
	});
	editorGridPanel.render('gridPanel');

});
Ext.onReady(function() {

	/**
	 * 实现这个嵌套表格要注意两点技巧：
	 * 1. 提供给外层表格的dataStore的数据源以嵌套数组的形式表示细节区的数据,如下面的黑体所示。
	 * var testData=[
	 *    ["lugreen","男",26,[["数学",100],["语文",150]]]
	 *     ,["lisi","男",25,[["数学",100],["语文",150]]]
	 *    ,["zhangsan","男",27,[["数学",120],["语文",158]]]   
	 * ];
	 * 使用数组集中record对象的json属性来获取以细节区数据
	 * var data=r.json[3];
	 * 2.  在rowExpander的 expand事件中添加嵌套表格.
	 */
	var testData = [
		["lugreen", "男", 26, [["数学", 100], ["语文", 150]]],
		["lisi", "男", 25, [["数学", 100], ["语文", 150]]],
		["zhangsan", "男", 27, [["数学", 120], ["语文", 158]]]
	];
	storeTest = new Ext.data.SimpleStore({
			fields : ["name", "sex", "age", "grade"],
			data : testData
		});

	var expander = new Ext.grid.RowExpander({
			tpl : new Ext.XTemplate('<div class="detailData">', '', '</div>')
		});
	expander.on("expand", function(expander, r, body, rowIndex) {
		// 查找 grid
		window.testEle = body;
		// alert(body.id);
		if (Ext.DomQuery.select("div.x-panel-bwrap", body).length == 0) {
			// alert("a");
			var data = r.json[3];
			var store = new Ext.data.SimpleStore({
				fields : ["class", "degrade"],
				data : data
			});
			var cm = new Ext.grid.ColumnModel([{
				header : "科目",
				dataIndex : 'class',
				width : 130,
				hideable : false,
				sortable : false,
				resizable : true
			}, {
				header : "成绩",
				dataIndex : 'degrade',
				width : 130,
				hideable : false,
				sortable : false,
				resizable : true
			}]);
			Ext.DomQuery.select("div.detailData")[0];
			var grid = new Ext.grid.GridPanel({
				store : store,
				cm : cm,
				renderTo : Ext.DomQuery.select("div.detailData", body)[0],
				autoWidth : true,
				autoHeight : true
			});
		}
	});

	// var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel([expander, {
		header : "姓名",
		dataIndex : 'name',
		width : 50,
		hideable : false,
		sortable : false
	}, {
		header : "性别",
		dataIndex : 'sex',
		width : 130,
		hideable : false,
		sortable : false,
		resizable : true
	}, {
		header : "年龄",
		dataIndex : 'age',
		width : 130,
		hideable : false,
		sortable : false,
		resizable : true
	}]);

	var grid = new Ext.grid.GridPanel({
		id : 'testgrid',
		store : storeTest,
		cm : cm,
		renderTo : "grid1",
		width : 780,
		autoHeight : false,
		height : 300,
		listeners : {},
		plugins : [expander]
	});

});
/**
 * ComboBox 没有readOnly这个属性.
 * 当editable:false时, typeAhead系列属性没有意义.
 */

Ext.onReady(function() {
	// 数据
	var countryCode = [
		[93,'Afghanistan(93)'],
	    [355,'Albania  (355)'],
	    [213,'Algeria  (213)'],
	    [376,'Andorra  (376)'],
	    [244,'Angola  (244)']
	];
	
	// ComboBox定义
	var combo = new Ext.form.ComboBox({
		id: 'Combo',
		hiddenName: 'country',		// 提交时的combo 那么
		width: 200,
		editable: false,			// 是否可编辑
		triggerAction: 'all',		// 默认为'query', 选择某值后, 再次选择时只出现匹配选项, 'all'表示再次选择时出现所有选项
		emptyText: '--请选择--',		// 未选择时显示的文字
		blankText: '该选项必须选择',	// 未选择时, 提交表单显示的错误信息
		store: new Ext.data.ArrayStore({
			fields: ['value', 'text'],
			data: countryCode
		}),
		mode: 'local',				// 数据加载模式, local代表本地数据
		valueField: 'value',		// 选项的value值, 提交时传递的该值
		displayField: 'text',		// 选项的显示值
		listeners: {}				// 监听事件
	});
	
	var panel = new Ext.form.FormPanel({
		title: '测试ComboBox',
		width: 400,
		height: 300,
		frame: true,				// 使面板主体颜色与主题一致
		items: [combo]
	});
	panel.render(Ext.getBody());
	
	// 方法
	combo.setValue('游戏');			// 设置combo的显示值
//	combo.clearValue();				// 清除combo值
//	combo.hiddenField.value = 'game';	// 设置combo隐藏值(传递值)
});
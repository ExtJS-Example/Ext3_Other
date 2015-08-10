Ext.onReady(function() {
	var cityStore = new Ext.data.ArrayStore({
		fields: ['codeName', 'realName'],
		data: [['豫A', '郑州'],['豫B', '开封'],['豫C', '洛阳'],['豫D', '平顶山'],['豫E', '安阳'],['豫N', '商丘']],
		autoLoad: true
	});
	var combo = new Ext.form.ComboBox({
		id: 'Combobox',
		fieldLabel: '河南城市',
		displayField: 'realName',
		valueField: 'codeName',
		store: cityStore,
		emptyText: '--请选择城市--',
		editable: false,		// 是否允许手动输入
		triggerAction: 'all',	// 下拉列表框显示全部的值
		typeAhead: true,		// 输入时提示(默认250ms, 通常与typeAheadDelay一块儿使用)
		mode: 'local',
		listeners: {
			afterRender: function(combo) {
				combo.setValue('豫B');
			},
			change: function(combo, newValue, oldValue){
				console.log('oldValue: '+oldValue+' --> newValue: '+newValue);
			},
			select: function(combo, record, index) {
				// 当列表项被选中时触发
				console.log(record);
				console.log(index);
			}
		}
	});
	var showPanel = new Ext.form.FormPanel({
		title: '测试下拉列表框',
		width: 300,
		height: 200,
		frame: true,		// 使面板主体颜色与主题一致
		labelWidth: 75,		// 设置子容器中的标签宽度
		renderTo: Ext.getBody(),
		items: [combo]
	});
	
//	alert('value: '+combo.getValue()+',  rawvalue: '+combo.getRawValue());
});
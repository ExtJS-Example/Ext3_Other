// 历史状态TabPanel

// 历史状态面板中的报警点表
var getHistoryAlarmPoint = function() {
	// 根据级别不同,给当前单元格设置不同的颜色
	// value:当前单元格的值, metaData:保存单元格id
	function change(value, meta){
        if(value == 0){
        	meta.css = 'level-0';
        	return '红';
        } else if(value == 1){
        	meta.css = 'level-1';
        	return '黄';
        } else if(value == 2){
        	meta.css = 'level-2';
        	return '白';
        } else if(value == 3){
        	meta.css = 'level-3';
        	return '绿';
        }
        return value;
    }
    
	var alarmColumns = [
		{ header: '序号', width: 60, falseble: true, align: 'center', dataIndex: 'id' },
		{ header: '级别', width: 60, sortable: false, align: 'center', dataIndex: 'level', renderer: change },
		{ header: '报警时间', width: 150, sortable: false, align: 'center', dataIndex: 'alarm_time' },
		{ header: '点表', width: 80, sortable: false, align: 'center', dataIndex: 'node' },
		{ header: '描述', width: 200, sortable: false, align: 'left', dataIndex: 'describe' },
		{ header: '当前值', width: 60, sortable: false, align: 'center', dataIndex: 'value' },
		{ header: '报警类型', width: 60, sortable: false, align: 'center', dataIndex: 'alarm_type' },
		{ header: '报警名称', width: 150, sortable: false, align: 'center', dataIndex: 'alarm_name' },
		{ header: '报警描述', width: 150, sortable: false, align: 'center', dataIndex: 'alarm_point_desc' }
	];
	
	var alarmFields = [
		'id',
		'level',
		'alarm_time',
		'node',
		'describe',
		'value',
		'alarm_type',
		'alarm_name',
		'alarm_point_desc'
	];
	
	var historyAlarmPoint = new Ext.grid.GridPanel({
		id: 'HistoryPoint',
		region: 'center',
		store: new Ext.data.JsonStore({
			fields: alarmFields,
			data: []
		}),
		columns: alarmColumns,
		stripeRows: true,	// 显示行的分隔符
		autoScroll: true,
		border: false,
		width: '100%'
	});
	
	return historyAlarmPoint;
};

// 过滤面板和查询面板


getNorthPan = function() {
	
	var query = new Ext.form.FormPanel({
		id: 'query',
		frame: false,
		layout: 'column',
		height: 35,
		items: [{
			layout: 'form',
			width: 235,
			labelWidth: 60,
			items: [{xtype: 'datetimefield', id: 'StartDate', fieldLabel: '开始日期', width: 150}]
		}, {
			width: 235,
			layout: 'form',
			labelWidth: 60,
			items: [{xtype: 'datetimefield', id: 'EndDate', editable: false, fieldLabel: '结束日期', width: 150}]
		}, {
			layout: 'form',
			width: 80,
			items: [{
				xtype: 'combo',
				id: 'History_Combo',
				width: 70,
				hideLabel: true,
				triggerAction: 'all',
				store: new Ext.data.ArrayStore({
					fields: ['intervalValue','intervalTime'],
					data: [[10, '10分钟'], [30, '30分钟'], [60, '1小时'], [360, '6小时'], [1440, '1天'], [10080, '7天'] ]
				}),
				displayField: 'intervalTime',
				valueField: 'intervalValue',
				mode: 'local',
				listeners: {
					afterRender: function(combo) {
						combo.setValue(60);
					},
					select: function(combo, record, index) {
						var currentTime = op_parseStrToTime(Ext.getCmp('EndDate').getValue().toString());
						var beforeTime = record['data']['intervalValue'] * 60 * 1000;
						Ext.getCmp('StartDate').setValue(op_getBeforeTime(currentTime, beforeTime ));
					}
				}
			}]
		}, {
			layout: 'form',
			width: 80,
			labelWidth: 60,
			items: [{
				xtype: 'button',
				text: '查询',
				handler: function() {
					Ext.getCmp('History').flushData();
				}
			}]
		}]
		/*,
		}, {
			layout: 'form',
			width: 80,
			labelWidth: 60,
			items: [{
				xtype: 'button',
				text: '查询',
				handler: function() {
					Ext.getCmp('History').flushData();
				}
			}]
		}]*/
	});

	var nodeStore = new Ext.data.ArrayStore({
		lazyRender: true,
		fields: ['nodeName', 'nodeValue'],
		data: [['All', '']]
	}); 
	var filter = new Ext.form.FormPanel({
		id: 'filter',
		layout: 'column',
		height: 35,
		items: [{
			layout: 'form',
			labelWidth: 40,
			items: [{
				id: 'History_NodeCombo',
				xtype: 'combo',
				width: 100,
				fieldLabel: '点表',
				triggerAction: 'all',
				displayField: 'nodeName',
				valueField: 'nodeValue',
				mode: 'local',
				store: nodeStore,
				listeners: {
					afterRender: function(combo) {
						Ext.Ajax.request({
							url: op_servlet+'?fn=getStaticChild&parent=W3&childType=NODE&fields=pn',
							method: 'post',
							success: function(response, option) {
								var result = eval('('+response.responseText+')');
								MyRecord = Ext.data.Record.create([
									{name:'nodeName', type: 'string', mapping: '0'},
									{name:'nodeValue', type: 'string', mapping: '1'}
								]);
								for(var i=0; i<result.length; i++) {
									var newRecord = new MyRecord({
										nodeName: result[i],
										nodeValue: result[i]
									});
									combo.getStore().add(newRecord);
								}
							}
						});
						combo.setValue("ALL");
					},
					select: function(combo) {
						Ext.getCmp('History').flushData();
					}
				}
			}]
		}, {
			layout: 'form',
			labelWidth: 40,
			items: [{id: 'History_PointPN', xtype: 'textfield', fieldLabel: '名称', width: 150}]
		}, {
			layout: 'form',
			labelWidth: 40,
			items: [{id: 'History_PointED',xtype: 'textfield', fieldLabel: '描述', width: 150}]
		}, {
			layout: 'form',
			labelWidth: 40,
			items: [{
				id: 'History_AlarmLevel',
				xtype: 'checkboxgroup',
				fieldLabel: '级别',
				columns: 4,
				items: [
					{id: 'History_AlarmLevel_Red', boxLabel: '红', name: 0,  checked: true},
					{id: 'History_AlarmLevel_Yellow', boxLabel: '黄', name: 1, checked: true},
					{id: 'History_AlarmLevel_White', boxLabel: '白', name: 2, checked: true},
					{id: 'History_AlarmLevel_Green', boxLabel: '绿', name: 3, checked: true}
				],
				listeners: {
					change: function() {
						Ext.getCmp('History').flushData();
					}
				}
			}]
		}]
	});
	
	var northPan = new Ext.Panel({
		id: 'NorthPan',
		title: 'northPan',
		region: 'north',
		height: 180,
		layout: 'form',
		items: [query, filter]
	});
	
	return northPan;
};

FilterAndQuery = Ext.extend(Ext.Panel, {
	constructor: function(cfg) {
		var query = new Ext.form.FormPanel({
			id: 'query',
			layout: 'column',
			height: 35,
			items: [{
				layout: 'form',
				width: 235,
				labelWidth: 60,
				items: [{xtype: 'datetimefield', id: 'StartDate', fieldLabel: '开始日期', width: 150}]
			}, {
				width: 235,
				layout: 'form',
				labelWidth: 60,
				items: [{xtype: 'datetimefield', id: 'EndDate', editable: false, fieldLabel: '结束日期', width: 150}]
			}, {
				layout: 'form',
				width: 80,
				items: [{
					xtype: 'combo',
					id: 'History_Combo',
					width: 70,
					hideLabel: true,
					triggerAction: 'all',
					store: new Ext.data.ArrayStore({
						fields: ['intervalValue','intervalTime'],
						data: [[10, '10分钟'], [30, '30分钟'], [60, '1小时'], [360, '6小时'], [1440, '1天'], [10080, '7天'] ]
					}),
					displayField: 'intervalTime',
					valueField: 'intervalValue',
					mode: 'local',
					listeners: {
						afterRender: function(combo) {
							combo.setValue(60);
						},
						select: function(combo, record, index) {
							var currentTime = op_parseStrToTime(Ext.getCmp('EndDate').getValue().toString());
							var beforeTime = record['data']['intervalValue'] * 60 * 1000;
							Ext.getCmp('StartDate').setValue(op_getBeforeTime(currentTime, beforeTime ));
						}
					}
				}]
			}, {
				layout: 'form',
				width: 80,
				labelWidth: 60,
				items: [{
					xtype: 'button',
					text: '查询',
					handler: function() {
						Ext.getCmp('History').flushData();
					}
				}]
			}]
		});
	
		var nodeStore = new Ext.data.ArrayStore({
			lazyRender: true,
			fields: ['nodeName', 'nodeValue'],
			data: [['All', '']]
		}); 
		var filter = new Ext.form.FormPanel({
			id: 'filter',
			layout: 'column',
			height: 35,
			items: [{
				layout: 'form',
				labelWidth: 40,
				items: [{
					id: 'History_NodeCombo',
					xtype: 'combo',
					width: 100,
					fieldLabel: '点表',
					triggerAction: 'all',
					displayField: 'nodeName',
					valueField: 'nodeValue',
					mode: 'local',
					store: nodeStore/*,
					listeners: {
						afterRender: function(combo) {
							Ext.Ajax.request({
								url: op_servlet+'?fn=getStaticChild&parent=W3&childType=NODE&fields=pn',
								method: 'post',
								success: function(response, option) {
									var result = eval('('+response.responseText+')');
									MyRecord = Ext.data.Record.create([
										{name:'nodeName', type: 'string', mapping: '0'},
										{name:'nodeValue', type: 'string', mapping: '1'}
									]);
									for(var i=0; i<result.length; i++) {
										var newRecord = new MyRecord({
											nodeName: result[i],
											nodeValue: result[i]
										});
										combo.getStore().add(newRecord);
									}
								}
							});
							combo.setValue("ALL");
						},
						select: function(combo) {
							Ext.getCmp('History').flushData();
						}
					}*/
				}]
			}, {
				layout: 'form',
				labelWidth: 40,
				items: [{id: 'History_PointPN', xtype: 'textfield', fieldLabel: '名称', width: 150}]
			}, {
				layout: 'form',
				labelWidth: 40,
				items: [{id: 'History_PointED',xtype: 'textfield', fieldLabel: '描述', width: 150}]
			}, {
				layout: 'form',
				labelWidth: 40,
				items: [{
					id: 'History_AlarmLevel',
					xtype: 'checkboxgroup',
					fieldLabel: '级别',
					columns: 4,
					items: [
						{id: 'History_AlarmLevel_Red', boxLabel: '红', name: 0,  checked: true},
						{id: 'History_AlarmLevel_Yellow', boxLabel: '黄', name: 1, checked: true},
						{id: 'History_AlarmLevel_White', boxLabel: '白', name: 2, checked: true},
						{id: 'History_AlarmLevel_Green', boxLabel: '绿', name: 3, checked: true}
					],
					listeners: {
						change: function() {
							Ext.getCmp('History').flushData();
						}
					}
				}]
			}]
		});
		
		FilterAndQuery.superclass.constructor.call(this, {
			id: 'FilterAndQuery',
			region: 'north',
			layout: 'form',
			frame: true,
			width: '100%',
			height: 70,
			items: [query, filter]
		});
	}
});


// 实时状态TablePanel
HistoryPan = Ext.extend(Ext.Panel, {
	constructor: function(cfg) {	
		HistoryPan.superclass.constructor.call(this, {
			id: 'History',
			title: '历史状态',
			layout: 'border',
			frame: false,
//			items: [getNorthPan(), getHistoryAlarmPoint()]
			items: [new FilterAndQuery(), getHistoryAlarmPoint()]
		});
	}
});

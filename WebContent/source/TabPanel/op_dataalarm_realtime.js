// 实时状态面板中的报警点表
var getRealtimeAlarmPoint = function() {
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
	
	var realtiemAlarmPoint = new Ext.grid.GridPanel({
		id: 'RealtimePoint',
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
	
	return realtiemAlarmPoint;
};

// 过滤面板
RealtimeFilter = Ext.extend(Ext.form.FormPanel, {
	constructor: function(cfg) {
		var nodeStore = new Ext.data.ArrayStore({
			lazyRender: true,
			fields: ['nodeName', 'nodeValue'],
			data: [['All', '']]
		}); 
	    var filterItems =[{
			layout: 'form',
			labelWidth: 40,
			items: [{
				id: 'Realtime_NodeCombo',
				xtype: 'combo',
				width: 100,
				fieldLabel: '点表',
				triggerAction: 'all',
				displayField: 'nodeName',
				valueField: 'nodeValue',
				mode: 'local',
				store: nodeStore
			}]
		}, {
			layout: 'form',
			labelWidth: 40,
			items: [{id: 'Realtime_PointPN', xtype: 'textfield', fieldLabel: '名称', width: 150}]
		}, {
			layout: 'form',
			labelWidth: 40,
			items: [{id: 'Realtime_PointED',xtype: 'textfield', fieldLabel: '描述', width: 150}]
		}, {
			layout: 'form',
			labelWidth: 40,
			items: [{
				id: 'Realtime_AlarmLevel',
				xtype: 'checkboxgroup',
				fieldLabel: '级别',
				columns: 4,
				items: [
					{id: 'Realtime_AlarmLevel_Red', boxLabel: '红', name: 0,  checked: true},
					{id: 'Realtime_AlarmLevel_Yellow', boxLabel: '黄', name: 1, checked: true},
					{id: 'Realtime_AlarmLevel_White', boxLabel: '白', name: 2, checked: true},
					{id: 'Realtime_AlarmLevel_Green', boxLabel: '绿', name: 3, checked: true}
				]
			}]
		}];
		
		RealtimeFilter.superclass.constructor.call(this, {
			id: 'filter',
			region: 'north',
			layout: 'column',
			frame: true,
			width: '100%',
			height: 35,
			items: filterItems
		});
	}
});

// 实时状态TablePanel
RealtimePan = Ext.extend(Ext.Panel, {
	constructor: function(cfg) {	
		RealtimePan.superclass.constructor.call(this, {
			id: 'Realtime',
			title: '实时状态',
			layout: 'border',
			frame: false,
			items: [new RealtimeFilter(), getRealtimeAlarmPoint()]
		});
	}
});

Ext.onReady(function() {
	var win = new Ext.Window({
		title: 'Form Layout',
		width: 230,
		height: 150,
		plain: true,
		bodyStyle: 'padding: 15px',
		items: [{
			xtype: 'form',
			labelWidth: 30,	// 该FormPanel中的所有Lable的默认宽度
			defaultType: 'textfield',
			frame: true,	// 使FormPanel中不显示白色, 显示和父容器配套的颜色
			items: [{
				fieldLabel: '姓名',
				name: 'userName',
				allowBlank: false
			}, {
				fieldLabel: '昵称',
				name: 'nickname'
			}, {
				fieldLabel: '生日',
				xtype: 'datefield',
				name: 'birthday',
				width: 127
			}]
		}]
	});
	win.show();
});
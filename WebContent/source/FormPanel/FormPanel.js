/**
 * FormPanel就两种布局方式: 
 * a. form--------从上往下
 * b. column------从左往右
 * 注意: 落实到任何一个表单最后总是form布局
 */
 
Ext.onReady(function() {
	// 行1
	var row1 = {
		layout: 'column',		// 从左往右布局
		items: [{
			columnWidth: .3,	// 该列在整行中所占的百分比
			layout: 'form',		// 从上往下布局
			items: [{
				xtype: 'textfield',
				fieldLabel: '姓',
				width: 120
			} ]
		}, {
			columnWidth: .3,
			layout: 'form',
			items: [{
				xtype: 'textfield',
				fieldLabel: '名',
				width: 120
			}]
		}, {
			columnWidth: .3,
			layout: 'form',
			items: [{
				xtype: 'textfield',
				fieldLabel: '英文名',
				width: 120
			}]
		}]
	};
	// 行2
	var row2 = {
		layout: 'column',		// 从左往右布局
		items: [{
			columnWidth: .5,
			layout: 'form',
			items: [{
				xtype: 'textfield',
				fieldLabel: '座右铭1',
				width: 200
			}]
		}, {
			columnWidth: .5,
			layout: 'form',
			items: [{
				xtype: 'textfield',
				fieldLabel: '座右铭2',
				width: 200
			}]
		}]
	};
	// 行3
	var row3 = {
		layout: 'form',		// 从上往下布局
		items: [{
			xtype: 'textfield',
			fieldLabel: '奖励',
			width: 500
		}, {
			xtype: 'textfield',
			fieldLabel: '处罚',
			width: 500
		}]
	};
	// 行4
	var row4 = {
		layout: 'column',
		items: [{
			columnWidth: .2,
			layout: 'form',
			items: [{
				xtype: 'textfield',
				fieldLabel: '最爱电影',
				width: 50
			}]
		}, {
			columnWidth: .2,
			layout: 'form',
			items: [{
				xtype: 'textfield',
				fieldLabel: '最爱音乐',
				width: 50
			}]
		}, {
			columnWidth: .2,
			layout: 'form',
			items: [{
				xtype: 'textfield',
				fieldLabel: '最爱明星',
				width: 50
			}]
		}, {
			columnWidth: .2,
			layout: 'form',
			items: [{
				xtype: 'textfield',
				fieldLabel: '最爱运动',
				width: 50
			}]
		}]
	};
	// 行5
	var row5 = {
		layout: 'form',
		items: [{
			xtype: 'htmleditor',
			fieldLabel: '获奖文章',
			height: 150
		}]
	};
	
	// FormPanel表单，上面的所有组件全是这个表单的子项
	var form = new Ext.form.FormPanel({
		title: '灵活的表单布局',
		width: 650,
		autoheight: true,
		frame: true,
		layout: 'form',
		labelWidth: 65,			// 标签的宽度。该属性级联于没有设定此属性的子容器，并在任意子容器中可被重写。默认100
		labelAlign: 'right',	// 有效值'left(default)','right','top'。该属性级联于没有设定此属性的子容器
		style: 'padding: 10px',
		items: [row1, row2, row3, row4, row5],
		buttonAlign: 'center',
		buttons: [{
			text: '提交'
		}, {
			text: '重置'
		}]
	});
	form.render(Ext.getBody());		// 纯是不想看到警告, 故此特意分出来一句
});
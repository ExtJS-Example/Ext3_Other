/**
 * JsonStore 在gridpanel外定义, 可以
 * JsonStore 在gridpanel内定义, 也可以
 */

Ext.onReady(function() {
	
	var cm = []
	
	var store = new Ext.data.JsonStore({
		fields: ['name', 'email', 'online'],
		data: [
			{'name':'廉新忠', 'email':'lianxinzhong@126.com', 'online':true},
			{'name':'廉新忠1', 'email':'lianxinzhong1@126.com', 'online':false},
			{'name':'廉新忠2', 'email':'lianxinzhong2@126.com', 'online':true},
			{'name':'廉新忠3', 'email':'lianxinzhong3@126.com', 'online':false}
		]
	});
	var grid = new Ext.grid.GridPanel({
		title: 'Users',
		frame: true,
		/*store: new Ext.data.JsonStore({
			fields: ['name', 'email', 'online'],
			data: [
				{'name':'廉新忠', 'email':'lianxinzhong@126.com', 'online':true},
				{'name':'廉新忠1', 'email':'lianxinzhong1@126.com', 'online':false},
				{'name':'廉新忠2', 'email':'lianxinzhong2@126.com', 'online':true},
				{'name':'廉新忠3', 'email':'lianxinzhong3@126.com', 'online':false}
			]
		}),*/
		store: store,
		columns: [
			{
				header: 'Name',
				dataIndex: 'name',
				renderer: function(value, meta) {
					meta.css ='user-online';
					return value;
				}
			},
			{header: 'Email', dataIndex: 'email', flex:1},
			{header: 'Online', dataIndex: 'online'}
		],
		width: 400,
		height: 400,
		renderTo: Ext.getBody()
	});
	
});
Ext.onReady(function() {
	
	// 创建TabPanel, 放在ViewPort的center区
	var center = new Ext.TabPanel({
		id: 'tab_main',
		region: 'center',
		frame: false,
		items: [{
			id: 'welcom',
			title: '首页',
			html : "<iframe src='demo/welcome.jsp' style='width:100%;height:100%'>"
		}],
		enableTabScroll: true
	});
	
	// 设置id为'welcome'的tabPanel在当前页面显示
	center.setActiveTab('welcome');
	
	// 创建树, 放在ViewPort的西区
	var tree = new Ext.tree.TreePanel({
		title: '主菜单',
		width: 200,
		autoScroll: true,
//		singleExpand: true,
//		rootVisible: true,
//		animate: true,
		// 树加载器
		loader: new Ext.tree.TreeLoader({
			dataUrl: 'tree/treeNodeAction_listTree.action'
		}),
		listeners: {
			click: function(node) {
				// node代表被点击的结点, 通过其attributes属性读取
				// 后台传来的url等属性(), url指该结点指向的页面
				var url = node.attributes.url;
				var id = node.attributes.id;
				// 从center中获取相关的panel
				var tab = center.getItem('tab_'+id);
				// 只有当url存在, 才进行后续处理
				if(url) {
					// 如果相关的Panel已存在, 直接将其设置为活动的即可
					if(tab) {
						center.setActiveTab(tab);
					} else {
						// 否则创建一个Panel, 用于加载url指向的页面, 然后
						// 将此Panel添加到center中, 并设置其为活动的
						tab = new Ext.Panel({
							title: node.attributes.text,
							html: "<iframe src='"
								+ url
								+ "'"
								+ "width='100%' height='100%' frameborder='0' scrolling='auto'>"
								+ '</iframe>',
							closable: true,
							layout: 'fit',
							frame: false,
							id: 'tab_' + id
						});
						center.add(tab);
						center.setActiveTab(tab);
					}
				}
			}
		}
	});
	
	var root = new Ext.tree.AsyncTreeNode({
		id: 'root',
		text: '根',
		expand: true
	});
	// 将此根节点设置为树的根
	tree.setRootNode(root);
	
	// 页面布局
	new Ext.Viewport({
		layout: 'border',
		items: [{
			region: 'west',
			layout: 'fit',
			width: 200,
			items: tree
		}, {
			id: 'centerPanel',
			region: 'center',
			layout: 'fit',
			autoScroll: true,
			items: center
		}]
	});
});
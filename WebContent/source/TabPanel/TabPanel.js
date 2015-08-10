// 需要ExtJS版本4.+
Ext.onReady(function() {
	/**
	 * 首先我们来定义一个基本的选项卡控件, 其中每个Tab各有所不同, Tab的正文内容可以有三种方式获取:
	 * 1. 基本方式: 通过html和items的方式.
	 * 2. 读取其它html的信息: 通过设置contentElement就可以获取其他html的信息为当前tab正文.
	 * 3. 读取服务器端数据: 通过定义autoLoader异步方式获取服务端数据.
	 * 另外, 每个tab都可以设置是否可关闭, 进入tab时的事件, 以及tab是否可用. 具体情况看具体代码:
	 */

	var items = [{
		id: 'tab1',
		title: '普通Tab',
		closable: true,		// 这个tab可以被关闭
		html: '这只是一个非常普通的Tab',
		items: [{xtype: 'button', text: '按钮'}]
	}, {
		id: 'tab2',
		title: '内容来自div',
		contentEl: 'onTab'	// 指定了当前tab正文部分从哪个html元素读取
	}];
	
	// 1. 基本的选项卡
	var tabs1 = new Ext.TabPanel({
		renderTo: 'tabPanel',
		activeTab: 1,			// 指定默认的活动tab
		width: 600,
		height: 120,
		plain: true,			// true表示tab候选栏上没有背景图片
		enableTabScroll: true,	// 选项卡过多时, 允许滚动
		defaults: {autoScroll: true},
		items: items
	});
	
	tabs1.add({
		id: 'tab3',
		title: '测试add方法'
	});
	
	Ext.Msg.alert('Tips','add毫无异常!');
	
	tabs1.removeAll();
	Ext.Msg.alert('Tips','TabPanel清空');
	
	tabs1.add(items);
	Ext.Msg.alert('Tips','TabPanel重新添加');
	
});
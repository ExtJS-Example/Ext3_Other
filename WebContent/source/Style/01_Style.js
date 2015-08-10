
/**
 * Style: 作用在当前组件元素上的自定义样式
 */

Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = '../../ext3/resources/images/default/s.gif';
	Ext.QuickTips.init();
	
	new Ext.Panel({
		title: '测试Style',
		renderTo: Ext.getBody(),
		width: 400,
		height: 300,
		items: [{
			xtype: 'textarea',
			style: {	// 对当前的textarea有效
				width: '75%',
				marginBottom: '10px'
			}
		}, new Ext.Button({
			text: 'send',
			minWidth: 150,
			style: {
				marginBottom: '10px'
			}
		})]
	});
	
});
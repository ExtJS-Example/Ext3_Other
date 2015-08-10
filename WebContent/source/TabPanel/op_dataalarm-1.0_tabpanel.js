// 实时状态面板
var realtimePan = new RealtimePan();
var historyPan = new HistoryPan();

var tabs = new Ext.TabPanel({
	id: 'tabs',
	frame: true,
	activeTab: 0,
	region: 'center',
	defaults: {autoScroll: true},
	items: [realtimePan, historyPan]
});

// 主框架面板
MainViewport = Ext.extend(Ext.Viewport, {
	constructor: function() {
		MainViewport.superclass.constructor.call(this, {
			layout: 'border',
			items: [tabs]
		});
	}
});

Ext.onReady(function() {
	new MainViewport();
});
Ext.onReady(function() {
	var index = 0;
	var navHandler = function(direction) {
		// 传来的参数为-1, 表明点击的是'上一步', 为1表明点击的是'下一步'
		if(direction == -1) {
			index--;
			if(index<0) {index = 0 ;}
		}
		if(direction == 1) {
			index++;
			if(index>2) {index = 2; return false;}
		}
		
		var btnNext = Ext.getCmp('move-next');
		var btnBack = Ext.getCmp('move-back');
		
		if(index == 0) {
			btnBack.setDisabled(true);
		} else {
			btnBack.setDisabled(false);
		}
		if(index == 2) {
			btnNext.setText('完成');
			btnNext.setDisabled(true);
		} else {
			btnNext.setText('下一步');
			btnNext.setDisabled(false);
		}
		
		card.getLayout().setActiveItem(index);
	};
	
	var card = new Ext.Panel({
		title: '注册向导',
		width: 200,
		height: 200,
		layout: 'card',
		activeItem: 0,
		bodyStyle: 'padding: 15px',
		defaults: {
			border: false
		},
		bbar: [{
			id: 'move-back',
			text: '上一步',
			disabled: true,
			handler: navHandler.createDelegate(this, [-1])
		}, {
			id: 'move-next',
			text: '下一步',
			handler: navHandler.createDelegate(this, [1])
		}],
		items: [{
			id: 'card-0',
			html: '<h1>欢迎来到注册向导!</h1><p>Step 1 of 3</p>'
		}, {
			id: 'card-1',
			html: '<h1>请填写注册资料!</h1><p>Step 2 of 3</p>'
		}, {
			id: 'card-2',
			html: '<h1>注册成功!</h1><p>Step  of 3</p>'
		}]
	});
	card.render('card');
});
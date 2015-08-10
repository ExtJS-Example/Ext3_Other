Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">加载中...</div>';

if(Ext.View){
  Ext.View.prototype.emptyText = "";
}

if(Ext.grid.GridPanel){
  Ext.grid.GridPanel.prototype.ddText = "{0} 选择行";
}

if(Ext.TabPanelItem){
  Ext.TabPanelItem.prototype.closeText = "关闭";
}

if(Ext.form.Field){
  Ext.form.Field.prototype.invalidText = "输入值非法";
}

Date.monthNames = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月"
];

Date.dayNames = [
  "日",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六"
];

if(Ext.MessageBox) {
  Ext.MessageBox.buttonText = {
    ok     : "确定",
    cancel : "取消",
    yes    : "是",
    no     : "否"
  };
}

if(Ext.util.Format) {
  Ext.util.Format.date = function(v, format) {
    if(!v) return "";
    if(!(v instanceof Date)) v = new Date(Date.parse(v));
    return v.dateFormat(format || "y年m月d日");
  };
}

if(Ext.DatePicker) {
  Ext.apply(Ext.DatePicker.prototype, {
    todayText         : "今天",
    minText           : "日期在最小日期之前",
    maxText           : "日期在最大日期之后",
    disabledDaysText  : "",
    disabledDatesText : "",
    monthNames        : Date.monthNames,
    dayNames          : Date.dayNames,
    nextText          : '下月 (Control+Right)',
    prevText          : '上月 (Control+Left)',
    monthYearText     : '选择一个月 (Control+Up/Down 来改变年)',
    todayTip          : "{0} (空格键选择)",
    format            : "y年m月d日",
    okText            : "确定",
    cancelText        : "取消"
  });
}

if(Ext.PagingToolbar) {
  Ext.apply(Ext.PagingToolbar.prototype, {
    beforePageText : "页",
    afterPageText  : "页共 {0} 页",
    firstText      : "第一页",
    prevText       : "前一页",
    nextText       : "下一页",
    lastText       : "最后页",
    refreshText    : "刷新",
    displayMsg     : "显示 {0} - {1}，共 {2} 条",
    emptyMsg       : '没有数据需要显示'
  });
}

if(Ext.form.TextField) {
  Ext.apply(Ext.form.TextField.prototype, {
    minLengthText : "该输入项的最小长度是 {0}",
    maxLengthText : "该输入项的最大长度是 {0}",
    blankText     : "该输入项为必输项",
    regexText     : "",
    emptyText     : null
  });
}

if(Ext.form.NumberField) {
  Ext.apply(Ext.form.NumberField.prototype, {
    minText : "该输入项的最小值是 {0}",
    maxText : "该输入项的最大值是 {0}",
    nanText : "{0} 不是有效数值"
  });
}

if(Ext.form.DateField) {
  Ext.apply(Ext.form.DateField.prototype, {
    disabledDaysText  : "禁用",
    disabledDatesText : "禁用",
    minText           : "该输入项的日期必须在 {0} 之后",
    maxText           : "该输入项的日期必须在 {0} 之前",
    invalidText       : "{0} 是无效的日期 - 必须符合格式： {1}",
    format            : "y年m月d日"
  });
}

if(Ext.form.ComboBox) {
  Ext.apply(Ext.form.ComboBox.prototype, {
    loadingText       : "加载...",
    valueNotFoundText : undefined
  });
}

if(Ext.form.VTypes) {
  Ext.apply(Ext.form.VTypes, {
    emailText    : '该输入项必须是电子邮件地址，格式如： "user@domain.com"',
    urlText      : '该输入项必须是URL地址，格式如： "http:/'+'/www.domain.com"',
    alphaText    : '该输入项只能包含字符和_',
    alphanumText : '该输入项只能包含字符,数字和_'
  });
}

if(Ext.grid.GridView) {
  Ext.apply(Ext.grid.GridView.prototype, {
    sortAscText  : "正序",
    sortDescText : "逆序",
    lockText     : "锁列",
    unlockText   : "解锁列",
    columnsText  : "列"
  });
}

if(Ext.grid.PropertyColumnModel) {
  Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
    nameText   : "名称",
    valueText  : "值",
    dateFormat : "y年m月d日"
  });
}

if(Ext.layout.BorderLayout && Ext.layout.BorderLayout.SplitRegion) {
  Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
    splitTip            : "拖动来改变尺寸.",
    collapsibleSplitTip : "拖动来改变尺寸. 双击隐藏."
  });
}

Ext.lib.Ajax.asyncRequest = function(method , uri , callback , postData) {
	var o = this.getConnectionObject() ;
	if (!o) {
		return null;
	}
	else {
		if(/\?/g.test(uri)) {
			var _temp = uri.split(/\?/) ;
			var _url = _temp[0] ;
			var _msg = Message.getJSONInstance(Ext.urlDecode(_temp[1])) ;
			var _set = _msg.getNameSet() ;
			var _temp = "" ;
			for(var _i = 0 ; _i < _set.length ; _i ++) {
				_value =encodeURIComponent(encodeURIComponent(_msg.getVariable(_set[_i])));
				_temp += _set[_i] + "=" + _value ;
				if(_i < _set.length - 1)
					_temp += "&" ;
			}
			uri = _url + "?" + _temp ;
		}
		o.conn.open(method, uri, true);
		if (this.useDefaultXhrHeader) {
			if (!this.defaultHeaders['X-Requested-With']) {
				this.initHeader('X-Requested-With', this.defaultXhrHeader, true);
			}
		}
		if(postData && this.useDefaultHeader) {
			this.initHeader('Content-Type', this.defaultPostHeader);
		}
		if (this.hasDefaultHeaders || this.hasHeaders) {
			this.setHeader(o);
		}
		if(typeof(postData) == "string" && postData.trim() != "") {
			try {
				var _isPost = true ;
				if(!(/^.+?\=.+?\&?$/.test(postData)))
					_isPost = false ;
				if(_isPost)
					var _msg = Message.getJSONInstance(Ext.urlDecode(postData)) ;
				else
					var _msg = Message.getJSONInstance(Ext.util.JSON.decode(postData)) ;
				var _set = _msg.getNameSet() ;
				var _temp = "{" ;
				for(var _i = 0 ; _i < _set.length ; _i ++)
					_msg.setVariable(_set[_i] , encodeURIComponent(_msg.getVariable(_set[_i]))) ; 
				postData = Ext.urlEncode(_msg.getJSONEncode()) ;
			}catch(_err) {
			}
		}
		this.handleReadyState(o, callback);
		o.conn.send(postData || null);
		return o;
	}
}

Ext.lib.Ajax.asyncXMLRequest = function(_uri , _callback , _postData) {
  var _conn = this.getConnectionObject();
	if (!_conn)
		return ;
	else {
		_conn.conn.open("POST" , _uri , true);
		if(typeof(_postData) == "object") {
			try{
				_postData = _postData.documentElement.xml ;
			}catch(_err) {
				return ;
			}
		}
		this.handleReadyState(_conn , _callback);
		_conn.conn.send(_postData || null);
		return _conn;
	}
}

Ext.lib.Ajax.handleReadyState = function(o, callback) {
	var oConn = this;
	o.conn.onreadystatechange = function() {
		if (o.conn && o.conn.readyState == 4)
			oConn.handleTransactionResponse(o, callback);
	}
}

Ext.util.Observable.prototype.SILENCE = false ;

Ext.util.Observable.prototype.toSlience = function() {
	this.SILENCE = true ;
}

Ext.util.Observable.prototype.fireEvent = function() {
	try {
		if(!this.SILENCE)
			LockLoop.LOOP = 0 ;
	}catch(_err) {
	}
	if(this.eventsSuspended !== true) {
		var ce = this.events[arguments[0].toLowerCase()];
		if(typeof ce == "object")  {
			return ce.fire.apply(ce, Array.prototype.slice.call(arguments, 1));
		}
	}
	return true;
}

Number.prototype.transformValue = function() {
	return String(this).transformValue();
}

Number.prototype.transformString = function(){
	return String(this).transformString() ;
}

String.prototype.transformValue = function() {
	return this.replace(/\&/g ,"&amp;").replace(/\</g , "&lt;").replace(/\>/g , "&gt;").replace(/\'/g ,"&#39;").replace(/\"/g ,"&quot;");
}

String.prototype.transformString = function() {
	return this.replace(/\&\#39;/g ,"\'").replace(/\&gt;/g ,">").replace(/\&lt;/g , "<").replace(/\&quot;/g , "\"").replace(/\&amp;/g , "&") ;
}

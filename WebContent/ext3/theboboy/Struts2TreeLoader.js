// TreeLoader扩展,支持josn-plugin返回的json对象中包含的数组值
Ext.ux.Struts2TreeLoader = function(cfg) {
  this.root = cfg.root;
  Ext.ux.Struts2TreeLoader.superclass.constructor.call(this, cfg);
}
Ext.extend(Ext.ux.Struts2TreeLoader, Ext.tree.TreeLoader, {
  processResponse : function(response, node, callback) {
    var json = response.responseText;
    try {
      var o = response.responseData || Ext.decode(json);
      // 在原代码基础上增加了下面处理---------------------
      if (Ext.type(o) == 'object') {// 如果返回的是对象则获取他的root部分,rootName是可以在使用的时候配置的
        o = o[this.root || 'root'];
      }
      // --------------------------------------------------
      node.beginUpdate();
      for (var i = 0, len = o.length; i < len; i++) {
        var n = this.createNode(o[i]);
        if (n) {
          node.appendChild(n);
        }
      }
      node.endUpdate();
      this.runCallback(callback, scope || node, [node]);
    } catch (e) {
      this.handleFailure(response);
    }
  }
});

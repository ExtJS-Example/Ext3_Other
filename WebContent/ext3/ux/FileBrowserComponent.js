/** 
 * Ext.hoo.component.FileBrowserWindow 系统文件浏览选择组件，可以选定电脑上的文件或文件夹 
 * @author: hoojo 
 * @createDate 2010-10-17 
 * @email: hoojo_@126.com 
 * @blog: http://blog.csdn.net/IBM_hoojo 
 * @ext_lib: v2.2 
 * @version 1.0  
 */  
Ext.ns("Ext.hoo.component");  
Ext.hoo.component.FileBrowserWindow = Ext.extend(Ext.Window, {  
    constructor: function (config) {  
        config = config || {};  
        Ext.apply(this, config);  
        this.tree = new Ext.hoo.tree.FileSystemTree();  
        Ext.hoo.component.FileBrowserWindow.superclass.constructor.call(this, {  
            renderTo: Ext.getBody(),  
            width: 300,  
            height: 300,  
            frame: true,  
            layout: "fit",  
            border: false,  
            title: "请选择",  
            items: this.tree,  
            buttons: [{  
                text: "新建",  
                disabled: true,  
                handler: this.onNewHandler,  
                scope: this  
            }, {  
                text: "确定",  
                disabled: true,  
                handler: this.onOkHandler,  
                scope: this  
            }, {  
                text: "取消",  
                handler: function () {  
                    this.hide(Ext.getBody());  
                },  
                scope: this  
            }]  
        });  
    },  
    onNewHandler: function () {  
        this.setPath();  
        this.setFile();  
        Ext.Msg.prompt("新建文件", "请输入文件夹名称", this.onCreateDir, this);  
    },  
    onOkHandler: function () {  
        this.setPath();  
        this.setFile();  
        Ext.Msg.alert("路径", this.getPath());  
    },   
    onCreateDir: function (btn, text) {  
        if (btn == "ok") {  
            var path = this.getPath();  
            var node = this.getFile();  
            var dirName = text;  
            if (!!path && !!dirName) {  
                //本地添加模式  
                /*var newNode = new Ext.tree.AsyncTreeNode({ 
                    text: dirName, 
                    path: node.attributes.path + "/" + dirName 
                }); 
                node.expand(true, true); 
                node.appendChild(newNode);*/  
                //远程加载模式  
                Ext.Ajax.request({  
                    url: Ext.hoo.tree.FileSystemTree.TREE_CREATE_DIR_URL,  
                    params: {path: encodeURIComponent(path), dirName: encodeURIComponent(dirName)},//处理中文文件名，乱码问题  
                    success: function (response, options) {  
                        var returnNnode = Ext.decode(response.responseText);  
                        node.appendChild(returnNnode);  
                        node.expand(true);  
                    },  
                    failure: function (response) {  
                        Ext.Msg.alert("程序异常", response.responseText);  
                    }  
                });  
            }  
        }  
    },  
    setPath: function () {  
        this.path = this.tree.getSelectedNode().attributes.path || "";  
    },  
    setFile: function () {  
        this.nodeFile = this.tree.getSelectedNode() || {};  
    },  
    getPath: function () {  
        return this.path;     
    },  
    getFile: function () {  
        return this.nodeFile;  
    }  
});  
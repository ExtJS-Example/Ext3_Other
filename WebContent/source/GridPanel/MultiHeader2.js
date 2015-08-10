Ext.onReady(function() {
	var row = [
     	{ header: '', colspan: 1, align: 'center' },// header表示父表头标题，colspan表示包含子列数目
     	{ header: '项目名称', colspan: 1, align: 'center' },
    	{ header: '套数', colspan: 3, align: 'center' },
    	{ header: '总销售面积', colspan: 2, align: 'center' }
    ];
    var group = new Ext.ux.grid.ColumnHeaderGroup({
        rows: [row]
    });

    // --------------------------------------------------列头
    var cm = new Ext.grid.ColumnModel([
      	new Ext.grid.RowNumberer(), // 自动添加行号
//		{header: "项目名称", dataIndex: "project_name", sortable: true},
		{dataIndex: "project_name", sortable: true},
		{header: "总数", dataIndex: "zongshu", sortable: true},
		{header: "已售", dataIndex: "yishou", sortable: true}, 
		{header: "未售", dataIndex: "weishou", sortable: true}, 
		{header: "已售面积(M²)", dataIndex: "yishoumianji", sortable: true},
		{header: "未售面积(M²)", dataIndex: "weishoumianji", sortable: true}
	]);
	
	var data = [
		["康城1期", 200, 100, 100, 5000, 5000],
		["康城2期", 400, 100, 100, 5000, 5000],
		["康城3期", 500, 100, 100, 5000, 5000],
		["康城4期", 600, 100, 100, 5000, 5000],
		["康城5期", 70, 100, 100, 5000, 5000]
	];
	
	var SalesAnastore = new Ext.data.ArrayStore({
		fields: [
			'project_name',
			{name: 'zongshu', type: 'float'},
			{name: 'yishou', type: 'float'},
			{name: 'weishou', type: 'float'},
			{name: 'yishoumianji', type: 'float'},
			{name: 'weishoumianji', type: 'float'}
		],
		data: data
	});
	
	 //----------------------------------------------------定义grid
    var grid = new Ext.grid.EditorGridPanel({
        id: "SalesAnaliseGrid",
        title: '多表头',
        renderTo: Ext.getBody(),
        store: SalesAnastore,
        cm: cm,
        loadMask: true,
        height: 300,
        autoScroll: true,		//超过长度带自动滚动条
        border: false,
        viewConfig: {
            columnsText: "显示/隐藏列",
            sortAscText: "正序排列",
            sortDescText: "倒序排列",
            forceFit: true
        },
       	bbar: new Ext.PagingToolbar({  	//分页
           	store: SalesAnastore,  
           	pageSize: 10,  
           //显示右下角信息  
           	displayInfo: true,  
           	displayMsg: '当前记录 {0} -- {1} 条 共 {2} 条记录',  
           	emptyMsg: "没有记录",  
           	prevText: "上一页",  
           	nextText: "下一页",  
           	refreshText: "刷新",  
           	lastText: "最后页",  
           	firstText: "第一页",  
           	beforePageText: "当前页",  
           	afterPageText: "共{0}页"
       	}),
		plugins: group // 这句话才是本程序的重点
    });
    
});
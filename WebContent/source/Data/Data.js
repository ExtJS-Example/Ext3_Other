Ext.onReady(function() {
	
	// -------------------------------  Ext.data.Record   ----------------------------------------------------------------------------------
	/**
	 * Ext.data.Record的主要功能是保存数据, 并且在内部数据发生改变时记录修改的状态 , 它还可以保留修改之前的原始值.
	 * 我们使用Ext.data.Record通常都是由create()函数开始, 首先使用create()函数创建一个自定义的Record类型,如下面的代码所示
	 */
	var PersonRecord = Ext.data.Record.create([
		{name: 'name', type: 'string'},
		{name: 'sex', type: 'int'}
	]);
	
	/**
	 * PersonRecord就是我们定义的新类型, 包含字符串类型的name和整数类型的sex两个属性, 然后我们使用new关键字创建PersonRecord的实例, 如下面的代码所示:
	 */
	var boy = new PersonRecord({
		name: 'boy',
		sex: 0
	});
	
	/**
	 * 现在, 我们得到了PersonRecord的实例boy, 如何才能得到它的属性呢? 以下三种方式都可以获得boy中name属性的数据, 如下面的代码所示:
	 * 这里涉及Ext.data.Record的data属性, 这是定义在Ext.data.Record中的一个公共属性, 用以保存当前record对象的所有数据. 它是一个JSON对象, 可以直接从
	 * 它里面获得需要的数据. 可以通过Ext.data.Record的get()函数方便地从data属性中获得指定的属性值.
	 */
//	alert(boy.data.name);
//	alert(boy.data['sex']);
//	alert(boy.get('name'));
	
	/**
	 * 如果我们需要修改boy中的数据, 请不要直接操作data, 而应该使用set()函数, 如下所示
	 * set()函数会判断属性值是否发生了改变, 如果改变了, 就要将当前对象的dirty属性设置为true, 并将修改之前的原始值放入modified对象中, 供其他函数使用.
	 * 如果直接操作data中的值, record就无法记录属性数据的修改情况.
	 */
	boy.data.name = 'boy name!(This is forbidden)';
	alert('不用set函数修改后, dirty的值为: ' + boy.dirty + ', modified对象中的值为: ' + boy.modified);
	boy.data['name'] = 'boy name!!(This is forbidden)';
	boy.set('name', 'boy name!!!(This is allowed)');
	alert('使用set函数修改后, dirty的值为: ' + boy.dirty + ', modified对象中的值为: ' + boy.modified);
	
	/**
	 * Record属性数据被修改后, 我们可以执行如下几种操作:
	 * a. commit():提交 --> 这个函数的效果是设置dirty为false, 并删除modified中保存的数据.
	 * b. reject():撤销 --> 这个函数的效果是将data中已经修改了的属性值都恢复成modified中保存的原始数据, 然后设置dirty为false, 并删除保存原始数据的modified对象
	 * c. getChanges(): 获得修改的部分 --> 这个函数会把data中经过修改的属性和数据放在一个JSON对象里并返回.
	 * d. isModified():判断当前record中的数据是否被修改
	 * Ext.data.Record还提供了用于复制record实例的函数copy(). eg: var copyBoy = boy.copy();
	 * 这样我们就得到了boy的一个副本, 它里面包含了boy的data数据, 但copy()函数不会复制额外的属性值.
	 */
	
	
	// -------------------------------  Ext.data.Store   ----------------------------------------------------------------------------------
	/**
	 * Ext.data.Store是Ext中用来进行数据交换和数据交互的标准中间件, 无论是Grid还是ComboBox, 都是通过它实现数据读取.类型转换.排序分页和搜索等操作的.
	 * Ext.data.Store中有一个Ext.data.Record数组, 所有数据都存放在这些Ext.data.Record实例中, 为后面的读取和修改操作做准备
	 * 基本应用: 在使用之前, 首先要创建一个Ext.data.Store的实例, 如下面的代码所示: 
	 */
	var data = [['boy', 0], ['girl', 1]];
	var store = new Ext.data.Store({
		proxy: new Ext.data.MemoryProxy(data),
		reader: new Ext.data.ArrayReader({}, PersonRecord)
	});
	store.load();
	/**
	 * 每个store最少需要两个组件的支持, 分别是proxy和reader, proxy用于从某个途径读取原始的数据, reader用于将原始数据转换成Record实例.
	 * 这里我们使用的是Ext.data.MemoryProxy和Ext.data.ArrayReader, 将data数组中的数据转换成对应的几个PersonRecord实例, 然后放入store中.
	 * store创建完毕后, 执行store.load()实现这个转换过程.
	 * 经过转换之后, store里的数据就可以提供给Grid或ComboBox使用了, 这就是Ext.data.Store的最基本用法.
	 */
	
	// -----------------------  Collection(String dataIndex, [Boolean allowNull], [Boolean bypassFilter]): Array   ------------------------
	// 注: 这里的参数必须要dataIndex. 
	
});

/*
 * 获取选择区域
 */
function get_selection_range() {
    var sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection) {
        return document.selection.createRange();
    }
    return null;
}

var popup_visible = false; //弹出控件是否可视
var popup_index = 0; //当前激活的弹出控件菜单条索引

var popup_menus=new Array(); //弹出控件元数据数组

/*
 * 弹出菜单上的一个按钮控件
 */
function Popupitem(id,title,icon){
	this.id = id;
	this.icon = icon;
	this.alt = title;
	this.title = title;
	this.tostring = function(){
		return '<div class="button"><img id="'+this.id
		+'" src="'+this.icon+'" alt="'+this.title+'" title="'+this.title+'" /></div>';
	};
}

/*
 * 向指定菜单条，添加一个菜单按钮
 */
function add_popupitem(type,id,title,icon){
	if(type>=popup_menus.length)return;
	popup_menus[type].push(new Popupitem(id,title,icon));
}

/*
 * 构建一个菜单条控件
 */
function build_popupmenu(type){
	if(type>=popup_menus.length)return;
	menustr = '<div class="popupmenu">';
	for(var i in popup_menus[type]){
		menustr += popup_menus[type][i].tostring();
	}
	$('#current_popupmenu').remove();
	$(menustr+'</div>').appendTo('.popup').attr('id','current_popupmenu');
	$('.button>img').click(function(){
		chrome.extension.sendRequest({
		"action":"goWalker",
		"type":$(this).attr('id'),
		"text":window.getSelection().toString(),
		"fromurl":window.location.href
		});
		hide_popup();
	});
}

/*
 * 显示弹出控件
 */
function show_popup(){
	var range = get_selection_range();
	if( !range ) return;
	var rects = range.getClientRects();
	var left = rects[rects.length-1].right;
	var top = rects.length>=2?rects[rects.length-2].bottom-15:rects[rects.length-1].bottom-15;
	var sh = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	var sv = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
	$('.popup').css({
		left : left+sv,
		top : top+sh
	});
	$('.popup').show();
	$('#current_popupmenu>div:eq(0)').fadeIn(50,function(){
		$(this).next('div').fadeIn(50,arguments.callee);
	});
	popup_visible = true;
}

/*
 * 隐藏弹出控件
 */
function hide_popup(){
	$('#current_popupmenu>div').fadeOut(200,function(){
		$('.popup').hide();
		popup_visible = false;
	});
}

/*
 * 切换显示弹出控件
 */
function toggle_popup(){
	popup_visible?hide_popup():show_popup();
}

/*
 * 激活下一菜单条
 */
function next_popupmenu(){
	if( popup_menus.length <= 1 ) return;
	popup_index += 1

	//重置从头循环
	if(popup_index >= popup_menus.length){
		popup_index = 0;
	}

	build_popupmenu(popup_index);
}

/*
 * 功能连接
 */


//////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	//////////////////////////////
	//知识：百科、翻译、搜索
	//////////////////////////////
	popup_menus[0] = new Array();
	add_popupitem(0,"baidubaike",	"百度百科",	"http://baike.baidu.com/favicon.ico");
	add_popupitem(0,"wiki",			"维基百科",	"http://zh.wikipedia.org/favicon.ico");
	add_popupitem(0,"iciba",		"词霸在线",	"http://www.iciba.com/favicon.ico");
	add_popupitem(0,"gtranslate",	"谷歌翻译",	"http://translate.google.cn/favicon.ico");
	add_popupitem(0,"baidu",		"百度搜索",	"http://www.baidu.com/favicon.ico");
	add_popupitem(0,"google",		"谷歌搜索",	"http://www.google.com.hk/favicon.ico");


	//////////////////////////////
	//社区：SNS、微博
	//////////////////////////////
	popup_menus[1] = new Array();
	add_popupitem(1,"sinaweibo",	"新浪微博",	"http://www.sinaimg.cn/blog/developer/wiki/16x16.png");
	add_popupitem(1,"tencentweibo",	"腾讯微博",	"http://mat1.gtimg.com/app/opent/images/wiki/resource/weiboicon16.png");
	add_popupitem(1,"renren",		"人人网",	"http://wiki.dev.renren.com/mediawiki/images/b/bd/Logo16.png");
	add_popupitem(1,"kaixin",		"开心网",	"http://img1.kaixin001.com.cn/i/favicon.ico");
	add_popupitem(1,"douban",		"豆瓣社区",	"http://www.douban.com/favicon.ico");

	////////////////////////////////////
	//娱乐：新闻、图片、歌曲、视频
	////////////////////////////////////
	popup_menus[2] = new Array();
	add_popupitem(2,"baidunews",		"百度新闻",	"http://news.baidu.com/favicon.ico");
	add_popupitem(2,"googlenews",		"谷歌新闻",	"http://www.gstatic.com/news/img/favicon.ico");
	add_popupitem(2,"baiduimage",		"百度图片",	"http://image.baidu.com/favicon.ico");
	add_popupitem(2,"googleimage",		"谷歌图片",	"http://images.google.com.hk/favicon.ico");
	add_popupitem(2,"baidumusic",		"百度歌曲",	"http://music.baidu.com/favicon.ico");
	add_popupitem(2,"googlemusic",		"谷歌歌曲",	"http://google.com/favicon.ico");
	add_popupitem(2,"youku",			"优酷",		"http://static.youku.com/v1.0.0711/index/img/favicon.ico");
	add_popupitem(2,"tudou",			"土豆",		"http://tudou.com/favicon.ico");
	add_popupitem(2,"qiyi",				"奇艺",		"http://www.qiyi.com/favicon.ico");
	add_popupitem(2,"sohuvideo",		"搜狐视频",	"http://video.sohu.com/favicon.ico");
	add_popupitem(2,"baiduvideo",		"百度视频",	"http://video.baidu.com/favicon.ico");
	add_popupitem(2,"verycd",			"电驴大全",	"http://www.verycd.com/favicon.ico");

	//////////////////////////////////////////
	//购物：易淘、京东、1号店、易讯、当当
	//////////////////////////////////////////
	popup_menus[3] = new Array();
	add_popupitem(3,"etao",				"易淘",		"http://www.etao.com/favicon.ico");
	add_popupitem(3,"taobao",			"淘宝",		"http://www.taobao.com/favicon.ico");
	add_popupitem(3,"360buy",			"京东商城",	"http://www.360buy.com/favicon.ico");
	add_popupitem(3,"yihaodian",		"1号店",	"http://yihaodian.com/favicon.ico");
	add_popupitem(3,"51buy",			"易迅",		"http://51buy.com/favicon.ico");
	add_popupitem(3,"dangdang",			"当当",		"http://dangdang.com/favicon.ico");

	$('<div class="popup"></div>').appendTo('body');
	build_popupmenu(popup_index);

	$('.popup').css({
        display : 'inline',
        position : 'absolute'
    }).hide();

	$(document).keydown(function(event){
		if ( popup_visible && event.keyCode >= 49 && event.keyCode <= 57 )
		{
			var imgbtns = $('.button>img');
			var idx = event.keyCode - 49;
			if( imgbtns.length > idx ){
				imgbtns.eq(idx).click();
			}
			return ;
		}
		if( popup_visible && event.keyCode == 16 ){
			next_popupmenu();
		}
	});

	$(document).keyup(function(event){
		if(event.ctrlKey && event.keyCode==18
			&& document.getSelection().toString().length>0){
			toggle_popup();
		}
	}).mouseup(function(event){
		if(document.getSelection().toString().length<=0){
			hide_popup();
		}else{
			if(event.ctrlKey){
				show_popup();
			}
		}
	});
});

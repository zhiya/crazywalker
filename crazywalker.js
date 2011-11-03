//图标 http://icongal.com/gallery/icon/32447/128/hat_fedora_red
//文档 http://code.google.com/chrome/extensions/getstarted.html
//文档 http://code.google.com/chrome/extensions/api_index.html
function isEn(text){
	text=text.replace(/[ \s]/g,'');
	var zh=text.length-text.replace(/[\u4e00-\u9fa5\s]+/g,'').length;
	var en=text.length-text.replace(/[a-zA-Z]+/g,'').length;
	return en>=zh?true:false;
}
function getWalkerUrl(type,text){
	switch(type){
		case "baidubaike":
			//百度百科
			return "http://baike.baidu.com/searchword/?pic=1?sug=1&enc=utf8&word="+text;
		case "jinshanciba":
			//金山词霸
			return "http://www.iciba.com/"+text;
		case "googletranslate":
			//谷歌翻译
			if(isEn(text))return "http://translate.google.cn/?hl=en#en|zh-CN|"+text;
			return "http://translate.google.cn/?hl=zh-CN#zh-CN|en|"+text;
		case "baidu":
			//百度搜索
			return "http://www.baidu.com/s?ie=utf-8&wd="+text;
		case "google":
			//谷歌搜索
			return "http://www.google.com.hk/search?gcx=c&sourceid=chrome&ie=UTF-8&q="+text;
	}
	return "http://www.google.com.hk/search?gcx=c&sourceid=chrome&ie=UTF-8&q="+text;
}

function cwBaidubaike(info, tab) {if(info&&info.selectionText){window.open(getWalkerUrl("baidubaike",info.selectionText));}}
function cwJinshanciba(info, tab) {if(info&&info.selectionText){window.open(getWalkerUrl("jinshanciba",info.selectionText));}}
function cwGoogletranslate(info, tab) {if(info&&info.selectionText){window.open(getWalkerUrl("googletranslate",info.selectionText));}}
function cwBaidu(info, tab) {if(info&&info.selectionText){window.open(getWalkerUrl("baidu",info.selectionText));}}
function cwGoogle(info, tab) {if(info&&info.selectionText){window.open(getWalkerUrl("google",info.selectionText));}}

function cwGoogleimage(info, tab){
	if (info){
		window.open("http://images.google.com.hk/searchbyimage?h1=zh-CN&newwindow=1&safe=strict&biw=1280&bih=273&gdv=2&image_url="+info.srcUrl);
	}
}

//右键菜单
var cwmenu = chrome.contextMenus.create({"title": "Crazy Walker","contexts":["selection"]});
chrome.contextMenus.create({"title":"百度百科","contexts":["selection"],"onclick":cwBaidubaike,"parentId":cwmenu});
chrome.contextMenus.create({"contexts":["selection"],"type":"separator","parentId":cwmenu});
chrome.contextMenus.create({"title":"金山词霸","contexts":["selection"],"onclick":cwJinshanciba,"parentId":cwmenu});
chrome.contextMenus.create({"title":"谷歌翻译","contexts":["selection"],"onclick":cwGoogletranslate,"parentId":cwmenu});
chrome.contextMenus.create({"contexts":["selection"],"type":"separator","parentId":cwmenu});
chrome.contextMenus.create({"title":"百度搜索","contexts":["selection"],"onclick":cwBaidu,"parentId":cwmenu});
chrome.contextMenus.create({"title":"谷歌搜索","contexts":["selection"],"onclick":cwGoogle,"parentId":cwmenu});

chrome.contextMenus.create({"title":"谷歌图片","contexts":["image"],"onclick":cwGoogleimage});

//命令盒子，这里可以添加很多自定义命令处理
chrome.omnibox.onInputEntered.addListener(function(text){
	alert("你输入了："+text);
});
//chrome.omnibox.onInputCancelled.addListener(function(){});

/*创建新的标签页
chrome.tabs.onCreated.addListener(function(tab){
	alert('tabs.onCreated --'
	+ ' window: ' + tab.windowId
    + ' tab: '    + tab.id
    + ' index: '  + tab.index
    + ' url: '    + tab.url);
});*/


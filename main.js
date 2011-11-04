//图标 http://icongal.com/gallery/icon/32447/128/hat_fedora_red
//文档 http://code.google.com/chrome/extensions/getstarted.html
//文档 http://code.google.com/chrome/extensions/api_index.html

function isEnglish(text){
	text=text.replace(/[ \s]/g,'');
	var zh=text.length-text.replace(/[\u4e00-\u9fa5\s]+/g,'').length;
	var en=text.length-text.replace(/[a-zA-Z]+/g,'').length;
	return en>=zh?true:false;
}
function isChinese(temp) 
{ 
	var re = /[^\u4e00-\u9fa5]/; 
	if(re.test(temp)) return false; 
	return true; 
}
function isJapanese(temp) 
{ 
	var re = /[^\u0800-\u4e00]/; 
	if(re.test(temp)) return false; 
	return true; 
}
function isKoera(str) {
	for(i=0; i<str.length; i++) {
	if(((str.charCodeAt(i) > 0x3130 && str.charCodeAt(i) < 0x318F) || (str.charCodeAt(i) >= 0xAC00 && str.charCodeAt(i) <= 0xD7A3))) {
		return true;
		}
	}
	return false;
}
function isContainKoera(temp)
{
	var cnt = 0;
	for(var i=0;i < temp.length ; i++)
	{
		if(isKoera(temp.charAt(i)))
			cnt++;
	}
	if (cnt > 0) return true;
	return false;
}

function isContainChinese(temp)
{
	var cnt = 0;
	for(var i=0;i < temp.length ; i++)
	{
		if(isChinese(temp.charAt(i)))
			cnt++;
	}
	if (cnt > 5) return true;
	return false;
}
function isContainJapanese(temp)
{
	var cnt = 0;
	for(var i=0;i < temp.length ; i++)
	{
		if(isJapanese(temp.charAt(i)))
			cnt++;
	}
	if (cnt > 2) return true;
	return false;
}

function getWalkerUrl(type,text){
	switch(type){
		case "baidubaike":
			//百度百科
			return "http://baike.baidu.com/searchword/?pic=1?sug=1&enc=utf8&word="+text;
		case "wiki":
			//维基
			return "http://zh.wikipedia.org/wiki/"+text;
		case "jinshanciba":
			//金山词霸
			return "http://www.iciba.com/"+text;
		case "gtranslate":
			//谷歌翻译
			if(isChinese(text))return "http://translate.google.cn/?ie=utf8&sl=auto&tl=en&text="+text;
			return "http://translate.google.cn/?ie=utf8&sl=auto&tl=zh-CN&text="+text;
		case "baidu":
			//百度搜索
			return "http://www.baidu.com/s?ie=utf-8&wd="+text;
		case "google":
			//谷歌搜索
			return "http://www.google.com.hk/search?gcx=c&sourceid=chrome&ie=UTF-8&q="+text;
	}
	return "http://www.google.com.hk/search?gcx=c&sourceid=chrome&ie=UTF-8&q="+text;
}

function goWalker(type,value){
	window.open(getWalkerUrl(type,value));
}

function cwBaidubaike(info, tab) {if(info&&info.selectionText){goWalker("baidubaike",info.selectionText);}}
function cwWiki(info, tab) {if(info&&info.selectionText){goWalker("wiki",info.selectionText);}}
function cwJinshanciba(info, tab) {if(info&&info.selectionText){goWalker("jinshanciba",info.selectionText);}}
function cwGtranslate(info, tab) {if(info&&info.selectionText){goWalker("gtranslate",info.selectionText);}}
function cwBaidu(info, tab) {if(info&&info.selectionText){goWalker("baidu",info.selectionText);}}
function cwGoogle(info, tab) {if(info&&info.selectionText){goWalker("google",info.selectionText);}}

function cwGoogleimage(info, tab){
	if (info){
		window.open("http://images.google.com.hk/searchbyimage?h1=zh-CN&newwindow=1&safe=strict&biw=1280&bih=273&gdv=2&image_url="+info.srcUrl);
	}
}

//右键菜单
var cwmenu = chrome.contextMenus.create({"title": "Crazy Walker","contexts":["selection"]});
chrome.contextMenus.create({"title":"百度百科","contexts":["selection"],"onclick":cwBaidubaike,"parentId":cwmenu});
chrome.contextMenus.create({"title":"维基百科","contexts":["selection"],"onclick":cwWiki,"parentId":cwmenu});
chrome.contextMenus.create({"contexts":["selection"],"type":"separator","parentId":cwmenu});
chrome.contextMenus.create({"title":"金山词霸","contexts":["selection"],"onclick":cwJinshanciba,"parentId":cwmenu});
chrome.contextMenus.create({"title":"谷歌翻译","contexts":["selection"],"onclick":cwGtranslate,"parentId":cwmenu});
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

//处理页面按键请求
chrome.extension.onRequest.addListener(function onRequest(request, sender, sendResponse) {
	if (request.action == "goWalker") {
		if(request.text.length>0)goWalker(request.type,request.text);
    }
});

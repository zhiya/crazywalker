function getWalkerUrl(type,text){
	switch(type){
		case "baidubaike":
			//百度百科
			return "http://baike.baidu.com/searchword/?pic=1?sug=1&enc=utf8&word="+text;
		case "jinshanciba":
			//金山词霸
			return "http://www.iciba.com/"+text;
		case "baidu":
			//百度
			return "http://www.baidu.com/s?ie=utf-8&wd="+text;
		case "google":
			//谷歌
			return "http://www.google.com.hk/search?gcx=c&sourceid=chrome&ie=UTF-8&q="+text;
	}
	return "http://www.google.com.hk/search?gcx=c&sourceid=chrome&ie=UTF-8&q="+text;
}

function cwBaidubaike(info, tab) {if(info&&info.selectionText){window.open(getWalkerUrl("baidubaike",info.selectionText));}}
function cwJinshanciba(info, tab) {if(info&&info.selectionText){window.open(getWalkerUrl("jinshanciba",info.selectionText));}}
function cwBaidu(info, tab) {if(info&&info.selectionText){window.open(getWalkerUrl("baidu",info.selectionText));}}
function cwGoogle(info, tab) {if(info&&info.selectionText){window.open(getWalkerUrl("google",info.selectionText));}}

var cwmenu = chrome.contextMenus.create({"title": "Crazy Walker","contexts":["selection"]});
chrome.contextMenus.create({"title":"百度百科","contexts":["selection"],"onclick":cwBaidubaike,"parentId":cwmenu});
chrome.contextMenus.create({"title":"金山词霸","contexts":["selection"],"onclick":cwJinshanciba,"parentId":cwmenu});
chrome.contextMenus.create({"title":"百度搜索","contexts":["selection"],"onclick":cwBaidu,"parentId":cwmenu});
chrome.contextMenus.create({"title":"谷歌搜索","contexts":["selection"],"onclick":cwGoogle,"parentId":cwmenu});

//图标 http://icongal.com/gallery/icon/32447/128/hat_fedora_red
//图标 http://icongal.com/gallery/icon/32447/128/hat_fedora_red
//文档 http://code.google.com/chrome/extensions/getstarted.html
//文档 http://code.google.com/chrome/extensions/api_index.html
//14个国内文章分享代码 http://www.cssbaby.com/archives/414

GB2312UTF8  = {
  Dig2Dec : function(s){
      var retV = 0;
      if(s.length == 4){
          for(var i = 0; i < 4; i ++){
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
          }
          return retV;
      }
      return -1;
  } ,

  Hex2Utf8 : function(s){
     var retS = "";
     var tempS = "";
     var ss = "";
     if(s.length == 16){
         tempS = "1110" + s.substring(0, 4);
         tempS += "10" +  s.substring(4, 10);
         tempS += "10" + s.substring(10,16);
         var sss = "0123456789ABCDEF";
         for(var i = 0; i < 3; i ++){
            retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);
            retS += sss.charAt(this.Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(this.Dig2Dec(ss.substring(4,8)));
         }
         return retS;
     }
     return "";
  } ,

  Dec2Dig : function(n1){
      var s = "";
      var n2 = 0;
      for(var i = 0; i < 4; i++){
         n2 = Math.pow(2,3 - i);
         if(n1 >= n2){
            s += '1';
            n1 = n1 - n2;
          }
         else
          s += '0';
      }
      return s;
  },

  Str2Hex : function(s){
      var c = "";
      var n;
      var ss = "0123456789ABCDEF";
      var digS = "";
      for(var i = 0; i < s.length; i ++){
         c = s.charAt(i);
         n = ss.indexOf(c);
         digS += this.Dec2Dig(eval(n));
      }
      return digS;
  },

  GB2312ToUTF8 : function(s1){
    var s = escape(s1);
    var sa = s.split("%");
    var retV ="";
    if(sa[0] != ""){
      retV = sa[0];
    }
    for(var i = 1; i < sa.length; i ++){
      if(sa[i].substring(0,1) == "u"){
        //alert(this.Str2Hex(sa[i].substring(1,5)));
        retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1,5)));
  if(sa[i].length){
    retV += sa[i].substring(5);
  }
      }
      else{
     retV += unescape("%" + sa[i]);
  if(sa[i].length){
    retV += sa[i].substring(5);
  }
   }
    }
    return retV;
  },

  UTF8ToGB2312 : function(str1){
        var substr = "";
        var a = "";
        var b = "";
        var c = "";
        var i = -1;
        i = str1.indexOf("%");
        if(i==-1){
          return str1;
        }
        while(i!= -1){
    if(i<3){
                substr = substr + str1.substr(0,i-1);
                str1 = str1.substr(i+1,str1.length-i);
                a = str1.substr(0,2);
                str1 = str1.substr(2,str1.length - 2);
                if(parseInt("0x" + a) & 0x80 == 0){
                  substr = substr + String.fromCharCode(parseInt("0x" + a));
                }
                else if(parseInt("0x" + a) & 0xE0 == 0xC0){ //two byte
                        b = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        var widechar = (parseInt("0x" + a) & 0x1F) << 6;
                        widechar = widechar | (parseInt("0x" + b) & 0x3F);
                        substr = substr + String.fromCharCode(widechar);
                }
                else{
                        b = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        c = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        var widechar = (parseInt("0x" + a) & 0x0F) << 12;
                        widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);
                        widechar = widechar | (parseInt("0x" + c) & 0x3F);
                        substr = substr + String.fromCharCode(widechar);
                }
     }
     else {
      substr = substr + str1.substring(0,i);
      str1= str1.substring(i);
     }
              i = str1.indexOf("%");
        }

        return substr+str1;
  }
};

//////////////////////////////////////////////////////////////////////////////////
//语言类型识别
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


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//URL获取
function getWalkerUrl(type,text,fromurl){
	if (typeof fromurl == 'undefined')
	{
		fromurl = null;
	}
	switch(type){
		//////////////////////////////
		//知识：百科、翻译、搜索
		//////////////////////////////
		case "baidubaike":
			return "http://baike.baidu.com/searchword/?pic=1?sug=1&enc=utf8&word="+text;
		case "wiki":
			return "http://zh.wikipedia.org/wiki/"+text;
		case "iciba":
			return "http://www.iciba.com/"+text;
		case "gtranslate":
			if(isChinese(text))return "http://translate.google.cn/?ie=utf8&sl=auto&tl=en&text="+text;
			return "http://translate.google.cn/?ie=utf8&sl=auto&tl=zh-CN&text="+text;
		case "baidu":
			return "http://www.baidu.com/s?ie=utf-8&wd="+text;
		case "google":
			return "http://www.google.com.hk/search?gcx=c&sourceid=chrome&ie=UTF-8&q="+text;

		//////////////////////////////
		//社区：SNS、微博
		//////////////////////////////
		case "sinaweibo":
			return 'http://v.t.sina.com.cn/share/share.php?title='+text+(fromurl==null?'':'&url='+fromurl);
		case "tencentweibo":
			return 'http://v.t.qq.com/share/share.php?title='+text+(fromurl==null?'':'&url='+fromurl);
		case "renren":
			return "http://share.renren.com/share/buttonshare.do?title="+text+(fromurl==null?'':'&link='+fromurl);
		case "kaixin":
			return "http://www.kaixin001.com/repaste/share.php?rtitle="+text+(fromurl==null?'':'&rurl='+fromurl);
		case "douban":
			return "http://www.douban.com/recommend/?title="+text+"&v=1"+(fromurl==null?'':'&url='+fromurl);

		////////////////////////////////////
		//娱乐：新闻、图片、歌曲、视频
		////////////////////////////////////
		case "baidunews":
			return "http://news.baidu.com/ns?tn=news&from=news&bs=abc&sr=0&cl=2&rn=20&ct=1&prevct=no&ie=utf8&word="+text;
		case "googlenews":
			return "http://www.google.com.hk/search?hl=zh-CN&gl=cn&tbm=nws&btnmeta_news_search=1&q="+text;
		case "baiduimage":
			s1 = "http://image.baidu.com/i?ct=201326592&cl=2&lm=-1&tn=baiduimage&istype=2&fm=index&pv=&z=0&s=0&word="+text;
			return s1;
		case "googleimage":
			return "http://images.google.com.hk/search?tbm=isch&hl=zh-CN&source=hp&biw=1051&bih=780&gbv=2&oq=abc&aq=f&aqi=&aql=&gs_sm=e&q="+text;
		case "baidumusic":
			return  "http://mp3.baidu.com/m?f=ms&rf=idx&tn=baidump3&ct=134217728&lf=&rn=&ie=utf8&word="+text;
		case "googlemusic":
			return "http://www.google.cn/music/search?q="+text;
		case "youku":
			return "http://www.soku.com/search_video/q_"+text;
		case "tudou":
			return "http://so.tudou.com/nisearch/"+text;
		case "qiyi":
			return "http://so.qiyi.com/so/q_"+text;
		case "sohuvideo":
			return "http://so.tv.sohu.com/mts?wd="+text;
		case "baiduvideo":
			return "http://video.baidu.com/v?word="+text;
		case "verycd":
			return "http://www.verycd.com/search/entries/"+text;

		//////////////////////////////////////////
		//购物：易淘、京东、1号店、易讯、当当
		//////////////////////////////////////////
		case "etao":
			return "http://s.etao.com/search?q="+text;
		case "taobao":
			return "http://s.taobao.com/search?q="+text;
		case "360buy":
			return "http://search.360buy.com/Search?keyword="+text;
		case "yihaodian":
			return "http://search.yihaodian.com/s/c0-k"+text;
		case "51buy":
			return "http://s.51buy.com/--------.html?q="+text;
		case "dangdang":
			return "http://search.dangdang.com/search.php?key="+text;
	}
	return "http://www.google.com.hk/search?gcx=c&sourceid=chrome&ie=UTF-8&q="+text;
}

function goWalker(type,value,fromurl){
	if(typeof fromurl == "undefined"){
		fromurl = null;
	}
	var url=getWalkerUrl(type,value,fromurl);
	switch(type){
		case "iciba":
		case "gtranslate":
			chrome.tabs.getAllInWindow(null,function(tabs){
				for ( var i in tabs )
				{
					if( tabs[i].url.indexOf('translate.google.')>0 ||
						tabs[i].url.indexOf('.iciba.')>0){
						chrome.tabs.update(tabs[i].id,{"url":url,"selected":true});
						return ;
					}
				}
				window.open(url);
			});
			return ;
	}
	window.open(url);
}

function cwGoogleimage(info, tab){
	if (info){
		window.open("http://images.google.com.hk/searchbyimage?h1=zh-CN&newwindow=1&safe=strict&biw=1280&bih=273&gdv=2&image_url="+info.srcUrl);
	}
}

//右键菜单
var cwmenu_root = chrome.contextMenus.create({"title": "Crazy Walker","contexts":["selection"]});

//////////////////////////////
//知识：百科、翻译、搜索
//////////////////////////////
function cwBaidubaike(info, tab) {if(info&&info.selectionText){goWalker("baidubaike",info.selectionText);}}
function cwWiki(info, tab) {if(info&&info.selectionText){goWalker("wiki",info.selectionText);}}
function cwiciba(info, tab) {if(info&&info.selectionText){goWalker("iciba",info.selectionText);}}
function cwGtranslate(info, tab) {if(info&&info.selectionText){goWalker("gtranslate",info.selectionText);}}
function cwBaidu(info, tab) {if(info&&info.selectionText){goWalker("baidu",info.selectionText);}}
function cwGoogle(info, tab) {if(info&&info.selectionText){goWalker("google",info.selectionText);}}

cwmenu = chrome.contextMenus.create({"title": "知识","contexts":["selection"],"parentId":cwmenu_root});

chrome.contextMenus.create({"title":"百度百科","contexts":["selection"],"onclick":cwBaidubaike,"parentId":cwmenu});
chrome.contextMenus.create({"title":"维基百科","contexts":["selection"],"onclick":cwWiki,"parentId":cwmenu});
chrome.contextMenus.create({"contexts":["selection"],"type":"separator","parentId":cwmenu});
chrome.contextMenus.create({"title":"词霸在线","contexts":["selection"],"onclick":cwiciba,"parentId":cwmenu});
chrome.contextMenus.create({"title":"谷歌翻译","contexts":["selection"],"onclick":cwGtranslate,"parentId":cwmenu});
chrome.contextMenus.create({"contexts":["selection"],"type":"separator","parentId":cwmenu});
chrome.contextMenus.create({"title":"百度搜索","contexts":["selection"],"onclick":cwBaidu,"parentId":cwmenu});
chrome.contextMenus.create({"title":"谷歌搜索","contexts":["selection"],"onclick":cwGoogle,"parentId":cwmenu});

//////////////////////////////
//社区：SNS、微博
//////////////////////////////
function cwSinaweibo(info, tab) {if(info&&info.selectionText){goWalker("sinaweibo",info.selectionText);}}
function cwTencentweibo(info, tab) {if(info&&info.selectionText){goWalker("tencentweibo",info.selectionText);}}
function cwRenren(info, tab) {if(info&&info.selectionText){goWalker("renren",info.selectionText);}}
function cwKaixin(info, tab) {if(info&&info.selectionText){goWalker("kaixin",info.selectionText);}}
function cwDouban(info, tab) {if(info&&info.selectionText){goWalker("douban",info.selectionText);}}

cwmenu = chrome.contextMenus.create({"title": "社区","contexts":["selection"],"parentId":cwmenu_root});

chrome.contextMenus.create({"title":"新浪微博","contexts":["selection"],"onclick":cwSinaweibo,"parentId":cwmenu});
chrome.contextMenus.create({"title":"腾讯微博","contexts":["selection"],"onclick":cwTencentweibo,"parentId":cwmenu});
chrome.contextMenus.create({"title":"人人网","contexts":["selection"],"onclick":cwRenren,"parentId":cwmenu});
chrome.contextMenus.create({"title":"开心网","contexts":["selection"],"onclick":cwKaixin,"parentId":cwmenu});
chrome.contextMenus.create({"title":"豆瓣社区","contexts":["selection"],"onclick":cwDouban,"parentId":cwmenu});

////////////////////////////////////
//娱乐：新闻、图片、歌曲、视频
////////////////////////////////////



//////////////////////////////////////////
//购物：易淘、京东、1号店、易讯、当当
//////////////////////////////////////////


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

//创建窗口时初始化：会话读取

//处理页面按键请求
chrome.extension.onRequest.addListener(function onRequest(request, sender, sendResponse) {
	switch(request.action){
		case "goWalker":
			if(request.text.length>0)goWalker(request.type,request.text,request.fromurl);
			break;
		case "saveSession":
			chrome.tabs.getAllInWindow(null,function(tabs){
				s={};
				s.name=request.name;
				s.tabs=new Array();
				for ( var i in tabs ){
					s.tabs.push({
						'url':tabs[i].url,
						'selected':tabs[i].selected,
						'pinned':tabs[i].pinned
					});
				}
				addSession(s);
			});
			sendResponse({'name':request.name});
			break;
		case "retrieveSession":
			var sess = getSession(request.name);
			//好的，创建一个新的window，以此创建出所有tabs
			//最后，选中之前已经选中的那个tab
			if( !sess || !sess.tabs ){
				break;
			}
			var urls=new Array();
			for ( var i in sess.tabs )
			{
				urls.push(sess.tabs[i].url);
			}
			chrome.windows.create({'url': urls});
			chrome.tabs.getAllInWindow(null,function(tabs){
				for ( var i in tabs ){
					chrome.tabs.update(tabs[i].id,{
						'url':sess.tabs[i].url,
						'selected':sess.tabs[i].selected,
						'pinned':sess.tabs[i].pinned
					});
				}
			});
			break;
		case "removeSession":
			sendResponse({'result':removeSession(request.name)});
			break;
		case "pinTab":
			chrome.tabs.getSelected(null,function(tab){
				chrome.tabs.update(tab.id,{'pinned':!tab.pinned});
			});
			break;
		case "pinAllTabs":
			chrome.tabs.getSelected(null,function(tab){
				chrome.tabs.getAllInWindow(null,function(tabs){
					for ( var i in tabs )
					{
						chrome.tabs.update(tabs[i].id,{'pinned':!tab.pinned});
					}
				});
			});
			break;
	}
});

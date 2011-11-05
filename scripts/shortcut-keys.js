
document.addEventListener('keydown',function(event){
	if(event.altKey){
		switch(event.keyCode){
			case 49:
				chrome.extension.sendRequest({
				"action":"goWalker",
				"type":"baidubaike",
				"text":window.getSelection().toString()
				});
				break;
			case 50:
				chrome.extension.sendRequest({
				"action":"goWalker",
				"type":"wiki",
				"text":window.getSelection().toString()
				});
				break;
			case 51:
				chrome.extension.sendRequest({
				"action":"goWalker",
				"type":"iciba",
				"text":window.getSelection().toString()
				});
				break;
			case 52:
				chrome.extension.sendRequest({
				"action":"goWalker",
				"type":"gtranslate",
				"text":window.getSelection().toString()
				});
				break;
			case 53:
				chrome.extension.sendRequest({
				"action":"goWalker",
				"type":"baidu",
				"text":window.getSelection().toString()
				});
				break;
			case 54:
				chrome.extension.sendRequest({
				"action":"goWalker",
				"type":"google",
				"text":window.getSelection().toString()
				});
				break;
		}
	}
},true);


function create_popupmenu(){
	return $('<div id="popupmenu"><a href="#">按钮</a></div>',document);
}

$(document).ready(function(){
	$(document).mousedown(function(event){
		//关闭快捷菜单
		$("#popupmenu").remove();
	});

	$(document).mouseup(function(event){
		sel = window.getSelection().toString();
		if ( sel.length > 0 )
		{
			//打开快捷菜单
			$(document).append(create_popupmenu());
		}
	});
});

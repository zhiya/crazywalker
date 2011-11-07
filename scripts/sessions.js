
function addSession(sess){
	var sessobjs = JSON.parse(localStorage.getItem('cwsessions'));
	var idx = 0;
	if ( sessobjs != null )
	{
		for( ;idx<sessobjs.length;++idx ){
			if( sessobjs[idx].name == sess.name ){
				sessobjs[idx] = sess; //overwrite
				localStorage.setItem('cwsessions',JSON.stringify(sessobjs));
				return true;
			}
		}
	}else{
		sessobjs = new Array();
	}
	sessobjs.push(sess);
	localStorage.setItem('cwsessions',JSON.stringify(sessobjs));
	return true;
}

function removeSession(sessname){
	var sessobjs = JSON.parse(localStorage.getItem('cwsessions'));
	if( sessobjs == null ){
		return false;
	}
	var result = new Array();
	var find = false;
	for( var idx=0;idx<sessobjs.length;++idx ){
		if( sessobjs[idx].name != sessname ){
			result.push(sessobjs[idx]);
		}else{
			find = true;
		}
	}
	if(find){
		localStorage.setItem('cwsessions',JSON.stringify(result));
		return true;
	}
	return false;
}

function clearSessions(){
	localStorage.removeItem('cwsessions');
}

function getSession(sessname){
	var sessobjs = JSON.parse(localStorage.getItem('cwsessions'));
	if( sessobjs == null ){
		return null;
	}
	var idx = 0;
	for( ;idx<sessobjs.length;++idx ){
		if( sessobjs[idx].name == sessname ){
			return sessobjs[idx];
		}
	}
	return null;
}

function getSessions(){
	return JSON.parse(localStorage.getItem('cwsessions'));
}

function callback(rText)
{
	var object = JSON.parse(rText);
	var tempArray=[object.ingredientLines, object.totalTime, object.rating, object.images];
	return tempArray;
}

function getRecipe(id)
{
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() 
	{ if (request.readyState === 4 && request.status === 200) 
		{ callback(request.responseText); }
		// Another callback here 
	} 
	var url=getUrls(id);

	request.open('GET', url); 
	request.send();

}

function getUrls(id){
	var baseURL="http://api.yummly.com/v1/api/recipe/";
	var fURL=baseURL+id+"?_app_id=4c26f85d&_app_key=426e1ea885ae50371a9cf4e63a5637df";
	return fURL;
}

function setVars(callback)
{
	document.getElementById("Picture").innerHTML="<p><img src="+callback["images"]["imageUrlsBySize"]["360"]+"></p>";
}

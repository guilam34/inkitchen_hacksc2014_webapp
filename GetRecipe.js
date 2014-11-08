function callback(rText)
{
	var object = JSON.parse(rText);
	var tempArray=[object.ingredientLines, object.totalTime, object.rating];
	console.log(tempArray);
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
	var url=getUrl(id);
	request.open('GET', url); 
	request.send();

}

function getUrl(id){
	var baseURL="http://api.yummly.com/v1/api/recipe/";
	var fURL=baseURL+id+"?_app_id=13652b6f&_app_key=e2a3085775005bb76e33f4d653fc7363";
	return fURL;
}
getRecipe("French-Onion-Soup-The-Pioneer-Woman-Cooks-_-Ree-Drummond-41364");
function callback(rText)
{
	var object = JSON.parse(rText);
	console.log(object.images[0]["hostedLargeUrl"]);
	var tempArray=[object.name,object.ingredientLines, object.totalTime, object.rating, object.images,object.source["sourceRecipeUrl"]];
	return tempArray;
}

function getRecipe(id)
{
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() 
	{ if (request.readyState === 4 && request.status === 200) 
		{ setVars(callback(request.responseText)); }
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
	console.log(callback[2]);
	var wArray;
	document.getElementById("Picture").innerHTML="<p><img src="+callback[4][0]["hostedLargeUrl"]+"></p>";
	for(var x=0;x<callback[1].length;x++)
	{
		wArray= wArray+callback[1][x]+'\n';
	}
	document.getElementById("Ingredients").innerHTML="<p>"+wArray+"</p>";
	document.getElementById("TimeRate").innerHTML="<p>Total Time: "+callback[2]+"    Rating: "+callback[3]+"</p>";
	document.getElementById("RecipeURL").innerHTML="<p>Recipe Link: "+callback[5]+"</p>";
}

function callback(rText)
{
	var object = JSON.parse(rText);
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
	var wArray=[];
	document.getElementById("Picture").innerHTML="<p><img src="+callback[4][0]["hostedLargeUrl"]+"></p>";
	document.getElementById("Ingredients").innerHTML="<p>";
	for(var x=0;x<callback[1].length;x++)
	{
		document.getElementById("Ingredients").innerHTML+=callback[1][x]+"<br>";
	}
	document.getElementById("Name").innerHTML="<p><b><u>"+callback[0]+"</p></b></u>";
	document.getElementById("Ingredients").innerHTML+="</p>";
	document.getElementById("TimeRate").innerHTML="<p><b>Total Time:</b> "+callback[2]+"<br><b>Rating</b>: "+callback[3]+"</p>";
	document.getElementById("RecipeURL").innerHTML="<p><b>Recipe Link</b>: <a style='text-decoration:underline; color:white' href='" + callback[5] + "'>" + callback[5]+ "</a></p>";
}

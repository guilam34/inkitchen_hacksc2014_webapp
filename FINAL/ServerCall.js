var tempA = [];
var idList=[];
var nameList=[];
function callbacke(rText)
{
	var object = JSON.parse(rText);
	var temp=[];
	for(var x=0;x<object.matches.length;x++)
	{
		var object2 = object.matches[x];
		var tempArray=[object2.id, object2.recipeName, object2.imageUrlsBySize["90"]];
		temp.push(tempArray);
		
	}
	retrieveList(temp);
}

function serverCall(igList)
{
	
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() 
	{ if (request.readyState === 4 && request.status === 200) 
		{ callbacke(request.responseText); }
		
	} 
	var url=getUrl(igList);
	request.open('GET', url); 
	request.send();
}

function retrieveList(arr){
		
		//var imgList = [];
		
		for(var i =0; i < arr.length; i++){		
			document.getElementById("recipeList").innerHTML +=
				"<p class='entry' ><img src =" + arr[i][2] + "><a href='#' style='color:white;font-size:32px;' class='dishName' id='"+i+"' onclick='overlay(this.id)'>" 
				+ arr[i][1] + "</a><div style='margin-left:2.7%;width:94.6%;height:1px;background-color:#A69E97;'></div></p>";
			nameList.push(arr[i][1]);
			idList.push(arr[i][0]);
		}
		setName(nameList);
		setId(idList);
	}
 
function getIgList()
{
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() 
	{ if (request.readyState === 4 && request.status === 200) 
		{ interpretIgList(request.responseText); }
		
	} 
	request.open('GET', "http://api.yummly.com/v1/api/metadata/ingredient?_app_id=4c26f85d&_app_key=426e1ea885ae50371a9cf4e63a5637df"); 
	request.send();

}
function interpretIgList(callback)
{
	var jSN=callback.substring(callback.indexOf("[")+1,callback.lastIndexOf("]")+1);
	var check=1;
	while(check===1)
	{
		var tempJS=jSN.substring(jSN.indexOf("{"),jSN.indexOf("}")+1);
		if(jSN.indexOf("}")===jSN.lastIndexOf("}"))
		{
			check=0;
		}
		jSN=jSN.substring(jSN.indexOf("}")+2,jSN.lastIndexOf("}")+1);
		var object=JSON.parse(tempJS);
		tempA.push(object.searchValue);

	}
	return tempA;
}


function getUrl(igList){
	var baseURL="http://api.yummly.com/v1/api/recipes?_app_id=4c26f85d&_app_key=426e1ea885ae50371a9cf4e63a5637df";
	var text=0;
	getIgList();
	for(var x=0;x<igList.length;x++)
	{
		for(var y=0; y< tempA.length;y++)
		{
			if(igList[x]===tempA[y])
			{
				break;
			}
			if(y===(tempA.length)-1)
			{
				igList.splice(x,1);
				x--;
			}

		}
	}
	var appendSearchIg="";
	for(var x=0;x<igList.length;x++)
	{
		appendSearchIg=appendSearchIg+"&allowedIngredient[]="+igList[x];
	}
	var fURL=baseURL+appendSearchIg+"&requirePictures=true&maxResult=50&start=0";
	return fURL;
}

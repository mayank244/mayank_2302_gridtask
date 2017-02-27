var apply=false;
var newval=0;
function c(val)
{
	document.getElementById("d").value=val;
}
function v(val)
{
	if(apply==false && newval!=3)
	{
		document.getElementById("d").value+=val;
		newval=newval+1;
	}
	else if(newval==3)
	{
		newval=0;
		document.getElementById("d").value="";
		document.getElementById("d").value+=val;
		newval=newval+1;
	}
}
function e() 
{ 
	try 
	{ 
	  	c(eval(document.getElementById("d").value))
	  	apply=false; 
	} 
	catch(e) 
	{
	  c('Error') 
	} 
}
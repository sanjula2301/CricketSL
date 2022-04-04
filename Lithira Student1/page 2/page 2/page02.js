//check that the user has filled-in the personal details fields
function validateForm(){
		  var name = document.getElementById("name").value;
		  var email = document.getElementById("email").value;

		  
		  if(name==""){
		         alert("Enter your Full Name");
				 return false;
		  }


		  else if(email==""){
		         alert("Enter your Email");
				 return false;
		  }
		  else{
		         //alert("Dear "+name+", your product has been added to the cart...");//Getting a confirm from the customer for the order
				 return true;
	      }
	}	


	function getProduct(pqty){
	
}

function addCart(pqty ,pname, pprice ,cname ,cemail ){ //product quantity, product name, product price, customer name, customer email
	
	//var customer = document.getElementById('name').value;
	//var emailadd = document.getElementById('email').value;
	if(!validateForm())
	{		
		return false;
	}
	

	if(pqty==0){
		alert("Please enter Quantity for products"); //makes sure the user can't add to cart without choosing quantity
		return false;
	}
	else{
			let v = [];                   //making a array for store data
				if(localStorage.getItem('testObject')){
					v = JSON.parse(localStorage.getItem('testObject'));
				}		
		
				var testObject = { 'Customer':cname ,'Email' :cemail  ,  'Quantity': pqty, 'pearson': pname, 'price': pprice*pqty };
				
				v.push(testObject);     // Put the object into storage  
				localStorage.setItem('testObject', JSON.stringify(v));

	}
}

function readCart(){   
	
	if(!localStorage.getItem('testObject')){
			alert('Unable to find cart details');  //Remind the customer that he haven't chossen any product
			return;
		}		
	               
	var arr = JSON.parse(window.localStorage.getItem('testObject'))	
	var al ="Customer :" + arr[0].Customer + "\n" + "Email : " +arr[0].Email +"\n";
	                //Store Customer Orders
	var tot =0;
	var tables ="";
	for (var i = 0; i < arr.length; i++) {
   
    //Procdure in making the summery of the bill
	tot=tot+arr[i].price;
	 al =al+"\n"+"Product :" +arr[i].pearson +"\n" +"Quantity : "+ arr[i].Quantity + "\n" + "Price($) :" +arr[i].price
	        ;
			
}
al=al+"\n\n"+ "Total :"+ "$"+tot 

var productn ="Product";
var qtyp ="Quantity";
var pricep="Price($)";
var cust="Name";
var email = "Email";
var totv ="Total($)";

//making the identity for the bill (customer name & email)
tables="<tr>" +    
    "<td>" + cust +" : "+ arr[0].Customer + "</td>" +	     
    "</tr>"+
	"<tr>"+
	 "<td>" + email +" : "+ arr[0].Email + "</td>" +  	
	"</tr>"

//making the summery of the bill (ordered product & price)
for (var i = 0; i < arr.length; i++) {
  tables += "<tr>" +
    
    "<td>" + productn +" : "+ arr[i].pearson + "</td>" +
	  
   
    "</tr>"+
	"<tr>"+
	 "<td>" + qtyp +" : "+ arr[i].Quantity + "</td>" +  	
	"</tr>"+
	"<tr>"+	 
	   "<td>" + pricep +" : "+ arr[i].price + "</td>" +	
	"</tr>";
}

//The total Bill
tables+="<tr>" +    
    "<td>"  + totv + " : " + tot +  "</td>" +	     
    "</tr>"
	
document.getElementById("demo1").innerHTML += '<table>' + tables + '</table>';


	//window.localStorage.clear();
	window.localStorage.removeItem('testObject');
	
}

function restOrder(){
	if(localStorage.getItem('testObject')){
				window.localStorage.removeItem('testObject');
				window.location.reload();
				}
	
}
	
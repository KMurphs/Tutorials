document.querySelector("#myButton").addEventListener("click", function(){
  document.body.classList.toggle("Active");
  document.body.classList.toggle("Inactive");

  if(document.body.classList.contains("Inactive"))
  	document.body.classList.remove("Active");
});

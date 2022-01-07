var debug = true;
var start;
var end;
var current;

if(debug) console.log("Printing all numbers between -10 and 19");
start = -10;
end = 19;
current = start;
while(current <= end){
	console.log(current);
	current++;
}
console.log("\n");


if(debug) console.log("Printing all even numbers between 10 and 40");
start = 10;
end = 40;
current = start;
while(current <= end){
	console.log(current);
	current += 2;
}
console.log("\n");


if(debug) console.log("Printing all odd numbers between 300 and 333");
start = 300;
end = 333;
current = start + 1;
while(current <= end){
	console.log(current);
	current += 2;
}
console.log("\n");


if(debug) console.log("Printing all numbers between 5 and 50 which are divisible by 5 and 3");
start = 5;
end = 50;
current = start;
while(current <= end){
	if((current%3 === 0) && (current%5 === 0)) 
		console.log(current);	
	current += 1;
}
console.log("\n");
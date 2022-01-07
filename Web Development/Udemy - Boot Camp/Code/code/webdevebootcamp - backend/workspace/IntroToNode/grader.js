function average(grades){
    var sum = 0;
    // for(var i = 0; i < grades.length; i++)
    //     sum = sum + grades[i];
    
    grades.forEach(function (score){
        sum += score;
    });
        
    return Math.round(sum / grades.length)
}


var scores = [];
scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));

scores = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores));

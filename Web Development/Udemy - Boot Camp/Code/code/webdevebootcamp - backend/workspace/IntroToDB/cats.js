var mongoose = require('mongoose');

//the DB Server need to run first   ./mongod
//will create if DB not found
mongoose.connect('mongodb://localhost/cat_app'); 


//This enforces data structure on the javascript side, and not
// on the mongodb side
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
}); 



//We compiled the schema catSchema into a model named 'Cat' and created
//linked the model to a variable Cat Object
//That we will use from here on to interact with the DB
var Cat = mongoose.model('Cat', catSchema);



//Adding cats to the DB
var george = new Cat({
    name: 'George',
    age: 11,
    temperament: 'Grouchy'
});

george = new Cat({
    name: 'Mrs Something',
    age: 7,
    temperament: 'Evil'
});

// george.save(); 
//This will work but will not give any feedback on the operation
//Was it successful???

// george.save(function(err, cat){
//     if(err){
//         console.log('Something went wrong while saving');
//         console.log(err);
//     }else{
//         console.log('We just added a CAT to the DB');
//         console.log(cat); //comes back from the DB
//         //geoge is the javascript object tat was sent to the DB
//     }
// });

//This will CREATE and ADD a cet all at the same time
Cat.create({
    name: 'Snow white',
    age:15,
    temperament: 'Bland'
}, function(err, cat){
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
});



//Retrieve cats from the DB
Cat.find({}, function(err, cats){
    if(err){
        console.log('Something went wrong while retrieving');
        console.log(err);
    }else{
        console.log('The retrieved CATS'); //comes back from the DB
        console.log(cats)
    }    
});





//Interact with DB
// mongo
//show dbs
// use cat_app
// show collections (the collection is created when the model is 
                    //created. Automatically added a 's' at the end -
                    //It is also completely lowercased)
// db.cats.find() db.<name of the collection from earlier>.find()
// db.cats.drop() will remove all entries from the cats collection (table)
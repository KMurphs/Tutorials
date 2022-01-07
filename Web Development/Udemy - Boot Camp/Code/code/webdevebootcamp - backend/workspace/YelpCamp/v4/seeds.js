var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')

var data = [
        {
            name: 'Cloud\'s Rest',
            image:'https://lakelanier.com/wp-content/uploads/2013/07/Lake-Lanier-Campsites.jpg',
            description:'Blah blah blah!!'
        },
        {
            name: 'Valley of Shadow',
            image:'https://rv-camping.org/wp-content/uploads/2015/06/USACECampground.jpg',
            description:'Bloh bloh bloh!!'
        },
        {
            name: 'Valala',
            image:'https://www.travelwyoming.com/sites/default/files/styles/16_9_wide/public/assets/Camping1.jpg?itok=IIOdntS1&amp;timestamp=1489102370',
            description:'Blih blih blih!!'
        }
    ]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log('Error occured while removing campgrounds from db')
            console.log(err)
        }else{
            console.log('Campgrounds removed')
            
            //Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log('Error trying to seed DB')
                    }else{
                        console.log('Just seeded a Campground')
                        //Add a few comments
                        Comment.create({
                            text: "This place is great, but I wish there was internet",
                            author: "Homer",
                        }, function(err, comment){
                            if(err){
                                console.log('Error trying to add comment')
                            }else{
                                campground.comments.push(comment)
                                campground.save()
                                console.log('Created new comment')
                            }
                        })
                    }
                })
            })
        }
        
    })
    

    
    
    
}

module.exports = seedDB;
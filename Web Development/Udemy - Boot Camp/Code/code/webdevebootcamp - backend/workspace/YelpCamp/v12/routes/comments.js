var express = require('express')
//In order for the line
//    app.use("/campgrounds/:id/comments", commentRoutes)
// to work (i.e handling the id placeholder properly)
// the {mergeParams: true} object must be passed to router
var router = express.Router({mergeParams: true})
var Campground = require('../models/campground')
var Comment    = require('../models/comment')
var helpDebug  = true
var middleware = require('../middleware') //automatically goes for index.js, since no file is specififed



// =============================================================
//                       COMMENTS ROUTES
// =============================================================
router.get('/new', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log('Error while trying to retrieve campground info')
        }else{
            console.log(campground)
            console.log(req.params.id)
            if(helpDebug)console.log('An New Comment GET Request was just made to the server'); 
            res.render('comments/new', {campground: campground})            
        }
    })
})

router.post('/', middleware.isLoggedIn, function(req, res){
    // var ParsedData = bodyParser(req);
    console.log(req.body);
    var new_comment = {text: req.body.comment.content, author: req.body.comment.author};
    console.log(new_comment);
    
    //Create a new campground and add to db
    Comment.create(new_comment, function(err, newlyCreated){
        if(err){
            console.log('Error while adding campground entry')
        }else{
            if(helpDebug)console.log('A POST Request to the CampGrounds Page was just made to the server'); 
            Campground.findById(req.params.id, function(err, campground){
                if(err){
                    console.log('Error while trying to retrieve campground info')
                }else{
                    //add username and id to comment
                    newlyCreated.author.id = req.user._id
                    newlyCreated.author.username = req.user.username
                    newlyCreated.save()
                    campground.comments.push(newlyCreated)
                    campground.save()
                    if(helpDebug)console.log('An New Comment GET Request was just made to the server'); 
                    res.redirect('/campgrounds/' + req.params.id);          
                }   
            })
        }
    })
})


//Comment Edit Route's GET route
router.get('/:commentId/edit', middleware.isLoggedIn, middleware.isOriginalAuthor_Comment, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log('Error while trying to retrieve campground')
        } else {
            Comment.findById(req.params.commentId, function(err, comment){
                if(err){
                    console.log('Error while trying to retrieve comment info')
                }else{
                    console.log(req.params.id)
                    console.log(req.params.commentId)
                    if(helpDebug)console.log('An New Comment GET Request was just made to the server'); 
                    res.render('comments/edit', {campground: campground, comment: comment})            
                }
            })   
        }
    })
})

//Comment update Route's PUT route
router.put('/:commentId/', middleware.isLoggedIn, middleware.isOriginalAuthor_Comment, function(req, res){
    console.log('Updating Comment')
    console.log(req.params.id)
    console.log(req.params.commentId)
    var updatedComment = {
        text: req.body.text
    }
    console.log(req.body)
    
    Comment.findByIdAndUpdate(req.params.commentId, updatedComment, function(err, comment){
        if(err){
            console.log('Error while trying to update comment')
        } else {
            console.log(comment)
            if(helpDebug)console.log('An New Comment GET Request was just made to the server'); 
            res.redirect('/campgrounds/' + req.params.id)              
        }
    })
})


//Comment DEstroy Route's DELETE route
router.delete('/:commentId/', middleware.isLoggedIn, middleware.isOriginalAuthor_Comment, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            console.log('Error while trying to delete campground')
        } else {
            if(helpDebug)console.log('An New Comment GET Request was just made to the server'); 
            res.redirect('/campgrounds/' + req.params.id)            
        }
    })
})









module.exports = router
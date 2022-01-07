var Campground    = require('../models/campground');
var Comment       = require('../models/comment');
var middlewareObj = {}



middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}


middlewareObj.isOriginalAuthor_Comment = function (req, res, next){
    console.log('Verifying permission')
    console.log(req.params.commentId)
    Comment.findById(req.params.commentId, function(err, foundEntry){
        if(err){
            console.log('Error retrieving comment Entry')
        } else{
            if(foundEntry.author.id == void(0)){
                res.redirect('/login')
                return
            } else {
                console.log('I got here')
                //mongoose object  and  string
                if(foundEntry.author.id.equals(req.user._id)){
                    return next();
                } else{
                    res.redirect('/login')
                }                
            }
        }
    })
}



middlewareObj.isOriginalAuthor_Campground = function (req, res, next){
    console.log('Verifying permission')
    console.log(req.params.id)
    Campground.findById(req.params.id, function(err, foundEntry){
        if(err){
            console.log('Error retrieving campground Entry')
        } else{
            if(foundEntry.author.id == void(0)){
                res.redirect('/login')
                return
            } else {
                console.log('I got here')
                //mongoose object  and  string
                if(foundEntry.author.id.equals(req.user._id)){
                    return next();
                } else{
                    res.redirect('/login')
                }                
            }
        }
    })
}


module.exports = middlewareObj
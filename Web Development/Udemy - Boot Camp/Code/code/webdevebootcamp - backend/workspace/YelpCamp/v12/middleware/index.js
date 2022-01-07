var Campground    = require('../models/campground');
var Comment       = require('../models/comment');
var middlewareObj = {}



middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First")
    res.redirect('/login')
}


middlewareObj.isOriginalAuthor_Comment = function (req, res, next){
    console.log('Verifying permission')
    console.log(req.params.commentId)
    Comment.findById(req.params.commentId, function(err, foundEntry){
        if(err){
            console.log('Error retrieving comment Entry')
            req.flash("error", "Error retrieving comment Entry")
            res.redirect('back')
        } else{
            if(foundEntry.author.id == void(0)){
                req.flash("error", "Oups!! Current Comment does not have an Author!")
                res.redirect('back')
                return
            } else {
                console.log('I got here')
                //mongoose object  and  string
                if(foundEntry.author.id.equals(req.user._id)){
                    return next();
                } else{
                    req.flash("error", "Sorry, Only the Original Author of the comment can perform this action")
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
            req.flash("error", "Error retrieving campground Entry")
            res.redirect('back')
        } else{
            if(foundEntry.author.id == void(0)){
                req.flash("error", "Oups!! Current Campground does not have an Author!")
                res.redirect('back')
                return
            } else {
                console.log('I got here')
                //mongoose object  and  string
                if(foundEntry.author.id.equals(req.user._id)){
                    return next();
                } else{
                    req.flash("error", "Sorry, Only the Original Author of the campground can perform this action")
                    res.redirect('/login')
                }                
            }
        }
    })
}


module.exports = middlewareObj
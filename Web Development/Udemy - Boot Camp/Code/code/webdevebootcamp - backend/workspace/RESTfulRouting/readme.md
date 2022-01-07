# RESTful Routing       

## Introduction    
* Define REST and explain WHY it matters
* List all 7 RESTful routes
* Show example of RESTful routing in practice




REST: REpresentation State Transfer
REST: Mapping between HTTP ROUTES and DB CRUD Operations (Create, Read, Update and Destroy)

    name        url             verb            description         mongoose Method
===================================================================================


INDEX       /dogs           GET             Displays a list of dogs         Dog.find()
SHOW        /dogs/:id       GET             Shows info about one dog        Dog.findById()


NEW         /dogs/new       GET             Dispays a form to add a new dog  N/A
CREATE      /dogs           POST            Add a new dog to db             Dog.create()


EDIT        /dogs/:id/edit  GET             Shows Edit form for 1 dog       Dog.findById()
UPDATE      /dogs/:id       PUT             Update a scpecific dog          Dog.findByIdAndUpdate()

DESTROY     /dogs/:id       DELETE          Delete a specific dog           Dog.findByIdAndRemove()

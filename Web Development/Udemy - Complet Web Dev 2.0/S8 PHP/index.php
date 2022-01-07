<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <title>Validated Form</title>

    <style type="text/css">
    	
    	.container{
    		margin: 0 auto;
    		width: 80%;
    	}

    </style>

  </head>
  <body>

    <div class="container">
    	
    	<h1>Get in Touch!</h1>
    	<div id="usermsg_success"></div>
    	<div id="usermsg_danger"></div>

    	<form>
		  <div class="form-group">
		    <label for="email">Email address</label>
		    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
		    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
		  </div>
		  <div class="form-group">
		    <label for="subject">Subject</label>
		    <input type="text" class="form-control" id="subject" placeholder="Password">
		  </div>
		  <div class="form-group">
		    <label for="user_question">What would you like to ask us</label>
		    <textarea class="form-control" id="user_question" rows="3"></textarea>
		  </div>
		  <button type="submit" class="btn btn-primary" id="submit">Submit</button>
		</form>

    </div>





    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


    <script type="text/javascript">


    	$('#submit').click(function(){
    		var errors = "";

    		email = $('#email');
    		subject = $('#subject');
    		user_question = $('#user_question');


			filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if !(filter.test(email.value)) {
			   errors += "Invalid Email! Please Enter an Email of the form yourname@somedomain.someextension\n"
			}

			if(subject.value == ""){
				errors += "Empty Suject Content! Please Enter a Suject for your Question\n"
			}

			if(user_question.value == ""){
				errors += "Empty Question Content! Please Enter a Question\n"
			}

			if(errors != ""){
				
			}

    	})

    </script>
  </body>
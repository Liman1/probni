
var app={};

$(function(){
	app.init(); // starting the app!
});		

// Create an init method that will hold all of the code that must run upon initializing of app
app.init = function(){
	app.getActor('John');
	// create event listener on select element
	$('#subject').on('change', function(){
		var subject = $(this).val();
		$('#artwork').empty();
		app.getActor(subject);
	}); 
	$('#subject2').on('change', function(){
		var subject = $(this).val();
		$('#artwork').empty();
		app.getActor(subject);
	});
}; 

app.getActor = function(query){
        $.ajax({
            url: ' http://api.tvmaze.com/search/people',
            method: 'GET',
            data: {
				format: 'jsonp',
				ps: 10,
                q: query
            },
            success: function(result){
                console.log(result);
				app.displayActor(result);
            },
            error: function(error){
                console.log('Something went wrong.');
            }
        });
  };


app.displayActor = function(actorArray){
	actorArray.forEach(function(actor){ // using jQuery forEach to loop over our array of art pieces
		// Creating elements for each piece of data:
		var name = $('<h2>').text(actor.person.name);	
		var checking = actor.person.image;
		
		if(checking == null){
			var image = $('<img>').attr('src', 'https://cdn.evbuc.com/eventlogos/91884425/imagenotavailablegrid.jpg');
		}
		else{
			var image = $('<img>').attr('src', actor.person.image.medium);
			console.log(actor.person.image.medium);
		}
		
		var horRule = $('<hr>');
		var actorHtml = $('<div>').addClass('art-piece').append(horRule, name, image); // Adding all of our elements into this div
		$('#artwork').append(actorHtml); // Appending entire div to our webpage!
	});
};



  

		
	
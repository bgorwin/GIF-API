
$(document).ready(function(){


      var itemsToSearch = ["cat", "dog"];

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttonView").empty();

        // Looping through the array of movies
        for (var i = 0; i < itemsToSearch.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          $(a).addClass("gif  btn-floating waves-effect waves-light btn-large");

          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-term", itemsToSearch[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(itemsToSearch[i]);
          // Adding the button to the HTML
          $("#buttonView").append(a);
        }
      }

       $("#addGif").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var gif = $("#gif-input").val().trim();
        // The movie from the textbox is then added to our array
        itemsToSearch.push(gif);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

       renderButtons();


    // Adding click event listen listener to all buttons
    $(document).on("click", ".gif", function() {
      // Grabbing and storing the data-animal property value from the button
      var searchTerm = $(this).attr("data-term");

      // Constructing a queryURL using the animal name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          // console.log(queryURL);

          // console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var resultDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var resultImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            resultImage.attr("src", results[i].images.fixed_height_still.url);

            resultImage.attr("data-still", results[i].images.fixed_height_still.url);
            resultImage.attr("data-animate", results[i].images.fixed_height.url);
            resultImage.attr("data-state", "still");
            resultImage.addClass("image");


            // Appending the paragraph and image tag to the animalDiv
            resultDiv.append(p);
            resultDiv.append(resultImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(resultDiv);
          }
        });
    });

    $(document).on("click", ".image", function() {


      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
});

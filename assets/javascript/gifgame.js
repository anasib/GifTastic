$(document).ready(function () {

    var animals = ['Zebra', 'Dog', 'Monkey', 'Lion'];

    function displayGif() {
        var apiKey = "9V10bedkl8Zw8yQHk7WBLA6XZkGgEgRX";
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            $('#animalsView').empty();

            for (var i = 0; i < response.data.length; i++) {
                var rating = response.data[i].rating;
                var imageUrl = response.data[i].images.fixed_height.url;
                var imageStillUrl = response.data[i].images.fixed_height_still.url;

                var image = $("<img>");
                var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");

                image.attr('src', imageStillUrl);
                image.attr('alt', 'gif');
                image.attr('data-state', 'still');
                image.attr('data-still', imageStillUrl);
                image.attr('data-animate', imageUrl);

                $('#animalsView').prepend(image, ratingText);
                checkState();
            }

        });

    }


    function createButtons() {

        $('#buttonsView').empty();
        for (var i = 0; i < animals.length; i++) {
            var newButton = $('<button class="btn btn-primary">');
            newButton.addClass('animal');
            newButton.attr('data-name', animals[i]);
            newButton.text(animals[i]);
            $('#buttonsView').append(newButton);
        }
    };

    $('#addAnimal').on('click', function () {

        var animal = $('#animal-input').val().trim();
        animals.push(animal);
        createButtons();
        return false;
    });


    $(document).on('click', '.animal', displayGif);

    createButtons();

    function checkState() {
        $('img').on('click', function () {
            var state = $(this).attr('data-state');
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

        });
    }

});

$(document).ready(function () {

    var players = [];

    function displayGif() {
        var apiKey = "9V10bedkl8Zw8yQHk7WBLA6XZkGgEgRX";
        var player = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            $('#playersView').empty();

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

                $('#playersView').prepend(image, ratingText);
                checkState();
            }

        });

    }


    function createButtons() {

        $('#buttonsView').empty();
        for (var i = 0; i < players.length; i++) {
            var newButton = $('<button class="btn btn-primary">');
            newButton.addClass('player');
            newButton.attr('data-name', players[i]);
            newButton.text(players[i]);
            $('#buttonsView').append(newButton);

        }

    };

    $('#addSoccerPlayer').on('click', function () {

        var player = $('#soccer-input').val().trim();
        players.push(player);
        $("#soccer-input").val(''); //remove the value from input field once added
        createButtons();
        return false;
    });


    $(document).on('click', '.player', displayGif);

    createButtons();

    function checkState() {
        $('img').on('click', function () {
            var state = $(this).attr('data-state');
            if (state === 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

        });
    }

});

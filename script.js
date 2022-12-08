//original with functioning video player.

$(document).ready(function () {

    var key = 'ENTER API KEY'; //api key aquired from google apis
    var playlistId = 'ENTER PLAYLIST ID'; //found at the end of the url when you're in a playlist on youtube, can be changed.
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems'; //loads play list items


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 50,
        playlistId: playlistId
    }


    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#video').html(`
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}"
					frameborder="0" allow="autoplay"; encrypted-media"allowfullscreen"></iframe>`); //embeding video
    }


    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 200);
            var vid = item.snippet.resourceId.videoId;


            $('.scrollable').append(`<article class="item" data-key="${vid}">
                <img src="${thumb}" alt="thumbnail" class="thumb">
								<div class="details"><h2>${title}</h2><p>${desc}</p>
								</div></article>`);
        });
    }

    $('.scrollable').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


});

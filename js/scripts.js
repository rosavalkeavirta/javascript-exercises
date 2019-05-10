var flickrAPI = '//api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

function handleResponse(resp) {
    console.log('The response has been completed');
    console.log(resp);

    if (resp.items.length === 0) {
        $('#imageWrapper').text('There is no image matching your search');
        return;
    }
    renderContent(resp);
}

function renderContent(resp) {
    $('#flickrLink').text(resp.link);          //document.getElementById('flickrLink').innerText = resp.link;
    $('#flickrTitle').text(resp.title);         //document.getElementById('flickrTitle').innerText = resp.title;
    $('#imageWrapper').html('');                 //clears out previous search result

    for (var i = 0; i < resp.items.length; i++) {
        $('#imageWrapper').append('<img src="' + resp.items[i].media.m + '"></img>');   //createImage(resp.items[i].media.m);        //$('#imageWrapper').append('<img src= "' + resp.items[i].media.m '"></img>');
    }                          
}
//function createImage(url) {
 
function doAjaxCall(searchTerm) {
    var paramsForFlickr = {
            tags: searchTerm,
            tagmode: 'any',
            format: 'json'
    };

    $.getJSON( 
        flickrAPI,
        paramsForFlickr,
        handleResponse
    );
}

$(document).ready(function(){
    $('#search').on('click', function(){
        var searchTerm = $('searchTerm').val();    
        console.log(searchTerm);
        doAjaxCall();
    });
})
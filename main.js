function searchMovie() {
    var apiKey = 'a2cb1f14';
    var movieTitle = document.getElementById('searchInput').value;
    var apiUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&t=' + movieTitle;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            var movieData = JSON.parse(xhr.responseText);
            displayMovieInfo(movieData);
        } else {
            console.error('Error fetching movie data');
        }
    };
    xhr.send();
}

function displayMovieInfo(data) {
    var movieInfoDiv = document.getElementById('movieInfo');
    if (data.Response === 'True') {
        var movieHTML = `
        <div class="box1">
            <h2>${data.Title}</h2>
            <div class="box2">
                <img src="${data.Poster}" alt="${data.Title} Poster">
                <div class="box3">
                    <p><strong>Plot:</strong> ${data.Plot}</p>
                    <p><strong>Director:</strong> ${data.Director}</p>
                    <p><strong>Year:</strong> ${data.Year}</p>
                </div>
            </div>
        </div>
        `;
        movieInfoDiv.innerHTML = movieHTML;
    } else {
        movieInfoDiv.innerHTML = '<p>Movie not found!</p>';
    }
}

var suggestionsDiv = document.getElementById('suggestions');
var searchInput = document.getElementById('searchInput');

function searchMovieSuggestions() {
    var searchTerm = searchInput.value;
    var apiUrl = 'https://www.omdbapi.com/?apikey=a2cb1f14&s=' + searchTerm;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displaySuggestions(data.Search);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displaySuggestions(suggestions) {
    suggestionsDiv.innerHTML = '';
    if (suggestions && suggestions.length > 0) {
        suggestions.forEach(function (suggestion) {
            var suggestionDiv = document.createElement('div');
            suggestionDiv.textContent = suggestion.Title;
            suggestionDiv.classList.add('suggestion');
            suggestionDiv.addEventListener('click', function () {
                searchInput.value = suggestion.Title;
                suggestionsDiv.innerHTML = '';
            });
            suggestionsDiv.appendChild(suggestionDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    searchInput.addEventListener('input', function () {
        searchMovieSuggestions();
    });
});

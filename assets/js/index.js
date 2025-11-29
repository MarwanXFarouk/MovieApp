var moviesData, allMoviesMap, movieImg, movieName, movieDescription, movieDate, starsRating;
var apiUrl = '4db0fcaccb985b5510c5e53f278100bd';
var imageBasePath = 'https://image.tmdb.org/t/p/w500';

$(document).ready(function () {
    setTimeout(function () {
        $('.loading').fadeOut(500);
    }, 1000);

    loadMovies('movie/now_playing');
});

function openCloseSidebar() {
    if ($('nav').css('margin-left') == '250px') {
        $('.side-nav').css('margin-left', '-250px');
        $('nav').css('margin-left', '0px');
        $('.menu ul li').animate({
            'paddingTop': '250px',
            'opacity': '0'
        }, 1000);
        $('.nav-menu').html('<i class="fa-solid fa-align-justify"></i>');
    } else {
        $('.side-nav').css('margin-left', '0px');
        $('nav').css('margin-left', '250px');
        $('.menu ul li').animate({
            'paddingTop': '25px',
            'opacity': '1'
        }, 1000);
        $('.nav-menu').html('<i class="fa-solid fa-xmark"></i>');
    }
}

$('.nav-menu').click(openCloseSidebar);

async function loadMovies(endpoint) {
    var fullApiUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=${apiUrl}&language=en-US&include_adult=false`;
    var response = await fetch(fullApiUrl);
    if (response.ok && 400 != response.status) {
        var apiData = await response.json();
        moviesData = apiData.results;
        allMoviesMap = new Map(Object.entries(moviesData));
        showMoviesOnScreen();
    }
}

async function searchMoviesByKeyword(keyword) {
    var searchUrl = `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${apiUrl}&language=en-US&include_adult=false`;
    var response = await fetch(searchUrl);
    if (response.ok && 400 != response.status) {
        var apiData = await response.json();
        moviesData = apiData.results;
        allMoviesMap = new Map(Object.entries(moviesData));
        showMoviesOnScreen();
    }
}

function showMoviesOnScreen() {
    var htmlContent = '';
    for (var [index, movieItem] of allMoviesMap) {
        checkMovieDetails(movieItem, imageBasePath);
        htmlContent += `
         <div class="col-lg-4 col-md-6 col-sm-12 animate__animated">
         <div class="item overflow-hidden position-relative">
             <div class="cardImage">
                 <img src="${movieImg}" class="img-fluid">
             </div>
             <div class="overlay overflow-hidden">
                 <h1 class="animate__animated title">${movieItem[movieName]}</h1>    
                 <p class="animate__animated desc">${movieDescription}</p>
                 <p class="animate__animated date"><span class="fst-normal">Release Date</span> : ${movieDate}</p>
                 <h3 class="rate animate__animated">${starsRating}</h3>
                 <h3 class="rate animate__animated vote">${movieItem.vote_average.toFixed(1)}</h3>
             </div>
         </div>
     </div>
    `;
        $('#hero .row').html(htmlContent);
        $('#hero .row div').addClass('animate__fadeIn');
        $('#hero .item').mouseenter(hoverInEffect);
        $('#hero .item').mouseleave(hoverOutEffect);
    }
}

function checkMovieDetails(movie, imgPath) {
    getPosterImage(movie, imgPath);
    getMovieTitle(movie);
    getMovieDesc(movie);
    getReleaseDate(movie);
    calculateStars(movie);
}

function getPosterImage(movie, imgPath) {
    if (movie.poster_path == null && movie.backdrop_path == null) {
        movieImg = `https://via.placeholder.com/500x750?text=No+Image`;
    } else if (movie.poster_path == null) {
        movieImg = `${imgPath + movie.backdrop_path}`;
    } else if (movie.hasOwnProperty('poster_path')) {
        movieImg = `${imgPath + movie.poster_path}`;
    }
}

function getMovieTitle(movie) {
    if (movie.hasOwnProperty('title')) {
        movieName = `title`;
    } else if (movie.hasOwnProperty('name')) {
        movieName = `name`;
    }
}

function getMovieDesc(movie) {
    if (movie.overview.length > 300) {
        movieDescription = `${movie.overview.slice(0, 300)}...`;
    } else {
        movieDescription = `${movie.overview}`;
    }
}

function getReleaseDate(movie) {
    if (movie.hasOwnProperty('release_date')) {
        movieDate = `${movie.release_date}`;
    } else if (movie.hasOwnProperty('first_air_date')) {
        movieDate = `${movie.first_air_date}`;
    } else {
        movieDate = 'Release Date UnKnown';
    }
}

function calculateStars(movie) {
    if (movie.vote_average < 1) {
        starsRating = `<i class="fa-solid fa-star text-muted fs-6"></i>`;
    } else if (movie.vote_average < 2) {
        var starHtml = '';
        starsRating = starHtml + `<i class="fa-solid fa-star-half-stroke text-warning fs-6"></i>`;
    } else if (movie.vote_average < 3) {
        starsRating = `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    } else if (movie.vote_average < 4) {
        var starHtml = '';
        for (var i = 0; i < 1; i++) {
            starHtml += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        starsRating = starHtml + `<i class="fa-solid fa-star-half-stroke text-warning fs-6"></i>`;
    } else if (movie.vote_average < 5) {
        var starHtml = '';
        for (var i = 0; i < 2; i++) {
            starHtml += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        starsRating = starHtml;
    } else if (movie.vote_average < 6) {
        var starHtml = '';
        for (var i = 0; i < 2; i++) {
            starHtml += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        starsRating = starHtml + `<i class="fa-solid fa-star-half-stroke text-warning fs-6"></i>`;
    } else if (movie.vote_average < 7) {
        var starHtml = '';
        for (var i = 0; i < 3; i++) {
            starHtml += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        starsRating = starHtml;
    } else if (movie.vote_average < 8) {
        var starHtml = '';
        for (var i = 0; i < 3; i++) {
            starHtml += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        starsRating = starHtml + `<i class="fa-solid fa-star-half-stroke text-warning fs-6"></i>`;
    } else if (movie.vote_average < 9) {
        var starHtml = '';
        for (var i = 0; i < 4; i++) {
            starHtml += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        starsRating = starHtml;
    } else if (movie.vote_average < 10) {
        var starHtml = '';
        for (var i = 0; i < 4; i++) {
            starHtml += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        starsRating = starHtml + `<i class="fa-solid fa-star-half-stroke text-warning fs-6"></i>`;
    } else {
        var starHtml = '';
        for (var i = 0; i < 5; i++) {
            starHtml += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        starsRating = starHtml;
    }
}

function hoverInEffect() {
    $(this).find($('.overlay')).css({
        'opacity': '1',
        'visibility': 'visible'
    });
    $(this).find($('.overlay .title')).removeClass('animate__slideOutLeft');
    $(this).find($('.overlay .title')).addClass('animate__fadeInDown animate__delay-0s');
    $(this).find($('.overlay .desc')).removeClass('animate__slideOutLeft');
    $(this).find($('.overlay .desc')).addClass('animate__flipInX animate__delay-0s');
    $(this).find($('.overlay .date')).removeClass('animate__slideOutLeft');
    $(this).find($('.overlay .date')).addClass('animate__fadeInUp animate__delay-0s');
    $(this).find($('.overlay .rate')).removeClass('animate__slideOutLeft');
    $(this).find($('.overlay .rate')).addClass('animate__fadeInUp animate__delay-0s');
    $(this).find($('.cardImage img')).addClass('animate');
}

function hoverOutEffect() {
    $(this).find($('.overlay')).css({
        'opacity': '0',
        'visibility': 'hidden'
    });
    $(this).find($('.overlay .title')).removeClass('animate__fadeInDown animate__delay-0s');
    $(this).find($('.overlay .title')).addClass('animate__slideOutLeft');
    $(this).find($('.overlay .desc')).removeClass('animate__flipInX animate__delay-0s');
    $(this).find($('.overlay .desc')).addClass('animate__slideOutLeft');
    $(this).find($('.overlay .date')).removeClass('animate__fadeInUp animate__delay-0s');
    $(this).find($('.overlay .date')).addClass('animate__slideOutLeft');
    $(this).find($('.overlay .rate')).removeClass('animate__fadeInUp animate__delay-0s');
    $(this).find($('.overlay .rate')).addClass('animate__slideOutLeft');
    $('.cardImage img').removeClass('animate');
}

$(window).scroll(handleScrollTop);

function handleScrollTop() {
    if (window.pageYOffset > 100) {
        $('#back-to-top').addClass('active');
    } else {
        $('#back-to-top').removeClass('active');
    }
}

$('[attr]').click(function () {
    var categoryAttr = $(this).attr('attr');
    if (categoryAttr == 'nowPlaying') {
        loadMovies('movie/now_playing');
        scrollToZero();
    } else if (categoryAttr == 'popular') {
        loadMovies('movie/popular');
        scrollToZero();
    } else if (categoryAttr == 'topRated') {
        loadMovies('movie/top_rated');
        scrollToZero();
    } else if (categoryAttr == 'trending') {
        loadMovies('trending/movie/day');
        scrollToZero();
    } else if (categoryAttr == 'upcoming') {
        loadMovies('movie/upcoming');
        scrollToZero();
    }
});

$('[section]').click(function () {
    if ($(this).attr('section')) {
        var targetSection = $($(this).attr('section')).offset().top;
        $('html, body').animate({
            scrollTop: targetSection
        }, 2000);
    }
});

function scrollToZero() {
    $('html, body').animate({
        scrollTop: 0
    }, 1500);
}

$('#search').on('input', function () {
    var searchText = $(this).val();
    if (searchText.length > 0) {
        searchMoviesByKeyword(searchText);
    } else {
        loadMovies('movie/now_playing');
    }
});

function runValidation() {
    $('#contact input').on('input', function () {
        $('#contact input').on('input', function () {
            if (hasError()) {
                $('form button').addClass('animate__shakeX bg-danger buttonFormActive');
                $('form button').mouseenter(shakeButton);
                $('form button').addClass('animate__shakeX bg-danger buttonFormActive');
                $('form button').css({
                    'cursor': 'default',
                    'userSelect': 'none'
                });
            } else {
                $('form button').removeClass('animate__shakeX bg-danger buttonFormActive');
                $('form button').css({
                    'marginLeft': '0px'
                });
                $('form button').off('mouseenter', shakeButton);
                $('form button').removeClass('animate__shakeX bg-danger buttonFormActive');
                $('form button').css('cursor', 'pointer');
            }
        });
    });

    function hasError() {
        if ($('#contact .error').hasClass('animate__flipInX')) {
            return true;
        } else {
            return false;
        }
    }
}

$('#contact #name').on('input', function () {
    var namePattern = /^[a-zA-z\s]{1,36}$/;
    var errorSpan = $('#name').next();
    var inputField = $(this);
    if ($(this).val() == '') {
        clearError(errorSpan, inputField);
    } else if (namePattern.test($(this).val())) {
        clearError(errorSpan, inputField);
    } else {
        errorSpan.html('Invalid Name , only Characters allowed');
        displayError(errorSpan, inputField);
    }
});

$('#contact #email').on('input', function () {
    var emailPattern = /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/;
    var errorSpan = $('#email').next();
    var inputField = $(this);
    if ($(this).val() == '') {
        clearError(errorSpan, inputField);
    } else if (emailPattern.test($(this).val())) {
        clearError(errorSpan, inputField);
    } else {
        errorSpan.html('Invalid Email , try example@domain.com');
        displayError(errorSpan, inputField);
    }
});

$('#contact #phone').on('input', function () {
    var phonePattern = /^(02)?(01)[0125][0-9]{8}$/;
    var errorSpan = $('#phone').next();
    var inputField = $(this);
    if ($(this).val() == '') {
        clearError(errorSpan, inputField);
    } else if (phonePattern.test($(this).val())) {
        clearError(errorSpan, inputField);
    } else {
        errorSpan.html('Invalid Phone Number');
        displayError(errorSpan, inputField);
    }
});

$('#contact #age').on('input', function () {
    var agePattern = /^(1[6-9]|[2-9][0-9]|100)$/;
    var errorSpan = $('#age').next();
    var inputField = $(this);
    if ($(this).val() == '') {
        clearError(errorSpan, inputField);
    } else if (agePattern.test($(this).val())) {
        clearError(errorSpan, inputField);
    } else {
        errorSpan.html('Your age must be over 16+');
        displayError(errorSpan, inputField);
    }
});

$('#contact #password').on('input', function () {
    var passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var errorSpan = $('#password').next();
    var inputField = $(this);
    if ($(this).val() == '') {
        clearError(errorSpan, inputField);
    } else if (passPattern.test($(this).val())) {
        clearError(errorSpan, inputField);
    } else {
        errorSpan.html('password must contain numbers & letters at least 8 character');
        displayError(errorSpan, inputField);
    }
});

$('#contact #repassword').on('input', function () {
    var errorSpan = $('#repassword').next();
    var inputField = $(this);
    if ($(this).val() == '') {
        clearError(errorSpan, inputField);
    } else if ($(this).val() == $('#password').val()) {
        clearError(errorSpan, inputField);
    } else {
        errorSpan.html('Password not match');
        displayError(errorSpan, inputField);
    }
});

$('.showPass').click(function () {
    if ($('#password').attr('type') == 'text') {
        $('#password').attr('type', 'password');
        $('.showPass').html('<i data-show="show" class="fa-solid fa-eye-slash"></i>');
    } else {
        $('#password').attr('type', 'text');
        $('.showPass').html('<i data-show="show" class="fa-solid fa-eye"></i>');
    }
});

$('#password').focus(function () {
    $('.showPass').css('opacity', 1);
    $('.showPass').css('bottom', 10);
});

$(document).click(function (e) {
    if ($(e.target)[0] == $('#password')[0] || $(e.target).attr('data-show') == $('.showPass i').attr('data-show')) {
        $('.showPass').css('opacity', 1);
        $('.showPass').css('bottom', 10);
    } else {
        $('.showPass').css('opacity', 0);
        $('.showPass').css('bottom', -20);
    }
});

function clearError(errSpan, inpField) {
    inpField.css('border-bottom-color', '#CED4DA');
    errSpan.html(null);
    errSpan.removeClass('animate__animated animate__flipInX');
    errSpan.addClass('animate__animated animate__fadeOutUp');
}

function displayError(errSpan, inpField) {
    inpField.css('border-bottom-color', 'rgb(214, 46, 51)');
    errSpan.removeClass('animate__animated animate__fadeOutUp');
    errSpan.addClass('animate__animated animate__flipInX');
}

function shakeButton() {
    var currentMargin = $('form button').css('marginLeft');
    if (currentMargin == '250px') {
        $('form button').css({
            'marginLeft': '0px'
        });
    } else {
        $('form button').css({
            'marginLeft': '250px'
        });
    }
}

$('form button').keydown(function (e) {
    if (e.key == 'Enter') {
        event.preventDefault();
    }
});

$('form').submit(function (e) {
    e.preventDefault();
});

runValidation();
var requestInterval = 10000;
var loadWaitInterval = 3000;
var removeAnimationInterval = 2000;
var url = "http://newyears.nathanp.me/slideshow/getimages";
var animations = ["bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp",
                  "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig",
                  "flipInX", "flipInY",
                  "lightSpeedIn",
                  "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight",
                  "slideInUp", "slideInDown", "slideInLeft", "slideInRight",
                  "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp",
                  "rollIn"]

var images = [];
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var s = xmlhttp.responseText.replace(/'/g, "\"");
        console.log(s);
        images = JSON.parse(s);
        chooseNextImage();
    }
};

function getImageList() {
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

var previous = "";
function chooseNextImage () {
    var animation = animations[Math.floor(Math.random() * animations.length)];
    var nextImage = images[Math.floor(Math.random() * images.length)];
    while ($('.currentImage').children().attr('src') === nextImage) {
        nextImage = images[Math.floor(Math.random() * images.length)];
    }
    $('.nextImage').children().attr('src', nextImage);
    setTimeout(function() {
        var next = $('.nextImage');
        var current = $('.currentImage');
        $(next).removeClass('nextImage');
        $(next).addClass('currentImage');
        $(next).show();
        next = next.children();
        $(next).addClass('animated');
        $(next).addClass(animation);
        setTimeout(function() {
            $(next).removeClass('animated');
            $(next).removeClass(animation);
            $(current).fadeOut(1000);
        }, removeAnimationInterval);

        $(current).removeClass('currentImage');
        $(current).addClass('nextImage');
    }, loadWaitInterval);
}

var requester = setInterval(getImageList, requestInterval);

var hue = Math.floor(Math.random() * 360);
var colorbackground = setInterval(function() {
    var backgroundobj = {backgroundColor: 'hsl(' + hue + ', 100%, 50%)'};
    $('body').css(backgroundobj);
    hue += 1;
    if (hue >= 360) {
        hue = 0;
    }
}, 200);

var request = new XMLHttpRequest();
var now;
request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
        now = new Date(request.responseText);
        $('.datetime').text(now.toLocaleTimeString());
        $('.datetime').css(randomColor());
        if (now.getDate() == 1 && now.getMonth() == 0) {
            startFireworks()
        }
    }
}

var countdown = setInterval(function() {
    request.open("GET", "getdatetime", true);
    request.send();
}, 1000);

var started = false;
var startFireworks = function() {
    if (!started) {
        started = true;
        var yay = $(document.createElement('h1'));
        yay.css({position: 'absolute', fontFamily: 'sans-serif', fontSize: '100px', top: '50%', left: '50%', textAlign: 'center',
                 webkitTransform: 'translateX(-50%) translateY(-50%)',
                 msTransform: 'translateX(-50%) translateY(-50%)',
                 mozTransform: 'translateX(-50%) translateY(-50%)',
                 transform: 'translateX(-50%) translateY(-50%)',
                 zIndex: '4'
        });
        yay.addClass('yay');
        yay.text('Welcome to ' + now.getFullYear() + '!');
        setInterval(function() {
            $('.yay').css(randomColor());
        }, 30);
        $('body').prepend(yay);
        randomTimer(function() {
            createFirework(randInt($('body').width()), randInt($('body').height()), randInt(50) + 5, 'body');
        }, 1000);
    }
}

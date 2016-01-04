function randInt(upTo) {
  return Math.floor(Math.random() * upTo);
}

function randomColor(ev) {
  return color = {color: 'hsl('+ randInt(360) + ', 100%, 50%)'};
};

function createFirework(x, y, numsparks) {
  for (i = 0; i < numsparks; i++) {
    new Spark(x, y, randomColor().color, randInt(360), randInt(3), randInt(500));
  }
}

function Spark(x, y, color, angle, speed, lifetime) {
  var self = this;
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.speed = speed;
  this.lifetime = lifetime;
  this.distance = 0;

  this.me = $(document.createElement('div'));
  this.me.addClass('spark');
  this.me.css({left: x + 'px', top: y + 'px', backgroundColor: color});

  this.update = function() {
    transform = {webkitTransform: 'rotate(' + self.angle + 'deg) translateX(' + self.distance + 'px)',
                 msTransform: 'rotate(' + self.angle + 'deg) translateX(' + self.distance + 'px)',
                 mozTransform: 'rotate(' + self.angle + 'deg) translateX(' + self.distance + 'px)',
                 transform: 'rotate(' + self.angle + 'deg) translateX(' + self.distance + 'px)'};
    self.me.css(transform);
    self.distance += self.speed;
  };
  this.loop = setInterval(this.update, 1);

  this.death = function() {
    clearInterval(self.loop);
    self.me.remove();
  }
  this.kill = setTimeout(this.death, lifetime);

  $('#sky').prepend(this.me);
}

$('.randomcolor').each(function() {$(this).css(randomColor())});
$('.randomcolor').mouseenter(function(ev) {
  $(ev.target).css(randomColor());
});

$('.randombgcolor').each(function() {$(this).css({backgroundColor: randomColor().color})});
$('.randombgcolor').mouseenter(function(ev) {
  $(ev.target).css({backgroundColor: randomColor().color});
});

var randomTimer = function(f, maxTime) {
  var helper = function() {
    f()
    setTimeout(helper, randInt(maxTime));
  }
  return setTimeout(helper, randInt(maxTime));
}

var arsenal = randomTimer(function() {
  createFirework(randInt($('body').width()), randInt($('body').height()), randInt(50) + 5);
}, 1000);

$('body').click(function(e) {
  createFirework(e.pageX, e.pageY, randInt(50) + 5);
});

$('.button').click(function (e) {
  e.preventDefault();
  url = 'rsvp/' + $('input').val().replace(/\s/g, '');
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          $('.response').text(xmlhttp.responseText);
          $('input').val('');
      }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
});

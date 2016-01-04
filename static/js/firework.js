var sounds = ["static/audio/blast1.ogg", "static/audio/blast_far1.ogg", "static/audio/largeBlast_far1.ogg", "static/audio/launch1.ogg", "static/audio/twinkle1.ogg", "static/audio/twinkle_far1.ogg"]

function randInt(upTo) {
  return Math.floor(Math.random() * upTo);
}

function randomColor(ev) {
  return color = {color: 'hsl('+ randInt(360) + ', 100%, 50%)'};
};

function createFirework(x, y, numsparks, element) {
  var sound = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
  for (i = 0; i < numsparks; i++) {
    new Spark(x, y, randomColor().color, randInt(360), randInt(3), randInt(500), element);
  }
  sound.play();
}

var randomTimer = function(f, maxTime) {
  var helper = function() {
    f()
    setTimeout(helper, randInt(maxTime));
  }
  return setTimeout(helper, randInt(maxTime));
}

function Spark(x, y, color, angle, speed, lifetime, element) {
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

  $(element).prepend(this.me);
}

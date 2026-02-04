// WIDGETS = {}; // <-- for development only

(() => {
  const buzzer = require("buzz");
  let settings = Object.assign({
    execute: false,
    is_running: false,
    run: 30,
    walk: 30
  }, require("Storage").readJSON("nsi.json", true) || {});
  let width = 0; // width of the widget
  let counter = 5;

  let running_func;
  let counting_func;

  function count_down() {
    counter--;

    if (counter <= 3) {
      buzzer.pattern(".");
    }

    if (counter <= 0) {
      // Set new time
      counter = settings.is_running ? settings.walk : settings.run;
      settings.is_running = !settings.is_running;
      if (!settings.is_running) {
        buzzer.pattern("=");
      }
      else {
        buzzer.pattern(";;;");
      }
    }
  }

  function draw() {
    if (!settings.execute || !width) {
      return;
    }

    const current_time = counter;
    const minutes = Math.floor(current_time / 60);
    const seconds = current_time % 60;

    // Do all of the graphics things
    g.reset()
      .clearRect(this.x, this.y, this.x+width, this.y+24)
      .setFont("6x8")
      .setFontAlign(0,0)
      .drawString(String(minutes).padStart(2, "0"), this.x+width/2, this.y+6)
      .drawString("-", this.x+width/2, this.y+12)
      .drawString(String(seconds).padStart(2, "0"), this.x+width/2, this.y+18);
  }

  function reload() {
    settings = Object.assign({
      execute: false,
      is_running: false,
      run: 30,
      walk: 30
    }, require("Storage").readJSON("nsi.json", true) || {});

    // Start the timer
    if (settings.execute) {
      if (running_func) {
        clearInterval(running_func);
        clearInterval(counting_func);
        running_func = undefined;
        counting_func = undefined;
      }
      counter = 5;
      width = 18
      WIDGETS["nsi"].width = width;
      running_func = setInterval(function() {
                      WIDGETS["nsi"].draw(WIDGETS["nsi"]);
                      }, 1000 * 5);
      counting_func = setInterval(count_down, 1000);
    }
    else if (running_func) {
      clearInterval(running_func);
      clearInterval(counting_func);
      running_func = undefined;
      counting_func = undefined;
      width = 0;
      WIDGETS["nsi"].width = width;
    }
    Bangle.drawWidgets();
  }

  // add your widget
  WIDGETS["nsi"]={
    area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right), be aware that not all apps support widgets at the bottom of the screen
    width: width, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
    draw:draw, // called to draw the widget
    reload: reload
  };
})()

// Bangle.drawWidgets(); // <-- for development only

// WIDGETS = {}; // <-- for development only

(() => {
  let settings = Object.assign({
    execute: true,
    is_running: false,
    run: 30,
    walk: 30
  }, require('Storage').readJSON("nsi.json", true) || {});
  const width = 18; // width of the widget
  let counter = 5;
  let running_func;

  function draw() {
    counter--;

    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;

    if (minutes <= 0 && seconds <= 0) {
      // Handle interval over
      console.log("Out of time!");
      // Set new time
      counter = settings.is_running ? settings.walk : settings.run;
      settings.is_running = !settings.is_running;
      Bangle.buzz(700);
    }

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
    }, require('Storage').readJSON("nsi.json", true) || {});

    // Start the timer
    if (execute) {
      if (running_func) {
        clearInterval(running_func);
        running_func = undefined;
      }
      counter = 5;
      running_func = setInterval(function() {
                      WIDGETS["nsi"].draw(WIDGETS["nsi"]);
                      }, 1000); // update every second
    }
    else if (running_func) {
      clearInterval(running_func);
      running_func = undefined;
    }
  }

  // add your widget
  WIDGETS["nsi"]={
    area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right), be aware that not all apps support widgets at the bottom of the screen
    width: width, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
    draw:draw // called to draw the widget
  };
})()

// Bangle.drawWidgets(); // <-- for development only

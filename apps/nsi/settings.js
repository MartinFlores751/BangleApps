(function(back) {
  const FILE = "nsi.json";
  // Load settings
  var settings = Object.assign({
    execute: false,
    run: 30,
    walk: 30
  }, require('Storage').readJSON(FILE, true) || {});

  function writeSettings() {
    require('Storage').writeJSON(FILE, settings);
    if (WIDGETS["nsi"]) {
      WIDGETS["nsi"].reload();
    }
  }

  // Show the menu
  E.showMenu({
    "" : { "title" : "nsi" },
    "< Back" : () => back(),
    'On or off?': {
      value: !!settings.execute,  // !! converts undefined to false
      onchange: v => {
        settings.execute = v;
        writeSettings();
      }
      // format: ... may be specified as a function which converts the value to a string
      // if the value is a boolean, showMenu() will convert this automatically, which
      // keeps settings menus consistent
    },
    'Run Time': {
      value: 30|settings.run,  // 0| converts undefined to 0
      min: 0, max: 300,
      onchange: v => {
        settings.run = v;
        writeSettings();
      }
    },
    'Walk Time': {
      value: 30|settings.walk,  // 0| converts undefined to 0
      min: 0, max: 300,
      onchange: v => {
        settings.walk = v;
        writeSettings();
      }
    },
  });
})
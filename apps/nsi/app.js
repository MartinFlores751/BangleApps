let counter = 30;
let counterInterval;

function otherInterval() {
  g.clear(1);
  g.setFontAlign(0,0); // center font
  g.setFont("Vector", 80);

  g.drawString(counter, g.getWidth()/2, g.getHeight()/2);
}

function countDown() {
   counter--;

  if (counter <= 0) {
    clearInterval(counterInterval);
    counterInterval = undefined;
    E.showMessage("Out of Time", "My Timer");
    Bangle.buzz();
    counterInterval = setInterval(otherInterval, 5000);
    //Bangle.setUI({
    //  mode: "custom",
    //  btn: ()=>{
    //    Bangle.setUI();
    //    startTimer();
    //  }
    //});
    return;
  }

  g.clear(1);
  g.setFontAlign(0,0); // center font
  g.setFont("Vector", 80);

  g.drawString(counter, g.getWidth()/2, g.getHeight()/2);
}

function startTimer() {
  counter = 30;
  countDown();
  if (counterInterval) {
    clearInterval(counterInterval);
  }
  counterInterval = setInterval(countDown, 1000);
  Bangle.setUI({
    mode: "updown",
  }, dir => {
    if (!dir) {
      if (counterInterval) {
        clearInterval(counterInterval);
        counterInterval = undefined;
      }
      else {
        counterInterval = setInterval(countDown, 1000);
      }
    }
    else {
      counter += dir + 1;
      if (counter < 3) {
         counter = 3; 
      }
      countDown();
    }
  });
}

startTimer();
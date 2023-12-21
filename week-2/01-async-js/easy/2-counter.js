// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.


function counter (interval, i) {
  setTimeout(function(){
    i++;
    console.log(i);
    counter(interval, i);
  }, interval);
}





































































// (Hint: setTimeout)
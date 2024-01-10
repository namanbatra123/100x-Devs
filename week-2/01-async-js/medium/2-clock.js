const clock = () => {
  const date = new Date();
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
  console.log(`${hours}:${minutes}:${seconds}`);
};

setInterval(clock, 1000);

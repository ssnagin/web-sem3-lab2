export default

function pickRandomColor() : string {
      var letters = '0123456789ABCDEF';
  var clr = '#';
  for (var i = 0; i < 6; i++) {
    clr += letters[Math.floor(Math.random() * 16)];
  }

  return clr;
}
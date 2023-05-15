var timer = 4000;

var i = 0;
var max = $('#c > li').length;
var cantCol = calculatecol($(window).width())


/*$("#c > li").eq(i).addClass('active').css('left', '0');
$("#c > li").eq(i + 1).addClass('active').css('left', '25%');
$("#c > li").eq(i + 2).addClass('active').css('left', '50%');
$("#c > li").eq(i + 3).addClass('active').css('left', '75%');*/
li('left')

setInterval(function () {

  $("#c > li").removeClass('active');

  li('transition-delay')

  /*$("#c > li").eq(i).css('transition-delay', '0.25s');
  $("#c > li").eq(i + 1).css('transition-delay', '0.5s');
  $("#c > li").eq(i + 2).css('transition-delay', '0.75s');
  //$("#c > li").eq(i + 3).css('transition-delay', '1s');*/

  if (i < max - cantCol) {
    i = i + cantCol;
  }
  else {
    i = 0;
  }

  /*$("#c > li").eq(i).css('left', '0').addClass('active').css('transition-delay', '1.25s');
  $("#c > li").eq(i + 1).css('left', '25%').addClass('active').css('transition-delay', '1.5s');
  $("#c > li").eq(i + 2).css('left', '50%').addClass('active').css('transition-delay', '1.75s');
  $("#c > li").eq(i + 3).css('left', '75%').addClass('active').css('transition-delay', '2s');*/
  li('transition-delay-2')

}, timer);



window.addEventListener('resize', function (event) {
  cantCol = calculatecol(event.target.window.innerWidth)
});

function calculatecol(w) {
  let c = 0
  switch (true) {
    case w > 1000:
      c = 4
      break;
    case w > 700 && c <= 1000:
      c = 3
      break;
    case w > 500 && c <= 700:
      c = 2
      break;
    case w <= 500:
      c = 1
      break;
  }
  return c
}

function li(text = '') {
  let position
  position = 100 / cantCol

  let valor = 0
  let valor1 = 0

  for (let j = 0; j < cantCol; j++) {
    switch (text) {
      case 'left':
        if (cantCol == 1) {
          valor = 35
        }
        if (cantCol == 2 && valor == 0) {
          valor = 25
        }
        $("#c > li").eq(i + j).addClass('active').css('left', valor + '%');
        if (cantCol == 2 && valor == 25) {
          valor = 0
        }
        valor = valor + position
        break;

      case 'transition-delay':
        valor = valor / 100;
        $("#c > li").eq(i + j).css('transition-delay', valor + 's');
        valor = valor + position
        break;

      case 'transition-delay-2':
        valor1 = (valor / 100) + 1;

        if (cantCol == 1) {
          valor = 35
        }
        if (cantCol == 2 && valor == 0) {
          valor = 25
        }
        $("#c > li").eq(i + j).css('left', valor + '%').addClass('active').css('transition-delay', valor1 + 's');
        if (cantCol == 2 && valor == 25) {
          valor = 0
        }
        valor = valor + position
        break;

      default:
        break;
    }
  }
}

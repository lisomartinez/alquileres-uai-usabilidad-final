$(document).ready(function () {

  //almacenamos en una variable el valor de del modal y del togle del boton
  //


  var atridatatogle = $(".btnopcion").attr("data-toggle");//alamacenamos el el valor de data-toggle en memoria
  var atridatatarget = $(".btnopcion").attr("data-target");//alamacenamos el el valor de data-target en memoria
  var radiovar4 = $("input[id=radio4]").val();


  $("input[name=radio2]").click(function () {
    var radiobtn = $('input:radio[name=radio2]:checked').val();
    console.log(radiobtn);
    if (radiobtn === radiovar4) {
      $(".btnopcion").attr("href", "pago2.html");
    } else {
      $(".btnopcion").removeAttr("href");
    }
  });

  $('#capaFondo').click(function () {
    $('#noMetodoPagoModal').modal('hide')
    $('#myModalpagar').modal('hide')
    document.getElementById("capaFondo").style.visibility = "hidden";
    document.getElementById("capaFondo").style.width = "0";
    document.getElementById("capaFondo").style.height = "0";
  })

  $('#showPagar').click(function () {
      var radiobtn = $('input:radio[name=radio2]:checked').val();
      if (radiobtn === undefined) {
        $('#noMetodoPagoModal').modal('show')
      } else {
        $('#myModalpagar').modal('show')
      }
      document.getElementById("capaFondo").style.visibility = "visible";
      document.getElementById("capaFondo").style.width = "100vw";
      document.getElementById("capaFondo").style.height = "200%";
    }
  )

  $("#closeNoMetodoPagoModal").click(function () {
    $('#noMetodoPagoModal').modal('hide')
    document.getElementById("capaFondo").style.visibility = "hidden";
    document.getElementById("capaFondo").style.width = "0";
    document.getElementById("capaFondo").style.height = "0";
  })

  $(".btnclose").click(function () {
    window.location.href = "home.html";
    document.getElementById("capaFondo").style.visibility = "hidden";
    document.getElementById("capaFondo").style.width = "0";
    document.getElementById("capaFondo").style.height = "0";
  })


});

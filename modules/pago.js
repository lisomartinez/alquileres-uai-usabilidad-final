$(document).ready(function () {

  //almacenamos en una variable el valor de del modal y del togle del boton
  //


  var atridatatogle = $(".btnopcion").attr("data-toggle");//alamacenamos el el valor de data-toggle en memoria
  var atridatatarget = $(".btnopcion").attr("data-target");//alamacenamos el el valor de data-target en memoria
  var radiovar4 = $("input[id=radio4]").val();

  // $(".btnopcion").click(function () {
  //   var radiobtn = $('input:radio[name=radio2]:checked').val();
  //
  //   if (radiobtn === undefined) {
  //     alert("Elige opcion de pago ");
  //   } else {
  //     document.getElementById("capaFondo").style.visibility = "visible";
  //   }
  // })


  $("input[name=radio2]").click(function () {
    var radiobtn = $('input:radio[name=radio2]:checked').val();
    console.log(radiobtn);
    if (radiobtn === radiovar4) {
      console.log("entre al si");
      $(".btnopcion").attr("href", "pago2.html");
      // $(".btnopcion").removeAttr("data-toggle");
    } else {
      console.log("entre al si else");
      // $(".btnopcion").attr("data-toggle", "modal");
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
      console.log(radiobtn)
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
    console.log("entre al btnclose")
    window.location.href = "home.html";
    document.getElementById("capaFondo").style.visibility = "hidden";
    document.getElementById("capaFondo").style.width = "0";
    document.getElementById("capaFondo").style.height = "0";
  })


});

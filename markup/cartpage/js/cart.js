(function() {
    var plus = document.querySelector('.increase');
    var minus = document.querySelector('.decrease');
    var quantity = document.querySelector('.quantity-element');
    var total = document.querySelector('.tol');

    formm.addEventListener('submit', function(event) {
        event.preventDefault();
        formResult.innerHTML = '';


    })
})()

var p = 0;
    var b = 0;
    var c = 0;
    function calc() {
      var plus = document.getElementById("plus").value;
      var minus = document.getElementById('minus').value;
      var quantity = 1;
        if (plus == 'plus')
        quantity = plus + quantity;

        else 
        quantity = minus - quantity;

        document.getElementById("quantity").value=quantity;
    }

(function() {
	initLoginCheck();
})()

function initLoginCheck() {
	var email = "Yogeshshrestha845@gmail.com";
	var password = "123456";

	document.querySelector('.customer-login').addEventListener('submit', function(event) {
		event.preventDefault();

		var form = event.target;
		var emailInput = form.querySelector('[name=email]').value
		var passwordInput = form.querySelector('[name=password]').value

		if(email === emailInput && password === passwordInput) {

			document.querySelector('body').classList.add('modal-active');

			setTimeout(function() {
				document.querySelector('body').classList.remove('modal-active');
			}, 3000)
		} else {
			alert('username or password not valid')
		}
		console.log(emailInput, password)
	})
}



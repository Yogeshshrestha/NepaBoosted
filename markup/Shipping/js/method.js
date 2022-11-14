(function() {
    var form = document.querySelector('.shipping-form');
    var formResult = document.querySelector('#form-result ul');
    var loading = form.querySelector('.loading')

    loading.setAttribute('style', 'display: none;');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        formResult.innerHTML = '';

        loading.setAttribute('style', 'display: inline;');

        var formData = new FormData(form)

        formSubmit(formData)
        .then(function() {

            for(let [name, value] of formData) {
                var item = `<li><strong>${name}</strong><em>${value}</em></li></li>`
                // formResult.append(item)
                formResult.innerHTML += item;
            }
        })
        .catch(function(response) {
            Object.keys(response.errors).forEach(function(key) {
                var input = form.querySelector(`[name=${key}]`)
                var formGroup = input.closest('.form-group')
                var errorELem = formGroup.querySelector('.error-text');

                if(!errorELem) {
                    errorELem = document.createElement('span')
                    errorELem.classList.add('error-text');
                    formGroup.append(errorELem)
                }
                errorELem.innerHTML = response.errors[key]
            })
        })
        .finally(function() {
            loading.setAttribute('style', 'display: none;');
        })
    })

    form.addEventListener('reset', function(event) {
        formResult.innerHTML = '';
    });

    function formSubmit(formData) {
        var errors = {};
        var hasError = false;

        return new Promise(function(resolve, reject) {

            for(let [name, value] of formData) {
                if(!value) {
                    errors[name] = `${ name } field is required`
                    hasError = hasError || true
                } else {
                    hasError = false
                }
            }

            if(hasError)
                reject({ errors })

            setTimeout(function() {
                resolve({ message: 'success' });
            }, 3000)
        })
    }
})()
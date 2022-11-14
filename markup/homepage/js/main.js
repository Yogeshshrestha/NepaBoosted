(function() {
    initMobileNav();
})();

function initMobileNav() {
    var hasMenuOpened = false;
    var activeClass = 'nav-active';

    document.querySelectorAll('.mobile-opener').forEach(function(mobileOpener) {
        mobileOpener.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('test')

            if(hasMenuOpened) {
                document.querySelector('body').classList.remove(activeClass);
            } else {
                document.querySelector('body').classList.add(activeClass);
            }

            hasMenuOpened = !hasMenuOpened;
        });
    });
}

(function() {
    var form = document.querySelector('.contact-form');
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
                var item = `<p> Thank You ${value} for suscription!</p>`
                // formResult.append(item)
                formResult.innerHTML = item;
                
            }
        })
        .catch(function(response) {
            Object.keys(response.errors).forEach(function(key) {
                var input = form.querySelector(`[name=${key}]`)
                var formGroup = input.closest('.contact-input')
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

/*loading promises*/
    function formSubmit(formData) {
        var errors = {};
        var hasError = false;

        return new Promise(function(resolve, reject) {

            for(let [name, value] of formData) {
                if(!value) {
                    errors[name] = `${ name } field is required*`
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

/*pop out search*/
function openSearch() {
    document.getElementById("mySearch").style.display="block";
}

function closeSearch() {
    document.getElementById("mySearch").style.display="none";
}



/* navigation bar*/


// /*login js start*/
// (function() {
// 	initLoginCheck();
// })()

// function initLoginCheck() {
// 	var email = "Yogeshshrestha845@gmail.com";
// 	var password = "123456";

// 	document.querySelector('.customer-login').addEventListener('submit', function(event) {
// 		event.preventDefault();

// 		var form = event.target;
// 		var emailInput = form.querySelector('[name=email]').value
// 		var passwordInput = form.querySelector('[name=password]').value

// 		if(email === emailInput && password === passwordInput) {

// 			document.querySelector('body').classList.add('modal-active');

// 			setTimeout(function() {
// 				document.querySelector('body').classList.remove('modal-active');
// 			}, 3000)
// 		} else {
// 			alert('username or password not valid')
// 		}
// 		console.log(emailInput, password)
// 	})
// }
// /*login js end*/

//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//for search

// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = "https://www.google.com/search?q=" + userData;
            linkTag.setAttribute("href", webLink);
            console.log(webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = '<li>'+ data +'</li>';
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = "https://www.google.com/search?q=" + selectData;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

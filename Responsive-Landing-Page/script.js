window.addEventListener("scroll", function(){

    let navbar = document.getElementById("navbar");

    navbar.classList.toggle("scrolled", window.scrollY > 50);

});
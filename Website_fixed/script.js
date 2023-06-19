function updateImage() {
    var meinBild = document.getElementById("Titelbild");
    if (window.innerWidth <= 900) {
      meinBild.src = "Bilder/StartbildschirmHandy.png";
    } else {
      meinBild.src = "Bilder/Desktop.png";
    }
  }
  
  window.addEventListener("resize", updateImage);
  
  // JavaScript-Code für das Hinzufügen/Entfernen der Klasse navbar-collapsed
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('nav');
  var body = document.querySelector('body');

  if (window.innerWidth <= 600) {
      if (window.pageYOffset > navbar.offsetHeight) {
          navbar.classList.add('navbar-collapsed');
          body.classList.add('scroll-animation');
      } else {
          navbar.classList.remove('navbar-collapsed');
          body.classList.remove('scroll-animation');
      }

    }
    
    

});
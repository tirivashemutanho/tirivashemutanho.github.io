var button = document.getElementById("signup");

// Add a click event listener to the button
button.addEventListener("click", function() {
  // Open the desired webpage URL in a new tab/window
  window.open("index.html", "_blank");
});


//-----------------------------------------------------------------------------------------------

function showConfirmationMessage() {
    var message = "You have sign in first before viewing in shop"; // Replace with your desired message
    var confirmation = confirm(message);
  
    if (confirmation) {
      // User clicked "OK"
      alert("Proceed to sign in"); // Replace with your action for "OK"
    } else {
      // User clicked "Cancel"
      alert("Cancel"); // Replace with your action for "Cancel"
    }
  }
  
  // Call the function when a button is clicked (example)
  document.getElementById("signupfirst").addEventListener("click", showConfirmationMessage);

//---------------------------------------------------------------------------------------------------


$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });


  // Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  

// code for the cards


const arrowBtns = document.querySelectorAll('.arrow-btn');
const cardBtns = document.querySelectorAll('.card');
let currentCard = 2;
let dir = 1;
moveCards();

const applyPointerEffect = (btn, ease, shadow) => {
  btn.onpointerenter = () => gsap.to(btn, { ease, 'box-shadow': shadow });
  btn.onpointerleave = () => gsap.to(btn, { ease, 'box-shadow': '0 6px 8px #00000030' });
};

arrowBtns.forEach((btn, i) => {
  applyPointerEffect(btn, 'expo', '0 3px 4px #00000050');
  btn.onclick = () => {
    dir = (i == 0) ? 1 : -1;
    currentCard += (i === 0) ? -1 : 1;
    currentCard = Math.min(4, Math.max(0, currentCard));
    moveCards(0.75);
  };
});

cardBtns.forEach((btn, i) => {
  applyPointerEffect(btn, 'power3', () => (i === currentCard) ? '0 6px 11px #00000030' : '0 0px 0px #00000030');
  btn.onclick = () => {
    dir = (i < currentCard) ? 1 : -1;
    currentCard = i;
    moveCards(0.75);
  };
});

function moveCards(dur = 0) {
  gsap.timeline({ defaults: { duration: dur, ease: 'power3', stagger: { each: -0.03 * dir } } })
    .to('.card', {
      x: -270 * currentCard,
      y: (i) => (i === currentCard) ? 0 : 15,
      height: (i) => (i === currentCard) ? 270 : 240,
      ease: 'elastic.out(0.4)'
    }, 0)
    .to('.card', {
      cursor: (i) => (i === currentCard) ? 'default' : 'pointer',
      'box-shadow': (i) => (i === currentCard) ? '0 6px 11px #00000030' : '0 0px 0px #00000030',
      border: (i) => (i === currentCard) ? '2px solid #26a' : '0px solid #fff',
      background: (i) => (i === currentCard) ? 'radial-gradient(100% 100% at top, #fff 0%, #fff 99%)' : 'radial-gradient(100% 100% at top, #fff 20%, #eee 175%)',
      ease: 'expo'
    }, 0)
    .to('.icon svg', {
      attr: {
        stroke: (i) => (i === currentCard) ? 'transparent' : '#36a',
        fill: (i) => (i === currentCard) ? '#36a' : 'transparent'
      }
    }, 0)
    .to('.arrow-btn-prev, .arrow-btn-next', {
      autoAlpha: (i) => (i === 0 && currentCard === 0) || (i === 1 && currentCard === 4) ? 0 : 1
    }, 0)
    .to('.card h4', {
      y: (i) => (i === currentCard) ? 0 : 8,
      opacity: (i) => (i === currentCard) ? 1 : 0,
    }, 0);
}

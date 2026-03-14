document.getElementById('darkModeToggle').addEventListener('change', function() {
  const isChecked = this.checked;

  const elementsToInvert = [
    document.getElementById('frame-left'),
    document.getElementById('right-frame1'),
    document.getElementById('right-frame2'),
    document.getElementById('right-frame4'),
    document.getElementById('calendar'),
    document.getElementById('buttoncontainer')
  ];


  elementsToInvert.forEach(element => {
    if (isChecked) {
      element.style.filter = 'invert(1)';
      element.style.color = '#fff';
      

      if (element.id !== 'buttoncontainer') {
        element.style.backgroundColor = '#000';
      }
    } else {
      element.style.filter = 'invert(0)';
      element.style.color = '';
      element.style.backgroundColor = '';
    }
  });


  const buttonHoverStyles = document.styleSheets[0].cssRules;
  for (let i = 0; i < buttonHoverStyles.length; i++) {
    if (buttonHoverStyles[i].selectorText === '.button:hover') {
      if (isChecked) {
        buttonHoverStyles[i].style.backgroundColor = '#4C2908';
        buttonHoverStyles[i].style.color = '#fff';
      } else {
        buttonHoverStyles[i].style.backgroundColor = '#E9F3FB';
        buttonHoverStyles[i].style.color = '';
      }
      break;
    }
  }
});

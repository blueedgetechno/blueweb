var buttons = document.getElementsByTagName('button')

for (var i = 0; i < buttons.length; i++) {
  if(buttons[i].innerText=="Follow"){
    buttons[i].click()
  }
}

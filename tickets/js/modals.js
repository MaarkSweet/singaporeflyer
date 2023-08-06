// Первое окно
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Второе окно
var modalSecond = document.getElementById("myModalSecond");

var btnSecond = document.getElementById("myBtnSecond");

var spanSecond = document.getElementsByClassName("closeSecond")[0];

btnSecond.onclick = function() {
  modalSecond.style.display = "block";
}

spanSecond.onclick = function() {
  modalSecond.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalSecond) {
    modalSecond.style.display = "none";
  }
}
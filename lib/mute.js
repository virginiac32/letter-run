function mute() {
  if (document.getElementById("mute").className == "fas fa-volume-mute fa-2x") {
    document.getElementById("gamePlay").muted = true;
    document.getElementById("mute").className = "fas fa-volume-off fa-2x";
  } else {
    document.getElementById("gamePlay").muted = false;
    document.getElementById("mute").className = "fas fa-volume-mute fa-2x";
  }
}

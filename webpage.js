
// Element Getters
const timeline_col = document.getElementsByClassName("timeline-element-collapses");
const project_links = document.getElementsByClassName("project-link");
const project_modals = document.getElementsByClassName("project-modal");
const project_modal_close_buttons = document.getElementsByClassName("project-modal-close");

//Smooth Timeline Transition Animation Functions:
function collapseSection(element){
  var sectionHeight = element.scrollHeight;
  var elementTransition = element.style.transition;
  element.style.transition = '';
  //Restore clickability after transition ends
  element.addEventListener('transitionend', function(elem){
    element.removeEventListener('transitionend', arguments.callee);
    element.parentElement.style.pointerEvents = 'auto';
    element.parentElement.classList.toggle("timeline-element-transitioning");
  });

  requestAnimationFrame(function(){
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;

    requestAnimationFrame(function(){
      element.style.height = 0 + 'px';
    });
  });

  element.setAttribute('data-collapsed', 'true');

}

function expandSection(element){
  var sectionHeight = element.scrollHeight;
  element.style.height = sectionHeight+'px';
  //Restore clickability after transition ends
  element.addEventListener('transitionend', function(elem){
    element.removeEventListener('transitionend', arguments.callee);
    element.style.height = null;
    element.parentElement.style.pointerEvents = 'auto';
    element.parentElement.classList.toggle("timeline-element-transitioning");
  });
  element.setAttribute('data-collapsed', 'false');
}

// Collapsable Timeline elements
Array.from(timeline_col).forEach(elem => {
  //Collapse on page load
  elem.classList.toggle("timeline-element-transitioning");
  collapseSection(elem.querySelector(".timeline-collapsable"));
  // Add Click Event
  elem.addEventListener("click", function(){
    elem.style.pointerEvents = 'none'; //Prevent clicks to avoid animation errors
    elem.classList.toggle("timeline-element-active");
    elem.classList.toggle("timeline-element-transitioning");
    var content = elem.querySelector(".timeline-collapsable");
    var isCollapsed = content.getAttribute('data-collapsed') === 'true';
    if (!isCollapsed){
      collapseSection(content);
    }
    else{
      expandSection(content);
    }
  });
});


// Project Listeners
Array.from(project_links).forEach(elem =>{
  // Display Modem on click
  elem.addEventListener("click", function(){
    let modal = document.getElementById(elem.getAttribute("targetModal"));
    //Safegaurd to prevent multiple animations at once
    if(modal.getAttribute("animating") != "true"){
      const body = document.querySelector("body");
      // lock Scroll
      body.classList.toggle("modal-open");
      modal.setAttribute("animating", "true");
      modal.addEventListener("animationend", function(){
        modal.removeEventListener("animationend", arguments.callee);
        modal.setAttribute("animating", "false");
      });
      modal.style.display = "block";
    }
  });
  // Display title on hover
  elem.addEventListener("mouseenter", function(){
    elem.lastElementChild.classList.toggle("project-title-active")
  });
  elem.addEventListener("mouseleave", function(){
    elem.lastElementChild.classList.toggle("project-title-active")
  });
});

// Project Modal Listeners

// Close on clicking outside of modal
Array.from(project_modals).forEach(elem =>{
  window.onclick = function(event) {
  if (event.target == elem && elem.getAttribute("animating") != "true") {
    //Safegaurd to prevent multiple animations at once
    elem.setAttribute("animating", "true");
    // Restore Scroll
    const body = document.querySelector("body");
    body.classList.toggle("modal-open");
    // Close modal
    elem.classList.toggle("project-modal-closing");
    elem.firstElementChild.classList.toggle("project-modal-content-closing");
    elem.addEventListener("animationend", function(){
      elem.removeEventListener("animationend", arguments.callee);
      elem.style.display="none";
      elem.classList.toggle("project-modal-closing");
      elem.firstElementChild.classList.toggle("project-modal-content-closing");
      elem.setAttribute("animating", "false");
    });
  }
}
});

Array.from(project_modal_close_buttons).forEach(elem=>{
  elem.addEventListener("click", function(){
    let modal = elem.parentElement.parentElement.parentElement;
    if (modal.getAttribute("animating") != "true") {
      //Safegaurd to prevent multiple animations at once
      modal.setAttribute("animating", "true");
      // Restore Scroll
      const body = document.querySelector("body");
      body.classList.toggle("modal-open");
      // Close modal
      modal.classList.toggle("project-modal-closing");
      modal.firstElementChild.classList.toggle("project-modal-content-closing");
      modal.addEventListener("animationend", function(){
        modal.removeEventListener("animationend", arguments.callee);
        modal.style.display="none";
        modal.classList.toggle("project-modal-closing");
        modal.firstElementChild.classList.toggle("project-modal-content-closing");
        modal.setAttribute("animating", "false");
      });
    }
  });
});

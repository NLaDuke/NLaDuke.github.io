
// Element Getters
const timeline_col = document.getElementsByClassName("timeline-element-collapses");

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

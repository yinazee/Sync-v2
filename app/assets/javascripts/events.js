
$(function() {
  console.log('event.js is loaded...')
  listenForNewAjaxEventClick()
  getEvent()
});


//AJAX LINK For New Form//
function listenForNewAjaxEventClick() {
  $('#ajax-new-event').on('click', function(event) {
    event.preventDefault()
    $('#new-event-modal').modal('show');
  });
}

function getEvent() {
  // $(function() {
  $("#ajax-events").on("click", function(e){
  console.log('you just hit the next level')

    $.ajax({
     method: "GET",
     url: `${this.href}.json`
    }).done(function(response){
      console.log('the data is: ', response)
      debugger
      response.events.map(event => {
        const newEvent = new Event(event)
        const newEventHtml = newEvent.postHTML()
        document.getElementById('ajax-event').innerHTML += myEventHtml
      })

    })
   e.preventDefault()
  })
// });
}

class Event {
  constructor(obj) {
    // debugger
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
  };

  static newEventData() {
    return(`
      <strong>New Event</strong>
      <div>
      <h3>${this.name}</h3>
      <p>${this.description}</p>
      </div>
    `)
  };
}

// Post.prototype.postHTML = function () {
// 	let postComments = this.comments.map(comment => {
// 		return (`
// 			<p>${comment.content}</p>
// 		`)
// 	}).join('')
//
// 	return (`
// 		<div class='post'>
// 			<h3>${this.title}</h3>
// 			<p>${this.content}</p>
// 			<p>${postComments}</p>
// 		</div>
// 	`)
// }


//
// add event listenr to
// 1. ajax link - should show modal ( $('#new-event-modal').modal('show') )
// 2. form submittion - submit in background and update UI with result - preventDefault action on the submit
// do not render, new event should be on modal popup
// preventDefault
// insert data into dom
// ajax - use data on the show page. use json

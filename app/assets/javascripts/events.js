

$(function() {
  console.log('event.js is loaded...')
  // listenForClick()
  listenForAjaxEventClick()
});



function getEvents() {
  $.ajax({
    url: `http://localhost:3000/users/${current_user.id}/events`,
    method: 'get',
    dataType: 'json'
  }).done(function(data) {

    console.log("the data is: ", data)
    let myEvent = new Event(data[0])
    let myEventHtml = myEvent.eventHTML()
    document.getElementById('ajax-events').innerHTML += myEventHTML
  })
}


class Event {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.host = obj.host
    this.description = obj.description
    // this.host.user.id = obj.user.id
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
};

// Submit - preventDefault//
function newEventFormSubmit() {
  $('link_to#ajax-new-event').on('click', function(event) {
    event.preventDefault()
    let newEvent = Event.newEventForm()
    // debugger
  })
}

//AJAX LINK For New Form//
function listenForAjaxEventClick() {
  $('#ajax-new-event').on('click', function(event) {
    event.preventDefault()
    $('#new-event-modal').modal('show');
  });
}

//
// add event listenr to
// 1. ajax link - should show modal ( $('#new-event-modal').modal('show') )
// 2. form submittion - submit in background and update UI with result - preventDefault action on the submit
// do not render, new event should be on modal popup
// preventDefault
// insert data into dom
// ajax - use data on the show page. use json

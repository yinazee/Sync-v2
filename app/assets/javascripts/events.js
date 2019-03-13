
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

// function listenForEvent() {
//   $('.ajax-event').on('click', function(event) {
//     console.log('you just hit event')
//     event.preventDefault()
//     getEvent()
// });
// };

function getEvent() {
  $(function() {
  $("a.ajax-event").on("click", function(e){
  console.log('you just hit the next level')

    $.ajax({
     method: "GET",
     url: `${this.href}.json`
    }).done(function(response){
      console.log('the data is: ', response)
      debugger
      let myEvent = new Event(response[4])
      //       let myEventHtml = newEvent.eventHTML()
      //       document.getElementById('ajax-event').innerHTML += myEventHtml
    })
   e.preventDefault()
  })
});
}

  // var current_user = $('(not sure what to put here)').val()
  // var current_event = $('not sure what to put here').val()
  // $.ajax({
  //   url: 'http://localhost:3000/users/' + current_user + '/events/' + 'current_event',
  //   method: 'get',
  //   dataType: 'json'
  // }).done(function (data) {
  //   console.log('the data is accessed', data)
  //   debugger
  //     console.log("the data is: ", data)
  //       let myEvent = new Event(data[0])
  //       let myEventHtml = newEvent.eventHTML()
  //       document.getElementById('ajax-event').innerHTML += myEventHtml
  //   })
  // }


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
//

//
// add event listenr to
// 1. ajax link - should show modal ( $('#new-event-modal').modal('show') )
// 2. form submittion - submit in background and update UI with result - preventDefault action on the submit
// do not render, new event should be on modal popup
// preventDefault
// insert data into dom
// ajax - use data on the show page. use json

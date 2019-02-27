

$(function() {
  console.log('event.js is loaded...')
  listenForClick()
});

function listenForClick() {
  $('button#events-data').on('click', function(event) {
    event.preventDefault()
    getEvents()
  })

  function getEvents() {
    // var current_user = ${@current_user.id}
  $.ajax({
    url: 'http://localhost:3000/users/2/events',
    method: 'get',
    dataType: 'json'
  }).done(function(data) {

    console.log("the data is: ", data)
    debugger
    let myEvent = new Event(data[0])
    let myEventHtml = myEvent.eventHTML()
    document.getElementById('ajax-events').innerHTML += myEventHTML
  })
}

}
class Event {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.host = obj.host
    this.description = obj.description
  }
}


Event.prototype.newEventForm = function() {
   (`
  <strong>New Event</strong>
  <form>
    <input id='event-name' type='text' name='name'></input><br>
    <input type='text' name='description'></input><br>
    <input type='submit'/>
    </form>
  `)
}

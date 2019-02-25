function listenForClick() {
  $('button#post-data').on('click', function(event) {
    event.preventDefault()
    getEvent()
  })

  Function getEvents() {
  $.ajax({
    url: 'http://localhost:3000/users/2/events',
    method: 'get'
    type: 'json'
  }).done(function(data) {

    console.log("the data is: ", data)
    debugger
    let myEvent = new Event(data[0])
    let myEventHtml = myEvent.eventHTML()
    document.getElementById('ajax-post').innerHTML += myEventHTML
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

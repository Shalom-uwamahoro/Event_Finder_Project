const apiKey = 'xCVvAJSve3E08MZ6dNepSezkRNCFgOeU';
const button = document.getElementById('searchButton');
const eventsContainer = document.getElementById('eventsContainer');
// const city = document.getElementById('locationInput').value;
const getEvents = () => {
    const city = document.getElementById('locationInput').value;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}`;
    eventsContainer.innerHTML = '<div class="loading-message">Fetching events...</div>';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not okay:' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            eventsContainer.innerHTML = '';
            if (data._embedded) {
                const events = data._embedded.events;
                events.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.classList.add('event');
                    const date = new Date(event.dates.start.dateTime).toLocaleString();
                    const imageUrl = event.images ? event.images[0].url : 'https://picsum.photos/200';
                    eventElement.innerHTML = `
                        <div class="event-image">
                            <img src="${imageUrl}" alt="${event.name}">
                        </div>
                        <div class="event-details">
                            <h4 class="event_title">${event.name}</h4>
                            <p>Date: ${date}</p>
                            <p>Venue: ${event._embedded.venues[0].name}</p>
                            <a href="${event.url}" target="_blank" class="event_link">Get Tickets</a>
                        </div>
                    `;
                    eventsContainer.appendChild(eventElement);
                });
            } else {
                eventsContainer.innerHTML = '<div class="loading-message">No events found!</div>';
            }
        })
        .catch(error => {
            console.error('Something went wrong', error);
            eventsContainer.innerHTML = '<div class="loading-message">Failed to fetch events</div>';
        });
};
button.addEventListener('click', getEvents);
// Our default events
function displayAllEvents() {
    const defaultCity = 'New York';
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${defaultCity}`;
    fetch(url)
     .then(response => response.json())
     .then(data => {
        console.log(getEvents(data._embedded));
      })
     .catch(error => {
        console.error('Check your internet connection:', error);
      });
  }
  document.addEventListener('DOMContentLoaded', () => {
    displayAllEvents();
  });


const clearInput= document.getElementById("locationInput");
clearInput.addEventListener("keydown", function(){
      displayAllEvents()
});













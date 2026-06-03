// ---------- DATA (5 Hotels / 5 Flights) ----------
const hotelsData = [
  { id: 1, name: "The Grand Plaza", location: "New York", pricePerNight: 289, rating: 4.8, image: "https://picsum.photos/id/104/400/240", amenities: "Downtown view • Rooftop bar" },
  { id: 2, name: "Coastal Breeze Resort", location: "Miami", pricePerNight: 215, rating: 4.6, image: "https://picsum.photos/id/28/400/240", amenities: "Beachfront • Poolside cabanas" },
  { id: 3, name: "Mountain Edge Lodge", location: "Denver", pricePerNight: 198, rating: 4.7, image: "https://picsum.photos/id/29/400/240", amenities: "Ski-in/ski-out • Firepit" },
  { id: 4, name: "Sunset Oasis", location: "Los Angeles", pricePerNight: 169, rating: 4.4, image: "https://picsum.photos/id/96/400/240", amenities: "Rooftop pool • City views" },
  { id: 5, name: "Parisian Charm", location: "Paris", pricePerNight: 342, rating: 4.9, image: "https://picsum.photos/id/106/400/240", amenities: "Eiffel view • Boutique style" }
];

const flightsData = [
  { id: 101, airline: "Skybound Airlines", from: "New York", to: "Los Angeles", departure: "08:00 AM", arrival: "11:15 AM", price: 329, duration: "6h 15m", image: "https://picsum.photos/id/153/400/240" },
  { id: 102, airline: "Horizon Air", from: "Chicago", to: "Miami", departure: "10:30 AM", arrival: "02:10 PM", price: 259, duration: "3h 40m", image: "https://picsum.photos/id/143/400/240" },
  { id: 103, airline: "StarLux", from: "New York", to: "Paris", departure: "09:45 PM", arrival: "11:20 AM (+1)", price: 689, duration: "8h 35m", image: "https://picsum.photos/id/220/400/240" },
  { id: 104, airline: "Pacific Wings", from: "Los Angeles", to: "Las Vegas", departure: "07:15 AM", arrival: "08:30 AM", price: 119, duration: "1h 15m", image: "https://picsum.photos/id/250/400/240" },
  { id: 105, airline: "Denver Connect", from: "Denver", to: "Chicago", departure: "04:20 PM", arrival: "07:40 PM", price: 199, duration: "2h 20m", image: "https://picsum.photos/id/239/400/240" }
];

const dealsData = [
  { type: "hotel", name: "The Grand Plaza", original: 289, discounted: 219, location: "New York", image: "https://picsum.photos/id/104/400/240", saving: "24% off" },
  { type: "flight", airline: "Skybound Airlines", route: "New York → Los Angeles", original: 329, discounted: 249, image: "https://picsum.photos/id/153/400/240", saving: "$80 off" },
  { type: "hotel", name: "Sunset Oasis", original: 169, discounted: 129, location: "Los Angeles", image: "https://picsum.photos/id/96/400/240", saving: "23% off" },
  { type: "flight", airline: "StarLux", route: "New York → Paris", original: 689, discounted: 529, image: "https://picsum.photos/id/220/400/240", saving: "$160 off" },
  { type: "hotel", name: "Mountain Edge Lodge", original: 198, discounted: 159, location: "Denver", image: "https://picsum.photos/id/29/400/240", saving: "20% off" }
];

const destinations = [
  { name: "Bali, Indonesia", image: "https://picsum.photos/id/15/400/240", description: "Tropical paradise, rice terraces & beaches", price: "from $499" },
  { name: "Santorini, Greece", image: "https://picsum.photos/id/18/400/240", description: "Whitewashed cliffs & Aegean sunsets", price: "from $659" },
  { name: "Kyoto, Japan", image: "https://picsum.photos/id/21/400/240", description: "Temples, cherry blossoms & culture", price: "from $789" },
  { name: "Cape Town, South Africa", image: "https://picsum.photos/id/42/400/240", description: "Table Mountain & coastlines", price: "from $549" },
  { name: "Reykjavík, Iceland", image: "https://picsum.photos/id/54/400/240", description: "Northern lights & hot springs", price: "from $399" },
  { name: "Machu Picchu, Peru", image: "https://picsum.photos/id/60/400/240", description: "Ancient Incan citadel", price: "from $879" }
];

// DOM elements
const hotelModeBtn = document.getElementById('hotelModeBtn');
const flightModeBtn = document.getElementById('flightModeBtn');
const hotelFieldsDiv = document.getElementById('hotelFields');
const flightFieldsDiv = document.getElementById('flightFields');
const searchHotelBtn = document.getElementById('searchBtn');
const searchFlightBtn = document.getElementById('flightSearchBtn');
const resultsContainer = document.getElementById('resultsContainer');
const resultsTitle = document.getElementById('resultsTitle');

let currentMode = 'hotel';

function setDefaultDates() {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const checkin = document.getElementById('checkinDate');
  const checkout = document.getElementById('checkoutDate');
  const depart = document.getElementById('departDate');
  const ret = document.getElementById('returnDate');
  if (checkin && !checkin.value) checkin.value = today;
  if (checkout && !checkout.value) checkout.value = tomorrow;
  if (depart && !depart.value) depart.value = today;
  if (ret && !ret.value) ret.value = tomorrow;
}

function renderHotels(hotelsArray) {
  if (!hotelsArray.length) {
    resultsContainer.innerHTML = `<div class="no-results"><i class="fas fa-map-marker-alt fa-2x"></i><p style="margin-top:12px;">No hotels found. Try another destination ✈️</p></div>`;
    return;
  }
  resultsContainer.innerHTML = hotelsArray.map(hotel => `
    <div class="card">
      <div class="card-img" style="background-image: url('${hotel.image}');"></div>
      <div class="card-content">
        <div class="card-title">${hotel.name}</div>
        <div class="card-details"><i class="fas fa-location-dot"></i> ${hotel.location} &nbsp;| <span class="badge"><i class="fas fa-star"></i> ${hotel.rating}</span></div>
        <div class="price">$${hotel.pricePerNight} <small>/ night</small></div>
        <div class="card-details"><i class="fas fa-umbrella-beach"></i> ${hotel.amenities}</div>
        <button class="book-btn" data-type="hotel" data-name="${hotel.name}" data-price="${hotel.pricePerNight}"><i class="fas fa-calendar-check"></i> Book Now</button>
      </div>
    </div>
  `).join('');
  attachBookEvents();
}

function renderFlights(flightsArray, passengers = 1) {
  if (!flightsArray.length) {
    resultsContainer.innerHTML = `<div class="no-results"><i class="fas fa-plane-slash fa-2x"></i><p style="margin-top:12px;">No flights match your route.</p></div>`;
    return;
  }
  resultsContainer.innerHTML = flightsArray.map(flight => {
    const totalPrice = flight.price * (passengers || 1);
    return `
      <div class="card">
        <div class="card-img" style="background-image: url('${flight.image}');"></div>
        <div class="card-content">
          <div class="card-title">${flight.airline}</div>
          <div class="card-details"><i class="fas fa-map-pin"></i> ${flight.from} → ${flight.to}</div>
          <div class="card-details"><i class="fas fa-clock"></i> Depart ${flight.departure} • Arrive ${flight.arrival}</div>
          <div class="price">$${totalPrice} <small>total for ${passengers} traveller${passengers > 1 ? 's' : ''}</small></div>
          <button class="book-btn" data-type="flight" data-airline="${flight.airline}" data-route="${flight.from} to ${flight.to}" data-price="${totalPrice}"><i class="fas fa-ticket-alt"></i> Reserve Flight</button>
        </div>
      </div>
    `;
  }).join('');
  attachBookEvents();
}

function attachBookEvents() {
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.removeEventListener('click', handleBooking);
    btn.addEventListener('click', handleBooking);
  });
}

function handleBooking(e) {
  const btn = e.currentTarget;
  if (btn.dataset.type === 'hotel') {
    const guests = document.getElementById('guestsCount') ? document.getElementById('guestsCount').value : 1;
    alert(`✨ Hotel booked! ✨\n🏨 ${btn.dataset.name}\n💰 $${btn.dataset.price} per night x ${guests} guest(s)\n📅 Check-in/out selected. Enjoy your stay!`);
  } else if (btn.dataset.type === 'flight') {
    alert(`✈️ Flight Reserved!\n${btn.dataset.airline} · ${btn.dataset.route}\n💵 Total: $${btn.dataset.price}\nYou'll receive e-ticket shortly. Happy travels!`);
  } else {
    alert(`🌴 Explore ${btn.dataset.name}!\nCheck live prices on next screen.`);
  }
}

function searchHotels() {
  const dest = document.getElementById('hotelDest').value.trim().toLowerCase();
  const filtered = dest ? hotelsData.filter(h => h.location.toLowerCase().includes(dest) || h.name.toLowerCase().includes(dest)) : hotelsData;
  resultsTitle.innerText = filtered.length ? `🏨 ${filtered.length} hotel(s) in "${document.getElementById('hotelDest').value || 'all'}"` : `🏨 No hotels found`;
  renderHotels(filtered);
}

function searchFlights() {
  const fromCity = document.getElementById('flightFrom').value.trim().toLowerCase();
  const toCity = document.getElementById('flightTo').value.trim().toLowerCase();
  const passengers = parseInt(document.getElementById('passengersCount').value) || 1;
  let filtered = [...flightsData];
  if (fromCity) filtered = filtered.filter(f => f.from.toLowerCase().includes(fromCity));
  if (toCity) filtered = filtered.filter(f => f.to.toLowerCase().includes(toCity));
  resultsTitle.innerText = filtered.length ? `✈️ ${filtered.length} flights available` : `✈️ No flights`;
  renderFlights(filtered, passengers);
}

function setMode(mode) {
  currentMode = mode;
  if (mode === 'hotel') {
    hotelFieldsDiv.style.display = 'block';
    flightFieldsDiv.style.display = 'none';
    hotelModeBtn.classList.add('active');
    flightModeBtn.classList.remove('active');
    searchHotels();
  } else {
    hotelFieldsDiv.style.display = 'none';
    flightFieldsDiv.style.display = 'block';
    flightModeBtn.classList.add('active');
    hotelModeBtn.classList.remove('active');
    searchFlights();
  }
}

function renderDeals() {
  const dealsContainer = document.getElementById('dealsContainer');
  dealsContainer.innerHTML = dealsData.map(deal => `
    <div class="card">
      <div class="card-img" style="background-image: url('${deal.image}');"></div>
      <div class="card-content">
        <div class="card-title">${deal.type === 'hotel' ? deal.name : deal.airline}</div>
        <div class="card-details">${deal.type === 'hotel' ? deal.location : deal.route}</div>
        <div class="price"><span style="text-decoration: line-through; font-size:18px;">$${deal.original}</span> → <span style="color:#e67e22;">$${deal.discounted}</span> <small>${deal.saving}</small></div>
        <button class="book-btn" data-type="${deal.type}" data-name="${deal.name || deal.airline}" data-price="${deal.discounted}" data-airline="${deal.airline || ''}" data-route="${deal.route || ''}"><i class="fas fa-gift"></i> Grab Deal</button>
      </div>
    </div>
  `).join('');
  attachBookEvents();
}

function renderDestinations() {
  const destContainer = document.getElementById('destinationsContainer');
  destContainer.innerHTML = destinations.map(d => `
    <div class="card">
      <div class="card-img" style="background-image: url('${d.image}');"></div>
      <div class="card-content">
        <div class="card-title">${d.name}</div>
        <div class="card-details">${d.description}</div>
        <div class="price">${d.price} <small>/ avg flight+hotel</small></div>
        <button class="book-btn" data-type="destination" data-name="${d.name}"><i class="fas fa-heart"></i> Explore</button>
      </div>
    </div>
  `).join('');
  attachBookEvents();
}

// Contact form handler
document.getElementById('sendContactBtn')?.addEventListener('click', () => {
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const msg = document.getElementById('contactMsg').value;
  if (!name || !email || !msg) alert('Please fill all fields.');
  else alert(`Thanks ${name}! We’ll reply within 24h.`);
});

// PAGE NAVIGATION
const pages = {
  home: document.getElementById('homePage'),
  deals: document.getElementById('dealsPage'),
  destinations: document.getElementById('destinationsPage'),
  contact: document.getElementById('contactPage')
};
const navLinks = document.querySelectorAll('.nav-link');
function showPage(pageId) {
  Object.values(pages).forEach(p => p.classList.remove('active-page'));
  pages[pageId].classList.add('active-page');
  navLinks.forEach(link => {
    if (link.dataset.page === pageId) link.classList.add('active');
    else link.classList.remove('active');
  });
  if (pageId === 'deals') renderDeals();
  if (pageId === 'destinations') renderDestinations();
  if (pageId === 'home' && currentMode === 'hotel') searchHotels();
  if (pageId === 'home' && currentMode === 'flight') searchFlights();
}
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});
document.getElementById('logoHome')?.addEventListener('click', () => showPage('home'));

// Initialize
setDefaultDates();
setMode('hotel');
showPage('home');

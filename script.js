// ======================
// MOBILE MENU
// ======================

const menuBtn =
document.getElementById('menuBtn');

const nav =
document.getElementById('nav');

if(menuBtn){

menuBtn.onclick = () => {

nav.classList.toggle('active');

}

}

// ======================
// DARK LIGHT MODE
// ======================

const themeBtn =
document.getElementById('themeBtn');

if(themeBtn){

themeBtn.onclick = () => {

document.body.classList.toggle('light');

// Save Theme

if(document.body.classList.contains('light')){

localStorage.setItem(
'theme',
'light'
);

}else{

localStorage.setItem(
'theme',
'dark'
);

}

}

}

// Load Theme

if(localStorage.getItem('theme') == 'light'){

document.body.classList.add('light');

}

// ======================
// BOOKING FORM SAVE
// ======================

const bookingForm =
document.getElementById('bookingForm');

if(bookingForm){

bookingForm.addEventListener('submit', function(e){

e.preventDefault();

// Save Booking Data

localStorage.setItem(
'customerName',
document.getElementById('name').value
);

localStorage.setItem(
'customerMobile',
document.getElementById('mobile').value
);

localStorage.setItem(
'customerService',
document.getElementById('service').value
);

localStorage.setItem(
'customerDate',
document.getElementById('date').value
);

alert("Booking Saved");

window.location.href =
"payment.html";

});

}

// ======================
// RAZORPAY PAYMENT
// ======================

const payBtn =
document.getElementById('payBtn');

if(payBtn){

payBtn.onclick = function(){

let name =
localStorage.getItem('customerName');

let mobile =
localStorage.getItem('customerMobile');

let service =
localStorage.getItem('customerService');

let date =
localStorage.getItem('customerDate');

var options = {

key: "rzp_live_SoteNW5NPB4rM2",

amount: 100,

currency: "INR",

name: "S.k Photo Garafi",

description: "Photography Booking",

handler: function (response){

let bookings =
JSON.parse(localStorage.getItem('bookings')) || [];

// Save Booking

bookings.push({

name:name,

mobile:mobile,

service:service,

date:date,

payment:"Paid",

paymentId:
response.razorpay_payment_id

});

localStorage.setItem(
'bookings',
JSON.stringify(bookings)
);

alert("Payment Successful");

window.location.href =
"login.html";

}

};

var rzp =
new Razorpay(options);

rzp.open();

}

}

// ======================
// ADMIN LOGIN
// ======================

const loginForm =
document.getElementById('loginForm');

if(loginForm){

loginForm.addEventListener('submit', function(e){

e.preventDefault();

let username =
document.getElementById('username').value;

let password =
document.getElementById('password').value;

// Login Check

if(username == "Shrikant" &&
password == "SK625693"){

localStorage.setItem(
'adminLogin',
'true'
);

alert("Login Successful");

window.location.href =
"admin.html";

}else{

alert("Wrong Username or Password");

}

});

}

// ======================
// ADMIN TABLE
// ======================

const bookingTable =
document.getElementById('bookingTable');

const totalBookings =
document.getElementById('totalBookings');

const totalPayments =
document.getElementById('totalPayments');

if(bookingTable){

let bookings =
JSON.parse(localStorage.getItem('bookings')) || [];

function loadBookings(){

bookingTable.innerHTML = "";

let total = 0;

bookings.forEach((item,index)=>{

total += 1;

bookingTable.innerHTML += `

<tr>

<td>${item.name}</td>

<td>${item.mobile}</td>

<td>${item.service}</td>

<td>${item.date}</td>

<td>${item.payment}</td>

<td>${item.paymentId || "N/A"}</td>

<td>

<button onclick="deleteBooking(${index})">

Delete

</button>

</td>

</tr>

`;

});

// Total Summary

if(totalBookings){

totalBookings.innerHTML =
bookings.length;

}

if(totalPayments){

totalPayments.innerHTML =
"₹" + total;

}

}

loadBookings();

// Delete Booking

window.deleteBooking = function(index){

let confirmDelete =
confirm("Delete This Booking?");

if(confirmDelete){

bookings.splice(index,1);

localStorage.setItem(
'bookings',
JSON.stringify(bookings)
);

loadBookings();

}

}

}

// ======================
// LOGOUT
// ======================

function logout(){

localStorage.removeItem(
'adminLogin'
);

window.location.href =
"login.html";

}

// ======================
// LANGUAGE CHANGE
// ======================

function setLanguage(lang){

localStorage.setItem(
'language',
lang
);

alert("Language Changed To " + lang);

}

// ======================
// CONTACT FORM
// ======================

const contactForm =
document.getElementById('contactForm');

if(contactForm){

contactForm.addEventListener('submit', function(e){

e.preventDefault();

alert("Message Sent Successfully");

contactForm.reset();

});

}
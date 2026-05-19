// =====================================
// WEBSITE MAIN JAVASCRIPT
// S.k Photo Garafi
// =====================================

// =====================================
// MOBILE MENU
// =====================================

const menuBtn =
document.getElementById("menuBtn");

const nav =
document.getElementById("nav");

if(menuBtn && nav){

menuBtn.addEventListener("click", ()=>{

nav.classList.toggle("active");

});

}

// =====================================
// DARK / LIGHT MODE
// =====================================

const themeBtn =
document.getElementById("themeBtn");

// Load Saved Theme

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "light"){

document.body.classList.add("light");

}

if(themeBtn){

themeBtn.addEventListener("click", ()=>{

document.body.classList.toggle("light");

// Save Theme

if(document.body.classList.contains("light")){

localStorage.setItem(
"theme",
"light"
);

}else{

localStorage.setItem(
"theme",
"dark"
);

}

});

}

// =====================================
// LANGUAGE SYSTEM
// =====================================

function setLanguage(lang){

localStorage.setItem(
"language",
lang
);

alert(
"Language Changed To " + lang
);

}

// =====================================
// BOOKING FORM
// =====================================

const bookingForm =
document.getElementById("bookingForm");

if(bookingForm){

bookingForm.addEventListener("submit",(e)=>{

e.preventDefault();

// Input Values

let name =
document.getElementById("name").value.trim();

let mobile =
document.getElementById("mobile").value.trim();

let date =
document.getElementById("date").value;

let service =
document.getElementById("service").value;

// Validation

if(name === "" ||
mobile === "" ||
date === "" ||
service === ""){

alert("Please Fill All Fields");

return;

}

// Mobile Validation

if(mobile.length < 10){

alert("Enter Valid Mobile Number");

return;

}

// Save Booking Data

localStorage.setItem(
"customerName",
name
);

localStorage.setItem(
"customerMobile",
mobile
);

localStorage.setItem(
"customerDate",
date
);

localStorage.setItem(
"customerService",
service
);

alert("Booking Saved Successfully");

window.location.href =
"payment.html";

});

}

// =====================================
// SERVICE PRICE SYSTEM
// =====================================

function getServiceAmount(service){

let amount = 499;

if(service === "Wedding Shoot"){

amount = 4999;

}

else if(service === "Birthday Shoot"){

amount = 1999;

}

else if(service === "Couple Shoot"){

amount = 2999;

}

else if(service === "Baby Shoot"){

amount = 1499;

}

else if(service === "Pre Wedding"){

amount = 6999;

}

return amount;

}

// =====================================
// PAYMENT SYSTEM
// =====================================

const payBtn =
document.getElementById("payBtn");

if(payBtn){

payBtn.addEventListener("click", ()=>{

// Get Booking Data

let name =
localStorage.getItem("customerName");

let mobile =
localStorage.getItem("customerMobile");

let date =
localStorage.getItem("customerDate");

let service =
localStorage.getItem("customerService");

// Check Booking

if(!name || !mobile){

alert("Please Complete Booking First");

window.location.href =
"booking.html";

return;

}

// Auto Amount Detect

let amount =
getServiceAmount(service);

// Razorpay Options

let options = {

key:"rzp_live_SoteNW5NPB4rM2",

amount:amount * 100,

currency:"INR",

name:"S.k Photo Garafi",

description:service,

handler:function(response){

// Existing Bookings

let bookings =
JSON.parse(
localStorage.getItem("bookings")
) || [];

// Save Booking

bookings.push({

name:name,

mobile:mobile,

date:date,

service:service,

amount:amount,

payment:"Paid",

paymentId:
response.razorpay_payment_id

});

// Save Bookings

localStorage.setItem(
"bookings",
JSON.stringify(bookings)
);

// Save Payment Slip Data

localStorage.setItem(
"lastPaymentId",
response.razorpay_payment_id
);

localStorage.setItem(
"lastAmount",
amount
);

alert("Payment Successful");

// Redirect Slip Page

window.location.href =
"paymentslip.html";

},

theme:{
color:"#ffcc00"
}

};

// Open Razorpay

let rzp =
new Razorpay(options);

rzp.open();

});

}

// =====================================
// PAYMENT SLIP PAGE
// =====================================

// Elements

const slipName =
document.getElementById("slipName");

const slipMobile =
document.getElementById("slipMobile");

const slipService =
document.getElementById("slipService");

const slipDate =
document.getElementById("slipDate");

const totalAmount =
document.getElementById("totalAmount");

const paidAmount =
document.getElementById("paidAmount");

const dueAmount =
document.getElementById("dueAmount");

const slipPaymentId =
document.getElementById("slipPaymentId");

// Get Local Data

let customerName =
localStorage.getItem("customerName") || "N/A";

let customerMobile =
localStorage.getItem("customerMobile") || "N/A";

let customerService =
localStorage.getItem("customerService") || "N/A";

let customerDate =
localStorage.getItem("customerDate") || "N/A";

let paymentId =
localStorage.getItem("lastPaymentId") || "N/A";

let paidPrice =
Number(
localStorage.getItem("lastAmount")
) || 0;

// Total Price

let totalPrice =
getServiceAmount(customerService);

// Due Price

let duePrice =
totalPrice - paidPrice;

// Show Data

if(slipName){

slipName.innerText =
customerName;

}

if(slipMobile){

slipMobile.innerText =
customerMobile;

}

if(slipService){

slipService.innerText =
customerService;

}

if(slipDate){

slipDate.innerText =
customerDate;

}

if(totalAmount){

totalAmount.innerText =
"₹" + totalPrice;

}

if(paidAmount){

paidAmount.innerText =
"₹" + paidPrice;

}

if(dueAmount){

dueAmount.innerText =
"₹" + duePrice;

}

if(slipPaymentId){

slipPaymentId.innerText =
paymentId;

}

// Download Slip

function downloadSlip(){

window.print();

}

// =====================================
// ADMIN LOGIN
// =====================================

const loginForm =
document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",(e)=>{

e.preventDefault();

let username =
document.getElementById("username").value.trim();

let password =
document.getElementById("password").value.trim();

// Login Validation

if(username === "Shreekant@62" &&
password === "SK625693"){

localStorage.setItem(
"adminLogin",
"true"
);

alert("Login Successful");

window.location.href =
"admin.html";

}else{

alert("Wrong Username Or Password");

}

});

}

// =====================================
// ADMIN SECURITY
// =====================================

if(window.location.pathname.includes("admin.html")){

if(localStorage.getItem("adminLogin") !== "true"){

window.location.href =
"login.html";

}

}

// =====================================
// ADMIN PANEL TABLE
// =====================================

const bookingTable =
document.getElementById("bookingTable");

const totalBookings =
document.getElementById("totalBookings");

const totalPayments =
document.getElementById("totalPayments");

if(bookingTable){

let bookings =
JSON.parse(
localStorage.getItem("bookings")
) || [];

function loadBookings(){

bookingTable.innerHTML = "";

let total = 0;

// Empty Data

if(bookings.length === 0){

bookingTable.innerHTML = `

<tr>

<td colspan="7">

No Bookings Found

</td>

</tr>

`;

}

// Show Data

bookings.forEach((item,index)=>{

total += Number(item.amount);

bookingTable.innerHTML += `

<tr>

<td>${item.name}</td>

<td>${item.mobile}</td>

<td>${item.service}</td>

<td>${item.date}</td>

<td>₹${item.amount}</td>

<td>${item.payment}</td>

<td>

<button onclick="deleteBooking(${index})">

Delete

</button>

</td>

</tr>

`;

});

// Summary

if(totalBookings){

totalBookings.innerText =
bookings.length;

}

if(totalPayments){

totalPayments.innerText =
"₹" + total;

}

}

// Load Table

loadBookings();

// Delete Booking

window.deleteBooking = function(index){

let confirmDelete =
confirm("Delete Booking?");

if(confirmDelete){

bookings.splice(index,1);

localStorage.setItem(
"bookings",
JSON.stringify(bookings)
);

loadBookings();

}

}

}

// =====================================
// LOGOUT
// =====================================

function logout(){

localStorage.removeItem(
"adminLogin"
);

alert("Logout Successful");

window.location.href =
"login.html";

}

// =====================================
// CONTACT FORM
// =====================================

const contactForm =
document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Message Sent Successfully");

contactForm.reset();

});

}

// =====================================
// LIVE CHAT PAGE
// =====================================

const chatForm =
document.getElementById("chatForm");

const chatArea =
document.getElementById("chatArea");

if(chatForm && chatArea){

chatForm.addEventListener("submit",(e)=>{

e.preventDefault();

let chatInput =
document.getElementById("chatInput");

let message =
chatInput.value.trim();

// Empty Check

if(message === ""){

return;

}

// User Message

chatArea.innerHTML += `

<div class="chat-message user">

<p>${message}</p>

</div>

`;

// Auto Scroll

chatArea.scrollTop =
chatArea.scrollHeight;

// Auto Reply

setTimeout(()=>{

chatArea.innerHTML += `

<div class="chat-message admin">

<p>

Thank you 😊
We will contact you soon.

</p>

</div>

`;

chatArea.scrollTop =
chatArea.scrollHeight;

},1000);

// Clear Input

chatInput.value = "";

});

}
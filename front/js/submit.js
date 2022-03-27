let Input = ["firstName", "lastName", "address", "city", "email"];
let fields = ["First Name", "Last Name", "Address", "City", "Email"]
let x = false;
const validate = () => {
    if (x == false {
    Input.forEach(i => {
        if (i == "") {
            let idx = Input.indexOf(i);
            let errMsg = document.getElementById(i + "ErrorMsg");
            errMsg.innerHTML += "Please provide " + fields[idx];
        }
    });
}
};
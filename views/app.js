import {
    MDCTextField
} from '@material/textfield';
import {
    MDCRipple
} from '@material/ripple';

// 实例化组件
const sbumitEle = document.querySelector('.mdc-button');
new MDCTextField(document.querySelector('.mdc-text-field.username'));
new MDCTextField(document.querySelector('.mdc-text-field.date'));
new MDCRipple(sbumitEle);

function toRegister() {
    window.location.href = window.location.origin + "/ok";
}

// 登录
const submitELe = document.querySelector("#submit");

submitELe.addEventListener("click", function login(event) {
    event.preventDefault();
    const usernameEle = document.querySelector("#username-input");
    const dateEle = document.querySelector("#date-input");
    fetch("https://esilyzhang-login.glitch.me/login", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameEle.value,
            date: dateEle.value
        })
    }).then(response =>
        response.json()
    ).then(data => {
        if (data.status === "register") {
            sbumitEle.children[0].innerText = "再次登录";
            usernameEle.value = "";
            dateEle.value = "";
        } else if (data.status === "login") {
            window.location.href = window.location.origin + "/success.html?username=" + data.info.username;
        }
    })
});
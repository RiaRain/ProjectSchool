const win = document.querySelector(".window");
const firstIndexInput = document.querySelector("#first_index_id");
const secondIndexInput = document.querySelector("#second_index_id");
const nameInput = document.querySelector("#name2");
const emailInput = document.querySelector("#email2");
const telInput = document.querySelector("#tel2");

const getName = () => nameInput.value;
const getEmail = () => emailInput.value;
const getTel = () => telInput.value;
const getFI = () => firstIndexInput.value;
const getSI = () => secondIndexInput.value;

const myFetch = (url, handler, option)=>{
    fetch(`http://localhost:3000/${url}`, option)
    .then((res) => {if (res.status == 200) {return res.json();}})
    .then(handler);
}

document.querySelector("#get_button").addEventListener("click", () => {myFetch("get_names",(json) => win.textContent = json)});

document.querySelector("#first_button")
.addEventListener(
    "click", () => {
        myFetch(
            "delete_num",
            () => {},
            {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({"index": getFI()})
            }
        )
    }
)

document.querySelector("#second_button")
.addEventListener(
    "click", () => {
        myFetch(
            "update_app",
            () => {},
            {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({"index": getSI(), "name2": getName(), "email2": getEmail(),"tel2": getTel()})
            }
        )
    }
)


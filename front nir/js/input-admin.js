let res = document.querySelector(".res");
let b1 = document.querySelector(".b-1");


function update(i1, i2){
    // res.innerHTML = ""
    if (i1.value == "admin" && i2.value == "123"){
        res.innerHTML ="Вход выполнен";
        window.location = "/front nir/admin.html";
    }
    else{
        res.innerHTML ="Неверный логин или пароль!";
    }
}

b1.addEventListener("click", function(){
    let i1 = document.querySelector("#login");
    let i2 = document.querySelector("#password");
    update(i1, i2);
})
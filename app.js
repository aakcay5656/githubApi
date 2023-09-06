//element leri seçme

const githubForm=document.getElementById("github-form");

const nameInput=document.getElementById("githubname");

const clearLastUsers=document.getElementById("clear-last-users");

const lastUsers=document.getElementById("last-users");
const github=new Github();

const ui=new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);

    clearLastUsers.addEventListener("click",clearAllSearched);

    document.addEventListener("DOMContentLoaded",getAllSearched);

}

function getData(e){


    let username=nameInput.value.trim();

    if(username===""){
        alert("Lütfen Geçerli bir kullanıcı adı girin");

    }else{
        
        github.getGithubData(username).then(response=>{
            if(response.user.message==="Not Found"){
               ui.showError("kullanıcı Bulunamadı");
            }else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUsersFromStorage(username);
                ui.showUserInfo(response.user);
                
                ui.showRepoInfo(response.repo);
                
            }
            
        }).catch(error=>ui.showError(error));

    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){
    //Tüm aranalerı temizle
    if(confirm("Emin misiniz ?")){
        //Silme
        Storage.clearAllSearchedUsersFromStroge();
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched(){
    // Aranaları storage al ve ui ekle
    let users=Storage.getSearchedUsersFromStorage();

    let result="";

    users.forEach(user=>{
        result += `<li class="list-group-item">${user}</li>`;
    });

    lastUsers.innerHTML=result;
}

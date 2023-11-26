function relod(page=1){
  let post = document.querySelector('#posts')
axios.get(`https://tarmeezacademy.com/api/v1/posts?page=${page}`)
.then((response)=>{
  console.log(response)
  
  for ( i in response.data.data) {
    let tg =''
   if(response.data.data[i].tags.length != 0) {
     for(tag in response.data.data[i].tags){
       tg += ` <button type="button" class="btn btn-secondary ms-3" >${response.data.data[i].tags[tag]}</button>`
       
     }
   }
   image = 'UserProfile.png'
   let tt =typeof response.data.data[i].author.profile_image 
   if ( tt == 'string' &&  response.data.data[i].author.profile_image != '') {
     image = response.data.data[i].author.profile_image
    } 
   
  post.innerHTML += ` 
  <a class='aaa'>
  <div class="d-flex justify-content-center com" data-id= "${response.data.data[i].id}" onclick='com(${response.data.data[i].id})'>
                      <div class="col-9">
                        
                        <div class="card shadow my-5 postid">
                            <div class="card-header">
                                <img src="${image}" alt="" style="width: 40px; height: 40px;" class="border border-2 rounded-circle">
                                <b>@${response.data.data[i].author.name}</b>
                            </div>
                            <div class="card-body">
                              <img class="w-100" src="${response.data.data[i].image}" alt="">
                              <h6 class="mt-1 ps-2 " style=" color:#9da0a1;"> ${response.data.data[i].created_at}</h6>
                              <h5> ${response.data.data[i].title}</h5>
                              <p>
                                ${response.data.data[i].body}
                              </p>
                              <hr>
                              <div>
                                <i class="fa-solid fa-pen"></i>
                                <span>
                                  (${response.data.data[i].comments_count}) comment 
                                </span>
                                ${tg}
                                
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    </a>
                    `
  
  // console.log(response.data.data)
 }
   
   
 })
}    
 relod(1)



function login() {
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value

  const bady = {
    "username" : username,
    "password" : password
   }
  url = 'https://tarmeezacademy.com/api/v1/login'
  axios.post(url,bady)
  .then( (response)=>{
    localStorage.setItem("token",response.data.token)
    localStorage.setItem("user",JSON.stringify(response.data.user))
    
    
    let modal = document.querySelector('#exampleModal')
    let modalintialse = bootstrap.Modal.getInstance(modal)
    modalintialse.hide()
    
   alertgh('login terméner','success')
   setTimeout( () => {
     const alertr = bootstrap.Alert.getOrCreateInstance('#alert-saccus')
   alertr.close()
   },2000)
   
   loginset()
    
  })
  
  
}

function register(){
  const username = document.querySelector('#register-username').value
  const password = document.querySelector('#register-password').value
  const name = document.querySelector('#register-name').value
  const profil = document.querySelector('#register-profil').files[0]
  
  let formData = new FormData()
  formData.append('username',username)
  formData.append('password',password)
  formData.append('name',name)
  formData.append('image',profil)
  
  
  url = 'https://tarmeezacademy.com/api/v1/register'
  axios.post(url,formData,{
    "headers":{
      "content-Type":"multipart/form-data"
    }
  })
  .then( (response)=>{
    localStorage.setItem("token",response.data.token)
    localStorage.setItem("user",JSON.stringify(response.data.user))
    
    let tt = typeof response.data.user.profile_image
    if ( tt == 'string' &&  response.data.user.profile_image != '') {
    localStorage.setItem('UserProfile',response.data.user.profile_image)
    }else{
     localStorage.setItem('UserProfile', "UserProfile.png")
    }
    
    
    
    console.log(response)
    let modal = document.querySelector('#register-model')
    let modalintialse = bootstrap.Modal.getInstance(modal)
    modalintialse.hide()
    
    alertgh('register a New user is terminer','success')
    loginset()
    
    setTimeout( () => {
     const alertr = bootstrap.Alert.getOrCreateInstance('#alert-saccus')
   alertr.close()
   },2000)
  }).catch( (errer)=>{
    console.log(errer.response.data.message)
    alertgh(errer.response.data.message,'danger')
    setTimeout( () => {
     const alertr = bootstrap.Alert.getOrCreateInstance('#alert-saccus')
   alertr.close()
   },2000)
   
   loginset()
  })
  

}


function alertgh(alertext,typet){
document.querySelector('#jj').innerHTML= `<div id="alert-saccus" clastyle="z-index: 999"></div>`
const alertPlaceholder = document.getElementById('alert-saccus')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('login-alert')

    appendAlert(alertext, typet)
}

function loginset(){
  const divlogin = document.querySelector('.divlogin')
  divlogin.innerHTML = `
    <button type="button" class="btn btn-outline-success me-3" data-bs-toggle="modal" data-bs-target="#exampleModal" >login</button>
    <button type="button" class="btn btn-outline-success me-3" data-bs-toggle="modal" data-bs-target="#register-model">registre</button>
  `
   
   
  if (localStorage.token != '') {
    divlogin.innerHTML= `
     <div class="Profil">
        <img src="${localStorage.getItem('UserProfile')}" alt="" style='border-radius: 50%;'>
     </div>
    <h3 style='margin-right: auto;'id='ii' >${JSON.parse(localStorage.getItem('user')).name}</h3>
    <button type="button" class="btn btn-outline-danger me-3 déconnecté" onclick= 'déconnecté()'>déconnecté</button>
    
    `
    document.querySelector('.div-post').innerHTML = `<div class="plus bg-primary" data-bs-toggle="modal" data-bs-target="#add-post-model"><i class="fa-solid fa-plus"></i></div>`
  } else {
    divlogin.innerHTML = `
    <button type="button" class="btn btn-outline-success me-3" data-bs-toggle="modal" data-bs-target="#exampleModal" >login</button>
    <button type="button" class="btn btn-outline-success me-3" data-bs-toggle="modal" data-bs-target="#register-model">registre</button>
  `
  document.querySelector('.div-post').innerHTML = ' '
  }
}  

loginset()

function  déconnecté(){
  localStorage.token=''
  document.querySelector('#jj').innerHTML= `<div id="alert-saccus" clastyle="z-index: 999"></div>
  `
  alertgh('deconecter','success')
 
  setTimeout(() => {
    const alertr = bootstrap.Alert.getOrCreateInstance('#alert-saccus')
    alertr.close()
  }, 2000)
  
  
  loginset()
} 



function createPoste() {
  
  const title = document.querySelector('#title-post').value;
  const body = document.querySelector('#body-post').value;
  const imagePost = document.querySelector('#image-post').files[0]
  console.log(imagePost)

  let formData = new FormData()
  formData.append("title",title)
  formData.append("body",body)
  formData.append("image",imagePost)
  const token = localStorage.getItem('token')
  
  let header = {
    'content-type' : "multipart/form-data",
    "authorization": `Bearer ${token}`
  };

  const url = 'https://tarmeezacademy.com/api/v1/posts';

  axios.post(url, formData, { "headers": header })
    .then((response) => {
      console.log(response)
      let modal = document.querySelector('#add-post-model')
      let modalintialse = bootstrap.Modal.getInstance(modal)
      modalintialse.hide()
      
      alertgh('create post success', 'success')
      setTimeout(() => {
        const alertr = bootstrap.Alert.getOrCreateInstance('#alert-saccus')
        alertr.close()
      }, 2000)
      
      loginset()
      
      relod()
    })
    .catch((errer) => {
      
      alertgh(errer.response.data.message, 'danger')
      setTimeout(() => {
        const alertr = bootstrap.Alert.getOrCreateInstance('#alert-saccus')
        alertr.close()
      }, 2000)
      
      loginset()
     });
}


 let n =1;
window.onscroll = function () {
  
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  let scrollTop =document.documentElement.scrollTop
  
   let end = `${scrollTop / height}`
   

     if (n<16) {
     if( end >= 0.80 && end <= 0.81099){
       n++
       relod(n)
   } } 
   
    
  
};



function com(id) {
  
axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
.then((response)=>{
  console.log('yyyyyuu')
  localStorage.setItem('comment',JSON.stringify(response.data.data))
window.location.href='comment.html'

 
})



}

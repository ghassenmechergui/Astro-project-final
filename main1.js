let post = document.querySelector('#posts')
axios.get('https://tarmeezacademy.com/api/v1/posts')
.then((response)=>{
  
  console.log(response)
  

  
  for ( i in response.data.data) {
    let tg =''
   if(response.data.data[i].tags.length != 0) {
     for(tag in response.data.data[i].tags){
       tg += ` <button type="button" class="btn btn-secondary ms-3" >${response.data.data[i].tags[tag]}</button>`
     }
   }
  post.innerHTML += ` <div class="d-flex justify-content-center">
                      <div class="col-9">
                        
                        <div class="card shadow my-5">
                            <div class="card-header">
                                <img src="${response.data.data[i].author.profile_image}" alt="" style="width: 40px; height: 40px;" class="border border-2 rounded-circle">
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
                    `
  
  // console.log(response.data.data)
 }
   console.log(response)
})





function login() {
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value
  console.log(username)
  console.log(password)
  const bady = {
    "username" : username,
    "password" : password
   }
  url = 'https://tarmeezacademy.com/api/v1/login'
  axios.post(url,bady)
  .then( (response)=>{
    localStorage.setItem("tokin",response.data.tokin)
    localStorage.setItem("user",JSON.stringify(response.data.user))
    
  })
  let modal = document.querySelector('#exampleModal')
  let modaintialse = Botstrap.modal.getInstance(modal)
  modaintialse.hide()
  
}






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

  alertTrigger.addEventListener('click', () => {
    appendAlert('Nice, you triggered this alert message!', 'success')
  })

let post = document.querySelector('#posts')

fetch("https://tarmeezacademy.com/api/v1/posts")
.then(response =>{
  if (response.ok) {
    return response.json()
  } else {
    alert('errer')
  }  
} )
.then( data => {
 
 for ( i in data.data) {
  post.innerHTML += ` <div class="d-flex justify-content-center">
                      <div class="col-9">
                        
                        <div class="card shadow my-5">
                            <div class="card-header">
                                <img src="${data.data[i].author.profile_image}" alt="" style="width: 40px; height: 40px;" class="border border-2 rounded-circle">
                                <b>@${data.data[i].author.name}</b>
                            </div>
                            <div class="card-body">
                              <img class="w-100" src="${data.data[i].image}" alt="">
                              <h6 class="mt-1 ps-2 " style=" color:#9da0a1;"> ${data.data[i].created_at}</h6>
                              <h5> ${data.data[i].title}</h5>
                              <p>
                                ${data.data[i].body}
                              </p>
                              <hr>
                              <div>
                                <i class="fa-solid fa-pen"></i>
                                <span>
                                  (${data.data[i].comments_count}) comment 
                                </span>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    `
  
  console.log(data)
 }
 
 
 
})





function register(){
  
  
}
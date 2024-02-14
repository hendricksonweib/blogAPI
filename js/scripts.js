const url = 'https://jsonplaceholder.typicode.com/posts'

const loadingElement = document.querySelector('.loading')
const postsConteiner = document.querySelector('#posts-conteiner')


const postPage = document.querySelector("#post")
const postConteiner = document.querySelector("#post-conteiner")
const commentsConteiner = document.querySelector("#comments-conteiner")

const urlSearchParams = new URLSearchParams(window.location.search) 
const postId = urlSearchParams.get("id")

async function getAllPost(){
    const response = await fetch(url)

    const data = await response.json()
    console.log(data)

    loadingElement.classList.add('hide')

    data.map((post)=>{
        const div = document.createElement('div')
        const title = document.createElement('h2')
        const body = document.createElement('p')
        const link = document.createElement('a')

        title.innerText = post.title
        body.innerText = post.body
        link.innerHTML = "Ler"
        link.setAttribute("href",`/post.html?id=${post.id}`)

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)

        postsConteiner.appendChild(div)
    })
}

async function getPost(id){
    const [responsePost, responseComments]= await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])

    const dataPost = await responsePost.json()
    const dataComments = await responseComments.json()
    postPage.classList.remove("hide")
    loadingElement.classList.add('hide')
}

if(!postId){
    getAllPost()
} else {
   getPost(postId)
}
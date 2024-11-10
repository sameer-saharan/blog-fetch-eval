const postContainer = document.querySelector('#posts-container');
const userDropdown = document.querySelector('#user-dropdown');
const sortDropdown = document.querySelector('#sort-dropdown');
const searchInput = document.querySelector('#search-input');
const prevPageBtn = document.querySelector('#prevPage');
const nextPageBtn = document.querySelector('#nextPage')
const currPageSpan = document.querySelector('#currPage');

let posts = [];
let users = [];
let filteredPosts = [];
let currPage = 1;
const postsPerPage = 10;

// Fetch Posts and Users
async function getPosts() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await response.json();
    filteredPosts = data;
}

async function getUsers() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
}

// https://jsonplaceholder.typicode.com/comments?postId=${1}
function displayPosts() {
    postContainer.innerHTML = '';
    const startIndex = (currPage-1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    paginatedPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.setAttribute('class', 'post');
        const postTitle = document.createElement('h3');
        postTitle.innerHTML = `${post.title}`;
        const postBody = document.createElement('p');
        postBody.innerHTML = `${post.body}`;
        postElement.appendChild(postTitle);
        postElement.appendChild(postBody);
        postElement.addEventListener('click', () => {
            //openPostComments(`${post.id}`)
        });
        // Adding post to the Posts Container
        postContainer.appendChild(postElement);
    })
    // 
}
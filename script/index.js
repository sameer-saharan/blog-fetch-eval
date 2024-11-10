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
const postsPerPage = 5;

// Fetch Posts and Users
async function getPosts() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await response.json();
    posts = data;
    filteredPosts = data;
    displayPosts()
}

async function getUsers() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    users = data;
    populateUserDropdown()
}

function populateUserDropdown() {
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userDropdown.appendChild(option);
    })
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
    updatePaginationButtons(); 
}

function updatePaginationButtons() {
    prevPageBtn.disabled = currPage === 1;
    nextPageBtn.disable = (currPage * postsPerPage) >= filteredPosts.length;
    currPageSpan.textContent = currPage;
}

// Event listeners for filtering, sorting, and pagination

userDropdown.addEventListener("change", () => {
    const userId = userDropdown.value;
    console.log(userId)
    filteredPosts = userId ? posts.filter(post => post.userId == userId) : posts;
    currPage = 1;
    displayPosts();
});
  
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchText) || post.body.toLowerCase().includes(searchText));
    currPage = 1;
    displayPosts();
});
  
sortDropdown.addEventListener("change", () => {
    const sortOrder = sortDropdown.value;
    filteredPosts.sort((a, b) => sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
    displayPosts();
});
  
prevPageBtn.addEventListener("click", () => {
    currPage--;
    displayPosts();
});
  
nextPageBtn.addEventListener("click", () => {
    currPage++;
    displayPosts();
});
  
// Initialize
getPosts();
getUsers();
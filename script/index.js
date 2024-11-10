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
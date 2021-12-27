const button = document.querySelector('#search-button');
const bookInput = document.querySelector('#book-search');
const result = document.querySelector('#results');
const key = 'AIzaSyAZkjm5rz6_VUbf-PX0JGoWsfFt4hwZh78';

async function fetchBooks(book) {
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${bookInput.value}&key=${key}`;
  try {
    const fetchResult = fetch(new Request(URL, { method: 'GET' }));
    const response = await fetchResult;
    if (response.ok) {
      const jsonData = await response.json();
      result.innerHTML = renderList(jsonData);
    } else {
      result.innerHTML = `Response.status: ${response.status}`;
    }
  } catch (e) {
    result.innerHTML = `the error is: ${e}`;
  }
}

function renderList(json) {
  console.log(json);
  const results = json.items;
  return `<ul>
${results
  .map(
    result =>
      `<li class="book-result">
      <div class="book-img"> <img src="${result.volumeInfo.imageLinks.thumbnail}"></div>
      <div class="book-author">${result.volumeInfo.authors}</div>
      <div class="book-title">Title: ${result.volumeInfo.title}</div>
      <div class="book-txt">${result.volumeInfo.description}</div>
      </li>`
  )
  .join('')}
</ul>`;
}

button.addEventListener('click', () => {
  fetchBooks(bookInput.value);
});

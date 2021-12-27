const key = 'AIzaSyAZkjm5rz6_VUbf-PX0JGoWsfFt4hwZh78';

const ul = document.getElementById('book-results');

searchInput = '';

const bookSearch = document.getElementById('book-search');

const findButton = document.getElementById('search-button');

const url = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${key}`;

findButton.addEventListener('click', function(e) {
  // alert(bookSearch.value);
  searchInput = bookSearch.value;
  console.log(searchInput);
  return searchInput;
});

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

// Fetch JSON feed
fetch(url)
  .then(response => {
    return response.json();
  })
  .then(function(data) {
    let books = data.items; // Get the results
    return books.map(function(book) {
      let li = createNode('li'),
        author = createNode('div'),
        title = createNode('div');
      li.className = 'book-result';
      title.className = 'book-title';
      author.className = 'book-author';
      author.innerHTML = `${book.volumeInfo.authors}`;
      title.innerHTML = `${book.volumeInfo.title}`;
      append(li, title); // Append all our elements
      append(li, author);
      append(ul, li);
      // document.getElementById('results').innerHTML =
      //   data.items[0].volumeInfo.title;
    });
  })
  .catch(err => {
    // Do something for an error here
  });

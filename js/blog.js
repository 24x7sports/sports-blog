const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const cat = params.get("cat");

const USERNAME = "24x7sports";
const REPO = "sports-blog";

fetch(`https://api.github.com/repos/${USERNAME}/${REPO}/contents/blogs/${cat}`)
  .then(res => res.json())
  .then(files => {
    files.forEach(file => {
      fetch(file.download_url)
        .then(res => res.json())
        .then(blog => {
          if (blog.id === id) {
            document.getElementById("blog").innerHTML = `
              <h1>${blog.title}</h1>
              <p>${blog.date} • ${blog.author}</p>
              <img src="${blog.image}">
              <p>${blog.content}</p>
            `;
          }
        });
    });
  });

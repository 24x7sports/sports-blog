const USERNAME = "24x7sports";
const REPO = "sports-blog";

function loadBlogs(category) {
  document.getElementById("blogs").innerHTML = "Loading...";

  fetch(`https://api.github.com/repos/${USERNAME}/${REPO}/contents/blogs/${category}`)
    .then(res => res.json())
    .then(files => {
      let html = "";
      files.reverse().forEach(file => {
        fetch(file.download_url)
          .then(res => res.json())
          .then(blog => {
            html += `
              <article class="blog-card">
                <img src="${blog.image}">
                <h2>${blog.title}</h2>
                <p>${blog.date} • ${blog.author}</p>
                <p>${blog.content.substring(0,120)}...</p>
                <a href="blog.html?id=${blog.id}&cat=${category}">Read More</a>
              </article>
            `;
            document.getElementById("blogs").innerHTML = html;
          });
      });
    });
}

loadBlogs("football");

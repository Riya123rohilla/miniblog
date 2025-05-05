const app = document.getElementById('app');

function createHeader() {
  const header = document.createElement('div');
  header.className = 'header';

  const title = document.createElement('h1');
  title.innerText = 'Mini Blogs';

  const nav = document.createElement('div');

  const homeLink = document.createElement('a');
  homeLink.href = 'index.html';
  homeLink.innerText = 'Home';
  homeLink.style.color = 'white';
  homeLink.style.marginRight = '10px';

  const blogLink = document.createElement('a');
  blogLink.href = 'blog.html';
  blogLink.innerText = 'Blog Page';
  blogLink.style.color = 'white';

  nav.appendChild(homeLink);
  nav.appendChild(blogLink);

  header.appendChild(title);
  header.appendChild(nav);

  return header;
}

function createForm() {
  const form = document.createElement('form');
  form.className = 'blog-form';

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Blog Title';
  titleInput.required = true;

  const contentInput = document.createElement('textarea');
  contentInput.placeholder = 'Blog Content';
  contentInput.required = true;

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.innerText = 'Add Blog';

  form.appendChild(titleInput);
  form.appendChild(contentInput);
  form.appendChild(submit);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const blog = {
      title: titleInput.value,
      content: contentInput.value
    };
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    window.location.reload(); // Refresh to show new entry
  });

  return form;
}

function createBlogList() {
  const blogList = document.createElement('div');
  blogList.className = 'blog-list';

  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  blogs.forEach(blog => {
    const card = document.createElement('div');
    card.className = 'blog-card';

    const title = document.createElement('h3');
    title.innerText = blog.title;

    const content = document.createElement('p');
    content.innerText = blog.content;

    card.appendChild(title);
    card.appendChild(content);
    blogList.appendChild(card);
  });

  return blogList;
}

function createBlogList() {
  const blogList = document.createElement('div');
  blogList.className = 'blog-list';

  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  blogs.forEach((blog, index) => {
    const card = document.createElement('div');
    card.className = 'blog-card';

    const title = document.createElement('h3');
    title.innerText = blog.title;

    const content = document.createElement('p');
    content.innerText = blog.content;

    // ✅ Create Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete-btn';

    // 🔁 Add functionality
    deleteBtn.addEventListener('click', () => {
      const updatedBlogs = blogs.filter((_, i) => i !== index);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      window.location.reload(); // Refresh to update UI
    });

    card.appendChild(title);
    card.appendChild(content);
    card.appendChild(deleteBtn); // ✅ Add delete button to card
    blogList.appendChild(card);
  });

  return blogList;
}


// Detect page and render accordingly
if (window.location.pathname.includes('index.html')) {
  app.appendChild(createHeader());
  app.appendChild(createForm());
  app.appendChild(createBlogList());
} else if (window.location.pathname.includes('blog.html')) {
  app.appendChild(createHeader());
  app.appendChild(createBlogList());
}

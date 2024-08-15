const accessKey = "hzd_PqlJcsKvFhCbbRgV8EZobYVSQxOHPGpCefRdPCQ";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value.trim();

  if (!keyword) {
    alert("Please enter a search term.");
    return;
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      searchResult.innerHTML = "";
    }

    const results = data.results;

    if (results.length === 0) {
      searchResult.innerHTML = "<p>No results found. Try another search.</p>";
      showMoreBtn.style.display = "none";
      return;
    }

    results.forEach((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description || keyword;

      const imgLink = document.createElement("a");
      imgLink.href = result.links.html;
      imgLink.target = "_blank";

      imgLink.appendChild(image);
      searchResult.appendChild(imgLink);
    });

    showMoreBtn.style.display = "block";
  } catch (error) {
    searchResult.innerHTML = `<p class="error-message">Something went wrong. Please try again later.</p>`;
    showMoreBtn.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
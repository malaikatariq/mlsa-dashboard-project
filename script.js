const apiKey = "c63ede33723e4bc48945a744dd740721"; // replace with your key
const container = document.getElementById("news-container");

async function fetchNews() {
  const category = document.getElementById("category").value;
  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    );
    const data = await res.json();

    if (data.articles.length === 0) {
      container.innerHTML = "<p>No news found.</p>";
      return;
    }

    container.innerHTML = "";
    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.source.name} | ${new Date(article.publishedAt).toLocaleString()}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p>Error fetching news.</p>";
    console.error(err);
  }
}

fetchNews(); // load on page open

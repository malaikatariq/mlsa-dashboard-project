const apiUrl = "https://mynewsfunctionapp-brhpbzaccedwd3dy.northeurope-01.azurewebsites.net/api/GetNews?code=tpQSL0CrWBQM7bT-i-oyeuVaSLNkhAon-Ni9ektOZM2BAzFukMgnjw=="; 
const container = document.getElementById("news-container");

async function fetchNews() {
  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No news found.</p>";
      return;
    }

    container.innerHTML = "";
    data.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.source?.name || "Unknown"} | ${new Date(article.publishedAt).toLocaleString()}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p>Error fetching news.</p>";
    console.error("Fetch error:", err);
  }
}

fetchNews();

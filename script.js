const container = document.getElementById("news-container");

async function fetchNews() {
  const category = document.getElementById("category").value;
  container.innerHTML = "<p>Loading...</p>";

  try {
    // 🔑 Call your GetNews HTTP Function instead of NewsAPI directly
    const res = await fetch(
      `https://mynewsfunctionapp-brhpbzaccedwd3dy.northeurope-01.azurewebsites.net/api/GetNews?category=${category}&code=<tpQSL0CrWBQM7bT-i-oyeuVaSLNkhAon-Ni9ektOZM2BAzFukMgnjw==>`
    );

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
    console.error("Error fetching news:", err);
  }
}

// Load news on page open
fetchNews();

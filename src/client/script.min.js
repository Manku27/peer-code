document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const query = document.getElementById("query").value;

  fetch(`/search?query=${query}`)
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("result");
      if (data.success) {
        const formattedContent = data.content
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t")
          .replace(/\\"/g, '"');
        resultDiv.innerHTML = `<pre><code class="javascript">${formattedContent}</code></pre>`;
        document.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightBlock(block);
        });
      } else {
        resultDiv.textContent = data.message;
      }
    });
});

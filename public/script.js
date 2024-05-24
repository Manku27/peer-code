document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const query = document.getElementById("query").value;

    fetch(`/fetch-file?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        const resultDiv = document.getElementById("result");
        if (data.success) {
          resultDiv.innerHTML = `<pre><code class="javascript">${data.content}</code></pre>`;
          document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightBlock(block);
          });
        } else {
          resultDiv.textContent = data.message;
        }
      });
  });

document.getElementById("functionForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const functionInput = document.getElementById("functionInput").value;
  const questionNumber = document.getElementById("questionNumber").value;
  const questionName = document.getElementById("questionName").value;

  if (!questionNumber || !questionName || !functionInput.trim()) {
    alert("Please fill in all fields.");
    return;
  }

  const jsonPayload = {
    questionNumber: parseInt(questionNumber),
    questionName: questionName,
    value: functionInput,
    comments: [],
  };

  const jsonString = JSON.stringify(jsonPayload, null, 2);

  // Send the JSON payload to the save API
  fetch("/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonString,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Function saved successfully!");
      } else {
        alert("Error saving function: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error saving function: " + error.message);
    });
});

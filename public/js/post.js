const postFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#post-title").value.trim();
  const postBody = document.querySelector("#post-body").value.trim();
  const postDate = new Date();

  if (postBody && postTitle) {
    const response = await fetch("/api/users/post", {
      method: "POST",
      body: JSON.stringify({ postTitle, postBody, postDate }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.replace("/dashboard");
    } else {
      alert("Error when making the post!");
    }
  }
};

document
  .querySelector("#post-form")
  .addEventListener("submit", postFormHandler);

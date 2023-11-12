const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentBody = document.querySelector("#comment-body").value.trim();
  const postId = window.location.pathname.split("/").pop();
  const commentDate = new Date();

  // console.log(commentBody, postId, commentDate);

  if (commentBody) {
    const response = await fetch("/api/users/comment", {
      method: "POST",
      body: JSON.stringify({ commentBody, postId, commentDate }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Error when making the comment!");
    }
  }
};

document
  .querySelector("#comment-form")
  .addEventListener("submit", commentFormHandler);

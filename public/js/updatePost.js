const postUpdateFormHandler = async (event) => {
  event.preventDefault();

  const postId = window.location.pathname.split("/").pop();
  const postTitle = document.querySelector("#post-title").value.trim();
  const postBody = document.querySelector("#post-body").value.trim();
  const postDate = new Date();

  if (postBody && postTitle) {
    const response = await fetch(`/api/users/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ postTitle, postBody, postDate }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.replace("/dashboard");
    } else {
      alert("Error when updating the post!");
    }
  }
};

const deletePost = async () => {
  const postId = window.location.pathname.split("/").pop();
  const response = await fetch(`/api/users/post/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.location.replace("/dashboard");
  } else {
    alert("Error when deleting the post!");
  }
};

document
  .querySelector("#post-update-form")
  .addEventListener("submit", postUpdateFormHandler);

document.querySelector("#post-delete").addEventListener("click", deletePost);

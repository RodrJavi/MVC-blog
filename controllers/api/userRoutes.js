const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const newUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUserData.id;
      req.session.logged_in = true;

      res.json({ user: newUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/post", async (req, res) => {
  try {
    const userId = req.session.user_id;

    // Post query to be added to the database
    const postData = await Post.create({
      user_id: userId,
      title: req.body.postTitle,
      content: req.body.postBody,
      postDate: req.body.postDate,
    });
    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/post/:postId", async (req, res) => {
  try {
    const userId = req.session.user_id;
    const postData = await Post.update(
      {
        title: req.body.postTitle,
        content: req.body.postBody,
        postDate: req.body.postDate,
      },
      {
        where: {
          id: req.params.postId,
        },
      }
    );
    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/post/:postId", async (req, res) => {
  try {
    const userId = req.session.user_id;
    const postData = await Post.destroy({
      where: {
        id: req.params.postId,
      },
    });
    res.status(200).json({ message: "Post deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/comment", async (req, res) => {
  try {
    const commentText = req.body.commentBody;
    const postId = req.body.postId;
    const commentDate = req.body.commentDate;
    const userId = req.session.user_id;

    const commentData = await Comment.create({
      user_id: userId,
      parentPostId: postId,
      content: commentText,
      postDate: commentDate,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(error);
  }
});

module.exports = router;

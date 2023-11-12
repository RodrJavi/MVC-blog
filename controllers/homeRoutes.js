const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      logged_in: req.session.logged_in,
      posts,
    });
    console.log(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      logged_in: req.session.logged_in,
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:postId", withAuth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const postData = await Post.findOne({
      where: { id: postId },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const singlePost = postData.get({ plain: true });
    // const commentData = await Comment.findAll({
    //   where: { parentPostId: postId },
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["username"],
    //     },
    //   ],
    // });

    // const postComments = commentData.get({ plain: true });

    res.render("post-view", {
      logged_in: req.session.logged_in,
      singlePost,
      // postComments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard/create-post", withAuth, async (req, res) => {
  try {
    res.render("post-create", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard/edit-post/:postId", withAuth, async (req, res) => {
  const postId = req.params.postId;
  const postData = await Post.findOne({
    where: { id: postId },
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });

  const singlePost = postData.get({ plain: true });

  try {
    res.render("post-edit", {
      logged_in: req.session.logged_in,
      singlePost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

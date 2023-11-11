const { Post } = require("../models");

const postData = [
  {
    user_id: 1,
    title: "Introduction",
    content: "I'm Javi",
    postDate: "2023-01-12 13:30:00",
  },
  {
    user_id: 2,
    title: "Introduction",
    content: "I'm Jacob",
    postDate: "2023-04-21 02:16:18",
  },
  {
    user_id: 3,
    title: "Introduction",
    content: "I'm Ian",
    postDate: "2023-07-05 18:20:00",
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;

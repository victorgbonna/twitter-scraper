const Post = require("../../models/Post");

module.exports = async (req, res, next) => {
  try {
    let { limit, page, keyword, community } = req.query;
    let options = {};
    if (community) {
      options.community = community;
    }
    page = page || 1;
    const skip = page ? (page - 1) * limit : 0;

    const count = await Post.find(
      keyword
        ? {
            $or: [
              { category: keyword },
              { content: { $regex: `^${keyword}`, $options: "i" } },
              ...options,
            ],
          }
        : options
    ).countDocuments();

    let pages = 0;
    if (count > 0) {
      if (limit) {
        pages = Math.ceil(count / limit);
      } else {
        pages = 1;
      }
    }

    const result = {};
    limit = limit - 0;

    if (page * 1 < pages) {
      result.next = { limit, page: page * 1 + 1 };
    }
    if (page * 1 <= pages && page - 1 != 0) {
      result.previous = { limit, page: page - 1 };
    }
    const posts = await Post.find(
      keyword
        ? {
            $or: [
              { category: keyword },
              { content: { $regex: `^${keyword}`, $options: "i" } },
              ...options,
            ],
          }
        : options
    )
      .limit(limit * 1)
      .skip(skip);

    // let notifications=[]
    // if(keyword){
    // notifications = await Notification.find({
    //   $or:[
    //     {category:keyword},
    //     {content: { $regex: `^${keyword}`, $options: "i" } },

    //   ]
    // })
    //   .limit(limit * 1)
    //   .skip(skip);
    // }
    // if(!keyword){
    //   notifications = await Notification.find(
    //     {}
    //   )
    //     .limit(limit * 1)
    //     .skip(skip);
    //   }

    return res.status(200).json({
      status: "success",
      data: { ...result, count, pages, posts },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const action = (actionType, payload) => {
  return {
    type: actionType,
    payload
  };
};

export const createAsyncActions = type => {
  return {
    request: payload => action(`${type}_REQUEST`, payload),
    success: payload => action(`${type}_SUCCESS`, payload),
    failure: payload => action(`${type}_FAILURE`, payload)
  };
};

// initilize all posts unliked by user
export const initilizeLikesStorage = posts => {
  if (localStorage.getItem("likes") === null) {
    let likes = {};
    localStorage.setItem("likes", JSON.stringify(likes));
  }
  let likes = JSON.parse(localStorage.getItem("likes"));

  posts.map(post => {
    if (likes[post.id] === undefined) {
      likes[post.id] = 0;
    }
    return post;
  });

  localStorage.setItem("likes", JSON.stringify(likes));
  return likes;
};

// check if a post is liked by user or not
export const isPostLiked = postId => {
  let likes = JSON.parse(localStorage.getItem("likes"));
  return likes[postId];
};

// like or unlike a post
export const toggleLike = postId => {
  let likes = JSON.parse(localStorage.getItem("likes"));
  if (likes[postId]) {
    likes[postId] = 0;
  } else {
    likes[postId] = 1;
  }
  localStorage.setItem("likes", JSON.stringify(likes));
};

import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllPosts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/singlepostsbyuser/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

// Delete Post https://localhost:7129/api/post/32
const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/post/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      if (res.NotFound) {
        resolve();
      }
    })
    .catch(reject);
});

// Create new post
const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

// UPdate post
const updatePost = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/post/${payload.Id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const getPostsByUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/postsbyuser/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const singlePostByUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/singlepostsbyuser/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const addTagToPost = (postId, tagId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/post/tagpost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId, tagId }),
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      } else {
        reject(new Error(`Failed to add tag to post. Status: ${res.status}`));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

export {
  getAllPosts,
  createPost,
  updatePost,
  getPostsByUser,
  addTagToPost,
  getSinglePost,
  deletePost,
  singlePostByUser,
};

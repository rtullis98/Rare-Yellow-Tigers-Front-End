// import { clientCredentials } from '../utils/client';
// const dbUrl = clientCredentials.databaseURL;

const dbUrl = 'https://localhost:7129';

// GET ALL Categories
const getAllCategories = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/categories`, {
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

// Create Category
const createCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/tag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllCategories,
  createCategory,
};

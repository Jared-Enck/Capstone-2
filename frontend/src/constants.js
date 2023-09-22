// Constants.js

const prod = {
  BASE_URL: 'https://mygamenights-backend-7938064403b3.herokuapp.com',
};

const dev = {
  BASE_URL: 'http://localhost:3001',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;

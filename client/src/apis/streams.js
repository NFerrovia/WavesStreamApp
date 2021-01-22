import axios from 'axios';

// base para el servidor JSON que guarda la información de los streams.

export default axios.create({
  baseURL: 'http://localhost:3001',
});

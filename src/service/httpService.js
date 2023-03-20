import axios from 'axios';

// console.log(import.meta.env.API_BASE_URL);

export class HttpClient {
  constructor(data) {
    this._data = data;
    this._instance = axios.create({
      baseURL: import.meta.env.API_BASE_URL || 'http://localhost:3001/api/v1'
    });
  }

  getLogin() {
    return this._instance.post(`/user/login`, this._data);
  }

  getSignup() {
    return this._instance.post(`/user/signup`, this._data);
  }

  getProfile() {
    return this._instance.post(
      `/user/profile`,
      {},
      {
        headers: { Authorization: `Bearer ${this._data}` }
      }
    );
  }
  putProfile() {
    return this._instance.put(`/user/profile`, this._data);
  }
}

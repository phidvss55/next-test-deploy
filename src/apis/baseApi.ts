import { createHttp } from "./http";

class baseApi {
  private client;
  constructor(baseUrl: string) {
    this.client = createHttp(baseUrl);
  }

  get(url: string, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  delete(url: string, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  head(url: string, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  options(url: string, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  post(url: string, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  put(url: string, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  patch(url: string, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }
}

export { baseApi };

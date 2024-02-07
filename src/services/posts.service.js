import HttpService from "./http.service";

export default class PostService extends HttpService {
  static async getAll(page = 1) {
    const response = await this.request({
      method: "GET",
      url: "/posts",
      params: {
        perPage: 8,
        page,
      },
    });
    return {
      data: response.data,
      metadata: response.metadata,
    };
  }

  static async getSingle(id) {
    const response = await this.request({
      method: "GET",
      url: `/posts/${id}`,
    });
    return response?.data;
  }

  static async create(data) {
    const response = await this.request({
      method: "POST",
      url: "/posts",
      data,
    });
    return response?.data;
  }
}

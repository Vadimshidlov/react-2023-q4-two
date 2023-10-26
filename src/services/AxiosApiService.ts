/* eslint-disable no-underscore-dangle */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosApiService {
  public requestApiInstance: AxiosInstance;

  private readonly API_URL = 'https://swapi.dev/api/people/';

  constructor() {
    this.requestApiInstance = axios.create({
      baseURL: `${this.API_URL}`,
    });
  }

  public post<D>(
    config: AxiosRequestConfig | undefined,
    data: object | undefined,
    queryParams = ''
  ): Promise<AxiosResponse<D>> {
    return this.requestApiInstance.post(queryParams, data, config);
  }

  public get<D>(
    config: AxiosRequestConfig | undefined,
    queryParams = ''
  ): Promise<AxiosResponse<D>> {
    return this.requestApiInstance.get(queryParams, config);
  }
}

export default new AxiosApiService();

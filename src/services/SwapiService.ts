import AxiosApiService from 'services/AxiosApiService';
import { PeoplesRequestType } from 'view/Search/Search';

class SwapiService {
  private readonly AXIOS_API = AxiosApiService;

  public async getAllPeoples(page = 1): Promise<PeoplesRequestType> {
    return (await this.AXIOS_API.get<PeoplesRequestType>({}, `?page=${page}`)).data;
  }

  public async searchPeoples(queryParams: string, page = 1): Promise<PeoplesRequestType> {
    return (await this.AXIOS_API.get<PeoplesRequestType>({}, `?search=${queryParams}&page=${page}`))
      .data;
  }
}

export default new SwapiService();

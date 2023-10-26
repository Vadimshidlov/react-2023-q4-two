import AxiosApiService from 'services/AxiosApiService';
import { PeopleRequestType, PeoplesRequestType } from 'view/Search/Search';

class SwapiService {
  private readonly AXIOS_API = AxiosApiService;

  public async getAllPeoples(): Promise<PeopleRequestType[]> {
    return (await this.AXIOS_API.get<PeoplesRequestType>({})).data.results;
  }

  public async searchPeoples(queryParams: string): Promise<PeopleRequestType[]> {
    return (await this.AXIOS_API.get<PeoplesRequestType>({}, `?search=${queryParams}`)).data
      .results;
  }
}

export default new SwapiService();

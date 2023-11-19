import AxiosApiService from '@/services/AxiosApiService.ts';
import { PeopleRequestType, PeoplesRequestType } from '@/components/Search/types.ts';

class SwapiService {
  private readonly AXIOS_API = AxiosApiService;

  public async getAllPeoples(page = 1): Promise<PeoplesRequestType> {
    return (await this.AXIOS_API.get<PeoplesRequestType>({}, `?page=${page}`)).data;
  }

  public async getSelectPeople(heroNumber: number): Promise<PeopleRequestType> {
    return (await this.AXIOS_API.get<PeopleRequestType>({}, `${heroNumber}`)).data;
  }

  public async searchPeoples(queryParams: string, page = 1): Promise<PeoplesRequestType> {
    return (await this.AXIOS_API.get<PeoplesRequestType>({}, `?search=${queryParams}&page=${page}`))
      .data;
  }
}

export default new SwapiService();

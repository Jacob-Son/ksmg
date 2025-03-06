import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import { AxiosResponse } from 'axios';
// import { Observable } from 'rxjs';
@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService) {}

  //   findAll(): Observable<AxiosResponse<Cat[]>> {
  //     return this.httpService.get('http://localhost:3000/cats');
  //   }

  //   async findAll2(): Promise<Cat[]> {
  //     const { data } = await firstValueFrom(
  //       this.httpService.get<Cat[]>('http://localhost:3000/cats').pipe(
  //         catchError((error: AxiosError) => {
  //           this.logger.error(error.response.data);
  //           throw 'An error happened!';
  //         }),
  //       ),
  //     );
  //     return data;
  //   }
}

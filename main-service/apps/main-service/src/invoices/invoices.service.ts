import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class InvoicesService {
  private logger;
  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger();
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .post(`http://localhost:3001/invoices`, createInvoiceDto)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new BadRequestException(error.response.data);
          }),
        ),
    );

    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/invoices`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new BadRequestException(error.response.data);
        }),
      ),
    );

    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/invoices/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new BadRequestException(error.response.data);
        }),
      ),
    );

    return data;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .patch(`http://localhost:3001/invoices/${id}`, updateInvoiceDto)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new BadRequestException(error.response.data);
          }),
        ),
    );

    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.delete(`http://localhost:3001/invoices/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new BadRequestException(error.response.data);
        }),
      ),
    );

    return data;
  }
}

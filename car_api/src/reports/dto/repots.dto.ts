import { Expose, Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class createReportDTO {
  @IsNumber()
  @Min(0)
  @Max(10000000)
  price: number;

  @IsString()
  make: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsNumber()
  @Min(0)
  @Max(100000)
  mileage: number;
}

export class ReportDTO {
  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  year: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}

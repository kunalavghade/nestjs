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

import { IsString } from 'class-validator';

export class GetPlaceDto {
  @IsString()
  id: string;

  @IsString()
  place_name: string;

  @IsString()
  category_name: string;

  @IsString()
  category_group_code: string;

  @IsString()
  category_group_name: string;

  @IsString()
  phone: string;

  @IsString()
  address_name: string;

  @IsString()
  road_address_name: string;

  @IsString()
  x: string;

  @IsString()
  y: string;

  @IsString()
  place_url: string;

  @IsString()
  distance: string;
}

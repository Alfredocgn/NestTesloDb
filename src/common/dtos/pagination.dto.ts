import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPositive, IsOptional, Min } from 'class-validator';


export class PaginationDto{
  @ApiProperty({
    default:10,
    description:'Quantity of rows'
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?:number;

  @ApiProperty({
    default:0,
    description:'Quantity of rows you want to skip'
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?:number;
}
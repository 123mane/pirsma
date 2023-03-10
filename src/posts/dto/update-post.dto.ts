import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindOneParams {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}

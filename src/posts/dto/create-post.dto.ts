import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}

// export class CreateAddressDto {
//   @ApiProperty()
//   @IsString()
//   @IsEmail()
//   @IsNotEmpty()
//   street: string;

//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   city: string;

//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   country: string;

//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   userId: string;
// }

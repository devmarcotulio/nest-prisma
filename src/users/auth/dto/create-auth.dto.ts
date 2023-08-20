import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({
    message: 'The email should not be empty',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'The password should not be empty',
  })
  password: string;
}

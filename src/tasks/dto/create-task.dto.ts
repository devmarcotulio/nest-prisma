import { IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({
    message: 'The title should not be empty',
  })
  @Length(5, 100)
  title: string;

  @IsNotEmpty({
    message: 'The description should not be empty',
  })
  description: string;
}

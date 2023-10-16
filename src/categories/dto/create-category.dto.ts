import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @MaxLength(255, {
    message: 'O campo nome possui muitos caracteres',
  })
  @IsString({ message: 'O campo nome deve ser um texto' })
  @IsNotEmpty({ message: 'O campo nome deve ser preenchido' })
  name: string;

  @MaxLength(255, {
    message: 'O campo descrição possui muitos caracteres',
  })
  @IsString({ message: 'O campo descrição deve ser um texto' })
  @IsOptional()
  description?: string | null;

  @IsString()
  workspace_id: string;
}

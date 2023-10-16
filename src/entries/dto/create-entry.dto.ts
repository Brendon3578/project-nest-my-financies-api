import {
  IsBoolean,
  IsDateString,
  IsEmpty,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEntryDto {
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

  @IsNotEmpty({ message: 'O campo pago deve ser preenchido' })
  @IsBoolean({ message: 'O campo pago não possui um valor válido' })
  paid: boolean = false;

  @IsDateString({}, { message: 'O campo data, não possui uma data válida' })
  @IsNotEmpty({ message: 'O campo data deve ser preenchido' })
  date: Date;

  @Min(0.01, { message: 'O valor não pode ser menor que 0' })
  @Max(999999.99, { message: 'O valor não pode ser maior que 1 milhão' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Valor numérico inválido' })
  @IsNotEmpty({ message: 'O campo valor deve ser preenchido' })
  value: number;

  @IsString({ message: 'O campo tipo deve ser um texto' })
  @IsNotEmpty({ message: 'O campo tipo deve ser preenchido' })
  @IsIn(['receita', 'despesa'])
  type: string;

  @IsInt({ message: 'Categoria preenchida indevidamente' })
  @IsNotEmpty({ message: 'Categoria não preenchida' })
  category_id: number;
}

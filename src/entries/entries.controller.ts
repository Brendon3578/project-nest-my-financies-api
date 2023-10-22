import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  NotFoundException,
  Query,
  ParseBoolPipe,
  UseGuards,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('entries')
@UseGuards(JwtAuthGuard)
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entriesService.create(createEntryDto);
  }

  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @Get('paid')
  findAllPaid(@Query('paid', ParseBoolPipe) paid: boolean) {
    return this.entriesService.findAllPaid(paid);
  }

  @Get()
  findAllByAuthorId(@Query('author') author_id: string) {
    return this.entriesService.findAllByAuthorId(author_id);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: string) {
    const entry = await this.entriesService.findOneById(+id);
    if (!entry)
      throw new NotFoundException(`Entrada com o id: ${id} não existe.`);
    return entry;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateEntryDto: UpdateEntryDto,
  ) {
    return this.entriesService.update(+id, updateEntryDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.entriesService.remove(+id);
  }
}

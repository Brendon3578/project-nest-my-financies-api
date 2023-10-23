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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntryEntity } from './entities/entry.entity';

@Controller('entries')
@UseGuards(JwtAuthGuard)
@ApiTags('entries')
@ApiBearerAuth()
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  @ApiCreatedResponse({ type: EntryEntity })
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entriesService.create(createEntryDto);
  }

  @Get()
  @ApiOkResponse({ type: EntryEntity, isArray: true })
  findAll() {
    return this.entriesService.findAll();
  }

  @Get('paid')
  @ApiOkResponse({ type: EntryEntity, isArray: true })
  findAllPaid(@Query('paid', ParseBoolPipe) paid: boolean) {
    return this.entriesService.findAllPaid(paid);
  }

  @Get()
  @ApiOkResponse({ type: EntryEntity, isArray: true })
  findAllByAuthorId(@Query('author') author_id: string) {
    return this.entriesService.findAllByAuthorId(author_id);
  }

  @Get(':id')
  @ApiOkResponse({ type: EntryEntity })
  async findOneById(@Param('id', ParseIntPipe) id: string) {
    const entry = await this.entriesService.findOneById(+id);
    if (!entry)
      throw new NotFoundException(`Entrada com o id: ${id} não existe.`);
    return entry;
  }

  @Patch(':id')
  @ApiOkResponse({ type: EntryEntity })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateEntryDto: UpdateEntryDto,
  ) {
    return this.entriesService.update(+id, updateEntryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ type: EntryEntity })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.entriesService.remove(+id);
  }
}

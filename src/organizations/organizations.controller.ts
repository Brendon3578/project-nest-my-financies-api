import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OrganizationEntity } from './entities/organization.entity';
import { UserOnOrganizationEntity } from './entities/user-on-organization.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
import { OrganizationUsersEntity } from './entities/organization-users.entity';
import { EntryEntity } from '../entries/entities/entry.entity';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
@ApiTags('organizations')
@ApiBearerAuth()
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: '' })
  @ApiCreatedResponse({ type: OrganizationEntity })
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Get()
  @ApiOkResponse({ type: OrganizationEntity, isArray: true })
  findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: OrganizationEntity })
  findOneById(@Param('id') id: string) {
    return this.organizationsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: OrganizationEntity })
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }

  // user relationship
  @Get(':id/users')
  @ApiOperation({ summary: 'List all users in organization' })
  @ApiOkResponse({ type: OrganizationUsersEntity, isArray: true })
  findAllUsersInOrganization(@Param('id') organization_id: string) {
    return this.organizationsService.findAllUsersInOrganization(
      organization_id,
    );
  }

  @Post(':id/users/:user-id')
  @ApiOperation({ summary: 'Join user on organization' })
  @ApiCreatedResponse({ type: UserOnOrganizationEntity })
  async createUserOnOrganization(
    @Param('id') organization_id: string,
    @Param('user-id') user_id: string,
  ) {
    return this.organizationsService.createUserInOrganization(
      organization_id,
      user_id,
    );
  }

  @Delete(':id/users/:user-id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove user from organization' })
  @ApiNoContentResponse()
  async deleteUserFromOrganization(
    @Param(':id') organization_id: string,
    @Param(':user-id') user_id: string,
  ) {
    return this.organizationsService.removeUserFromOrganization(
      organization_id,
      user_id,
    );
  }

  // categories relationships
  @Get(':id/categories')
  @ApiOperation({ summary: 'Find all categories in organization' })
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  findAllCategoriesInOrganization(@Param('id') organization_id: string) {
    return this.organizationsService.findAllCategoriesByOrganization(
      organization_id,
    );
  }

  // entries relationships
  @Get(':id/entries')
  @ApiOperation({ summary: 'Find all entries in organization' })
  @ApiOkResponse({ type: EntryEntity, isArray: true })
  findAllEntriesInOrganization(@Param('id') organization_id: string) {
    return this.organizationsService.findAllEntriesByOrganization(
      organization_id,
    );
  }

  // TODO:
  // - update entry endpoint to /:workspace_id/entries
  // - update categories endpoint to /:workspace_id/categories
}

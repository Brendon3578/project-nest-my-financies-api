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
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WorkspaceEntity } from './entities/workspace.entity';
import { UserOnWorkspaceEntity } from './entities/user-on-workspace.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CategoryEntity } from '../categories/entities/category.entity';

@Controller('workspaces')
@UseGuards(JwtAuthGuard)
@ApiTags('workspaces')
@ApiBearerAuth()
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  @ApiCreatedResponse({ type: WorkspaceEntity })
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspacesService.create(createWorkspaceDto);
  }

  @Get()
  @ApiOkResponse({ type: WorkspaceEntity, isArray: true })
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: WorkspaceEntity })
  findOneById(@Param('id') id: string) {
    return this.workspacesService.findOneById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: WorkspaceEntity })
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspacesService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(id);
  }

  // user relationship
  @Get(':id/users')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAllUsersInWorkspace(@Param('id') workspace_id: string) {
    return this.workspacesService.findAllUsersInWorkspace(workspace_id);
  }

  @Post(':id/users/:user-id')
  @ApiCreatedResponse({ type: UserOnWorkspaceEntity })
  async createUserOnWorkspace(
    @Param('id') workspace_id: string,
    @Param('user-id') user_id: string,
  ) {
    return this.workspacesService.createUserInWorkspace(workspace_id, user_id);
  }

  @Delete(':id/users/:user-id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  async deleteUserFromWorkspace(
    @Param(':id') workspace_id: string,
    @Param(':user-id') user_id: string,
  ) {
    return this.workspacesService.removeUserFromWorkspace(
      workspace_id,
      user_id,
    );
  }

  // categories relationships
  @Get(':id/categories')
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  findAllCategoriesInWorkspace(@Param('id') workspace_id: string) {
    return this.workspacesService.findAllCategoriesInWorkspace(workspace_id);
  }
}

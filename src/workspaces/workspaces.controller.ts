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

@Controller('workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspacesService.create(createWorkspaceDto);
  }

  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.workspacesService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspacesService.update(id, updateWorkspaceDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(id);
  }

  // user relationship
  @Get(':id/users')
  findAllUsersInWorkspace(@Param('id') id: string) {
    return this.workspacesService.findAllUsersInWorkspace(id);
  }

  @Post(':id/users/:user-id')
  async createUserOnWorkspace(
    @Param('id') workspace_id: string,
    @Param('user-id') user_id: string,
  ) {
    return this.workspacesService.createUserInWorkspace(workspace_id, user_id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/users/:user-id')
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
  findAllCategoriesInWorkspace(@Param('id') id: string) {
    return this.workspacesService.findAllCategoriesInWorkspace(id);
  }
}

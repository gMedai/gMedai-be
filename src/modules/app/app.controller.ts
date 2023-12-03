import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import {Request as ExpressRequest} from 'express'

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Check health
  @ApiOperation({
    description: 'For metrics server health checking',
    summary: AppController.prototype.checkHealth.name,
  })
  @ApiOkResponse({
    description: 'Return OK',
    content: {
      'application/json': {
        example: {
          data: 'OK',
        },
      },
    },
  })
  @UseGuards(AuthGuard('cognito'))
  @Get(AppController.prototype.checkHealth.name)
  checkHealth(@Request() request: ExpressRequest): string {
    console.log(request.user)
    return this.appService.checkHealth();
  }
}

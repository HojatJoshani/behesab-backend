import { Controller, Get, Post, Body, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@Req() req) {
    return this.transactionsService.findAll(req.user.sub);
  }

  @Post()
  create(@Req() req, @Body() body) {
    return this.transactionsService.create(req.user.sub, body);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.transactionsService.remove(id, req.user.sub);
  }
}

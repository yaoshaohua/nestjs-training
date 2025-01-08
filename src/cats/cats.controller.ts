import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Header, HttpCode, Redirect, HostParam, HttpException, HttpStatus, UseFilters, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }
  // @Post()
  // async create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
  //   const createdCat = await this.catsService.create(createCatDto);
  //   return res.status(HttpStatus.CREATED).json(createdCat)
  // }

  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      message: 'ok',
      data: [{
        id: 1,
        name: 'cat1'
      }]
    })
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: any) {
    console.log(params);
    return this.catsService.findOne(+params.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect() {}
}

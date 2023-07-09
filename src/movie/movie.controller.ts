import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(
    @Query('searchBy') searchBy: string,
    @Query('searchValue') searchValue: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ) {
    return this.movieService.findAll(searchBy, searchValue, page, size);
  }

  @Get(':id')
  getMovieById(@Query('id', ParseIntPipe) id: number) {
    return this.movieService.findMovieById(id);
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Patch(':id')
  updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  deleteMovie(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.softDelete(id);
  }

  @Patch(':id/restore')
  restoreMovie(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.restore(id);
  }
}

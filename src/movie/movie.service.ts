import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import isSupportedSearchOption from './utils/movie_search_option';
import movieSchema from './schema/movie_schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: any) {
    console.log('createMovieDto', createMovieDto);
    const { error } = movieSchema.validate(createMovieDto);
    if (error) {
      throw new Error(error.message);
    }
    return this.movieRepository.save(createMovieDto);
  }

  findAll(
    searchBy: string,
    searchValue: string,
    page: number,
    size: number,
  ): Promise<Movie[]> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    queryBuilder.orderBy('movie.id');
    if (isSupportedSearchOption(searchBy)) {
      queryBuilder.where(`movie.${searchBy} LIKE :searchValue`, {
        searchValue: `%${searchValue}%`,
      });
    }
    const skip = (page - 1) * size;
    queryBuilder.skip(skip).take(size);
    queryBuilder.andWhere('movie.deleted_at IS NULL');
    return queryBuilder.getMany();
  }

  async findMovieById(id: number): Promise<Movie> {
    return this.movieRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMovieDto: any): Promise<Movie> {
    const movie = await this.findMovieById(id);
    if (!movie || movie.deleted_at) {
      throw new Error('Movie not found');
    }
    return this.movieRepository.save({ ...movie, ...updateMovieDto });
  }

  async softDelete(id: number): Promise<Movie> {
    const movie = await this.findMovieById(id);
    if (!movie || movie.deleted_at) {
      throw new Error('Movie not found');
    }
    return this.movieRepository.save({ ...movie, deleted_at: new Date() });
  }

  async restore(id: number): Promise<Movie> {
    const movie = await this.findMovieById(id);
    if (!movie || !movie.deleted_at) {
      throw new Error('Movie not found');
    }
    return this.movieRepository.save({ ...movie, deleted_at: null });
  }
}

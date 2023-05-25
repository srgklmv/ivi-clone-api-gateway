import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Observable } from 'rxjs';
import { MoviesResponseDto } from './dto/movies-response.dto';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { MovieResponseDto } from './dto/movie-response.dto';
import { DeleteMovieResponseDto } from './dto/delete-movie-response.dto';

@Injectable()
export class MoviesService {
  constructor(@Inject('ToMoviesMs') private moviesRmqProxy: ClientProxy) {}

  async getMovies(
    movieFilterDto: MovieFilterDto,
  ): Promise<Observable<MoviesResponseDto>> {
    console.log('API Gateway - Movies Service - getMovies at', new Date());
    return this.moviesRmqProxy.send<MoviesResponseDto>(
      { cmd: 'getMovies' },
      { movieFilterDto: movieFilterDto },
    );
  }

  async getMovieById(movieId: number): Promise<Observable<MovieResponseDto>> {
    console.log('API Gateway - Movies Service - getMovieById at', new Date());
    return this.moviesRmqProxy.send<MovieResponseDto>(
      { cmd: 'getMovieById' },
      { movieId: movieId },
    );
  }

  async deleteMovie(
    movieId: number,
  ): Promise<Observable<DeleteMovieResponseDto>> {
    console.log('API Gateway - Movies Service - deleteMovie at', new Date());
    return this.moviesRmqProxy.send<DeleteMovieResponseDto>(
      { cmd: 'deleteMovie' },
      { movieId: movieId },
    );
  }

  async updateMovie(
    movieId: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<object> {
    console.log('API Gateway - Movies Service - updateMovie at', new Date());
    return this.moviesRmqProxy.send<object>(
      { cmd: 'updateMovie' },
      { movieId: movieId, updateMovieDto: updateMovieDto },
    );
  }

  async createMovie(createMovieDto: any) {
    console.log('API Gateway - Movies Service - createMovie at', new Date());
    return this.moviesRmqProxy.send<object>(
      { cmd: 'createMovie' },
      { createMovieDto: createMovieDto },
    );
  }

  fillCountries() {
    return this.moviesRmqProxy.send({ cmd: 'fillCountries' }, {});
  }
}

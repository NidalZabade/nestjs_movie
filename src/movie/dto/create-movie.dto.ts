export class CreateMovieDto {
  id: number;
  title: string;
  release_year: number;
  director_id: number;
  duration: number;
  stream_start_date: Date;
  stream_end_date: Date;
  deleted_at: Date;
}

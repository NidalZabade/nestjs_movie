export class CreateHistoryDto {
  id: number;
  user_id: number;
  movie_id: number;
  watching_time: number;
  is_completed: boolean;
  deleted_at: Date;
}

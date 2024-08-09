export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  limit: number;
  hasNext: boolean;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: boolean;
  created_at?: string;
}

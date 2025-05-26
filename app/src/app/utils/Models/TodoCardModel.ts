export interface todoCardInterface {
  id: number;
  title: string;
  description: string;
  category_name: string;
  category_id: number;
  user_id: number;

  dueDate: string;
  dueTime: string;

  priority: string;
  isCompleted: boolean;
}

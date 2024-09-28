export interface UpdatePost {
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  ulHandler: string;
  publishAt: Date;
  authorAt: string;
  isVisible: boolean;
  categories: string[];
}

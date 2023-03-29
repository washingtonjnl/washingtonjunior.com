export type ProjectTypes = 'design' | 'research';
export type VisibilityStatus = 'soon' | 'free' | 'restrict';

export interface Project {
  id: string;
  title: string;
  preview: string;
  client: string;
  slug: string;
  tags: string[];
  images: Array<{
    name: string;
    url: string;
  }>;
  theme_color: string;
  published: boolean;
  type: ProjectTypes;
  visibility: VisibilityStatus;
  date: number;
}

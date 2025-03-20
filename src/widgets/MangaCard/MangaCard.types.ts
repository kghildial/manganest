export interface IMangaCard extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  chapter: number;
  timestamp: string;
}

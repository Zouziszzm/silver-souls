export type SliverType = "Quote" | "Poem" | "Literature" | "Essay";

export interface Sliver {
  id: string;
  type: SliverType;
  title?: string; // Optional title for Poems/Literature
  content: string;
  author: string;
  prestige: number;
  tags: string[];
}

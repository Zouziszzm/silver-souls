export type SliverType = "Quote" | "Poem" | "Literature" | "Essay";

export interface Sliver {
  id: string;
  type: SliverType;
  content: string;
  author: string;
  prestige: number;
  tags: string[];
}

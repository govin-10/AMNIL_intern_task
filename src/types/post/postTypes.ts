export interface post {
  id: number;
  title: string;
  body: string;
  tags?: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface postState {
  posts: post[];
  loading: boolean;
  error: string | null;
  nextId: number;
}

import { Project } from "@/entities/Project";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  description?: string;
  avatarUrl?: string;
  githubUrl?: string;
  linkInUrl?: string;
  projects?: {
    edges: { node: Project }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

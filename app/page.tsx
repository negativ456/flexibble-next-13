import { Project, ProjectCardList } from "@/entities/Project";
import { fetchAllProjects } from "@/shared/api/api";

interface FetchProjectsRes {
  projectSearch: {
    edges: {
      node: Project;
    }[];
    pageInfo: {
      hasPreviousPage: boolean;
      basNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}
const HomePage = async () => {
  const data = await fetchAllProjects<FetchProjectsRes>();
  const projectsNodes = data?.projectSearch.edges ?? [];

  if (projectsNodes.length === 0) {
    return (
      <section className={"flexStart flex-col paddings"}>
        <p className={"no-result-text text-center"}>
          No projects found, go and create some first.
        </p>
      </section>
    );
  }

  return (
    <section className={"flex-start flex-col paddings mb-16"}>
      <h1>Cate</h1>
      <ProjectCardList projectsNodes={projectsNodes} />
    </section>
  );
};

export default HomePage;

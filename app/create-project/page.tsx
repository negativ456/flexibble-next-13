import { Modal } from "@/shared/ui/Modal/Modal";
import { getCurrentUser } from "@/app/providers/AuthProvider/config/session";
import { ProjectForm, ProjectFormTypes } from "@/features/ProjectForm";
import { redirect } from "next/navigation";

const CreateProjectPage = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");
  return (
    <Modal>
      <h3 className={"modal-head-text"}>Create a new project</h3>
      <ProjectForm type={ProjectFormTypes.CREATE} session={session} />
    </Modal>
  );
};

export default CreateProjectPage;

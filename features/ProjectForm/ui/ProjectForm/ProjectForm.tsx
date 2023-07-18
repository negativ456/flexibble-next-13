"use client";
import { SessionInterface } from "@/app/types/session";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import { Input } from "@/shared/ui/Input/Input";
import { ProjectSelect } from "@/entities/Project";
import { Form } from "@/features/ProjectForm/model/types/form";
import { Button } from "@/shared/ui/Button/Button";
import PlusIcon from "@/shared/assets/plus.svg";
import { useRouter } from "next/navigation";
import { ProjectFormTypes } from "../../const/projectFormTypes";
import { createNewProject, fetchToken } from "@/shared/api/api";

interface ProjectFormProps {
  type: ProjectFormTypes;
  session: SessionInterface;
}
export const ProjectForm = ({ type, session }: ProjectFormProps) => {
  const [form, setForm] = useState<Form>({
    image: "",
    title: "",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(session);
    setIsLoading(true);
    const { token } = await fetchToken();
    try {
      if (type === ProjectFormTypes.CREATE) {
        await createNewProject(form, session.user.id, token);
        // router.push("");
      }
    } catch (e) {
      throw e;
    }
  };
  const onChangeForm = (fieldName: keyof Form, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };
  const buttonText = useMemo(() => {
    switch (type) {
      case ProjectFormTypes.CREATE:
        if (isLoading) return "Creating";
        else return "Create";
      case ProjectFormTypes.EDIT:
        if (isLoading) return "Editing";
        else return "Edit";
    }
  }, [isLoading, type]);
  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      return alert("Please upload an image");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      onChangeForm("image", result);
    };
  };
  return (
    <form onSubmit={onSubmit} className={"flexStart form"}>
      <div className={"flexStart form_image-container"}>
        <label htmlFor="poster" className={"flexCenter form_image-label"}>
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id={"image"}
          accept={"image/*"}
          className={"form_image-input"}
          type={"file"}
          onChange={onChangeImage}
        />
        {form.image && (
          <Image
            className="sm:p-10 object-contain z-20"
            src={form?.image}
            alt={"Project poster"}
            fill
          />
        )}
      </div>
      <Input
        label={"Title"}
        onChange={(value) => onChangeForm("title", value)}
        value={form.title}
        placeholder={"Flexibble"}
      />
      <Input
        label={"Description"}
        onChange={(value) => onChangeForm("description", value)}
        value={form.description}
        placeholder={"Desc"}
      />
      <Input
        label={"Website URL"}
        type={"url"}
        onChange={(value) => onChangeForm("liveSiteUrl", value)}
        value={form.liveSiteUrl}
        placeholder={"http://example.com"}
      />
      <Input
        label={"Github Url"}
        onChange={(value) => onChangeForm("githubUrl", value)}
        value={form.githubUrl}
        placeholder={"http://github.com"}
      />

      <ProjectSelect
        onChange={(value) => onChangeForm("category", value)}
        value={form.category}
      />
      <div className="flexStart w-full">
        <Button
          title={buttonText}
          type={"submit"}
          disabled={isLoading}
          leftIcon={isLoading && PlusIcon}
        />
      </div>
    </form>
  );
};

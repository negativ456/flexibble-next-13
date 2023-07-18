"use client";
import { Project } from "../../model/types/project";
import Link from "next/link";
import Image from "next/image";
import HeartIcon from "@/shared/assets/hearth.svg";
import EyeIcon from "@/shared/assets/eye.svg";

interface ProjectCardProps {
  card: Project;
}
export const ProjectCard = ({ card }: ProjectCardProps) => {
  const { title, id, image, createdBy } = card;
  return (
    <div className={"flexCenter flex-col rounded-2xl drop-shadow-card"}>
      <Link
        href={`/project/${id}`}
        className={"flexCenter group relative w-full h-full"}
      >
        <Image
          src={image}
          alt={"project"}
          width={414}
          height={314}
          className={"w-full h-full object-cover rounded-2xl"}
        />
        <div className={"hidden group-hover:flex profile_card-title"}>
          <p>{title}</p>
        </div>
      </Link>
      <div className={"flexBetween w-full px-2 mt-3 font-semibold text-sm"}>
        <Link href={`/profile/${createdBy.id}`}>
          <div className={"flexCenter gap-2"}>
            <Image
              src={createdBy.avatarUrl}
              alt={"avatar"}
              width={24}
              height={24}
              className={"rounded-full"}
            />
            <p>{createdBy.name}</p>
          </div>
        </Link>
        <div className={"flexCenter gap-3"}>
          <div className={"flexCenter gap-2"}>
            <Image src={HeartIcon} alt={"heart"} width={13} height={13} />
            <p className={"text-sm"}>525</p>
          </div>
          <div className={"flexCenter gap-2"}>
            <Image src={EyeIcon} alt={"eye"} width={13} height={13} />
            <p className={"text-sm"}>5.2k</p>
          </div>
        </div>
      </div>
    </div>
  );
};

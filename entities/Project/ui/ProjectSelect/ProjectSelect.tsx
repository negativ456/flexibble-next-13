import Select from "@/shared/ui/Select/Select";
import { categoryFilters } from "@/entities/Project/model/const/categoryFilters";

interface ProjectSelectProps<T> {
  onChange: (value: T) => void;
  value: T;
}

export const ProjectSelect = <T extends string>({
  value,
  onChange,
}: ProjectSelectProps<any>) => {
  return (
    <Select
      value={value}
      options={categoryFilters}
      onChange={onChange}
      label={"Category"}
    />
  );
};

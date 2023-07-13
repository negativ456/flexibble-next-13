import Link from "next/link";

interface FooterColumnProps {
  title: string
  links: string[]
}
export const FooterColumn = ({ title, links }: FooterColumnProps) => {
  return (
      <div className={'footer_column'}>
        <h4 className={'font-semibold'}>{title}</h4>
          <ul className={'flex flex-col gap-2 font-normal'}>
            {links.map((link, index) => (
                <Link href={'/'} key={index}>{link}</Link>
            ))}
          </ul>
          </div>
  );
};

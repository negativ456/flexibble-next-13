import Image from "next/image";
import LogoIcon from "@/shared/assets/logo-purple.svg";
import { FooterColumn } from "@/widgets/Footer/ui/FooterColumn/FooterColumn";
import { footerLinks } from "@/widgets/Footer/model/const/footerLinks";
export const Footer = () => {
  return (
    <footer className={"flexStart footer"}>
      <div className={"flex flex-col gap-12 w-full"}>
        <div className={"flex items-start flex-col"}>
          <Image src={LogoIcon} alt={"logo"} />
          <p className={"text-start text-sm font-normal mt-5 max-w-xs"}>
            Flexibble is the world`s leading community for creatives to share,
            grow and get hired.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          {footerLinks.map(({ title, links }, index) => (
            <FooterColumn key={index} title={title} links={links} />
          ))}
        </div>
      </div>
      <div className="flexBetween footer_copyright">
        <p>@ 2023 Flexibble. All rights reserved</p>
        <p className="text_gray">
          <span className="text_black font-semibold">10 246</span>projects
          submitted
        </p>
      </div>
    </footer>
  );
};

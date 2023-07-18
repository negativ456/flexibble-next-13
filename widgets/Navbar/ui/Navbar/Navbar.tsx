import Link from "next/link";
import Image from "next/image";
import LogoIcon from "@/shared/assets/logo.svg";
import { navLinks } from "@/widgets/Navbar/model/const/navLinks";
import { AuthProviders } from "@/widgets/Navbar/ui/AuthProviders/AuthProviders";
import { getCurrentUser } from "@/app/providers/AuthProvider/config/session";
import { ProfileMenu } from "@/widgets/Navbar/ui/ProfileMenu/ProfileMenu";

export const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className={"navbar flexBetween"}>
      <div className={"flex-1 flexStart gap-10"}>
        <Link href={"/"}>
          <Image src={LogoIcon} width={115} height={43} alt={"logo"} />
        </Link>
        <ul className={"xl:flex hidden text-small gap-7"}>
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.name}
            </Link>
          ))}
        </ul>
      </div>
      <div className={"flexCenter gap-4"}>
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href={"/create-project"}>Share work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

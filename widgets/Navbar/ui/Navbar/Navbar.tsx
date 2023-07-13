import Link from "next/link";
import Image from "next/image";
import LogoIcon from '@/shared/assets/logo.svg'
import {navLinks} from "@/widgets/Navbar/model/const/navLinks";

export const Navbar = () => {
  const session = {}
  return (
      <nav className={'navbar flexBetween'}>
        <div className={'flex-1 flexStart gap-10'}>
          <Link href={'/'}>
            <Image src={LogoIcon} width={115} height={43} alt={'logo'}/>
          </Link>
          <ul className={'xl:flex hidden text-small gap-7'}>
            {navLinks.map(link => (
                <Link href={link.href} key={link.href}>{link.name}</Link>
            ))}
          </ul>
        </div>
        <div className={'flexCenter gap-4'}>
          {
            session ? (
                <>
                  User photo
                  <Link href={'/create-project'}>
                    Share work
                  </Link>
                </>
            ) : (
                <div></div>
            )
          }
        </div>
      </nav>
  );
};

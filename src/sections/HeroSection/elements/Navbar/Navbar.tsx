import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import logo from "@/app/designSystem/images/imt-logooo.png";
import { Divider } from "@/shared/components/Divider";
import { Button } from "@/shared/components/Button";

type NavbarLink = {
  name: string;
  href: string;
};

type NavbarProps = {
  links: NavbarLink[];
};

export const Navbar = ({ links }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image src={logo} alt="Marketing" width={100} height={50} priority />
      </Link>

      <div className={styles.navLinks}>
        {links.map((link) => (
          <Button
            key={link.href}
            type="button"
            variant="text"
            size="md"
            onClick={() => {
              const sectionId = link.href.split("#")[1];

              document.getElementById(sectionId)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {link.name}
          </Button>
        ))}
      </div>

      <div className={styles.divider}>
        <Divider size={2} />
      </div>
    </nav>
  );
};

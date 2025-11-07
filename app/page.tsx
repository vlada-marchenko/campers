import css from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className={css.container}>
        <Image
          src="/images/background.png"
          alt="Background"
          fill
          className={css.backgroundImage}
          priority
        />
        <div>
          <div className={css.content}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <h3 className={css.text}>
              You can find everything you want in our catalog
            </h3>
            <Link href="/catalog" className={css.button}>
              View now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

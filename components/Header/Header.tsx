"use client";
import Icon from "../Icon/Icon";
import Link from "next/link";
import css from "./Header.module.css";
import { useState, useEffect } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "auto";
  }, [openMenu]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.classList.contains(css.overlay)
    ) {
      setOpenMenu(false);
    }
  };

  return (
    <>
      <header className={css.header}>
        <Link href="/" className={css.logo_cont}>
          <Icon name={"logo"} width={136} height={16} />
        </Link>
        <nav className={css.nav}>
          <ul className={css.nav_list}>
            <li className={css.item}>
              <Link href="/" className={css.text}>
                Home
              </Link>
            </li>
            <li className={css.item}>
              <Link href="/catalog" className={css.text}>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
        <button className={css.menu} onClick={() => setOpenMenu(!openMenu)}>
          <Icon name={"menu"} width={20} height={20} />
        </button>
        {openMenu && (
          <div className={css.overlay} onClick={handleOverlayClick}>
            <div className={css.mob_menu}>
              <nav className={css.nav_mob}>
                <ul className={css.nav_list_mob}>
                  <li className={css.item_mob} >
                    <Link href="/" className={css.text_mob} onClick={() => setOpenMenu(false)}>
                      Home
                    </Link>
                  </li>
                  <li className={css.item_mob} >
                    <Link href="/catalog" className={css.text_mob} onClick={() => setOpenMenu(false)}>
                      Catalog
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

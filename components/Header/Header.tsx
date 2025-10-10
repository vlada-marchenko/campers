import Icon from '../Icon/Icon'
import Link from 'next/link'
import css from './Header.module.css'

export default function Header() {
    return (
        <>
        <header className={css.header}>
                <Link href='/' className={css.logo_cont}>
                  <Icon name={'logo'} width={136} height={16}/>
                </Link>
                <nav >
                    <ul className={css.nav}>
                        <li className={css.item}>
                            <Link href='/' className={css.text}>Home</Link>
                        </li>
                        <li className={css.item}>
                            <Link href='/catalog' className={css.text}>Catalog</Link>
                        </li>
                    </ul>
                </nav>
        </header>
        </>
    )
}
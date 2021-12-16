import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { magic } from '../../lib/magic-client';
import Logo from '../../public/static/netflix.svg';
import Avatar from '../../public/static/netflix-avatar.png';
import styles from './navbar.module.scss';

const NavBar = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [didToken, setDidToken] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();
        if (email) {
          setUsername(email);
          setDidToken(didToken);
        }
      } catch (error) {
        console.error('Error retrieving email', error);
      }
    }
    getUser();
  },[])

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
  }

  const handleOnClickList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');
  }

  const handleOnClickSignOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

    } catch (error) {
      console.error("Error logging out", error);
      router.push("/signin");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoWrapper}>
            <Image
              src={Logo}
              alt="netflix logo"
              layout='responsive'
              width={80}
              height={25}
            />
          </a>
        </Link>
        <ul className={styles.navWrapper}>
          <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
          <li className={styles.navItem} onClick={handleOnClickList}>My List</li>
        </ul>
        <div className={styles.dropdownContainer}>
          <div className={styles.btnWrapper}>
            <button className={styles.avatarBtn}>
              <Image
                src={Avatar}
                alt="netflix avatar"
                width={30}
                height={30}
              />
            </button> 
            <div className={styles.dropdownWrapper}>
              <a>{username}</a>
              <a className={styles.linkName} onClick={handleOnClickSignOut}>Sign Out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
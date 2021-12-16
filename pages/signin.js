import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { magic } from '../lib/magic-client';
import Logo from '../public/static/netflix.svg';
import styles from '../styles/Signin.module.scss';

const Signin = () => {
  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

   useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  
  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    setEmail(e.target.value);
  }

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      try {
        const didToken = await magic.auth.loginWithMagicLink({ email });

        if (didToken) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });
          const loggedInResponse = await response.json();
          if (loggedInResponse.done) {
            router.push("/");
          } else {
            setIsLoading(false);
            setUserMsg("Something went wrong logging in");
          }
        }
      } catch(error) {
        console.error("Something went wrong logging in", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setUserMsg("Enter a valid email address");
    }
    
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix SignIn</title>
      </Head>

      <header>
        <div className={styles.headerWrapper}>  
          <div className={styles.logoWrapper}>
            <Image src={Logo} alt="netflix logo" width={160} height={40}/>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h2 className={styles.title}>Sign In</h2>
          <label className={styles.inputWrapper}>
            <input className={styles.inputField} type="text" value={email} placeholder=' ' onChange={handleOnChangeEmail}/>
            <span className={styles.inputLabel}>Email</span>
          </label>
          {userMsg && <p className={styles.userMsg}>{userMsg}</p>}
          <button
            onClick={handleLoginWithEmail}
            className={styles.signinBtn}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Signin;
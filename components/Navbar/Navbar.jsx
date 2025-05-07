"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link href="/" style={styles.logo}>
        MyApp
      </Link>
      <div style={styles.navRight}>
        {isLoggedIn ? (
          <div style={styles.avatarMenu}>
            <img
              src="https://i.pravatar.cc/30"
              alt="Profile"
              style={styles.avatar}
              onClick={handleLogout}
              title="Click to logout"
            />
          </div>
        ) : (
          <>
            <Link href="/login" style={styles.button}>
              Login
            </Link>
            <Link href="/register" style={styles.button}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ccc",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#333",
  },
  navRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  button: {
    textDecoration: "none",
    padding: "6px 12px",
    border: "1px solid #333",
    borderRadius: "4px",
    color: "#333",
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};

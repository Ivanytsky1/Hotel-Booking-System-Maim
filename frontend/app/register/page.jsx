useEffect(() => {
  const isAuth = localStorage.getItem("auth") === "true";
  if (!isAuth) router.replace("/login");
}, [router]);


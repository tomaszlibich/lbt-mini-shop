export const getLogin = async (req, res) => {
  res.render("auth/login", {
    errorMessage: undefined,
    isAuthenticated: req.session.isLoggedIn,
    theme: "light",
  });
};

export const getLogout = async (req, res) => {
  res.render("auth/logout", {
    isAuthenticated: false,
    message: "You've been logged out successfully.",
    theme: "light",
  });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin@admin.com" && password === "admin") {
    req.session.isLoggedIn = true;
    return res.redirect("/admin");
  }

  if (username === "t.libich@gmail.com" && password === "xyz") {
    req.session.isLoggedIn = true;
    return res.redirect("/");
  }

  req.session.isLoggedIn = false;

  res.render("auth/login", {
    errorMessage: "Incorrect username or password.",
    isAuthenticated: false,
    theme: "light",
  });
};

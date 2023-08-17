export const authorizeAdmin = async (req, res, next) => {
  try {
    const userRole = req.user.role.label;
    if (userRole === "admin") {
      return next();
    }
    throw new Error("You are not authorized to view this page")
  } catch (e) {
    return res.redirect("back");
  }
};

export const authorizeInfluencer = async (req, res, next) => {
  try {
    const userRole = req.user.role.id;
    if (userRole >= 2) {
      return next();
    }
    throw new Error("You are not authorized to view this page")
  } catch (e) {
    return res.redirect("back");
  }
};
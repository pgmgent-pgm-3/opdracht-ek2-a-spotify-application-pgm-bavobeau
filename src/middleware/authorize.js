export const authorizeAdmin = async (req, res, next) => {
  try {
    const userRole = req.user.role.id;
    if (userRole === 1) {
      return next();
    }
    throw new Error("You are not authorized to view this page")
  } catch (e) {
    return res.redirect("back");
  }
};

export const authorizeEditor = async (req, res, next) => {
  try {
    const userRole = req.user.role.id;
    if (userRole <= 2) {
      return next();
    }
    throw new Error("You are not authorized to view this page")
  } catch (e) {
    return res.redirect("back");
  }
};
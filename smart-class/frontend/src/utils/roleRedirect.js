export function getDashboardByRole(role) {
  switch (role) {
    case "SUPER_ADMIN":
      return "/super-admin";

    case "ADMIN":
      return "/admin";

    case "TEACHER":
      return "/teacher";

    case "STUDENT":
      return "/student";

    case "PARENT":
      return "/parent";

    default:
      return "/";
  }
}

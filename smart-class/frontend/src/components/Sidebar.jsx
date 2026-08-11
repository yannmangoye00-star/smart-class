import { useAuth } from "../hooks/useAuth";

import SidebarAdmin from "./SidebarAdmin";
import SidebarTeacher from "./SidebarTeacher";
import SidebarStudent from "./SidebarStudent";
import SidebarParent from "./SidebarParent";

export default function Sidebar() {
  const { role } = useAuth();

  switch ((role || "").toUpperCase()) {
    case "ADMIN":
      return <SidebarAdmin />;

    case "TEACHER":
      return <SidebarTeacher />;

    case "PARENT":
      return <SidebarParent />;

    case "STUDENT":
    default:
      return <SidebarStudent />;
  }
}
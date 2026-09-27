import { redirect } from "next/navigation";

const UserHomePage = () => {
  redirect("/user/dashboard");
};

export default UserHomePage;

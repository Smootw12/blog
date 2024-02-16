import { getAuthSession } from "@/lib/auth";
import LogIn from "./LogIn";
import UserMenu from "./UserMenu";

async function Auth() {
  const session = await getAuthSession();

  return <>{session?.user ? <UserMenu user={session?.user} /> : <LogIn />}</>;
}

export default Auth;

import { getServerSession } from "next-auth";
import { User } from "./user";
import { LoginButton, LogoutButton, ThemeButton } from "@/components/buttons.components";
import { HeroSection } from "@/components/heroSection.component";
import { authOptions } from "@/constants/auth/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      
      <HeroSection />

      <LoginButton />
      <LogoutButton />

      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>

      <h2>Client Session</h2>
      <User />

      <ThemeButton />
    </main>
  );
}

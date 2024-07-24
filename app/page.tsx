import { auth, signOut } from "../auth";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  const session = await auth();

  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {session?.user?(
        <div className="flex items-center flex-col gap-2">
        <h1 className="font-bold">
          Welcome {session && session.user?.email}
        </h1>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">Sign Out</Button>
        </form>
      </div>
      ):
      (
        <div className="min-h-screen grid place-items-center">
        <Tabs defaultValue="register" className="max-w-lg w-full">
          <TabsList className="w-full gap-5">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
        </Tabs>
      </div>
      )}

    </main>
  );
}

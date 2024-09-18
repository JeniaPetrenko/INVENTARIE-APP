// src/app/page.js
import AuthForm from "@/components/AuthForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <AuthForm />
    </main>
  );
}

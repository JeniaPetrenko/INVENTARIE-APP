// src/app/page.js
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <AuthForm />
      </main>
    </div>
  );
}

import Login from "../auth/Login";

export default function Hero() {
  return (
    <section className="flex items-center justify-center w-screen h-screen">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primary sm:text-5xl md:text-6xl lg:text-6xl mb-2">
            BCA Genie
          </h1>
          <p className="mx-auto max-w-[600px] text-lg text-muted-foreground sm:text-xl">
            Your AI-powered assistant for BCA exam preparation
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Login />
          </div>
        </div>
      </div>
    </section>
  );
}

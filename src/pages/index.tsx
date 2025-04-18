import { Inter } from "next/font/google";
import { Button } from "@heroui/react";
import PageHead from "@/components/commons/PageHead";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PageHead title="Home" />

      <Button color="primary" onPress={() => router.push("/products")}>
        Go to Dashboard
      </Button>
    </main>
  );
}

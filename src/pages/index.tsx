import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@heroui/react";
import PageHead from "@/components/commons/PageHead";
import InputFile from "@/components/ui/InputFile";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PageHead title="Home" />

      <InputFile name="Input Image" />

      <Button color="primary" onPress={() => router.push("/admin/dashboard")}>
        Go To Dashboard
      </Button>
    </main>
  );
}

import { LIMIT_DEFAULT } from "@/constants/limit.constants";
import { useRouter } from "next/router";

export function totalPages(total: number | string) {
  const router = useRouter();
  const currentLimit = router.query.limit;

  return Math.ceil(Number(total) / Number(currentLimit || LIMIT_DEFAULT));
}

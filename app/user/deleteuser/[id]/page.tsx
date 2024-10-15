"use client";
import { useDeleteuserMutation } from "@/Redux/featuers/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

async function page({ params }: any) {
  const router = useRouter();
  const [deleteuser, { isSuccess: isAppsSuccess }] = useDeleteuserMutation();
  useEffect(() => {
    deleteuser(params.id);
  },
    [isAppsSuccess]);
  try {
    if (isAppsSuccess) {
      router.push("/user");
      router.replace("/user");
    }
  } catch (e: any) {
    throw new Error(e);
  }
}

export default page;

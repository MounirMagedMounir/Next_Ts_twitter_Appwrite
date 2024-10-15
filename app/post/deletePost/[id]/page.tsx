"use client";
import { useDeletePostMutation } from "@/Redux/featuers/postApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

async function page({ params }: any) {
  const router = useRouter();
  const [deletePost, { isSuccess: isAppsSuccess }] = useDeletePostMutation();
  useEffect(() => {
    deletePost(params.id);
 
  },
    [isAppsSuccess]);
  try {
    if (isAppsSuccess) {
      router.push("/post");
      router.replace("/post");
    }
  } catch (e: any) {
    throw new Error(e);
  }
}

export default page;

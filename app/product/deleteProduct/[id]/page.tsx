"use client";
import { useDeleteProductMutation } from "@/Redux/featuers/productApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

async function page({ params }: any) {
  const router = useRouter();
  const [deleteProduct, { isSuccess: isAppsSuccess }] = useDeleteProductMutation();
  useEffect(() => {
    deleteProduct(params.id);
 
  },
    [isAppsSuccess]);
  try {
    if (isAppsSuccess) {
      router.push("/product");
      router.replace("/product");
    }
  } catch (e: any) {
    throw new Error(e);
  }
}

export default page;

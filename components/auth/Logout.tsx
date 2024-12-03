"use client";
import React from "react";
import { signOut } from "@/helpers/authHelper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const Logout = () => {
    signOut();
    router.push("/login");
  };

  return (
    <>
      <Button onClick={Logout}>Logout</Button>
    </>
  );
};

export default Logout;

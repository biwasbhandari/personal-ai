"use client";
import React from "react";
import { signInWithGithub } from "@/helpers/authHelper";

import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <>
      <Button onClick={signInWithGithub}>Sign In</Button>
    </>
  );
};

export default page;

"use client";
import React from "react";
import { signInWithGithub } from "@/helpers/authHelper";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <>
      <Button onClick={signInWithGithub}>Login</Button>
    </>
  );
};

export default Login;

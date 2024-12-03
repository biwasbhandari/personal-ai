"use client";
import React from "react";
import { signInWithGithub } from "@/helpers/authHelper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const Login = () => {
  return (
    <>
      <Button onClick={signInWithGithub}>
        Login with github <ArrowRight className="h-4" />{" "}
      </Button>
    </>
  );
};

export default Login;

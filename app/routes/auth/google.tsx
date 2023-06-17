import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { authenticator } from "~/util/authenticator.server";

export let loader = () => {
  console.log("running action");
  redirect("/login");
};

export let action = ({ request }: ActionArgs) => {
  console.log("running action");
  return authenticator.authenticate("google", request);
};

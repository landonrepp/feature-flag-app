import type { V2_MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { setup } from "../util/google-auth-strategy.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader(){
  setup();
  return null;
}


export default function Index() {
  useLoaderData();
  return (
    <>
      <div className="text-3xl">Feature flag app</div>
      <Form action="/auth/google" method="post">
        <button>Login with Google</button>
      </Form>
    </>
  );
}

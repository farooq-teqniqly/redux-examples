import { test, expect } from "@playwright/experimental-ct-react";
import App from "../App";

test("component renders Hello World", async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText("Hello World");
});

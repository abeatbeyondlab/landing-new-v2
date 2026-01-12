import index from "./index.html";

Bun.serve({
  routes: {
    "/": index,
  },
  port: 3002
});

console.log("CMS Server running on http://localhost:3002");

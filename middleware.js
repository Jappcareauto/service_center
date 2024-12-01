export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/service_center/:path*"],
};
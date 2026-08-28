import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command, isPreview }) => ({
  // 개발 서버는 /, 빌드와 preview는 Pages 하위 경로를 사용한다 (계획 문서 Task 0).
  base: command === "build" || isPreview ? "/production-distribution-trace-center/" : "/",
  plugins: [react()],
}));

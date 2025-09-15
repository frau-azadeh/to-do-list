import { ConfigProvider } from "antd";
import type { Metadata } from "next";

import { TodoProvider } from "@/context/TodoContext";

import "../styles/fonts.css";
// برای مدیریت تم
import "./globals.css";

export const metadata: Metadata = {
  title: "To Do List",
  description: "This is my app, add delete update my task with this app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ConfigProvider
          direction="rtl"
          theme={{
            token: {
              fontFamily: "Vazir, sans-serif",
              colorPrimary: "#f4f4f5",
              borderRadius: 6,
            },
          }}
        >
          <TodoProvider>{children}</TodoProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}

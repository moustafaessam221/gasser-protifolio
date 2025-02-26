import AuthInitializer from "@/components/AuthInitializer";
import ReduxProvider from "@/components/ReduxProvider";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <AuthInitializer />
      {children}
    </ReduxProvider>
  );
}

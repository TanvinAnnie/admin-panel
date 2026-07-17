interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <>
      {/* Top Header */}

      {/* Navbar */}

      <main>{children}</main>

      {/* Footer */}
    </>
  );
}
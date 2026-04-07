// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <p className="font-bold">Admin</p>
        <nav className="mt-4 space-y-2">
          <a href="/admin">Dashboard</a>
          <a href="/admin/users">Users</a>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

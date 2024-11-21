import SideNav from "@/components/SideNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col md:flex-row md:overflow-hidden">
      <aside className="w-20 flex-none md:border-r lg:w-64">
        <SideNav />
      </aside>
      <main className="mx-auto mt-12 w-full max-w-7xl flex-1 flex-grow sm:p-6 md:mt-0 md:overflow-y-auto md:p-12">
        {children}
      </main>
    </div>
  );
}

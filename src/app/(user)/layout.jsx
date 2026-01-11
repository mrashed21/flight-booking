const UserLayout = ({ children }) => {
  return (
    <main className="flex">
      <aside>User Sidebar</aside>
      <section>{children}</section>
    </main>
  );
};

export default UserLayout;

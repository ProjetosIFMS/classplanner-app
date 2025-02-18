import { Header } from "../../_components/header";
const Dashboard = async () => {
  return (
    <section>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg">Dashboard</h1>
      </div>
    </section>
  );
};

export default Dashboard;

import Breadcrumb from '../components/Breadcrumb';
import ChatCard from '../components/ChatCard';
import TableOne from '../components/TableOne';
import DefaultLayout from '../layout/DefaultLayout';



const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tabelas" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <ChatCard />
      </div>
    </DefaultLayout>
  );
};

export default Tables;

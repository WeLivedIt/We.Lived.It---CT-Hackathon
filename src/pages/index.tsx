const Index = () => {
  return null;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/organization', 
      permanent: false, 
    },
  };
};

export default Index;

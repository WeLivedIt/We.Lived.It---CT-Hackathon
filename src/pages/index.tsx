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
// Note

export default Index;

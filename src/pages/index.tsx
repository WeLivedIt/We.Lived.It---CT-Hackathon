const Index = () => {
  return null;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/home', 
      permanent: false, 
    },
  };
};
// Note

export default Index;

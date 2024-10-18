const Index = () => {
  return null;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/organization', // Redirect to your organization page
      permanent: false, // Set to true if the redirect is permanent
    },
  };
};

export default Index;

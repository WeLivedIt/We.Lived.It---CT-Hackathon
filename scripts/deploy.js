async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log('Deploying contract with the account:', deployer.address);
    console.log('Account balance:', (await deployer.getBalance()).toString());
  
    const OrganizationManager = await ethers.getContractFactory('OrganizationManager');
    const organizationManager = await OrganizationManager.deploy();
  
    console.log('OrganizationManager contract deployed to:', organizationManager.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
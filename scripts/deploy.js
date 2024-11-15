require("dotenv").config();
const { ethers } = require("hardhat");

const defiDAOs = [
  {
    id: "0x1A2b3C4d5E6f7890ABcDeF1234567890abCdEf12",
    orgId: "1",
    communityType: "MAKERDAO.AI",
    context: "MakerDAO is a decentralized organization that manages the DAI stablecoin, pegged to the U.S. dollar.",
    hateCategories: ["Respectful Dialogue", "Inclusivity", "Constructive Criticism"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x2A3b4C5d6E7f8901BCdEf1234567890bCdEf1234",
    orgId: "2",
    communityType: "UNISWAP.AI",
    context: "Uniswap is a decentralized exchange protocol managed by Uniswap DAO, focusing on free and open access to financial markets.",
    hateCategories: ["Diversity and Inclusion", "Respectful Discourse", "Transparency"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x3A4b5C6d7E8f9012CDdEf1234567890cDeF12345",
    orgId: "3",
    communityType: "AAVE.AI",
    context: "Aave is a decentralized lending and borrowing platform governed by Aave DAO.",
    hateCategories: ["Fairness", "Collaboration", "Professional Conduct"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x4A5b6C7d8E9f0123DEdEf1234567890dEf123456",
    orgId: "4",
    communityType: "YEARN FINANCE.AI",
    context: "Yearn Finance is a yield-optimizing platform governed by Yearn DAO.",
    hateCategories: ["Respectful Engagement", "Open Communication", "Innovation"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x5A6b7C8d9E0f1234EFdEf1234567890eF1234567",
    orgId: "5",
    communityType: "COMPOUND.AI",
    context: "Compound is a lending protocol where users can earn interest on deposits and borrow assets.",
    hateCategories: ["Responsibility", "Transparency", "Supportive Environment"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x6A7b8C9d0E1f2345FEdEf1234567890fF1234568",
    orgId: "6",
    communityType: "BALANCER.AI",
    context: "Balancer enables decentralized asset pools and automated portfolio management.",
    hateCategories: ["Collaboration", "Inclusivity", "Positive Communication"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x7A8b9C0d1E2f3456GEDf1234567890gF1234569",
    orgId: "7",
    communityType: "SUSHISWAP.AI",
    context: "SushiSwap is a decentralized exchange and yield farming platform.",
    hateCategories: ["Diversity", "Respect", "Community Support"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x8A9b0C1d2E3f4567HEDf1234567890hF1234560",
    orgId: "8",
    communityType: "CURVE.AI",
    context: "Curve is a DEX optimized for stablecoin trading, managed by Curve DAO.",
    hateCategories: ["Inclusiveness", "Trust", "Constructive Feedback"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x9A0b1C2d3E4f5678IEDf1234567890iF1234561",
    orgId: "9",
    communityType: "ARAGON.AI",
    context: "Aragon provides tools for creating and managing decentralized autonomous organizations.",
    hateCategories: ["Empowerment", "Respect", "Openness"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x0A1b2C3d4E5f6789JEDf1234567890jF1234562",
    orgId: "10",
    communityType: "BADGERDAO.AI",
    context: "BadgerDAO focuses on bringing Bitcoin to DeFi and providing yield opportunities for BTC holders.",
    hateCategories: ["Integrity", "Community-Driven Efforts", "Constructive Debate"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x1A2b3C4d5E6f7890KEDf1234567890kF1234563",
    orgId: "11",
    communityType: "INDEX COOP.AI",
    context: "Index Coop creates and manages crypto index products for diversified investments.",
    hateCategories: ["Inclusivity", "Teamwork", "Constructive Criticism"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  },
  {
    id: "0x2A3b4C5d6E7f8901LEDf1234567890lF1234564",
    orgId: "12",
    communityType: "GITCOIN.AI",
    context: "Gitcoin supports funding for public goods and open-source projects through decentralized contributions.",
    hateCategories: ["Open Source Support", "Collaboration", "Sustainability"],
    model: "gpt-3.5-turbo",
    isPrivate: false
  }
];


async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contract with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const OrganizationManager = await ethers.getContractFactory("OrganizationManager");
  const organizationManager = await OrganizationManager.deploy();
  await organizationManager.deployed();

  console.log("OrganizationManager contract deployed to:", organizationManager.address);

  for (const dao of defiDAOs) {
    try {
      console.log(`Creating organization: ${dao.communityType}`);
      
      const tx = await organizationManager.createOrganization(
        dao.communityType,
        dao.context,
        dao.hateCategories,
        dao.model,
        dao.isPrivate
      );
      
      await tx.wait();
      console.log(`Organization ${dao.communityType} created successfully with tx hash: ${tx.hash}`);
    } catch (error) {
      console.error(`Failed to create organization for ${dao.communityType}:`, error);
    }
  }

  console.log("All organizations have been added.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error in deployment:", error);
    process.exit(1);
  });

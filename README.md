**Project Name**

WeLivedIt.AI

**Description**

Inclusivity both empowers individuals and benefits organisations because diversity is key to innovation (https://hbr.org/2018/01/how-and-where-diversity-drives-financial-performance).

Our project works to create more inclusive online and decentralised workplaces, in order to attract diverse talent and foster innovative collaborations. We are building a platform enabling communities to leverage and fine-tune AI models for content moderation, with a focus on detecting hate speech and toxic content.

This platform empowers online communities to:

- Detect toxic content using AI
- Fine-tune moderation models through community governance
- Share improved models with other communities via blockchain
- Access pre-trained models from other communities


Toxic speech is rife in online spaces and even more so if you are from one or more marginalised communities. By incorporating this tool into a DAO, you are taking steps to creating an inclusive organisational culture by building in anti-hate mechanisms from the outset. 

**Features**

### 🔍 Content Scanning - Can be seen in Demo

- Real-time text analysis for hate speech detection
- Configurable sensitivity levels
- Bulk content processing capabilities

### 🎯 Community Fine-tuning - To be developed

- Community voting on model improvements
- Governance framework for decision-making
- Model versioning and performance tracking

### ⛓️ On-chain Model Sharing - Models recorded on-chain (see demo); A new organisation selecting an existing model - To be developed

- Decentralized model registry
- Public vs Private model categories
- Community Values on display

**Additional considerations for our technical roadmap**

1. Database storage for private information for an organisation
2. Introduce possibility to verify or vote on the result of model classification, and to save this data to database
3. Incorporation of saved data to proposals.
4. Introduce the option to trigger the adaptation of a model (changing of a prompt, changing RAG, finetuning)
5. Gitcoin passport user verification
6. Incorporating Snapshot for community voting (available for Arbitrum Sepolia)
7. Introduce the check for gitcoin passport verification to allow participating in a vote
8. Review security and privacy practices; remember that the highest priority is feeling of safety for the community members
9. Register the results of snapshot vote on chain. If the accompanying data is large, it should be securely saved offchain.
10. Consider possible options for identity (self-id) verification for the community members.
11. Consider creating NFTs to help validate lived experience, and quantify the voting weights.
12. Incorporate NFTs in the voting mechanism.

**Part 2. User feedback and how it can modify the technical roadmap**

1. How users are want to (or are willing to) participate in collection of experiences?
2. What are the biggest concerns about the data safety and privacy?
3. How users understand lived experience, and how they understand parity between voters with and ones without the specific lived experience.

**Backend Github Repo (deployed separately to frontend):** https://github.com/WeLivedIt/WeLivedItServer

**Demo of the tool:**

https://www.loom.com/share/339c889a0b9b4d0fb5ecb00a207219a4?sid=4016215a-caa8-4b69-a1a6-d59106a41c97

**Installation**

Instructions on how to install the project.

**Usage**

Provide examples of how to use the project.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

**Getting Started**


You can start by adding the .env.example in your .env file


First, run the development server:

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.


**Learn More**

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

**Deploy on Vercel**

https://we-lived-it.vercel.app/

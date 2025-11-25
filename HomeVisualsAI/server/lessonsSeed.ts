import type { InsertDailyLesson } from "@shared/schema";

export const lessonsSeed: InsertDailyLesson[] = [
  {
    dayNumber: 1,
    weekNumber: 1,
    title: "Introduction to DeFi",
    description: "Understand what decentralized finance is, its principles, and why it matters in the modern financial ecosystem.",
    readingLinks: [
      "https://ethereum.org/en/defi/",
      "https://www.investopedia.com/terms/d/defi.asp",
      "https://academy.binance.com/en/articles/what-is-defi-decentralized-finance",
      "https://solana.com/what-is-defi"
    ],
    tasks: [
      "Write your own definition of DeFi in 2-3 sentences",
      "Identify 3 core differences between CeFi and DeFi",
      "List 5 DeFi applications you've heard about"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 2,
    weekNumber: 1,
    title: "Understanding Blockchains",
    description: "Learn how blockchains work, their consensus mechanisms, and why they're essential to DeFi.",
    readingLinks: [
      "https://ethereum.org/en/developers/docs/intro-to-ethereum/",
      "https://www.investopedia.com/terms/b/blockchain.asp",
      "https://bitcoin.org/en/developer-guide",
      "https://academy.binance.com/en/articles/what-is-blockchain"
    ],
    tasks: [
      "Explain how a blockchain stores data immutably",
      "Compare Proof of Work vs Proof of Stake",
      "Name 3 blockchains used in DeFi today"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 3,
    weekNumber: 1,
    title: "Cryptocurrency Wallets",
    description: "Master wallet management, security best practices, and understand private keys and seed phrases.",
    readingLinks: [
      "https://ethereum.org/en/wallets/",
      "https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet",
      "https://metamask.io/learn/",
      "https://www.investopedia.com/terms/w/wallet.asp"
    ],
    tasks: [
      "Explain the difference between hot wallets and cold wallets",
      "List 4 popular cryptocurrency wallets and their types",
      "Describe why a seed phrase should never be shared"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 4,
    weekNumber: 1,
    title: "Decentralized Exchanges (DEXs)",
    description: "Explore how DEXs work, compare them to centralized exchanges, and understand AMMs.",
    readingLinks: [
      "https://uniswap.org/whitepaper.pdf",
      "https://academy.binance.com/en/articles/what-is-a-dex",
      "https://ethereum.org/en/dapps/",
      "https://www.investopedia.com/terms/d/decentralized-exchange-dex.asp"
    ],
    tasks: [
      "Explain how an Automated Market Maker (AMM) differs from an order book",
      "List 3 popular DEXs and their native blockchains",
      "Describe the advantages of trading on a DEX vs CEX"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 5,
    weekNumber: 1,
    title: "Lending and Borrowing in DeFi",
    description: "Understand lending protocols, interest rates, collateralization, and liquidation mechanics.",
    readingLinks: [
      "https://compound.finance/governance/comp",
      "https://aave.com/",
      "https://academy.binance.com/en/articles/what-is-lending-in-crypto",
      "https://ethereum.org/en/defi/#lending"
    ],
    tasks: [
      "Explain how a lending protocol determines interest rates",
      "Describe what collateralization means and why it's needed",
      "Define liquidation and its role in protecting lenders"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 6,
    weekNumber: 1,
    title: "Liquidity Pools and AMMs",
    description: "Deep dive into liquidity pools, AMM mechanisms, and how liquidity providers earn fees.",
    readingLinks: [
      "https://curve.fi/",
      "https://balancer.fi/",
      "https://www.investopedia.com/terms/a/automated-market-maker-amm-.asp",
      "https://academy.binance.com/en/articles/what-is-an-automated-market-maker-amm"
    ],
    tasks: [
      "Explain how liquidity providers earn returns on their capital",
      "Describe the concept of impermanent loss",
      "Compare different types of AMM designs (Uniswap vs Curve)"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 7,
    weekNumber: 1,
    title: "Smart Contracts Fundamentals",
    description: "Introduction to smart contracts, Solidity basics, and how they enable DeFi protocols.",
    readingLinks: [
      "https://ethereum.org/en/developers/docs/smart-contracts/",
      "https://solidity-by-example.org/",
      "https://www.investopedia.com/terms/s/smart-contracts.asp",
      "https://academy.binance.com/en/articles/what-are-smart-contracts"
    ],
    tasks: [
      "Write a simple Solidity contract that stores and retrieves data",
      "Explain what happens when a smart contract is deployed",
      "Describe the role of gas in smart contract execution"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 8,
    weekNumber: 2,
    title: "Oracles and External Data",
    description: "Understand the oracle problem, chainlink integration, and safe oracle design patterns.",
    readingLinks: [
      "https://chain.link/",
      "https://docs.chain.link/",
      "https://www.investopedia.com/terms/o/oracle.asp",
      "https://ethereum.org/en/developers/docs/oracles/"
    ],
    tasks: [
      "Explain the oracle problem and why it matters for DeFi",
      "Describe how Chainlink provides decentralized price feeds",
      "List risks associated with oracle manipulation"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 9,
    weekNumber: 2,
    title: "Aave Protocol Deep Dive",
    description: "Explore Aave's lending mechanics, governance, and risk management systems.",
    readingLinks: [
      "https://aave.com/markets/",
      "https://docs.aave.com/",
      "https://academy.binance.com/en/articles/aave-protocol-explained",
      "https://www.investopedia.com/terms/a/aave.asp"
    ],
    tasks: [
      "Explain Aave's flash loan functionality and use cases",
      "Describe how Aave's governance token (AAVE) works",
      "Compare Aave's risk management to other lending protocols"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 10,
    weekNumber: 2,
    title: "Curve Finance Mastery",
    description: "Master Curve's stablecoin AMM design, yield optimization, and governance.",
    readingLinks: [
      "https://curve.fi/",
      "https://docs.curve.fi/",
      "https://www.investopedia.com/terms/c/curve-finance.asp",
      "https://academy.binance.com/en/articles/curve-finance-explained"
    ],
    tasks: [
      "Explain why Curve's AMM design is optimal for stablecoin swaps",
      "Describe Curve's governance mechanism and CRV token",
      "List strategies for maximizing returns as a Curve liquidity provider"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 11,
    weekNumber: 2,
    title: "Yearn Finance and Yield Strategies",
    description: "Understand yield optimization, vaults, and automated farming strategies.",
    readingLinks: [
      "https://yearn.finance/",
      "https://docs.yearn.finance/",
      "https://www.investopedia.com/terms/y/yearn-finance.asp",
      "https://academy.binance.com/en/articles/yearn-finance-explained"
    ],
    tasks: [
      "Explain how Yearn vaults automate yield farming strategies",
      "Describe the risks of complex yield farming strategies",
      "Compare passive vs active yield generation in DeFi"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 12,
    weekNumber: 2,
    title: "Stablecoins and MakerDAO",
    description: "Explore stablecoin mechanisms, MakerDAO's DAI, and collateral management.",
    readingLinks: [
      "https://makerdao.com/",
      "https://docs.makerdao.com/",
      "https://www.investopedia.com/terms/m/makerdao.asp",
      "https://academy.binance.com/en/articles/makerdao-explained"
    ],
    tasks: [
      "Explain how MakerDAO maintains DAI's $1 peg",
      "Describe the role of MKR token in governance",
      "Compare different types of stablecoins (collateralized vs algorithmic)"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 13,
    weekNumber: 2,
    title: "Staking and Earning Rewards",
    description: "Learn about staking mechanisms, validator requirements, and reward structures.",
    readingLinks: [
      "https://ethereum.org/en/staking/",
      "https://www.investopedia.com/terms/s/staking.asp",
      "https://academy.binance.com/en/articles/what-is-staking",
      "https://solana.com/stake"
    ],
    tasks: [
      "Explain the difference between staking and yield farming",
      "Describe the requirements to become a blockchain validator",
      "List risks associated with staking your cryptocurrency"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 14,
    weekNumber: 3,
    title: "Ethereum 2.0 and Proof of Stake",
    description: "Understand Ethereum's transition to PoS, sharding, and scalability improvements.",
    readingLinks: [
      "https://ethereum.org/en/eth2/",
      "https://beaconcha.in/",
      "https://www.investopedia.com/terms/p/proof-of-stake.asp",
      "https://academy.binance.com/en/articles/proof-of-stake-explained"
    ],
    tasks: [
      "Explain Ethereum's merge and transition from PoW to PoS",
      "Describe what sharding is and how it improves scalability",
      "Compare Ethereum's approach to Layer 1 vs Layer 2 scaling"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 15,
    weekNumber: 3,
    title: "Gas Fees and Transaction Costs",
    description: "Master gas mechanics, fee optimization, and Layer 2 alternatives.",
    readingLinks: [
      "https://ethereum.org/en/developers/docs/gas/",
      "https://www.investopedia.com/terms/g/gas.asp",
      "https://academy.binance.com/en/articles/what-is-gas-fee",
      "https://www.ethgasstation.info/"
    ],
    tasks: [
      "Explain what gas is and how it's calculated on Ethereum",
      "Describe strategies for reducing transaction costs",
      "Compare gas fees across different blockchains"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 16,
    weekNumber: 3,
    title: "EVM and Smart Contract Execution",
    description: "Deep understanding of the EVM, bytecode, and contract execution details.",
    readingLinks: [
      "https://ethereum.org/en/developers/docs/evm/",
      "https://www.investopedia.com/terms/e/ethereum-virtual-machine.asp",
      "https://academy.binance.com/en/articles/ethereum-virtual-machine-explained",
      "https://solidity-by-example.org/"
    ],
    tasks: [
      "Explain how the EVM executes smart contracts",
      "Describe the difference between bytecode and source code",
      "List optimization techniques for reducing gas consumption"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 17,
    weekNumber: 3,
    title: "Consensus Mechanisms Deep Dive",
    description: "Compare PoW, PoS, and emerging consensus models in detail.",
    readingLinks: [
      "https://ethereum.org/en/developers/docs/consensus-mechanisms/",
      "https://www.investopedia.com/terms/c/consensus-mechanism-crypto.asp",
      "https://academy.binance.com/en/articles/proof-of-work-explained",
      "https://academy.binance.com/en/articles/proof-of-stake-explained"
    ],
    tasks: [
      "Compare energy efficiency of PoW vs PoS",
      "Explain what finality means in blockchain consensus",
      "Describe 51% attacks and how consensus prevents them"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 18,
    weekNumber: 3,
    title: "Bridges and Cross-Chain Communication",
    description: "Understand bridge mechanisms, wrapped tokens, and interoperability solutions.",
    readingLinks: [
      "https://ethereum.org/en/bridges/",
      "https://www.investopedia.com/terms/b/blockchain-bridge.asp",
      "https://academy.binance.com/en/articles/what-is-a-blockchain-bridge",
      "https://portal.arbitrum.io/"
    ],
    tasks: [
      "Explain how blockchain bridges work and their security risks",
      "Describe the difference between wrapped and native tokens",
      "List use cases for cross-chain DeFi applications"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 19,
    weekNumber: 3,
    title: "Advanced Liquidity Concepts",
    description: "Master concentrated liquidity, CFMM designs, and MEV-aware AMMs.",
    readingLinks: [
      "https://www.investopedia.com/terms/l/liquidity-pool.asp",
      "https://academy.binance.com/en/articles/what-are-liquidity-pools-in-defi",
      "https://uniswap.org/blog/liquidity-provider-returns",
      "https://ethereum.org/en/defi/#earn-interest"
    ],
    tasks: [
      "Explain Uniswap v3's concentrated liquidity model",
      "Describe capital efficiency improvements in new AMM designs",
      "Analyze trade-offs between liquidity pool designs"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 20,
    weekNumber: 3,
    title: "Impermanent Loss and LP Strategies",
    description: "Calculate and understand impermanent loss, and optimize LP returns.",
    readingLinks: [
      "https://www.investopedia.com/terms/i/impermanent-loss.asp",
      "https://academy.binance.com/en/articles/impermanent-loss-explained",
      "https://uniswap.org/blog/uniswap-v3-liquidity",
      "https://ethereum.org/en/developers/tutorials/"
    ],
    tasks: [
      "Calculate impermanent loss for a given price movement",
      "Describe when impermanent loss is most problematic",
      "List strategies to minimize impermanent loss risk"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 21,
    weekNumber: 4,
    title: "Ethereum Development Stack",
    description: "Explore developer tools, frameworks, and best practices for DeFi development.",
    readingLinks: [
      "https://ethereum.org/en/developers/docs/ethereum-stack/",
      "https://www.investopedia.com/terms/e/eth-stack.asp",
      "https://academy.binance.com/en/articles/the-ethereum-stack",
      "https://ethereum.org/en/developers/docs/frameworks/"
    ],
    tasks: [
      "List the key components of the Ethereum tech stack",
      "Describe different development frameworks and libraries",
      "Explain best practices for secure smart contract development"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 22,
    weekNumber: 4,
    title: "Solana Ecosystem",
    description: "Understand Solana's architecture, performance characteristics, and DeFi ecosystem.",
    readingLinks: [
      "https://solana.com/developers",
      "https://docs.solana.com/",
      "https://www.investopedia.com/terms/s/solana.asp",
      "https://academy.binance.com/en/articles/solana-explained"
    ],
    tasks: [
      "Explain Solana's Proof of History consensus mechanism",
      "Compare Solana's performance to Ethereum",
      "Describe major DeFi protocols on Solana"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 23,
    weekNumber: 4,
    title: "Maximal Extractable Value (MEV)",
    description: "Understand MEV, frontrunning, sandwich attacks, and mitigation strategies.",
    readingLinks: [
      "https://www.investopedia.com/terms/m/mev.asp",
      "https://ethereum.org/en/developers/docs/mev/",
      "https://academy.binance.com/en/articles/maximal-extractable-value-explained",
      "https://flashbots.net/"
    ],
    tasks: [
      "Explain what MEV is and how it affects transactions",
      "Describe frontrunning and sandwich attack tactics",
      "List solutions for protecting transactions from MEV"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 24,
    weekNumber: 4,
    title: "Slippage and Price Impact",
    description: "Master slippage calculation, impact on trades, and mitigation techniques.",
    readingLinks: [
      "https://ethereum.org/en/glossary/#slippage",
      "https://www.investopedia.com/terms/s/slippage.asp",
      "https://academy.binance.com/en/articles/what-is-slippage",
      "https://uniswap.org/"
    ],
    tasks: [
      "Calculate expected slippage for a trade",
      "Explain how trade size affects price impact",
      "Describe strategies to minimize slippage in swaps"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 25,
    weekNumber: 4,
    title: "Flash Loans and Atomic Swaps",
    description: "Understand flash loans, their use cases, and atomic swap mechanics.",
    readingLinks: [
      "https://www.investopedia.com/terms/f/flashloan.asp",
      "https://academy.binance.com/en/articles/what-are-flash-loans-in-defi",
      "https://aave.com/flash-loans",
      "https://dydx.exchange/"
    ],
    tasks: [
      "Explain how flash loans work and their requirements",
      "Describe legitimate use cases for flash loans",
      "Analyze attack vectors involving flash loans"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 26,
    weekNumber: 4,
    title: "Governance and DAOs",
    description: "Master DAO structures, governance tokens, and voting mechanisms.",
    readingLinks: [
      "https://ethereum.org/en/governance/",
      "https://www.investopedia.com/terms/d/dao.asp",
      "https://academy.binance.com/en/articles/what-is-a-dao",
      "https://snapshot.org/"
    ],
    tasks: [
      "Explain how governance tokens grant voting rights",
      "Describe the role of delegation in DAO voting",
      "List risks in DAO governance and mitigation strategies"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 27,
    weekNumber: 4,
    title: "Smart Contract Security",
    description: "Learn common vulnerabilities, audit processes, and security best practices.",
    readingLinks: [
      "https://ethereum.org/en/security/",
      "https://www.investopedia.com/terms/a/audit.asp",
      "https://academy.binance.com/en/articles/smart-contract-security",
      "https://consensys.net/diligence/"
    ],
    tasks: [
      "List top 10 smart contract vulnerabilities (OWASP Top 10)",
      "Explain the importance of code audits and testing",
      "Describe formal verification and its role in security"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 28,
    weekNumber: 5,
    title: "Risk Management in DeFi",
    description: "Understand systemic risk, portfolio management, and hedging strategies.",
    readingLinks: [
      "https://www.investopedia.com/terms/r/risk-management.asp",
      "https://academy.binance.com/en/articles/how-to-manage-risk-in-defi",
      "https://www.investopedia.com/terms/h/hedge.asp",
      "https://ethereum.org/en/security/"
    ],
    tasks: [
      "Describe different types of DeFi risks (technical, financial, governance)",
      "Explain position sizing and portfolio allocation strategies",
      "List hedging techniques in DeFi"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 29,
    weekNumber: 5,
    title: "Future of Finance: CeFi vs DeFi",
    description: "Compare traditional and decentralized finance, and envision the future.",
    readingLinks: [
      "https://ethereum.org/en/enterprise/",
      "https://www.investopedia.com/terms/c/cefi.asp",
      "https://academy.binance.com/en/articles/cefi-vs-defi",
      "https://ethereum.org/en/defi/#risks"
    ],
    tasks: [
      "Compare regulatory frameworks for CeFi and DeFi",
      "Describe advantages and disadvantages of each model",
      "Predict future integration of traditional finance and DeFi"
    ],
    quizQuestions: []
  },
  {
    dayNumber: 30,
    weekNumber: 5,
    title: "Your DeFi Journey: The Path Forward",
    description: "Synthesize learning, plan your DeFi strategy, and identify next steps.",
    readingLinks: [
      "https://ethereum.org/en/defi/",
      "https://www.investopedia.com/terms/d/defi.asp",
      "https://academy.binance.com/en/articles/the-future-of-defi",
      "https://ethereum.org/en/roadmap/"
    ],
    tasks: [
      "Write your personal DeFi investment thesis",
      "Create a roadmap for continued learning",
      "Identify 3 DeFi opportunities aligned with your goals"
    ],
    quizQuestions: []
  }
];

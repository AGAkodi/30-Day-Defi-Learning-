import { QuizQuestion } from "@shared/schema";

interface TopicQuestions {
  easyQuestions: string[];
  mediumQuestions: string[];
  hardQuestions: string[];
  easyOptions: Record<string, string[]>;
  mediumOptions: Record<string, string[]>;
  hardOptions: Record<string, string[]>;
  easyExplanations: Record<string, string>;
  mediumExplanations: Record<string, string>;
  hardExplanations: Record<string, string>;
}

// Comprehensive question banks for each day's topic
const topicBanks: Record<number, TopicQuestions> = {
  1: {
    easyQuestions: [
      "What does DeFi stand for?",
      "DeFi requires a bank account to start trading.",
      "Which blockchain is most commonly used for DeFi applications?",
      "Name one advantage of DeFi over traditional finance.",
      "All DeFi transactions are completely anonymous."
    ],
    mediumQuestions: [
      "Which of the following is a core principle of DeFi?",
      "What is a DeFi protocol?",
      "Explain the main difference between CeFi and DeFi.",
      "You want to earn yield on your Ethereum without selling it. Which DeFi activity would help?",
      "How does DeFi achieve consensus?"
    ],
    hardQuestions: [
      "A new DeFi yield farm offers 1000% APY. What's the primary risk?",
      "Describe what composability means in DeFi and give an example.",
      "What is a key vulnerability in DeFi systems that most affects users?",
      "Explain the relationship between gas fees, network congestion, and MEV extraction.",
      "Your smart contract gets exploited. What happens?"
    ],
    easyOptions: {
      "What does DeFi stand for?": ["Decentralized Finance", "Defined Finance", "Default Finance", "Digital Finance"],
      "Which blockchain is most commonly used for DeFi applications?": ["Bitcoin", "Ethereum", "Litecoin", "Dogecoin"]
    },
    mediumOptions: {
      "Which of the following is a core principle of DeFi?": ["Centralized control", "Transparency and accessibility", "Limited to institutions", "Privacy from all parties"],
      "What is a DeFi protocol?": ["A government rule", "A smart contract system enabling financial services", "A bank policy", "A cryptocurrency"],
      "You want to earn yield on your Ethereum without selling it. Which DeFi activity would help?": ["Lending on Compound", "Trading on Uniswap", "Holding in a wallet", "Buying ETFs"],
      "How does DeFi achieve consensus?": ["Central authority", "Blockchain consensus mechanisms", "Vote by institutions", "Government approval"]
    },
    hardOptions: {
      "A new DeFi yield farm offers 1000% APY. What's the primary risk?": ["No risk", "High risk from unsustainable returns or scams", "Safe guaranteed returns", "Bank insured"],
      "What is a key vulnerability in DeFi systems that most affects users?": ["Lack of regulation", "Too many features", "Smart contract bugs and vulnerabilities", "Slow transaction speeds"],
      "Your smart contract gets exploited. What happens?": ["The bank freezes it", "You lose access and funds permanently", "Government refunds it", "It's automatically protected"]
    },
    easyExplanations: {
      "What does DeFi stand for?": "DeFi stands for Decentralized Finance, a financial system built on blockchain technology without intermediaries.",
      "DeFi requires a bank account to start trading.": "DeFi only requires a cryptocurrency wallet; no traditional bank account is needed.",
      "Which blockchain is most commonly used for DeFi applications?": "Ethereum's smart contract capability makes it the leading platform for DeFi applications.",
      "Name one advantage of DeFi over traditional finance.": "DeFi provides multiple benefits compared to traditional systems including accessibility, lower fees, transparency, and 24/7 operation.",
      "All DeFi transactions are completely anonymous.": "DeFi transactions are pseudonymous (wallet addresses), not fully anonymous."
    },
    mediumExplanations: {
      "Which of the following is a core principle of DeFi?": "DeFi prioritizes transparency through blockchain records and accessibility by removing intermediaries.",
      "What is a DeFi protocol?": "DeFi protocols are smart contracts that automate financial services on blockchain networks.",
      "Explain the main difference between CeFi and DeFi.": "Centralized finance relies on institutions while DeFi removes middlemen through smart contracts.",
      "You want to earn yield on your Ethereum without selling it. Which DeFi activity would help?": "Lending protocols like Compound allow users to earn yield on their assets without trading.",
      "How does DeFi achieve consensus?": "DeFi relies on blockchain networks' consensus mechanisms (PoW, PoS, etc.) to validate transactions."
    },
    hardExplanations: {
      "A new DeFi yield farm offers 1000% APY. What's the primary risk?": "Unrealistic returns are major red flags for scams or unsustainable models that collapse quickly.",
      "Describe what composability means in DeFi and give an example.": "DeFi's composability allows protocols to be stacked and combined for complex financial products, like using Aave collateral in another protocol.",
      "What is a key vulnerability in DeFi systems that most affects users?": "Smart contract security flaws can lead to loss of funds with no recovery mechanism.",
      "Explain the relationship between gas fees, network congestion, and MEV extraction.": "During congestion, miners can prioritize transactions for MEV, increasing costs for other users.",
      "Your smart contract gets exploited. What happens?": "In DeFi, smart contract exploits result in permanent loss of funds with no recovery mechanism unlike traditional banking."
    }
  },
  2: {
    easyQuestions: [
      "What is blockchain?",
      "Blockchain data is immutable and cannot be changed.",
      "What are the two main consensus mechanisms?",
      "A blockchain requires a central authority to validate transactions.",
      "Which blockchain is known for creating smart contracts?"
    ],
    mediumQuestions: [
      "What is the main purpose of a blockchain consensus mechanism?",
      "How does Proof of Work differ from other consensus methods?",
      "Why do blockchains need decentralization?",
      "What prevents double-spending in cryptocurrency?",
      "How does a blockchain ensure transaction security?"
    ],
    hardQuestions: [
      "Explain 51% attacks and how Proof of Work prevents them.",
      "What is the trilemma in blockchain design?",
      "How do light clients verify blockchain information?",
      "Describe the difference between finality in PoW vs PoS.",
      "What are selfish mining attacks and their implications?"
    ],
    easyOptions: {
      "What is blockchain?": ["A distributed ledger technology", "A bank system", "A cryptocurrency wallet", "A trading platform"],
      "Blockchain data is immutable and cannot be changed.": ["True", "False"],
      "What are the two main consensus mechanisms?": ["PoW and PoS", "PoW and PoI", "PoS and DPoS", "PoW and BFT"],
      "A blockchain requires a central authority to validate transactions.": ["True", "False"],
      "Which blockchain is known for creating smart contracts?": ["Bitcoin", "Ethereum", "Litecoin", "Ripple"]
    },
    mediumOptions: {
      "What is the main purpose of a blockchain consensus mechanism?": ["Storing data", "Validating transactions without intermediaries", "Creating cryptocurrency", "Securing wallets"],
      "Why do blockchains need decentralization?": ["To increase speed", "To remove single points of failure and ensure no single entity controls the network", "To reduce costs", "To improve aesthetics"]
    },
    hardOptions: {
      "Explain 51% attacks and how Proof of Work prevents them.": ["A method to increase speed", "Gaining majority mining power to control transactions, prevented by network distribution", "A type of wallet", "A governance system"],
      "What is the trilemma in blockchain design?": ["Speed and cost issues", "The balance between decentralization, security, and scalability", "Three layers of blockchain", "Three types of coins"]
    },
    easyExplanations: {
      "What is blockchain?": "Blockchain is a distributed ledger technology that records transactions in blocks linked together, creating an immutable chain.",
      "Blockchain data is immutable and cannot be changed.": "Once data is recorded in a blockchain, it requires computational effort to change, making it practically immutable.",
      "What are the two main consensus mechanisms?": "Proof of Work (PoW) and Proof of Stake (PoS) are the two primary consensus mechanisms used in blockchains.",
      "A blockchain requires a central authority to validate transactions.": "Blockchains are decentralized and use distributed consensus instead of central authorities.",
      "Which blockchain is known for creating smart contracts?": "Ethereum pioneered programmable smart contracts on a major blockchain."
    },
    mediumExplanations: {
      "What is the main purpose of a blockchain consensus mechanism?": "Consensus mechanisms allow a distributed network to agree on the current state without a central authority.",
      "How does Proof of Work differ from other consensus methods?": "PoW requires computational puzzle-solving, while PoS relies on economic incentives and stake ownership.",
      "Why do blockchains need decentralization?": "Decentralization removes single points of failure and prevents any one entity from controlling the network.",
      "What prevents double-spending in cryptocurrency?": "Blockchain's immutability and consensus mechanisms ensure each coin is spent only once.",
      "How does a blockchain ensure transaction security?": "Cryptographic hashing, distributed consensus, and the cost of attacking the network provide security."
    },
    hardExplanations: {
      "Explain 51% attacks and how Proof of Work prevents them.": "A 51% attack occurs when an attacker controls majority mining power. Network distribution makes this expensive.",
      "What is the trilemma in blockchain design?": "The blockchain trilemma describes the difficulty in simultaneously achieving decentralization, security, and scalability.",
      "How do light clients verify blockchain information?": "Light clients use Merkle proofs and SPV (Simple Payment Verification) to verify transactions without storing full blocks.",
      "Describe the difference between finality in PoW vs PoS.": "PoW has probabilistic finality while PoS provides faster, more deterministic finality.",
      "What are selfish mining attacks and their implications?": "Selfish mining involves withholding blocks to gain advantage, potentially reducing network security if profitable."
    }
  },
  3: {
    easyQuestions: [
      "What is a cryptocurrency wallet?",
      "Private keys are public information and safe to share.",
      "Which wallet type is most secure?",
      "What is a seed phrase?",
      "Can you recover a wallet with a seed phrase?"
    ],
    mediumQuestions: [
      "What is the difference between a hot wallet and cold wallet?",
      "Why should you never share your private key?",
      "How does multi-signature authentication enhance security?",
      "What happens if you lose your seed phrase?",
      "Name three popular cryptocurrency wallets."
    ],
    hardQuestions: [
      "Explain the security tradeoffs between custodial and self-custodial wallets.",
      "How do hardware wallets protect against malware?",
      "What is hierarchical deterministic (HD) wallet technology?",
      "Describe how to safely manage multiple wallet addresses.",
      "What are the risks of social engineering attacks on wallet holders?"
    ],
    easyOptions: {
      "What is a cryptocurrency wallet?": ["A physical bag for coins", "Software for managing cryptocurrency keys and transactions", "A bank account", "A trading tool"],
      "Private keys are public information and safe to share.": ["True", "False"],
      "Which wallet type is most secure?": ["Online wallets", "Mobile wallets", "Hardware wallets", "Desktop wallets"],
      "What is a seed phrase?": ["A password hint", "A 12-24 word backup to recover your wallet", "A cryptocurrency", "A transaction fee"]
    },
    mediumOptions: {
      "What is the difference between a hot wallet and cold wallet?": ["Color differences", "Hot wallets are online and convenient; cold wallets are offline and secure", "Temperature settings", "Price differences"],
      "Why should you never share your private key?": ["It's boring", "Anyone with it can access your funds", "It causes network errors", "It's too long to remember"]
    },
    hardOptions: {
      "Explain the security tradeoffs between custodial and self-custodial wallets.": ["No tradeoffs", "Custodial is convenient but less secure; self-custodial is secure but your responsibility", "Custodial is always better", "Self-custodial is always better"]
    },
    easyExplanations: {
      "What is a cryptocurrency wallet?": "A cryptocurrency wallet is software that stores your private keys and allows you to send and receive cryptocurrencies.",
      "Private keys are public information and safe to share.": "Private keys are sensitive and must never be shared. Anyone with your private key can control your funds.",
      "Which wallet type is most secure?": "Hardware wallets are the most secure as they keep private keys offline and isolated from internet-connected devices.",
      "What is a seed phrase?": "A seed phrase is a 12-24 word recovery code that allows you to restore your entire wallet if you lose access.",
      "Can you recover a wallet with a seed phrase?": "Yes, seed phrases allow you to recover all your wallet's funds and addresses on any device."
    },
    mediumExplanations: {
      "What is the difference between a hot wallet and cold wallet?": "Hot wallets are connected to the internet for convenience but are more vulnerable to hacks. Cold wallets are offline and much more secure.",
      "Why should you never share your private key?": "Your private key is the only thing needed to access and control your cryptocurrency. Sharing it gives others complete control.",
      "How does multi-signature authentication enhance security?": "Multi-sig wallets require multiple keys to authorize transactions, making theft significantly harder.",
      "What happens if you lose your seed phrase?": "If you lose your seed phrase and don't have backups, you may permanently lose access to your funds.",
      "Name three popular cryptocurrency wallets.": "MetaMask, Ledger, Coinbase Wallet, Trust Wallet, and MyEtherWallet are popular options."
    },
    hardExplanations: {
      "Explain the security tradeoffs between custodial and self-custodial wallets.": "Custodial wallets are convenient but rely on third parties. Self-custodial wallets are secure but put all responsibility on you.",
      "How do hardware wallets protect against malware?": "Hardware wallets keep private keys completely offline and isolated, preventing malware from accessing them.",
      "What is hierarchical deterministic (HD) wallet technology?": "HD wallets generate multiple addresses from a single seed, improving organization and security.",
      "Describe how to safely manage multiple wallet addresses.": "Use HD wallets or keep detailed records, use unique addresses for different purposes, and store backups securely.",
      "What are the risks of social engineering attacks on wallet holders?": "Attackers may trick users into revealing seed phrases through phishing, fake support, or other deceptive tactics."
    }
  },
  4: {
    easyQuestions: [
      "What is a DEX?",
      "DEXs require you to provide personal information to trade.",
      "Which DEX is the most popular on Ethereum?",
      "What does AMM stand for?",
      "DEXs use the same order book system as traditional exchanges."
    ],
    mediumQuestions: [
      "How does an AMM differ from a traditional order book?",
      "What is price slippage on a DEX?",
      "Why do DEX traders prefer lower slippage?",
      "How do liquidity pools facilitate trading on Uniswap?",
      "What role does the constant product formula play in AMMs?"
    ],
    hardQuestions: [
      "Explain how concentrated liquidity works in Uniswap V3.",
      "What is front-running and how does it affect DEX traders?",
      "Describe the capital efficiency improvements in advanced AMM designs.",
      "How do DEXs handle multi-hop swaps?",
      "What are MEV-resistant AMM designs and their tradeoffs?"
    ],
    easyOptions: {
      "What is a DEX?": ["A decentralized exchange for peer-to-peer trading", "A centralized bank", "A type of cryptocurrency", "A wallet service"],
      "DEXs require you to provide personal information to trade.": ["True", "False"],
      "Which DEX is the most popular on Ethereum?": ["Uniswap", "Binance", "Coinbase", "Kraken"],
      "What does AMM stand for?": ["Automated Money Machine", "Automated Market Maker", "Asset Management Module", "Automated Mining Market"]
    },
    mediumOptions: {
      "How does an AMM differ from a traditional order book?": ["No difference", "AMMs use liquidity pools and formulas; order books match buyers with sellers", "AMMs are faster", "Order books are decentralized"],
      "What is price slippage on a DEX?": ["A fee to the exchange", "The difference between expected and actual price when executing a trade", "A technical error", "A security feature"],
      "How do liquidity pools facilitate trading on Uniswap?": ["They store government funds", "Traders exchange tokens with pools using smart contracts", "They trade for you", "They validate transactions"]
    },
    hardOptions: {
      "Explain how concentrated liquidity works in Uniswap V3.": ["It's similar to V2", "LPs can concentrate liquidity in specific price ranges for better capital efficiency", "It uses different tokens", "It's slower than V2"]
    },
    easyExplanations: {
      "What is a DEX?": "A DEX (Decentralized Exchange) is a peer-to-peer trading platform using smart contracts, eliminating the need for centralized intermediaries.",
      "DEXs require you to provide personal information to trade.": "DEXs are permissionless and only require a wallet. No personal information or KYC is needed.",
      "Which DEX is the most popular on Ethereum?": "Uniswap is the largest and most popular DEX on Ethereum by total trading volume.",
      "What does AMM stand for?": "AMM stands for Automated Market Maker, a smart contract that enables trading through liquidity pools.",
      "DEXs use the same order book system as traditional exchanges.": "DEXs primarily use AMMs instead of order books, though some hybrid models exist."
    },
    mediumExplanations: {
      "How does an AMM differ from a traditional order book?": "AMMs use liquidity pools and mathematical formulas to determine prices, while order books match buyers directly with sellers.",
      "What is price slippage on a DEX?": "Slippage is the difference between your expected execution price and the actual price due to market conditions.",
      "Why do DEX traders prefer lower slippage?": "Lower slippage means you get better prices and fewer funds are lost to market impact.",
      "How do liquidity pools facilitate trading on Uniswap?": "Traders exchange tokens directly with pools using smart contracts, and pools adjust prices based on the constant product formula.",
      "What role does the constant product formula play in AMMs?": "The formula (x * y = k) ensures prices adjust automatically based on the ratio of tokens in the pool."
    },
    hardExplanations: {
      "Explain how concentrated liquidity works in Uniswap V3.": "LPs can concentrate their liquidity in specific price ranges, improving capital efficiency compared to full-range liquidity.",
      "What is front-running and how does it affect DEX traders?": "Front-running is when miners prioritize transactions to benefit themselves, causing you to receive worse prices.",
      "Describe the capital efficiency improvements in advanced AMM designs.": "New designs like concentrated liquidity (V3), stableswap (Curve), and hybrid models improve returns for LPs.",
      "How do DEXs handle multi-hop swaps?": "Multi-hop swaps execute a series of individual swaps to find the best route between two tokens.",
      "What are MEV-resistant AMM designs and their tradeoffs?": "MEV-resistant designs prioritize fairness but may sacrifice capital efficiency or throughput."
    }
  },
  5: {
    easyQuestions: [
      "What is lending in DeFi?",
      "Lenders are guaranteed positive returns in DeFi.",
      "Which protocol pioneered lending in DeFi?",
      "What is collateral?",
      "Interest rates in DeFi lending are always fixed."
    ],
    mediumQuestions: [
      "How do lending protocols determine interest rates?",
      "What is liquidation in lending protocols?",
      "Why is over-collateralization required in DeFi lending?",
      "How do borrowers use lending protocols?",
      "What risks do lenders face in DeFi?"
    ],
    hardQuestions: [
      "Explain how dynamic interest rate models improve lending protocols.",
      "What is the relationship between collateral ratio and liquidation risk?",
      "Describe flash loans and their security implications.",
      "How do risk parameters protect lending protocols?",
      "What is recursive borrowing and its risks?"
    ],
    easyOptions: {
      "What is lending in DeFi?": ["Trading cryptocurrencies", "Providing funds to earn interest on a protocol", "Buying bonds", "Staking coins"],
      "Lenders are guaranteed positive returns in DeFi.": ["True", "False"],
      "Which protocol pioneered lending in DeFi?": ["Aave", "Compound", "MakerDAO", "dYdX"],
      "What is collateral?": ["A type of coin", "Assets pledged to borrow funds", "A fee structure", "A governance token"]
    },
    mediumOptions: {
      "How do lending protocols determine interest rates?": ["Randomly", "Based on supply and demand of the asset", "By government policy", "By the number of users"],
      "What is liquidation in lending protocols?": ["Closing your account", "Selling collateral when it falls below safe levels", "Paying interest", "Withdrawing funds"]
    },
    hardOptions: {
      "Explain how dynamic interest rate models improve lending protocols.": ["They don't help", "They adjust rates automatically based on supply/demand and utilization ratios", "They fix all rates", "They eliminate risk"]
    },
    easyExplanations: {
      "What is lending in DeFi?": "Lending in DeFi means depositing cryptocurrencies into a protocol to earn interest paid by borrowers.",
      "Lenders are guaranteed positive returns in DeFi.": "DeFi lending has risks including smart contract bugs, protocol failures, and borrower default, so returns aren't guaranteed.",
      "Which protocol pioneered lending in DeFi?": "Compound was one of the first major lending protocols, followed by Aave which became the largest.",
      "What is collateral?": "Collateral is assets pledged by borrowers to secure loans, protecting lenders if the borrower defaults.",
      "Interest rates in DeFi lending are always fixed.": "Most DeFi lending uses variable rates that adjust based on market conditions and protocol utilization."
    },
    mediumExplanations: {
      "How do lending protocols determine interest rates?": "Interest rates are determined by the supply and demand of assets, and utilization ratios in the protocol.",
      "What is liquidation in lending protocols?": "Liquidation is the automatic sale of a borrower's collateral when it falls below the minimum required ratio.",
      "Why is over-collateralization required in DeFi lending?": "Over-collateralization protects lenders by ensuring collateral value exceeds loan amount, accounting for price volatility.",
      "How do borrowers use lending protocols?": "Borrowers deposit collateral and receive loans, paying interest in exchange for liquidity.",
      "What risks do lenders face in DeFi?": "Lenders risk smart contract bugs, protocol hacks, collateral liquidations, and market crashes."
    },
    hardExplanations: {
      "Explain how dynamic interest rate models improve lending protocols.": "Dynamic models automatically adjust rates based on utilization, balancing supply and demand more efficiently.",
      "What is the relationship between collateral ratio and liquidation risk?": "Lower collateral ratios mean higher liquidation risk when prices fluctuate.",
      "Describe flash loans and their security implications.": "Flash loans allow borrowing without collateral but must be repaid within the same transaction, enabling sophisticated attacks.",
      "How do risk parameters protect lending protocols?": "Risk parameters like collateral factors and reserve factors protect the protocol from bad debt.",
      "What is recursive borrowing and its risks?": "Recursive borrowing uses borrowed funds as collateral for more loans, amplifying gains but also liquidation risk."
    }
  },
  // Continue with similar structure for days 6-30
  6: {
    easyQuestions: [
      "What is a liquidity pool?",
      "Liquidity providers earn trading fees on DEXs.",
      "What is impermanent loss?",
      "Liquidity pools always have equal token values.",
      "Can you withdraw your liquidity anytime?"
    ],
    mediumQuestions: [
      "How do liquidity providers earn returns?",
      "What causes impermanent loss in liquidity pools?",
      "How do different AMM designs vary?",
      "Why do stablecoin pools have different parameters?",
      "What is capital efficiency in liquidity pools?"
    ],
    hardQuestions: [
      "Calculate impermanent loss for a given price movement scenario.",
      "Compare Uniswap, Curve, and Balancer designs and their optimal use cases.",
      "Explain how Uniswap V3 concentrated liquidity reduces impermanent loss.",
      "What are the risks of being an LP in volatile trading pairs?",
      "How do governance tokens affect LP incentives?"
    ],
    easyOptions: {
      "What is a liquidity pool?": ["A swimming pool with water", "A smart contract holding two token reserves for trading", "A bank savings account", "A lottery ticket"],
      "Liquidity providers earn trading fees on DEXs.": ["True", "False"],
      "What is impermanent loss?": ["Permanent loss of funds", "Potential unrealized loss when token prices diverge", "A fee charged by wallets", "A type of hack"],
      "Can you withdraw your liquidity anytime?": ["Yes, instantly", "Usually yes, unless the protocol is paused", "No, it's locked forever", "Only once per month"]
    },
    mediumOptions: {
      "How do liquidity providers earn returns?": ["Through staking", "Trading fees and incentive rewards from the protocol", "Interest payments", "Governance voting"],
      "What causes impermanent loss in liquidity pools?": ["Network congestion", "Price divergence between the two tokens in the pool", "Smart contract bugs", "User error"]
    },
    hardOptions: {
      "Compare Uniswap, Curve, and Balancer designs and their optimal use cases.": ["They're identical", "Uniswap is for volatiles, Curve for stables, Balancer for multi-token pools", "Curve is best for everything", "Balancer is outdated"]
    },
    easyExplanations: {
      "What is a liquidity pool?": "A liquidity pool is a smart contract holding reserves of two tokens, allowing users to trade between them automatically.",
      "Liquidity providers earn trading fees on DEXs.": "LPs deposit token pairs and earn a portion of trading fees generated by the pool.",
      "What is impermanent loss?": "Impermanent loss is an unrealized loss LP experience when token prices diverge significantly from when they entered the pool.",
      "Liquidity pools always have equal token values.": "Not necessarily. AMMs maintain mathematical relationships (like x * y = k) rather than equal values.",
      "Can you withdraw your liquidity anytime?": "In most cases yes, though some protocols have lock-ups or may pause for emergencies."
    },
    mediumExplanations: {
      "How do liquidity providers earn returns?": "LPs earn returns through trading fees (usually 0.01-1%) and additional rewards from protocol incentives.",
      "What causes impermanent loss in liquidity pools?": "Impermanent loss occurs when prices diverge, forcing the pool to hold more of the devalued token.",
      "How do different AMM designs vary?": "Uniswap uses constant product formula, Curve optimizes for stablecoins, Balancer allows multiple tokens.",
      "Why do stablecoin pools have different parameters?": "Stablecoins have lower price volatility, so different AMM curves can be used to improve capital efficiency.",
      "What is capital efficiency in liquidity pools?": "Capital efficiency measures how much trading volume a pool can handle relative to deposited capital."
    },
    hardExplanations: {
      "Calculate impermanent loss for a given price movement scenario.": "IL formula: 2 * sqrt(price_ratio) / (1 + price_ratio) - 1, showing losses increase with price divergence.",
      "Compare Uniswap, Curve, and Balancer designs and their optimal use cases.": "Uniswap suits volatiles, Curve optimizes stablecoins, Balancer enables multi-token and weighted pools.",
      "Explain how Uniswap V3 concentrated liquidity reduces impermanent loss.": "By focusing liquidity in narrow ranges, LPs only experience IL within that range, improving returns.",
      "What are the risks of being an LP in volatile trading pairs?": "High impermanent loss if prices diverge significantly, potentially outweighing fee earnings.",
      "How do governance tokens affect LP incentives?": "Governance tokens incentivize LPs by offering additional rewards, attracting more liquidity to pools."
    }
  },
  // Remaining days (7-30) follow same pattern with increasing complexity
  7: {
    easyQuestions: [
      "What is a smart contract?",
      "Smart contracts can be modified after deployment.",
      "What language is used to write Ethereum smart contracts?",
      "Smart contracts execute automatically when conditions are met.",
      "Gas is required to execute smart contracts."
    ],
    mediumQuestions: [
      "How does a smart contract ensure agreement between parties?",
      "What is the gas mechanism for smart contracts?",
      "Why can't smart contracts access external data directly?",
      "How are smart contracts tested before deployment?",
      "What happens if a smart contract has a bug?"
    ],
    hardQuestions: [
      "Explain the difference between contract storage, memory, and call data.",
      "How do reentrancy attacks work on smart contracts?",
      "Describe best practices for secure smart contract development.",
      "What are formal verification and its role in contract security?",
      "How do upgradeable contracts work and their tradeoffs?"
    ],
    easyOptions: {
      "What is a smart contract?": ["A physical contract", "Self-executing code on a blockchain", "A type of insurance", "A legal agreement"],
      "Smart contracts can be modified after deployment.": ["True", "False"],
      "What language is used to write Ethereum smart contracts?": ["Python", "Solidity", "Java", "C++"],
      "Smart contracts execute automatically when conditions are met.": ["True", "False"],
      "Gas is required to execute smart contracts.": ["True", "False"]
    },
    mediumOptions: {
      "How does a smart contract ensure agreement between parties?": ["Lawyers", "Cryptographic verification and automatic execution", "Banks", "Governments"],
      "Why can't smart contracts access external data directly?": ["They're not smart enough", "Blockchains can't access internet data; oracles are needed", "It's too expensive", "It's not allowed by law"]
    },
    hardOptions: {
      "Explain the difference between contract storage, memory, and call data.": ["All the same", "Storage persists on blockchain, memory is temporary, call data is function input", "Storage is worst", "No differences matter"]
    },
    easyExplanations: {
      "What is a smart contract?": "A smart contract is code stored on a blockchain that automatically executes when predetermined conditions are met.",
      "Smart contracts can be modified after deployment.": "Most smart contracts are immutable after deployment. Some use proxy patterns for upgradability.",
      "What language is used to write Ethereum smart contracts?": "Solidity is the primary programming language for writing Ethereum smart contracts.",
      "Smart contracts execute automatically when conditions are met.": "Yes, smart contracts execute autonomously based on predetermined logic without requiring intermediaries.",
      "Gas is required to execute smart contracts.": "Yes, every operation on Ethereum requires gas, paid in ETH."
    },
    mediumExplanations: {
      "How does a smart contract ensure agreement between parties?": "Smart contracts use cryptographic verification and automatic execution, eliminating the need for trust.",
      "What is the gas mechanism for smart contracts?": "Gas is a fee for computational resources. Complex operations cost more gas than simple ones.",
      "Why can't smart contracts access external data directly?": "Blockchains are isolated and can't access internet data directly. Oracles provide external information.",
      "How are smart contracts tested before deployment?": "Developers use unit tests, integration tests, and testnet deployments to verify functionality.",
      "What happens if a smart contract has a bug?": "Bugs can lead to loss of funds with no recovery mechanism unless the code has emergency functions."
    },
    hardExplanations: {
      "Explain the difference between contract storage, memory, and call data.": "Storage persists on-chain, memory is temporary per call, and call data contains function inputs.",
      "How do reentrancy attacks work on smart contracts?": "Attackers recursively call functions before state updates complete, potentially draining funds.",
      "Describe best practices for secure smart contract development.": "Checks-Effects-Interactions pattern, avoid external calls, comprehensive testing, and code audits.",
      "What are formal verification and its role in contract security?": "Formal verification uses mathematical proofs to guarantee contract behavior, providing high security assurance.",
      "How do upgradeable contracts work and their tradeoffs?": "Upgradeable contracts use proxies to delegate to implementation contracts, enabling updates but adding complexity."
    }
  }
};

// Fill remaining days (8-30) with structured question templates
const generateTopicQuestions = (dayNumber: number, topic: string): TopicQuestions => {
  // Scale difficulty across 30 days
  const difficultyScale = dayNumber / 30;
  
  // Return existing bank or generate from template
  return topicBanks[dayNumber] || generateDefaultTopicBank(topic, dayNumber);
};

const generateDefaultTopicBank = (topic: string, dayNumber: number): TopicQuestions => {
  const templates = {
    easy: [
      `What is ${topic}?`,
      `${topic} is only used by experts.`,
      `Which concept is most related to ${topic}?`,
      `${topic} requires significant capital to participate.`,
      `What is the main purpose of ${topic}?`
    ],
    medium: [
      `How does ${topic} improve upon earlier DeFi technologies?`,
      `What are the key risks associated with ${topic}?`,
      `Explain how ${topic} interacts with other DeFi protocols.`,
      `What incentives exist for participating in ${topic}?`,
      `How is ${topic} governed?`
    ],
    hard: [
      `Analyze the economic implications of scaling ${topic}.`,
      `Describe advanced strategies for optimizing returns in ${topic}.`,
      `What technical challenges exist in ${topic} and proposed solutions?`,
      `How does ${topic} affect market dynamics in DeFi?`,
      `Compare ${topic} implementations across different blockchains.`
    ]
  };

  return {
    easyQuestions: templates.easy,
    mediumQuestions: templates.medium,
    hardQuestions: templates.hard,
    easyOptions: {},
    mediumOptions: {},
    hardOptions: {},
    easyExplanations: {},
    mediumExplanations: {},
    hardExplanations: {}
  };
};

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function generateDailyQuiz(dayNumber: number, topic: string, readingLinks: string[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const bank = generateTopicQuestions(dayNumber, topic);
  
  const questionTypes = ["mcq", "truefalse", "short", "scenario"];
  
  // Generate 5 easy questions
  for (let i = 0; i < 5; i++) {
    const question = bank.easyQuestions[i];
    const type = questionTypes[i % questionTypes.length] as "mcq" | "truefalse" | "short" | "scenario";
    const options = bank.easyOptions[question];
    const explanation = bank.easyExplanations[question] || "Review the reading materials for more information.";
    
    questions.push({
      id: generateId(),
      type,
      difficulty: "easy",
      question,
      options,
      correctAnswer: options ? options[0] : "True",
      explanation
    });
  }
  
  // Generate 5 medium questions
  for (let i = 0; i < 5; i++) {
    const question = bank.mediumQuestions[i];
    const type = questionTypes[i % questionTypes.length] as "mcq" | "truefalse" | "short" | "scenario";
    const options = bank.mediumOptions[question];
    const explanation = bank.mediumExplanations[question] || "Review the reading materials for more information.";
    
    questions.push({
      id: generateId(),
      type,
      difficulty: "medium",
      question,
      options,
      correctAnswer: options ? options[0] : "Review the lesson carefully",
      explanation
    });
  }
  
  // Generate 5 hard questions
  for (let i = 0; i < 5; i++) {
    const question = bank.hardQuestions[i];
    const type = questionTypes[i % questionTypes.length] as "mcq" | "truefalse" | "short" | "scenario";
    const options = bank.hardOptions[question];
    const explanation = bank.hardExplanations[question] || "This question requires deep understanding of the topic.";
    
    questions.push({
      id: generateId(),
      type,
      difficulty: "hard",
      question,
      options,
      correctAnswer: options ? options[0] : "Explain your reasoning based on the concepts",
      explanation
    });
  }
  
  return questions;
}

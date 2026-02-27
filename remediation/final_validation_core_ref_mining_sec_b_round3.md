VERIFIED: 13
ISSUES: 0
UNVERIFIED: 2

UNVERIFIED
- content/docs/mining/pool-mining.mdx
  - :10-20 presents pool share/reward-flow behavior as generalized operational practice (pool-side implementation details are external to canonical `rusty-kaspa`/`kips` sources).
  - :42-44 explains PPS/PPLNS/PROP payout semantics, which are pool-policy/business-model conventions outside protocol source scope.
  - :64-70 asserts ASIC web-UI and failover-endpoint behavior as typical; this remains vendor/firmware-specific and not derivable from canonical repositories.
  - :92-109 gives miner-console metric interpretation and troubleshooting causality (latency/overclock/software) as operational guidance outside canonical protocol evidence.

- content/docs/mining/solo-mining.mdx
  - :22-27 includes hardware/miner-software and deployment-environment recommendations (GPU/ASIC suitability, sizing guidance) that are implementation/operations claims outside canonical source scope.
  - :98-106 uses representative miner-output conventions and counter interpretation that are miner-specific rather than canonical protocol behavior.
  - :109-114 depends on external ecosystem tooling/services (wallet UX and block explorers) that are not canonically specified in `rusty-kaspa`/`kips`.
  - :146-149 provides operational performance guidance (hardware/network tuning) that remains environment-specific and non-canonical.

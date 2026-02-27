# Resolver Selection Evidence

Date: 2026-02-27

## Official documentation claim
Source: https://kaspa.aspectron.org/rpc/kaspa-resolver.html

- "...queried ... for the node with least active client connections."

Source: https://kaspa.aspectron.org/rpc/pnn.html

- "...queried for a node that has least number of active client connections."

## Resolver implementation behavior
Source: https://raw.githubusercontent.com/aspectron/kaspa-resolver/master/src/monitor.rs

- Connections are sorted by `connection.score()`.
- Election does **weighted random** selection over sorted nodes:
  - `total_weight = sum(nodes.len() - i)`
  - random weight pick iterates list and returns first node crossing threshold.

Source: https://raw.githubusercontent.com/aspectron/kaspa-resolver/master/src/connection.rs

- `score()` is `clients + peers` (`delegate().sockets()`).

Interpretation:
- Selection is **biased toward lower-load nodes**, but not guaranteed to always pick the strict least-loaded node.

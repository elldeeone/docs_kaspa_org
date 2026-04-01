use std::sync::Arc;
use std::time::Duration;

use kaspa_rpc_core::{api::rpc::RpcApi, RpcDataVerbosityLevel};
use kaspa_wrpc_client::{
    client::{ConnectOptions, ConnectStrategy},
    prelude::{NetworkId, NetworkType},
    KaspaRpcClient, Resolver, WrpcEncoding,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let network_id = NetworkId::new(NetworkType::Mainnet);
    let rpc_url: Option<&str> = None;
    let start_hash: Option<&str> = None;

    let client = Arc::new(KaspaRpcClient::new_with_args(
        WrpcEncoding::Borsh,
        rpc_url,
        if rpc_url.is_some() {
            None
        } else {
            Some(Resolver::default())
        },
        Some(network_id),
        None,
    )?);

    let options = ConnectOptions {
        block_async_connect: true,
        connect_timeout: Some(Duration::from_millis(5_000)),
        strategy: ConnectStrategy::Fallback,
        ..Default::default()
    };

    client.connect(Some(options)).await?;

    let dag_info = client.get_block_dag_info().await?;
    let start_hash = if let Some(hash) = start_hash {
        hash.parse()?
    } else {
        dag_info.pruning_point_hash
    };

    let response = client
        .get_virtual_chain_from_block_v2(start_hash, Some(RpcDataVerbosityLevel::High), Some(10))
        .await?;

    // rollback previously ingested txs that are tied to no longer accepted blocks
    response
        .removed_chain_block_hashes
        .iter()
        .for_each(|removed_block_hash| {
            // Here: handle rollback
            println!("block {} is no longer accepted", removed_block_hash);
        });

    for block in response.chain_block_accepted_transactions.iter() {
        for tx in &block.accepted_transactions {
            println!(
                "{:?} {:?} {:?}",
                block.chain_block_header.hash,
                tx.verbose_data
                    .as_ref()
                    .and_then(|verbose| verbose.transaction_id),
                tx.payload
            );
        }
    }

    let next_checkpoint = response
        .added_chain_block_hashes
        .last()
        .copied()
        .unwrap_or(start_hash);
    println!("Next checkpoint: {next_checkpoint}");

    client.disconnect().await?;

    Ok(())
}

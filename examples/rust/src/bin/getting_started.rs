use std::sync::Arc;
use std::time::Duration;

use kaspa_rpc_core::api::rpc::RpcApi;
use kaspa_wrpc_client::{
    client::{ConnectOptions, ConnectStrategy},
    prelude::{NetworkId, NetworkType},
    KaspaRpcClient, Resolver, WrpcEncoding,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let network_id = NetworkId::new(NetworkType::Mainnet);
    let rpc_url: Option<&str> = None;

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
    println!("{dag_info:#?}");
    println!("Pruning point: {}", dag_info.pruning_point_hash);

    client.disconnect().await?;

    Ok(())
}

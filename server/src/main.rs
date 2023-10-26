use actix_web::{get, web::ServiceConfig};
use shuttle_actix_web::ShuttleActixWeb;
use tracing::info;

#[get("/")]
async fn hello_world() -> &'static str {
    "PhantomByte REST API v0.1.0"
}

#[shuttle_runtime::main]
async fn main() -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    let config = move |cfg: &mut ServiceConfig| {
        cfg.service(hello_world);
    };

    info!("Starting PhantomByte REST API v0.1.0");

    Ok(config.into())
}

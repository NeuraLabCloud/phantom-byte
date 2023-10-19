#!/usr/bin/env sh

# Check if the current directory is a Rust crate
if ! cargo metadata --no-deps --format-version 1 >/dev/null 2>&1; then
  echo "Error: Not a Rust crate directory. Please run this script in your crate's root directory."
  exit 1
fi

# Check if cargo fmt reports any formatting issues
if ! cargo +nightly fmt --all -- --check; then
  echo "Error: Formatting issues detected. Please run 'cargo fmt' to format your code."
  exit 1
fi

# Check if clippy lints report any issues
if ! cargo clippy --all -- -D warnings; then
  echo "Error: Clippy lints detected issues. Please fix the reported warnings and errors."
  exit 1
fi

# Run your tests here
cargo test --doc --all
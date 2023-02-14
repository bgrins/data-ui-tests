#!/bin/bash

VERSION=3400000
echo "Downloading SQLite version: $VERSION";

curl -o sqlite-wasm-$VERSION.zip "https://sqlite.org/2022/sqlite-wasm-$VERSION.zip"
unzip sqlite-wasm-$VERSION.zip
rm -r sqlite_wasm/*
mv sqlite-wasm-$VERSION/* sqlite_wasm
rm -r sqlite-wasm-$VERSION sqlite-wasm-$VERSION.zip
echo $VERSION > sqlite_version.txt

# Export required files
cp sqlite_wasm/jswasm/* public

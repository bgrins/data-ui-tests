#!/bin/bash

VERSION=3400000
echo "Downloading SQLite version: $VERSION";

git checkout --orphan $VERSION
curl -o sqlite-wasm-$VERSION.zip "https://sqlite.org/2022/sqlite-wasm-$VERSION.zip"
unzip sqlite-wasm-$VERSION.zip
rm sqlite_wasm/*
mv sqlite-wasm-$VERSION/* sqlite_wasm
rm -r sqlite-wasm-$VERSION sqlite-wasm-$VERSION.zip
echo $VERSION > sqlite_version.txt

CREATE_SCRIPT="https://raw.githubusercontent.com/jpwhite3/northwind-SQLite3/1c297ca0fb5fe36f9cd7b5a8afffece9a1f017d1/src/create.sql"
echo "Downloading Northwind DB from $CREATE_SCRIPT";
curl -o create.sql $CREATE_SCRIPT


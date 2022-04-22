#!/bin/bash

spec_file=$1

npx openapi-generator-cli generate \
-g typescript-axios \
-i $spec_file \
-o ./src/api \
-c ./src/api/openapi-generator-config.json \
--api-package apis \
--model-package models \
--type-mappings json="string\|number" \
--language-specific-primitives "string\|number"
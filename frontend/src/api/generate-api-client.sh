#!/bin/bash

spec_file="__api_spec__.json"

curl http://localhost:5000/v3/api-docs/ > $spec_file

npx openapi-generator-cli generate \
-g typescript-axios \
-i $spec_file \
-o ./src/api \
-c ./src/api/openapi-generator-config.json \
--api-package apis \
--model-package models \
--type-mappings json="string\|number" \
--language-specific-primitives "string\|number"

rm $spec_file
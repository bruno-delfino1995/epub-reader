#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket bucket
aws --endpoint-url=http://localhost:4566 s3api put-bucket-cors --bucket bucket --cors-configuration file://cors.json

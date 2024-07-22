#!/bin/bash

# flag -d is passed while running the script, run command stripe fixtures ./zscripts/coupons.json
if [ "$1" == "-d" ]; then
  stripe fixtures ./zscripts/coupons.json
  exit 0
fi

# Get all coupon IDs using stripe CLI
coupon_ids=$(stripe coupons list --limit 100 | jq -r '.data[].id')

# Create the base JSON structure
data="{ \"$schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\",  \"_meta\": { \"template_version\": 0 }, \"fixtures\": [ "

# Build the request objects for each coupon
for coupon_id in $coupon_ids; do
  data="$data { \"path\": \"/v1/coupons/$coupon_id\", \"method\": \"delete\" }, "
done

# remove the last comma
# data="${data%?}" // didn't work 

# try this instead
data="${data::-2}"

# add the closing brackets
data="$data ] }"


# Save the JSON data to a file
echo "$data" > ./coupons.json

echo "Request data for deleting coupons saved to ./coupons.json."

# delete prices using stripe
# stripe fixtures ./z.json
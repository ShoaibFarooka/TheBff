#!/bin/bash

# flag -d is passed while running the script, run command stripe fixtures ./zscripts/customers.json
file="./zscripts/customers.json"
if [[ "$1" == "-d" ]]; then
  # Run stripe fixtures with the provided JSON file
  stripe fixtures $file
exit 0
else
  echo "Skipping Stripe fixtures as '-d' flag is not present."
fi


# Get all coupon IDs using stripe CLI
customer_ids=$(stripe customers list --limit 100 | jq -r '.data[].id')

# Create the base JSON structure
data="{ \"$schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\",  \"_meta\": { \"template_version\": 0 }, \"fixtures\": [ "

# Build the request objects for each coupon
for customer_id in $customer_ids; do
  data="$data { \"path\": \"/v1/customers/$customer_id\", \"method\": \"delete\" }, "
done

# remove the last comma
# data="${data%?}" // didn't work 

# try this instead
data="${data::-2}"

# add the closing brackets
data="$data ] }"


# Save the JSON data to a file
echo "$data" > $file

echo "Request data for deleting customers saved to ./customers.json."

# delete prices using stripe
# stripe fixtures ./z.json
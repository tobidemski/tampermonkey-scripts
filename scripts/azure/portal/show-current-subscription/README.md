# Azure - Subscriptions: Display current subscription
Adds an defined tag if you navigate in a subscription to know which subscription is currently used.

## Overviewpage
Short code as a suffix on the subscription name in the subscription overview page

Before:

![show current subscription overview before](https://github.com/tobidemski/tampermonkey-scripts/blob/main/scripts/azure/portal/show-current-subscription/images/show-current-subscription-overview-before.png?raw=true)

After:

![show current subscription overview after](https://github.com/tobidemski/tampermonkey-scripts/blob/main/scripts/azure/portal/show-current-subscription/images/show-current-subscription-overview-after.png?raw=true)

# Specific subscription pages
Header text is added next to the "Microsoft Azure" header

Before:

![key vault secrets list before](https://github.com/tobidemski/tampermonkey-scripts/blob/main/scripts/azure/portal/show-current-subscription/images/show-current-subscription-pages-before.png?raw=true)

After:

![key vault secrets list after](https://github.com/tobidemski/tampermonkey-scripts/blob/main/scripts/azure/portal/show-current-subscription/images/show-current-subscription-pages-after.png?raw=true)


## Installation

- Copy the content from show-current-subscription.js
- Create a new script in your tampermonkey extension
- Paste the content and save the script
- Update the config object (subscriptions arreay) with your subscriptions
---
name: danang-rental-listings
description: Search, filter, and explore rental property listings in Da Nang, Vietnam.
---

# Da Nang Rental Listings

Use the Danang.kim interactive map and its WebMCP tools to work with rental listings.

## Available operations

- Get general information about the website and available listings.
- Filter rental listings by price in VND.
- Return URLs for listings matching a price range.

## WebMCP tools

### get_site_info

Returns information about the Danang.kim website and the number of available listings.

### filter_listings_by_price

Filters listings by a minimum and maximum price in VND.

Arguments:

- `from`: minimum price in VND
- `to`: maximum price in VND

The result contains URLs of matching listings.
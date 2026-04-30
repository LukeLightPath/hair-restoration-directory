/**
 * Nearby Cities Map
 *
 * Hand-curated adjacencies for UK cities used in the directory.
 * Used for internal linking on city pages ("Explore Nearby Cities").
 * Falls back to an empty array for unmapped cities.
 */

import { citySlug } from '@/lib/utils'

const NEARBY: Record<string, string[]> = {
  'London': ['Romford', 'Croydon', 'Watford', 'Enfield', 'Bexley', 'Kingston upon Thames'],
  'Manchester': ['Liverpool', 'Leeds', 'Sheffield', 'Bolton', 'Stockport', 'Warrington'],
  'Liverpool': ['Manchester', 'Chester', 'Wirral', 'Warrington', 'Southport', 'St Helens'],
  'Birmingham': ['Wolverhampton', 'Coventry', 'Leicester', 'Solihull', 'Walsall', 'Dudley'],
  'Leeds': ['Manchester', 'Sheffield', 'Bradford', 'York', 'Wakefield', 'Huddersfield'],
  'Sheffield': ['Manchester', 'Leeds', 'Nottingham', 'Derby', 'Doncaster', 'Chesterfield'],
  'Bristol': ['Bath', 'Cardiff', 'Gloucester', 'Swindon', 'Cheltenham', 'Weston-super-Mare'],
  'Newcastle': ['Sunderland', 'Durham', 'Gateshead', 'Middlesbrough', 'Darlington', 'Carlisle'],
  'Nottingham': ['Leicester', 'Derby', 'Sheffield', 'Lincoln', 'Mansfield', 'Loughborough'],
  'Leicester': ['Nottingham', 'Birmingham', 'Coventry', 'Derby', 'Northampton', 'Loughborough'],
  'Glasgow': ['Edinburgh', 'Stirling', 'Paisley', 'Dundee', 'Hamilton', 'Motherwell'],
  'Edinburgh': ['Glasgow', 'Dundee', 'Stirling', 'Perth', 'Falkirk', 'Livingston'],
  'Cardiff': ['Bristol', 'Swansea', 'Newport', 'Bath', 'Gloucester', 'Bridgend'],
  'Southampton': ['Portsmouth', 'Bournemouth', 'Winchester', 'Salisbury', 'Reading'],
  'Portsmouth': ['Southampton', 'Bournemouth', 'Brighton and Hove', 'Chichester', 'Winchester'],
  'Brighton and Hove': ['Portsmouth', 'London', 'Crawley', 'Eastbourne', 'Worthing'],
  'Plymouth': ['Exeter', 'Torquay', 'Truro', 'Taunton', 'Barnstaple'],
  'Exeter': ['Plymouth', 'Bristol', 'Taunton', 'Torquay', 'Bournemouth'],
  'Bournemouth': ['Southampton', 'Portsmouth', 'Poole', 'Salisbury', 'Dorchester'],
  'Reading': ['London', 'Oxford', 'Swindon', 'Southampton', 'Basingstoke'],
  'Oxford': ['Reading', 'London', 'Swindon', 'Milton Keynes', 'Cheltenham'],
  'Cambridge': ['London', 'Norwich', 'Peterborough', 'Ipswich', 'Milton Keynes'],
  'Norwich': ['Cambridge', 'Ipswich', 'Peterborough', 'Great Yarmouth', 'King\'s Lynn'],
  'Ipswich': ['Norwich', 'Cambridge', 'Colchester', 'Chelmsford', 'London'],
  'York': ['Leeds', 'Hull', 'Harrogate', 'Scarborough', 'Middlesbrough'],
  'Hull': ['York', 'Leeds', 'Scunthorpe', 'Grimsby', 'Scarborough'],
  'Stoke-on-Trent': ['Manchester', 'Birmingham', 'Derby', 'Crewe', 'Stafford'],
  'Wolverhampton': ['Birmingham', 'Walsall', 'Dudley', 'Stoke-on-Trent', 'Telford'],
  'Coventry': ['Birmingham', 'Leicester', 'Warwick', 'Northampton', 'Rugby'],
  'Derby': ['Nottingham', 'Sheffield', 'Leicester', 'Stoke-on-Trent', 'Burton upon Trent'],
  'Sunderland': ['Newcastle', 'Durham', 'Middlesbrough', 'Hartlepool', 'Gateshead'],
  'Swansea': ['Cardiff', 'Bristol', 'Newport', 'Llanelli', 'Neath'],
  'Bolton': ['Manchester', 'Wigan', 'Bury', 'Blackburn', 'Preston'],
  'Stockport': ['Manchester', 'Macclesfield', 'Chester', 'Buxton', 'Warrington'],
  'Bradford': ['Leeds', 'Halifax', 'Huddersfield', 'Keighley', 'Wakefield'],
  'Blackpool': ['Preston', 'Lancaster', 'Bolton', 'Burnley', 'Southport'],
  'Preston': ['Blackpool', 'Lancaster', 'Bolton', 'Burnley', 'Manchester'],
  'Middlesbrough': ['Newcastle', 'Sunderland', 'York', 'Darlington', 'Hartlepool'],
  'Cheltenham': ['Gloucester', 'Bristol', 'Oxford', 'Worcester', 'Swindon'],
  'Gloucester': ['Cheltenham', 'Bristol', 'Cardiff', 'Swindon', 'Worcester'],
  'Swindon': ['Oxford', 'Bristol', 'Reading', 'Cheltenham', 'Bath'],
  'Milton Keynes': ['Oxford', 'Cambridge', 'Northampton', 'London', 'Bedford'],
  'Northampton': ['Milton Keynes', 'Coventry', 'Leicester', 'Birmingham', 'Cambridge'],
  'Peterborough': ['Cambridge', 'Norwich', 'Leicester', 'Northampton', 'Lincoln'],
  'Lincoln': ['Nottingham', 'Sheffield', 'Peterborough', 'Hull', 'Scunthorpe'],
  'Bath': ['Bristol', 'Swindon', 'Salisbury', 'Cardiff', 'Cheltenham'],
  'Chester': ['Liverpool', 'Manchester', 'Wrexham', 'Stoke-on-Trent', 'Warrington'],
  'Warrington': ['Manchester', 'Liverpool', 'Chester', 'Bolton', 'St Helens'],
  'Dundee': ['Edinburgh', 'Glasgow', 'Perth', 'Aberdeen', 'Stirling'],
  'Aberdeen': ['Dundee', 'Edinburgh', 'Inverness', 'Perth', 'Glasgow'],
  'Inverness': ['Aberdeen', 'Dundee', 'Perth', 'Glasgow', 'Edinburgh'],
  'Belfast': ['Lisburn', 'Bangor', 'Newry', 'Derry', 'Armagh'],
  'Romford': ['London', 'Brentwood', 'Enfield', 'Bexley', 'Chelmsford'],
  'Croydon': ['London', 'Brighton and Hove', 'Kingston upon Thames', 'Bromley', 'Sutton'],
  'Watford': ['London', 'St Albans', 'Hemel Hempstead', 'Luton', 'Harrow'],
  'Enfield': ['London', 'Romford', 'Watford', 'Barnet', 'Walthamstow'],
  'Bexley': ['London', 'Romford', 'Croydon', 'Dartford', 'Bromley'],
  'Solihull': ['Birmingham', 'Coventry', 'Warwick', 'Wolverhampton', 'Leicester'],
  'Walsall': ['Birmingham', 'Wolverhampton', 'Dudley', 'Stafford', 'Lichfield'],
  'Dudley': ['Birmingham', 'Wolverhampton', 'Walsall', 'Stourbridge', 'Kidderminster'],
  'Harrogate': ['Leeds', 'York', 'Bradford', 'Ripon', 'Skipton'],
  'Huddersfield': ['Leeds', 'Bradford', 'Sheffield', 'Manchester', 'Wakefield'],
  'Wakefield': ['Leeds', 'Bradford', 'Huddersfield', 'Doncaster', 'Barnsley'],
  'Doncaster': ['Sheffield', 'Leeds', 'Wakefield', 'Scunthorpe', 'Rotherham'],
  'Luton': ['London', 'Milton Keynes', 'St Albans', 'Watford', 'Bedford'],
  'Colchester': ['Ipswich', 'Chelmsford', 'London', 'Cambridge', 'Southend-on-Sea'],
  'Chelmsford': ['London', 'Colchester', 'Romford', 'Southend-on-Sea', 'Ipswich'],
  'Southend-on-Sea': ['London', 'Chelmsford', 'Romford', 'Colchester', 'Basildon'],
  'Maidstone': ['London', 'Canterbury', 'Brighton and Hove', 'Tunbridge Wells', 'Ashford'],
  'Canterbury': ['Maidstone', 'Dover', 'London', 'Ashford', 'Margate'],
  'Salisbury': ['Southampton', 'Bournemouth', 'Bath', 'Swindon', 'Winchester'],
  'Winchester': ['Southampton', 'Portsmouth', 'Salisbury', 'Basingstoke', 'Reading'],
  'Basingstoke': ['Reading', 'Winchester', 'Southampton', 'London', 'Guildford'],
  'Guildford': ['London', 'Basingstoke', 'Brighton and Hove', 'Woking', 'Reading'],
  'Worcester': ['Cheltenham', 'Gloucester', 'Birmingham', 'Hereford', 'Kidderminster'],
  'Hereford': ['Worcester', 'Cheltenham', 'Gloucester', 'Shrewsbury', 'Cardiff'],
  'Shrewsbury': ['Wolverhampton', 'Stoke-on-Trent', 'Chester', 'Hereford', 'Telford'],
  'Telford': ['Wolverhampton', 'Shrewsbury', 'Birmingham', 'Stafford', 'Stoke-on-Trent'],
  'Stafford': ['Stoke-on-Trent', 'Wolverhampton', 'Birmingham', 'Derby', 'Telford'],
  'Burnley': ['Preston', 'Blackpool', 'Bolton', 'Manchester', 'Bradford'],
  'Blackburn': ['Bolton', 'Preston', 'Burnley', 'Manchester', 'Wigan'],
  'Wigan': ['Manchester', 'Bolton', 'Liverpool', 'Warrington', 'St Helens'],
  'Lancaster': ['Blackpool', 'Preston', 'Kendal', 'Morecambe', 'Carlisle'],
  'Carlisle': ['Newcastle', 'Lancaster', 'Penrith', 'Dumfries', 'Workington'],
  'Scarborough': ['York', 'Hull', 'Middlesbrough', 'Bridlington', 'Whitby'],
  'Taunton': ['Bristol', 'Exeter', 'Bath', 'Bridgwater', 'Yeovil'],
  'Torquay': ['Plymouth', 'Exeter', 'Taunton', 'Newton Abbot', 'Paignton'],
  'Truro': ['Plymouth', 'Falmouth', 'Penzance', 'Newquay', 'St Austell'],
  'Perth': ['Edinburgh', 'Dundee', 'Glasgow', 'Stirling', 'Inverness'],
  'Stirling': ['Glasgow', 'Edinburgh', 'Perth', 'Dundee', 'Falkirk'],
  'Kingston upon Thames': ['London', 'Croydon', 'Guildford', 'Sutton', 'Wimbledon'],
}

export interface NearbyCityLink {
  name: string
  href: string
}

/**
 * Get nearby cities that exist in the directory.
 * Returns up to `max` nearby city links.
 */
export function getNearbyCities(
  cityName: string,
  allCitiesInDb: string[],
  max: number = 5
): NearbyCityLink[] {
  const nearby = NEARBY[cityName] || []

  // Filter to only cities that actually exist in the database
  const dbCitySet = new Set(allCitiesInDb.map(c => c.toLowerCase()))

  const matches = nearby
    .filter(c => dbCitySet.has(c.toLowerCase()))
    .slice(0, max)
    .map(name => ({
      name,
      href: `/uk/${citySlug(name)}`,
    }))

  // If we didn't find enough (or city wasn't in the map), pick other DB cities
  if (matches.length < max) {
    const usedNames = new Set([cityName.toLowerCase(), ...matches.map(m => m.name.toLowerCase())])
    const extras = allCitiesInDb
      .filter(c => !usedNames.has(c.toLowerCase()))
      .slice(0, max - matches.length)
      .map(name => ({
        name,
        href: `/uk/${citySlug(name)}`,
      }))
    matches.push(...extras)
  }

  return matches
}

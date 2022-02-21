from geopy.geocoders import Nominatim
import sys
locationRequested = sys.argv[1]


locator = Nominatim(user_agent="Acence")
location = locator.geocode(locationRequested)
print((location.latitude, location.longitude))

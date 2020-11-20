ROUTES
/public          -- view cats, view location
/user            -- login, register
/auth/cats       -- create, update, delete, mark fed, mark potential duplicate
/auth/locations  -- create, update, delete
/auth/user       -- edit user, add tracked locations

SCHEMA
Cats
----------
ID
Names []
Locations [{ District(Model), Street Name, remarks}] ----Street Name : xxxxxxxxx St/Dr/Ave xxxx
Breed
Colour
Descriptions(reviews) [] -
Missing - boolean
Fed [ latest first - {Time, fed by}]
Photos []

District
----------
Name
Locality: nsew (enum)
Estates: model

Users
----------
Email - unique
Password
Full name
Primary location
Tracked locations
Favourite cats
Admin?
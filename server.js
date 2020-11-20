ROUTES
/public          -- view cats, view location
/user            -- login, register
/auth/cats       -- create, update, delete, mark fed, mark potential duplicate
/auth/locations  -- create, update, delete
/auth/user       -- edit user,



SCHEMA
Cats
----------
ID
Names []
Locations [{model, remarks}]
Breed
Colour
Descriptions(reviews) [] -
Missing - boolean
Fed [ latest first - {Time, fed by}]
Photos []

Towns
----------
Name
Locality: nsew (enum)
Estates: model

Estates
----------
Street Name : xxxxxxxxx St/Dr/Ave xxxx
Blocks []
Cats []

Users
----------
Email - unique
Password
Full name
Primary location
Tracked locations
Favourite cats
Admin?
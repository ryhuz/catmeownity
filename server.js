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
Locations [{ Location(model), remarks}] ----
Breed
Colour
Descriptions(reviews) [] -
Missing - boolean
Fed [ latest first - {Time, fed by: User(model)}]
Photos []
Potential Duplicate {Boolean, Cat(Model)}

District
----------
Name
Locality: nsew (enum)

Users
----------
Email - unique
Password
Full name
Primary location
Tracked locations
Favourite cats
Admin?

Location
----------
District (model)
Block []:
Street Name : xxxxxxxxx St/Dr/Ave xxxx (important one)
Cats[]
could use fetch api method where server sends back either json and then
the single page front end dynamically injects the data into the html (like react).
fetch post could be replaced with form submission method. these two are
only needed for login or signup where you have to send username and password
from front to back. but to send access tokens from front to back or back to front,
use cookies.
OR fetch again but this time the server sends back an html file,
then front end js would result.text() parse it instead of result.json(),
this would still be a single page app but the inner contents wouldnt
be dynamically injected.
OR could use a view engine such as handlebars (preferred for easier syntax)
or ejs, which the server sends data directly into multiple html pages,
aka server side rendering. more popular than previous methods.

user authorization steps
basically, during login, before client sends username and password to server
via fetch or form, bcrypt encrypts password, then server checks database
to see if login and password is correct, if correct, server creates a token
with jwt with an expiration, then puts it in the client's cookie. when client
visits a restricted page, server checks the cookies that were automatically sent
by the get request, server checks cookies for the token and verifies it with middleware.
if verified, middleware passes it to render the page.

now has session countdown timer that will auto logout. based on setInterval subtracting
every second, expiresIn is based on the date when token is created + time give
minus now. can be hacked if user inspects application and changes cookie expiryDate
to a later date. but if token expires, at least if the user navigates to a new route,
server will know token is expired and direct the user to logout.

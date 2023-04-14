# Store Assistant

Two Main Parts: The store interface for setting up the navigation directory and the client mobile app

Mobile App
 * Detect if in a navigable store using geolocation
 * Take in voice or text input
 * Use input to return a response telling the location or availability of an item
 * Translate to languages as required
 * Future: provide availability

Mobile App Technical Specifications
 * Build using react-native
 * Need to use geolocation and a database of participating stores as well as their system prompts for setting up the store things and locations
 * Need to be able to take voice input (use whisper API probably)
 * Need to be able to process using the engineered prompt
 * Need to be translated (separate prompt)
 * Need to be converted back to voice if required (use whisper API probably)

Third part to implement: online store assistant for navigation based on preferences (chrome)

Desktop App - for store managers to set up easily
Need to provide location of the store
Set up prompt: mapping of aisles, relative locations of each aisle, and the items in each aisle
Requires database storage, pretty much it

###Technical Specifications/Requirements

**BACKEND:**
Database of locations => names, starting prompts (supabase)
OpenAI prompt runner: includes starting prompt and loaded prompt
Authentication for stores

**FRONTEND (MOBILE):**
Home landing page
Switch to chat directory when detecting a nearby location
Chat to interface with the API based on provided knowledge

**FRONTEND DESKTOP:**
Landing page => provide general information
UI for store owners to create prompts => simple form with description
Finished page => tell how to advertise or stuff like that

**LATER CHROME EXTENSION:** requires own frontend and backend

**Proper Description of Stuff to do:**
 * Setup supabase for the database
 * Next.JS for the desktop app:
   * Initialize the app ✅
   * Setup the prisma schema ✅
   * Setup TRPC for the REST API to interface with the prisma schema (get all stores for a user and create a new store with the data, prompt updating) ✅
   * Setup the landing page 
   * Authentication ✅
   * Displaying all stores on the dashboard ✅
   * Form for signing up a store ✅
   * Updating form ✅
   * Updating styles (Proper UI design)
 * Backend Chat:
   * Setup python and deploy as supabase edge function (should be pretty simple)
 * Mobile App:
   * Setup react native
   * Setup prisma calls
   * Setup TRPC (if necessary)
   * Setup landing page
   * Setup location finder
   * Setup chat interface
 * Chrome Extension:
   * Deploy a supabase edge function
   * Plan this part out later
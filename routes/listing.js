const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const { route } = require("./user.js");


router.get("/filter/:id",wrapAsync(listingController.filter));
router.get("/search", wrapAsync(listingController.search));

router
  .route("/")
  //index route
  .get(wrapAsync(listingController.index))
  // create route
  .post(
    isLoggedIn,  
    validateListing, 
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  )

// new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  //show route
  .get(wrapAsync(listingController.showListing))
  // update route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  //delete route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  // validateListing,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;

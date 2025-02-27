import { lazy, Suspense } from "react";

const Profile = lazy(() => import("./Profile"));
const Purchases = lazy(() => import("./Purchases"));
const SavedRestaurants = lazy(() => import("./SavedRestaurants"));
const FavouriteFoods = lazy(() => import("./FavouriteFoods"));
const Notification = lazy(() => import("./Notification"));
const Reviews = lazy(() => import("./Reviews"));
const Settings = lazy(() => import("./Settings"));

const RenderComponent = () => {
  switch (selectedCategory) {
    case "Profile":
      return <Profile />;
    case "Orders":
      return <Purchases />;
    case "Saved Restaurants":
      return <SavedRestaurants />;
    case "Favourite foods":
      return <FavouriteFoods />;
    case "Notification":
      return <Notification />;
    case "Reviews":
      return <Reviews />;
    case "Settings":
      return <Settings />;
    default:
      return <div></div>;
  }
};

return (
  <Suspense fallback={<div>Loading...</div>}>
    {renderComponent()}
  </Suspense>
);

export default RenderComponent
INSERT users SET
  email = "test01@example.com",
  encrypted_password = "$2a$10$Uovn6pJCI13I2CfcG1Nj/e2.TcoIUqkz8Y0kFi3pEAGXcj32RbisO",
  token = "fd7c1a89f0487511dae870fd0bad3c6a8759dba32a6f05fbcec47fd8fddd3df1",
  created_at = NOW(),
  updated_at = NOW();

INSERT sources SET
  user_id = 1,
  url = "https://gizmodo.com/rss",
  title = "Gizmodo",
  created_at = NOW(),
  updated_at = NOW();

INSERT sources SET
  user_id = 1,
  url = "https://www.wired.com/feed/rss",
  title = "Wired",
  created_at = NOW(),
  updated_at = NOW();

INSERT feeds SET 
  source_id = 1,
  url = "https://gizmodo.com/amcs-ceo-apparently-couldnt-bother-to-put-on-pants-for-1847037938",
  title = "AMC's CEO Apparently Didn't Bother to Put on Pants for This YouTube Interview",
  contents = "AMC is the latest meme stock darling for hordes of online investors, and CEO Adam Aron has been leaning heavily into the company’s newfound virality. However, I doubt he ever expected to become a mem...",
  created_at = NOW(),
  updated_at = NOW(),
  image_url = "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/3ab1d455d971143fb76830c65f5170d6.gif";

INSERT feeds SET 
  source_id = 1,
  url = "https://gizmodo.com/this-new-documentary-on-peanuts-creator-charles-schulz-1847034436",
  title = "This New Documentary on Peanuts Creator Charles Schulz Looks Like a Security Blanket for Your Soul",
  contents = "Apple TV+ has released the first trailer for Who Are You, Charlie Brown?, a documentary on Peanuts creator Charles Schulz. It's full of a variety of guest stars who...",
  created_at = NOW(),
  updated_at = NOW(),
  image_url = "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/bcf489c8c413ea1183b1d96cd56e8448.png";

INSERT feeds SET 
  source_id = 2,
  url = "https://www.wired.com/story/facebook-oversight-board-kind-of-working-trump-ban",
  title = "Admit It: The Facebook Oversight Board Is Kind of Working",
  contents = "Facebook has agreed to follow some of the board’s nonbinding recommendations regarding the Donald Trump suspension. That’s progress.",
  created_at = NOW(),
  updated_at = NOW(),
  image_url = "https://media.wired.com/photos/60ba6b3aeaa210b2096c93bd/master/pass/Business-Facebook-Trump-Ban-1211673962.jpg";


INSERT feeds SET 
  source_id = 2,
  url = "https://www.wired.com/story/vaccine-incentives-surplus-doses-coronavirus-news",
  title = "New Vaccine Incentives, Surplus Dose Shipments, and More News",
  contents = "Catch up on the most important updates from this week.",
  created_at = NOW(),
  updated_at = NOW(),
  image_url = "https://media.wired.com/photos/60ba3b3c8c4fdb463a5c62e4/master/pass/Science_GettyImages-1232845034.jpg";

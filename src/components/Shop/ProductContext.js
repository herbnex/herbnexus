import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const allProducts = [
    {
      "id": 1,
      "name": "Bone & Heart Support",
      "price": 29.9,
   //  "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719817116481-generated-label-image-0.jpg?v=1719817162",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719817116485-generated-label-image-2.jpg?v=1719817162",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719817116486-generated-label-image-3.jpg?v=1719817162",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719817116483-generated-label-image-1.jpg?v=1719817162",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719817116487-generated-label-image-4.jpg?v=1719817162",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612124801-vox4bone-sf_6341e010-3dc2-42ef-a8a1-0b644467e0bd.png?v=1719817162"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Both vitamins D3 and K2 are essential to the body's function and overall health. Vitamin D3 aids in absorbing calcium and phosphorus, which are essential for bone formation and maintenance.</p><p><br></p><p>In addition to supporting the development of strong bones, Vitamin K2 may also benefit the cardiovascular system since it may promote healthy blood clotting.*</p><p><br></p><p><strong>Ingredients:\u00a0</strong>Calcium (as Calcium Carbonate), Vitamin D3 (Cholecalciferol), Vitamin K2 (mk-7)(as Menaquinone), BioPerine\u00ae (Black Pepper Fruit Extract), Cellulose (vegetable capsule).</p><p><strong>Manufacturer Country</strong>: USA</p><p><strong>Product Amount</strong>: 60 caps</p><p><strong>Gross Weight: </strong>0.25lb (113g)</p><p><strong>Suggested Use:</strong>\u00a0Take one (1) capsule twice a day as a dietary supplement. For best results, take 20-30 min before a meal or as directed by your healthcare professional.</p><p><strong>Caution:\u00a0</strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
  //   {
  //     "id": 2,
  //     "name": "Birch Chaga Microbiome Wellness Capsules",
  //     "price": 38.9,
  //  //   "discountPrice": 0,
  //     "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719817052948-generated-label-image-0.jpg?v=1719817095",
  //     "category": "Natural Extracts",
  //     "rating": 4.5,
  //     "reviews": [
  //       {
  //         "user": "Jamie",
  //         "date": "25 Jun, 2024",
  //         "comment": "Great product!",
  //         "rating": 5
  //       }
  //     ],
  //     "additionalImages": [
  //       "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719817052949-generated-label-image-1.jpg?v=1719817095",
  //       "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719817052952-generated-label-image-2.jpg?v=1719817095",
  //       "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240620134058-bls1ca30-sf_9f7d6678-2150-464d-ac97-683c920715c1.png?v=1719817095"
  //     ],
  //     "demandText": "294 people bought this in the last 24 hours.",
  //     "saleEndDate": "06 July",
  //     "quantity": 1,
  //     "description": "<p>Birch Chaga Capsules are loaded with essential nutrients for optimized body functioning. The most notable of these nutrients are phytochemicals.*</p><p><br></p><p>Phytochemicals are plant-based molecules that stimulate the immunological and hormonal systems and play an essential part in maintaining a normal balance of our bodies.*</p><p><br></p><p>Birch Chaga Capsules support the maintenance of a healthy gut microbiome and the absorption and administration of nutrients, fatty acids, and minerals at the cellular level.*</p><p><br></p><p><strong>Ingredients: </strong>Birch Chaga, Wood extract containing humic substance (25% humic acid, 75% fulvic acid), Cellulose Capsule (plant-based).</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount:</strong> 30 caps</p><p><strong>Gross Weight:</strong> 0.05lb (24g)</p><p><strong>Suggested Use: </strong>We recommend 1 capsule (0.5g) per day. A higher dose is unnecessary, as the body does not consume more than necessary.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png\" alt=\"No fillers\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
  //   },
    {
      "id": 3,
      "name": "Beetroot",
      "price": 20.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816807670-generated-label-image-4.jpg?v=1719816838",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816807668-generated-label-image-3.jpg?v=1719816838",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816807666-generated-label-image-1.jpg?v=1719816838",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816807667-generated-label-image-2.jpg?v=1719816838",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816807664-generated-label-image-0.jpg?v=1719816838",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240618172039-vox4beet-sf_56a0f2a1-2f77-4ca0-a18d-11fe8d0c223c.png?v=1719816838"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Contains naturally occuring organic nitrates, beetroot (Beta vulgaris) may support nitric oxide production, promote normal blood pressure, enhancing oxygen supply to active muscles, and possibly improving athletic performance.</p><p><br></p><p>Regular beetroot supplementation might support post-exercise perceived muscle soreness and help maintain better performance during the recovery period.*</p><p><br></p><p><strong>Ingredients: </strong>Organic Beetroot Powder (beta vulgaris), Cellulose (Vegetable Capsule), Microcrystalline Cellulose, Magnesium Stearate.</p><p><strong>Manufacturer Country</strong>: USA</p><p><strong>Product Amount</strong>: 60 caps</p><p><strong>Gross Weight: </strong>0.25lb (133g)</p><p><strong style=\"color: rgb(0, 0, 0);\">Suggested Use:</strong><span style=\"color: rgb(0, 0, 0);\">\u00a0Take two (2) capsules once a day as a dietary supplement. For best results, take 20-30 min before a meal with an 8oz (236 ml) glass of water or as directed by your healthcare professional.</span></p><p><strong>Caution: </strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 4,
      "name": "Bee Pearl",
      "price": 34.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816727378-generated-label-image-0.jpg?v=1719816744",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816727380-generated-label-image-1.jpg?v=1719816744",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816727384-generated-label-image-3.jpg?v=1719816744",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816727385-generated-label-image-4.jpg?v=1719816744",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816727382-generated-label-image-2.jpg?v=1719816744",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612131006-nrt3beep-sf_39d30000-b2f8-43fd-9f9a-c07a2d62883a.png?v=1719816744"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Bee Pearl is a pollen, nectar, and enzyme blend. Each capsule contains vitamins, microelements, polyphenols, unsaturated fatty acids, and antioxidants. This natural blend helps maintain your health, immunity, and energy level.</p><p><br></p><p>Bee Pearl contains a variety of naturally occurring vitamins, minerals, and other vital substances:</p><p><br></p><p>- Amino acids (15 from 20 possible)</p><p>- Numerous fatty acids (includes OMEGA-3, OMEGA-6)</p><p>- All Vitamins (a substantial amount of A, E, B3, B1, B, H)</p><p>- Minerals (a substantial amount of Zn, Cu, Fe, K, Na)</p><p>- Microelements and Polyphenolic compounds.</p><p><br></p><p><strong>Ingredients: </strong>Freeze Dried Extract of Bee Bread, Vitamin C.</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount: </strong>30 caps</p><p><strong>Gross Weight: </strong>0.11lb (50g)</p><p><strong>Suggested Use:\u00a0</strong>One (1) capsule per day during the main meal or immediately after it with a glass of water. Suitable for vegetarians. Gluten-free. Suitable for long-term use.</p><p><strong>Caution:</strong> Recommended to anyone who is not allergic to bee products. If you are prone to allergic reactions, consult a doctor or pharmacist before use. Do not exceed the recommended daily dose. Do not use on an empty stomach.\u00a0Consult a doctor or pharmacist before using this product during pregnancy or when breastfeeding. Do not use after the expiry of the validity period. Do not use food supplements as a substitute for a diverse and balanced diet. Keep out of reach and sight of children. Store at room temperature from +15C to +25C in a dry place, away from direct sunlight.</p><p><strong>Warning: </strong>This product is not intended to diagnose, treat, cure or prevent any disease. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png\" alt=\"No fillers\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 5,
      "name": "Ashwagandha",
      "price": 23.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816614977-generated-label-image-4.jpg?v=1719816636",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816614975-generated-label-image-3.jpg?v=1719816636",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816614969-generated-label-image-0.jpg?v=1719816636",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816614971-generated-label-image-1.jpg?v=1719816636",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816614974-generated-label-image-2.jpg?v=1719816636",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240618171058-vox4ashw-sf.png?v=1719816636"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Ashwagandha is an ancient herb used in Ayurvedic medicine, India\u2019s traditional healthcare system. Recently popularized worldwide, it\u2019s most well-known as a powerful adaptogen that helps individuals calm their stress levels.\u00a0*</p><p><br></p><p>Ashwagandha contains potent chemicals that help to support overall health in the body.*</p><p><br></p><p><strong>Ingredients: </strong>Organic Ashwagandha (Withania somnifera)(root), Organic Black Pepper (Piper nigrum)(fruit), pullulan capsules.</p><p><strong>Manufacturer Country</strong>: USA</p><p><strong>Amount</strong>: 60 caps</p><p><strong>Gross Weight: </strong>0.25lb (113g)</p><p><strong style=\"color: rgb(0, 0, 0);\">Suggested Use:</strong><span style=\"color: rgb(0, 0, 0);\">\u00a0Take two (2) capsules once a day as a dietary supplement. For best results, take 20-30 min before a meal with an 8oz glass of water or as directed by your healthcare professional.</span></p><p><strong>Caution: </strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> This product is not intended to diagnose, treat, cure or prevent any disease. Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095500-100--organic-2x.png\" alt=\"Organic\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 6,
      "name": "5-HTP",
      "price": 19.9,
 //     "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816507749-generated-label-image-4.jpg?v=1719816536",
      "category": "Amino Acids & Blends",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816507747-generated-label-image-2.jpg?v=1719816536",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816507748-generated-label-image-3.jpg?v=1719816536",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816507745-generated-label-image-1.jpg?v=1719816536",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816507743-generated-label-image-0.jpg?v=1719816536",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240618170222-vox45htp-sf.png?v=1719816536"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>5-HTP occurs naturally in the body. Typically, people produce enough for regular functioning, but some require supplementation. 5-HTP dietary supplements aid in supporting normal serotonin levels in the brain and emotional well-being.\u00a0</p><p><br></p><p>Since 5-HTP is naturally present in the body, supplementing with it is a clean, holistic way to support normal serotonin levels.* </p><p><br></p><p><strong>Ingredients: </strong>Calcium (as Calcium Carbonate), 5-Hydroxytryptophan (from Griffo via simplicifolia seed extract), Gelatin (capsule), Magnesium Stearate.\u00a0</p><p><strong>Manufacturer Country</strong>: USA</p><p><strong>Product Amount</strong>: 60 caps</p><p><strong>Gross Weight: </strong>0.25lb (113g)</p><p><strong style=\"color: rgb(0, 0, 0);\">Suggested Use:</strong><span style=\"color: rgb(0, 0, 0);\">\u00a0Take two (2) capsules once a day as a dietary supplement. For best results, take 20-30 min before a meal with an 8oz (236 ml) glass of water or as directed by your healthcare professional.</span></p><p><strong>Caution: </strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 7,
      "name": "Vitamin D3 2,000 IU",
      "price": 19.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816409599-generated-label-image-0.jpg?v=1719816490",
      "category": "Vitamins & Minerals",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816409605-generated-label-image-3.jpg?v=1719816490",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816409603-generated-label-image-2.jpg?v=1719816490",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816409601-generated-label-image-1.jpg?v=1719816490",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816409606-generated-label-image-4.jpg?v=1719816490",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612115121-rlc3vtd3-sf.png?v=1719816490"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Vitamin D3 is a fat-soluble vitamin that supports the growth and development of bones and teeth. It also plays an essential role in the functioning of the muscles and boosting energy levels in the body.\u00a0</p><p><br></p><p>The body naturally produces Vitamin D when exposed to sunlight, and you can also receive Vitamin D from some foods like oily fish. In the winter months, especially in colder regions, the body doesn\u2019t produce as much Vitamin D, leading to \u2018seasonal depression.\u2019*</p><p><br></p><p><strong>Ingredients: </strong>Vitamin D3 (as cholecalciferol), Softgel (gelatin, glycerin, water), soybean oil, corn oil.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount: </strong>100 softgels</p><p><strong>Gross Weight: </strong>0.1lb (45g)\u00a0</p><p><strong>Suggested Use: </strong>As a dietary supplement, adults take one (1) softgel capsule daily or as directed by a health care professional. Store in a cool, dry place and away from direct light.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 8,
      "name": "Testosterone Booster",
      "price": 40.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816357769-generated-label-image-0.jpg?v=1719816416",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816357774-generated-label-image-3.jpg?v=1719816416",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816357773-generated-label-image-2.jpg?v=1719816416",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816357775-generated-label-image-4.jpg?v=1719816416",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816357770-generated-label-image-1.jpg?v=1719816416",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815105309-vox4test-sf.png?v=1719816416"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Support Men's Vitality and Wellness: Our carefully crafted dietary supplement is designed to promote men's health and well-being without containing testosterone. Formulated with a blend of key nutrients including magnesium, zinc, tribulus terrestris, chysin, horny goat weed, longjack, saw palmetto berries, hawthorn berries, and cissus quadrangularis, our product supports various aspects of men's health. * </p><p><br></p><p><strong>Muscle Support and Energy Boost</strong>: Enhance lean muscle mass and energy levels with our supplement, which is thought to support muscle growth and weight management. * </p><p><br></p><p><strong>Heart Health</strong>: Support cardiovascular wellness with nutrients that aid in red blood cell production and promote healthy blood flow for optimal heart function. * </p><p><br></p><p><strong>Bone Strength and Density</strong>: Maintain bone density and strength with this formula. * </p><p><br></p><p><strong>Enhanced Vitality</strong>: Promote a healthy libido and sexual function, which may support sexual activity and overall vitality. </p><p><br></p><p>Experience comprehensive support for men's health and vitality with this scientifically formulated dietary supplement.</p><p><br></p><p><strong>Ingredients: </strong>Magnesium (as Magnesium Oxide), Zinc (as Zinc Oxide), Tribulus Terrestris (fruit), Chrysin (seed), Horny Goat Weed (aerial), Longjack (root), Saw palmetto Berries, Hawthorn Berries, Cissus Quadrangularis (stem), Cellulose (vegetable capsule), Rice Flour, Magnesium Stearate.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount: </strong>90 caps</p><p><strong>Gross Weight: </strong> 0.14lb\u00a0(65g)</p><p><strong>Suggested Use:</strong> Take three (3) capsules before bedtime.</p><p><strong>Warning</strong>: Consult with a physician before use if you have any medical conditions. Do not use if pregnant or lactating.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100308-sugar-free-2x.png\" alt=\"Sugar-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 9,
      "name": "Super Fat Burner with MCT",
      "price": 33.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816297448-generated-label-image-3.jpg?v=1719816311",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816297445-generated-label-image-1.jpg?v=1719816311",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816297443-generated-label-image-0.jpg?v=1719816311",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816297447-generated-label-image-2.jpg?v=1719816311",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20231114154059-vtl4fatb-sf.png?v=1719816311"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Super Fat Burner with MCT combines Vitamin C, Vitamin B6, Choline, Chromium, L-Carnitine, and medium-chain triglycerides (MCT) to deliver a healthy approach to facilitating metabolic performance and consequent weight loss.</p><p><br></p><p>Burning fat is difficult for some individuals. Therefore, they must supplement with an effective fat burner with the correct ingredients to drive better results.</p><p><br></p><p>Choline is an essential nutrient that promotes healthy liver and lessens the likelihood of developing fatty liver disease. MCTs appear to increase thermogenesis, or heat production in the body, which aids dieters in fat burning and weight loss.*</p><p><br></p><p><strong>Ingredients: </strong>Vitamin C (as acerbic acid), Vitamin B6 (as Pyridoxine HCL), Choline (as choline bitartrate), Chromium (as chromium polynicotinate), Medium Chain Triglycerides Oil, CLA (Conjugated Linoleic Acid), GLA (Gamma-Linolenic Acid), Bladderwrack Thallus Powder, Inositol, Gymnema Sylvestre Leaf (25% Extract), Garcinia Cambogia Fruit Extract (50% hydroxycitric acid), L-Carnitine (as L-Carnitine Tartrate), Turmeric Root (95% extract), Coenzyme Q10, Proprietary Blend (Spirulina Powder, L-Phenylalanine, L-Tyrosine, L-Methionine, Bromelain, Psyllium Husk Powder, Clove Bud Powder,, Allspice, Kelp 10:1 Extract, Juniper Berry 4:1 Extract, Buchu Leaf 4:1 Extract, Uva Ursi Leaf (20% Extract), Cinnamon Bark 10:1 Extract (Cinnamomum cassia), Cranberry fruit Concentrate and Grapefruit Fruit 4:1 Extract), Gelatin (bovine), rice flour, vegetable magnesium stearate, silicon dioxide and chlorophyll.</p><p><strong>Manufacturer Country:</strong>\u00a0USA</p><p><strong>Product Amount:</strong> 90 capsules.</p><p><strong>Gross Weight:</strong> 0.2lb (90.7g)</p><p><strong>Suggested Use: </strong>4 capsules daily, preferably with meals or as directed by a healthcare professional. For best results, take 2 capsules with 8 ounces (237ml) of water before breakfast and again before dinner. This product should be used in conjunction with a sensible diet and exercise program.</p><p><strong style=\"color: var(--chakra-colors-gray-800);\">Caution: </strong><span style=\"color: var(--chakra-colors-gray-800);\">Do not exceed recommended dose. Avoid taking this product in conjunction with other dietary supplements containing high elemental chromium levels. This product is not intended for pregnant or nursing mothers or children under the age of 18. If you are diabetic or have a known medical condition, consult your physician before taking this or any dietary supplement. This product is manufactured and packaged in a facility that may also process milk, soy, wheat, egg, peanuts, tree nuts, fish, and crustacean shellfish.</span></p><p><strong style=\"color: var(--chakra-colors-gray-800);\">Warning:</strong><span style=\"color: var(--chakra-colors-gray-800);\">\u00a0Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</span></p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 10,
      "name": "Sea Moss",
      "price": 25.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816196801-generated-label-image-0.jpg?v=1719816222",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816196807-generated-label-image-4.jpg?v=1719816222",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816196802-generated-label-image-1.jpg?v=1719816222",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816196806-generated-label-image-3.jpg?v=1719816222",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816196804-generated-label-image-2.jpg?v=1719816222",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20230428154956-sea-moss-sf.png?v=1719816222"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Today, famous celebrities and fitness gurus rave about sea moss as the latest immune-boosting, skin-healing, digestive aid, but it's not really new. In fact, it's been consumed for thousands of years in other cultures.</p><p><br></p><p>Sea Moss\u2014the main ingredient in this health-boosting supplement\u2014is a type of seaweed. However, besides Sea Moss, this formula also enlists the healing power of organic bladderwrack and burdock root.</p><p><br></p><p>Together these superfoods are known for their ability to cleanse the blood and lymph system and support the thyroid, boosting immunity and promoting a healthy inflammatory response.*</p><p><br></p><p><strong>Ingredients:\u00a0</strong>Organic Irish Moss, Organic Bladderwrack, Organic Burdock, BioPerine\u00ae, Pullulan Capsules.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Amount: </strong>60 caps</p><p><strong>Gross Weight:</strong>\u00a00.25lb (113g)</p><p><strong>Suggested Use:</strong> As a dietary supplement, take two (2) capsules once a day. For best results, take 20-30 min before a meal or as directed by your healthcare professional.</p><p><strong>Caution:</strong>\u00a0Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong>\u00a0Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095500-100--organic-2x.png\" alt=\"Organic\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 11,
      "name": "Reishi Mushroom",
      "price": 25.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816115277-generated-label-image-0.jpg?v=1719816140",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816115281-generated-label-image-2.jpg?v=1719816140",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816115285-generated-label-image-4.jpg?v=1719816140",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816115282-generated-label-image-3.jpg?v=1719816140",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816115279-generated-label-image-1.jpg?v=1719816140",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612114328-rlc3reis-sf.png?v=1719816140"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>The Reishi mushroom has been used for hundreds of years in Eastern medicine. This fungus is usually eaten fresh, in powder form, or in liquid extracts.\u00a0</p><p><br></p><p>Within Reishi mushrooms, there are numerous beneficial molecules such as peptidoglycans, triterpenoids, and polysaccharides. Through these molecules, Reishi is known to strengthen the immune system and believed to help the body adapt to occasional stress. As a result, Reishi is the top-selling adaptogenic mushroom in the world.*</p><p><br></p><p><strong>Ingredients: </strong>Organic Reishi (Ganoderma lucid) Mushroom Fruiting Body &amp; Mycelium Powder (Standardized to 40% polysaccharides [400mg]), Organic capsule (pullulan, water), silica.</p><p><strong style=\"color: var(--chakra-colors-gray-800);\">Manufacturer Country:</strong><span style=\"color: var(--chakra-colors-gray-800);\"> USA</span></p><p><strong>Product Amount: </strong>60 vegan capsules</p><p><strong>Gross Weight: </strong>0.2lb (90g)</p><p><strong>Suggested Use:</strong> As a dietary supplement, adults take two (2) capsules daily or as directed by a healthcare professional. Can be taken with food or on an empty stomach.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095500-100--organic-2x.png\" alt=\"Organic\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 12,
      "name": "Resveratrol 50% 600mg",
      "price": 25.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816079246-generated-label-image-0.jpg?v=1719816108",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816079250-generated-label-image-3.jpg?v=1719816108",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816079249-generated-label-image-2.jpg?v=1719816108",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816079251-generated-label-image-4.jpg?v=1719816108",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719816079247-generated-label-image-1.jpg?v=1719816108",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240613163100-vox4resv-sf.png?v=1719816108"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Resveratrol is a plant compound with potent antioxidant functionality. Resveratrol is found mainly in red wine, red grapes, berries, and peanuts. It is most concentrated in the skin of grape skins and seeds.\u00a0</p><p><br></p><p>Resveratrol has been linked to many exciting health benefits, such as supporting normal cholesterol, brain health, and controlling weight loss. These, coupled with antioxidant abilities, make the perfect daily supplement.*</p><p><br></p><p><strong>Ingredients:</strong>\u00a0Resveratrol (Polygonum cuspidatum)(root) Complex Containing 50% Trans-Resveratrol, Vegetable Capsule (Cellulose), Microcrystalline Cellulose.</p><p><strong>Manufacturer Country: </strong>USA</p><p><strong>Product Amount:</strong> 60 caps</p><p><strong>Gross Weight: </strong>0.25lb (113g)</p><p><strong>Suggested Use: </strong>Take one (1) veggie capsule twice a day as a dietary supplement. For best results, take 20-30 min before a meal or as directed by your healthcare professional.</p><p><strong>Caution:</strong> Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png\" alt=\"No fillers\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 13,
      "name": "Probiotic 40 Billion with Prebiotics",
      "price": 30.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815939859-generated-label-image-0.jpg?v=1719815966",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815939860-generated-label-image-1.jpg?v=1719815966",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815939866-generated-label-image-4.jpg?v=1719815966",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815939865-generated-label-image-3.jpg?v=1719815966",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815939862-generated-label-image-2.jpg?v=1719815966",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240613162648-vox4prob-sf.png?v=1719815966"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Probiotic 40 Billion with Prebiotics is a blend of four probiotic strains: Lactobacillus Acidophilus, Bifidobacterium Lactis, Lactobacillus Plantarum, and Lactobacillus Paracasei.\u00a0</p><p><br></p><p>Together, they provide a high level of beneficial bacteria to the gut to support a healthy metabolic response for both men and women.*</p><p><br></p><p><strong>Ingredients:\u00a0</strong>Proprietary Blend of Probiotic Bacteria: MAKTREK\u00ae (Bi-Pass Technology), Lactobacillus Acidophilus, Bifidobacterium Lactis, Lactobacillus Plantarum, Lactobacillus Paracasei, Marine Polysaccharide Complex, Fructooligosaccharide, Cellulose (vegetable capsule), Rice maltodextrin, L-Leucine.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount: </strong>60 caps</p><p><strong>Gross Weight: </strong>0.25lb (113g)</p><p><strong>Suggested Use: </strong>Take two (2) capsules once a day as a dietary supplement. For best results, take one (1) capsule during the day and one (1) capsule in the evening. Repeat the process daily. Do not exceed two capsules per day.</p><p><strong>Warning: </strong>Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 14,
      "name": "Platinum Turmeric",
      "price": 25.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815883926-generated-label-image-0.jpg?v=1719815902",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815883934-generated-label-image-4.jpg?v=1719815902",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815883932-generated-label-image-3.jpg?v=1719815902",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815883931-generated-label-image-2.jpg?v=1719815902",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815883929-generated-label-image-1.jpg?v=1719815902",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240613163549-vox4turm-sf.png?v=1719815902"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Our Platinum Turmeric blend contains various forms of turmeric, glucosamine, Boswellia extract(frankincense), piperine, and several other highly beneficial natural extracts to keep you at your best.\u00a0</p><p><br></p><p>Natural extracts have been used for centuries in Ayurvedic medicine. We harness and advance these natural extracts in modern times for optimal bioavailability and effectiveness.*</p><p><br></p><p><strong>Ingredients: </strong>Turmeric Root Powder, Glucosamine Sulfate 2KCI, Turmeric 95% Curcuminoids, Ginger Root Extract, Chondroitin Sulfate, Boswellia Extract, MSM, BioPerine\u00ae, Quercetin Dihydrate, L-Methionine, Bromelain, Cellulose (vegetable capsule), Rice Flour.</p><p><strong>Contains:</strong> Shellfish (Crab, Lobster, and Crawfish).</p><p><strong>Manufacturer Country: </strong>USA</p><p><strong>Product Amount: </strong>60 caps</p><p><strong>Gross Weight: </strong>0.25lb (113g)</p><p><strong>Suggested Use:</strong>\u00a0Take two (2) capsules once a day as a dietary supplement. For best results, take 20-30 min before a meal or as directed by your healthcare professional.</p><p><strong>Caution:</strong>\u00a0Consult a physician before use if you have any medical conditions. Glucosamine is derived from shellfish. People allergic to shellfish should not consume this product.\u00a0</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 15,
      "name": "Normal Blood Sugar Support",
      "price": 29.9,
 //     "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815788693-generated-label-image-0.jpg?v=1719815839",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815788699-generated-label-image-3.jpg?v=1719815839",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815788695-generated-label-image-1.jpg?v=1719815839",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815788700-generated-label-image-4.jpg?v=1719815839",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815788697-generated-label-image-2.jpg?v=1719815839",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240305173305-jtp0bloo-sf.png?v=1719815839"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>This normal blood sugar support supplement is specifically formulated to assist in maintaining healthy glucose metabolism and enhancing insulin sensitivity. Our formula is crafted with essential vitamins, minerals, and herbal extracts such as Bitter Melon, Cinnamon, and Gymnema Sylvestre, designed to complement your wellness routine, including support for maintaining normal blood sugar levels as part of a balanced diet. Suitable for daily consumption, this supplement aims to promote optimal blood sugar levels through its carefully selected, high-quality natural ingredients, without the reliance on artificial additives.*</p><p><br></p><p><strong>Ingredients:</strong> Vitamin C (as ascorbic acid);\u00a0</p><p>Vitamin E (as d-alpha tocopheryl acetate);\u00a0</p><p>Biotin; Magnesium (as magnesium oxide); Zinc (as zinc oxide); Manganese (as manganese amino acid chelate); Chromium (as chromium amino acid chelate); Bitter Melon Extract (Mormordica charantia Linn.)(fruit), Deglycyrrhizinated Licorice Extract (root), Cinnamon (Cinnamomum cassia)(bark), Gymnema Sylvestre Powder (leaf), Alpha Lipoic Acid, Banaba Extract (Lagerstroemia speciosa)(leaf)(std. to 1% corosolic acid), Yarrow Herb Powder, Juniper Berry, Mulberry Fruit Powder (fresh fruit), Taurine, Cayenne Pepper Extract (fruit)</p><p><strong>Manufacturer's country: </strong>USA</p><p><strong>Product amount:</strong> 60 capsules</p><p><strong>Gross weight: </strong>0.17lb (73.71g)</p><p><strong>Suggested use:</strong> As a dietary supplement, adults take two (2) capsules daily. For best results, take with 6-8 oz of water or as directed by healthcare professional.</p><p><strong>Warning:</strong> Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with known medical conditions should consult a physician before using this or any dietary supplement. KEEP OUT OF THE REACH OF CHILDREN. DO NOT USE IF SAFETY SEAL IS DAMAGED OR MISSING. STORE IN A COOL, DRY PLACE.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 16,
      "name": "Natural Gut Wellness Capsules",
      "price": 38.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815694266-generated-label-image-0.jpg?v=1719815738",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815694270-generated-label-image-2.jpg?v=1719815738",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815694271-generated-label-image-3.jpg?v=1719815738",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815694272-generated-label-image-4.jpg?v=1719815738",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815694268-generated-label-image-1.jpg?v=1719815738",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240619132337-bls3ca30-sf.png?v=1719815738"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Natural Gut Wellness Capsules with Fulvic Acid are expertly crafted to enhance your daily wellness by supporting digestive health. Rich in fulvic acids and polyphenols, naturally occurring compounds from Birch Chaga and Pine Bark extract, these capsules are beneficial for maintaining a balanced gut microbiome.* </p><p><br></p><p>The formulation promotes a harmonious digestive environment, aids in smooth bowel functions, and contributes to overall gastrointestinal wellness.* These capsules are an ideal addition to your daily regimen, designed to assist in sustaining the natural equilibrium of your gut's ecosystem, complementing a balanced diet and supporting the body's nutritional needs.* </p><p><br></p><p>The ingredients include Birch Chaga, known for its antioxidant properties; Pine Bark Extract, which contains humic and fulvic acid, recognized for supporting gut health and nutrient absorption; and a cellulose capsule, crafted from plant-based materials to ensure natural and gentle delivery.*</p><p><br></p><p><strong>Supportive Features:</strong></p><p>\u2022 Promotes a Healthy Digestive Environment: Helps to create conditions favorable for digestive health.*</p><p>\u2022 Supports Smooth Bowel Functions: Aids in maintaining regular bowel movements, which is essential for overall health.*</p><p>\u2022 Contributes to Overall Gastrointestinal Wellness: Assists in nurturing the overall health of your digestive system, ensuring it works efficiently.*</p><p><br></p><p><strong>Ingredients:</strong> Birch Chaga and\u00a0Pine Bark\u00a0extract\u00a0containing humic and fulvic acid, Cellulose Capsule (plant-based).</p><p><strong>Manufacturer's country: </strong>Estonia</p><p><strong>Product amount:</strong> 30 caps</p><p><strong>Suggested use:</strong> For optimal results, we recommend taking one (1)\u00a0(0.5g) capsule per day. This dosage is sufficient to complement a healthy lifestyle and diet, and there is no need for a higher dose, as the body optimizes the use of the ingredients efficiently.</p><p><strong>Warning: </strong>Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png\" alt=\"No fillers\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 17,
      "name": "Mushroom Complex 10 X",
      "price": 35.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815616866-generated-label-image-0.jpg?v=1719815676",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815616868-generated-label-image-1.jpg?v=1719815676",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815616873-generated-label-image-4.jpg?v=1719815676",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815616872-generated-label-image-3.jpg?v=1719815676",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815616870-generated-label-image-2.jpg?v=1719815676",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240424145926-vox4mush-sf.png?v=1719815676"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Traditional healers have used medicinal mushrooms for thousands of years. These powerful fungi are known for their antioxidants, polysaccharides, and other compounds that have the ability to nourish the brain, strengthen immunological responses, and normalize occasional stress responses, as many of the mushrooms in this blend are also adaptogenic.*</p><p><br></p><p>Medicinal mushroom supplements are trending amongst those looking to increase mental agility, reverse disease, and slow down the signs of aging. This super potent formula includes mushrooms like Chaga, Cordyceps, Reishi, and Lion\u2019s Mane.*</p><p><br></p><p><strong>Ingredients:</strong>\u00a0Cordyceps Sinensis Powder, Reishi Mushroom Extract, Shiitake Mushroom Extract, Lions Mane, Proprietary Blend (Maitake Mushroom Extract, Turkey Tail Extract, Chaga Mushroom Extract, Royal Sun Agaricus Extract, White Button Mushroom Extract, Black Fungus Extract, Cellulose (Vegetable Capsule), Microcrystalline Cellulose, Magnesium Stearate.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Amount: </strong>60 caps</p><p><strong>Gross Weight:</strong>\u00a00.25lb (113g)</p><p><strong>Suggested Use:</strong>\u00a0<span style=\"color: rgb(0, 0, 0);\">As a dietary supplement take two (2) vegetable capsules once a day. For best results take 20-30 min before a meal with an 8oz (240 ml) glass of water or as directed by your healthcare professional.</span></p><p><strong>Caution:\u00a0</strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:\u00a0</strong>Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 18,
      "name": "Moringa Pure",
      "price": 26.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815556340-generated-label-image-4.jpg?v=1719815572",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815556339-generated-label-image-3.jpg?v=1719815572",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815556336-generated-label-image-1.jpg?v=1719815572",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815556334-generated-label-image-0.jpg?v=1719815572",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815556337-generated-label-image-2.jpg?v=1719815573",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240424141332-vox4mrng-sf.png?v=1719815573"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Moringa Oleifera, also known as the drumstick tree, is native to Northern India and has been a part of traditional herbal practices for generations. Revered for its versatility, the leaves of this tree are used in our supplement. Rich in a variety of nutrients and plant compounds, Moringa Oleifera leaves are harvested with care to maintain their natural properties. This supplement is designed to complement your daily nutrition.</p><p><br></p><p>Key Features</p><ul>\n<li>Pure Leaf Extract: Utilizes only the leaves of the Moringa Oleifera tree to ensure a pure and concentrated form of this traditional herb.</li>\n<li>Nutrient-Rich Composition: A source of various plant compounds naturally occurring in Moringa leaves.</li>\n<li>Vegan-Friendly Capsules: Encapsulated in vegetable cellulose capsules, suitable for a vegan diet.\u00a0*</li>\n</ul><p><br></p><p><strong>Ingredients: </strong>Moringa Oleifera (leaf), Cellulose (vegetable capsule).</p><p><strong>Manufacturer Country</strong>: USA</p><p><strong>Product Amount</strong>: 60 caps</p><p><strong>Gross Weight: </strong>0.25lb (113g)</p><p><strong style=\"color: rgb(0, 0, 0);\">Suggested Use:</strong><span style=\"color: rgb(0, 0, 0);\">\u00a0Take two (2) capsules once a day as a dietary supplement. For best results, take 20-30 min before a meal with an 8oz (236 ml) glass of water or as directed by your healthcare professional.</span></p><p><strong>Caution: </strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 19,
      "name": "Max Detox (Acai detox)",
      "price": 29.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815500079-generated-label-image-0.jpg?v=1719815540",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815500083-generated-label-image-2.jpg?v=1719815540",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815500085-generated-label-image-3.jpg?v=1719815540",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815500081-generated-label-image-1.jpg?v=1719815540",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815500086-generated-label-image-4.jpg?v=1719815540",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240424142650-vox4maxd-sf.png?v=1719815540"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>The benefits of cleansing are no longer exclusive to spa enthusiasts. People recognize the importance of cleansing their bodies to maintain a healthy lifestyle.\u00a0\u00a0<span style=\"color: rgb(13, 13, 13);\">Max Detox is a dietary supplement that combines a range of carefully selected natural ingredients, each traditionally incorporated for its unique properties. This blend includes Psyllium Powder, which is a source of fiber, and Acai Berry Extract, known for its use in various traditional nutritional practices. Chlorella, a type of green algae, contributes its own unique nutrient profile to the formula. Additionally, Slippery Elm Bark and Aloe Ferox Powder are included for their historical use in herbal preparations. The formulation also contains Black Walnut Hulls, Ginger Root, and Papaya Fruit Powder, ingredients often used in traditional diets for their diverse culinary properties. Hyssop Leaf and Lycopene, derived from tomatoes, are also part of this diverse blend, encapsulated in a vegetable capsule suitable for vegetarians.*</span></p><p><br></p><p><strong>Ingredients:\u00a0</strong>Proprietary Blend (Psyllium Powder, Acai Berry Extract, Inulin, Slippery Elm Bark, Aloe Ferox Powder Alion 18%, Chlorella, Black Walnut Hulls Powder, Ginger Root, Hyssop Leaf, Papaya Fruit Powder, Lycopene 5%, Cellulose (Vegetable Capsule), Magnesium Stearate.</p><p>Contains: Tree Nuts (Black Walnut Hull).</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Amount: </strong>60 caps</p><p><strong>Gross Weight:</strong>\u00a00.25lb (113g)</p><p><strong>Suggested Use:\u00a0</strong>As a dietary supplement, take two (2) capsules once a day. For best results, take one (1) capsule during the day and one (1) capsule in the evening. Repeat the process daily. Do not exceed two capsules per day.</p><p><strong>Caution:</strong>\u00a0Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:\u00a0</strong>Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 20,
      "name": "Male Enhancement",
      "price": 36.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815340832-generated-label-image-0.jpg?v=1719815372",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815340838-generated-label-image-3.jpg?v=1719815372",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815340839-generated-label-image-4.jpg?v=1719815372",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815340837-generated-label-image-2.jpg?v=1719815372",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815340833-generated-label-image-1.jpg?v=1719815372",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20230403152844-male-enhancement-sf.png?v=1719815372"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Men experience libido issues for multiple reasons, be they physical, mental, hormonal, or as a side effect of certain medications making\u00a0over-the-counter male enhancement\u00a0products a hot commodity in today\u2019s marketplace. These Male Enhancement tablets are a proprietary blend of top-shelf ingredients, like Tongkat Ali, L-Arginine, vitamin b12, and Bioperine, and some of the best-known male enhancement vitamins and herbs.\u00a0\u00a0</p><p><br></p><p>This formula contains herbs like Ginseng, which may help improve blood flow while restoring vigor and longevity. Likewise, the amino acid L-arginine may help improve sexual responses. Available in easy-to-swallow tablets.*</p><p><br></p><p><strong>Ingredients:\u00a0</strong>Calcium (as Calcium Carbonate), Zinc (as Zinc Oxide), Tongkat Ali root, Maca root, L-Arginine HCL, Ginseng Eleutherococcus Blend (Panax Ginseng, Eleutherococcus Senticosus), Proprietary Blend (Pumpkin Extract, Sarsaparilla Extract, Muira Puama Extract, Oat Straw, Boron, Cayenne Pepper, Catuaba, Licorice Extract, Tribulus Terrestris, Orchic, Oyster Extract, Astragalus Extract, Nettle Extract), Vegetable Stearic Acid, Vegetable Magnesium Stearate, Silicon Dioxide.</p><p><strong>Manufacturer Country: </strong>USA</p><p><strong>Amount: </strong>60 tablets</p><p><strong>Gross Weight:</strong>\u00a00.25lb (113g)</p><p><strong>Suggested Use:\u00a0</strong>As a dietary supplement, take two (2) tablets once a day. For best results, take 20-30 min before a meal with an 8oz. glass of water or as directed by your healthcare professional.</p><p><strong>Caution:\u00a0</strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement<strong>.</strong></p><p><strong>Warning:</strong>\u00a0Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 21,
      "name": "Maca Plus",
      "price": 32.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815133955-generated-label-image-0.jpg?v=1719815185",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815133957-generated-label-image-1.jpg?v=1719815185",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815133960-generated-label-image-3.jpg?v=1719815185",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815133959-generated-label-image-2.jpg?v=1719815185",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815133961-generated-label-image-4.jpg?v=1719815185",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240620145753-vox4maca-sf.png?v=1719815185"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Historically, maca has been associated with potential health benefits, including support of fertility and sexual function, enhancing energy levels, and promoting athletic performance. Maca Plus is crafted with red, black, and yellow maca varieties to provide a comprehensive maca supplement experience. Additionally, maca is traditionally believed to promote hormonal balance and is rich in essential antioxidants.\u00a0</p><p><br></p><p>Maca Plus vitamin supplement\u00a0offers one of the highest potencies of maca root available, with over 1500mg in every serving.*</p><p><br></p><p><strong>Ingredients:</strong>\u00a0Organic Maca Root (Black), Organic Maca Root (Red), Organic Maca Root (Yellow), Black Pepper, Cellulose (Vegetable Capsule), Vegetable Stearate.</p><p><strong>Manufacturer Country: </strong>USA</p><p><strong>Amount: </strong>60 caps</p><p><strong>Gross Weight:\u00a0</strong>0.25lb (113g)</p><p><strong>Suggested Use:\u00a0</strong>As a dietary supplement, take two (2) capsules once a day. For best results, take 20-30 min before a meal or as directed by your healthcare professional.</p><p><strong>Caution:\u00a0</strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:\u00a0</strong>Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png\" alt=\"No fillers\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 22,
      "name": "Lion's Mane Mushroom",
      "price": 33.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815067730-generated-label-image-0.jpg?v=1719815093",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815067733-generated-label-image-2.jpg?v=1719815093",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815067732-generated-label-image-1.jpg?v=1719815093",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815067736-generated-label-image-4.jpg?v=1719815093",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719815067735-generated-label-image-3.jpg?v=1719815093",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612113924-rlc3lion-sf.png?v=1719815093"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Lions Mane Mushroom, also known as yamabushitake, is a species of mushroom that has been well-studied for its medical use in countries such as China, India, Japan, and Korea.\u00a0</p><p><br></p><p>Only recently has Lions Mane made its way into the Western world as a supplement to improve focus and act as a holistic energy source for the body.\u00a0</p><p><br></p><p>Nootropics and other mushroom extracts are trending because of their numerous health benefits. Nootropics found in Lions Mane, such as hericenones and erinacines, are said to have neuroprotective effects and stimulate the growth of neurons in the brain.*</p><p><br></p><p><strong>Ingredients: </strong>Organic Lion\u2019s Mane (Hericum erinaceus) Mushroom Fruiting Body &amp; Mycelium Powder (Standardized to 40% polysaccharides [400mg]), Vegan Capsule (modified cellulose, water).</p><p><strong>Manufacturer Country: </strong>USA</p><p><strong>Product Amount:</strong> 60 vegan capsules</p><p><strong>Gross Weight: </strong>0.2lb (90g)</p><p><strong>Suggested Use: </strong>As a dietary supplement, adults take two (2) capsules daily or as directed by a health care professional. Can be taken with food or on an empty stomach.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095500-100--organic-2x.png\" alt=\"Organic\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 23,
      "name": "Keto-5",
      "price": 32.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719814979735-generated-label-image-0.jpg?v=1719814996",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719814979739-generated-label-image-2.jpg?v=1719814996",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719814979737-generated-label-image-1.jpg?v=1719814996",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719814979740-generated-label-image-3.jpg?v=1719814996",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719814979741-generated-label-image-4.jpg?v=1719814996",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240620151358-vox4keto-sf.png?v=1719814996"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Keto-5 helps the body burn fat effectively by entering the body into the ketosis metabolic state. Usually, the body uses glycogen stores as its fuel source and stores fat cells through lipogenesis.\u00a0</p><p><br></p><p>During the process of ketosis, fat cells are used as the source to fuel the body. Thus, burning fat cells in the process.*</p><p><br></p><p><strong>Ingredients:</strong> Keto Blend (Raspberry Ketone, Green Tea, Caffeine Anhydrous, Green Coffee Bean, Garcinia Cambogia (fruit), Cellulose (Vegetable Capsule).</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount: </strong>60 caps</p><p><strong>Gross Weight: </strong>0.25lb (133g)</p><p><strong>Suggested Use:</strong>\u00a0Take one (1) twice a day as a dietary supplement. For best results, take 20-30 min before a meal with an 8oz (236 ml) glass of water or as directed by your healthcare professional.</p><p><strong>Caution: </strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png\" alt=\"No fillers\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 24,
      "name": "Joint Support",
      "price": 29.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784245292-generated-label-image-0.jpg?v=1719784261",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784245299-generated-label-image-3.jpg?v=1719784261",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784245297-generated-label-image-2.jpg?v=1719784261",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784245295-generated-label-image-1.jpg?v=1719784261",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240305170625-jtp0join-sf.png?v=1719784261"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>This joint support supplement provides essential nutrients and compounds that support joint health. It features a comprehensive blend of ingredients such as MSM, GlucosaGreen\u00ae vegetal glucosamine HCl, Turmeric Powder, and Boswellia serrata Extract, designed to promote joint flexibility, reduce discomfort, and support overall joint function. Ideal for daily consumption, this supplement aims to enhance your joint health through its potent, natural ingredients, without relying on artificial additives.*</p><p><br></p><p><strong>Ingredients: </strong>MSM (methylsulfonylmethane), GlucosaGreen\u00ae vegetal glucosamine HCl, Turmeric Powder (root), White Willow Bark Extract, Boswellia serrata Extract (resin)(std. to 65% boswellic acids), Black Pepper Extract (fruit) (std. to 95% piperine), Hyaluronic Acid.</p><p><strong>Manufacturer's country: </strong>USA</p><p><strong>Product amount: </strong>60 capsules</p><p><strong>Gross weight:</strong> 0.18lb (81.65g)</p><p><strong>Suggested use: </strong>As a dietary supplement, adults take two (2) capsules daily. For best results, take with 6-8 oz of water or as directed by healthcare professional.</p><p><strong>Warning:</strong> Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with known medical conditions should consult a physician before using this or any dietary supplement. KEEP OUT OF THE REACH OF CHILDREN. DO NOT USE IF SAFETY SEAL IS DAMAGED OR MISSING. STORE IN A COOL, DRY PLACE.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p></p>"
    },
    {
      "id": 25,
      "name": "Horny Goat Weed Blend",
      "price": 33.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784144005-generated-label-image-0.jpg?v=1719784213",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784144007-generated-label-image-1.jpg?v=1719784213",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784144018-generated-label-image-2.jpg?v=1719784213",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784144022-generated-label-image-4.jpg?v=1719784213",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784144020-generated-label-image-3.jpg?v=1719784213",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240614085050-vox4horn-sf.png?v=1719784213"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Traditional Chinese medicine practitioners have used the horny goat weed plant to help support sexual health and stamina for centuries. However,\u00a0Horny Goat Weed Blend\u00a0goes above and beyond anything ancient healers could have imagined with the addition of energetic herbs like maca root, mucuna, l-arginine, and tongkat ali.\u00a0</p><p><br></p><p><span style=\"color: rgb(13, 13, 13);\">This herbal blend supports overall well-being by promoting natural hormonal harmony and enhancing circulation to muscles and organs. Additionally, the blend includes herbs that may contribute to positive mood by supporting dopamine levels and essential neurotransmitters.*</span></p><p><br></p><p><strong>Ingredients:\u00a0</strong>Horny Goat Weed Extract, Maca Root Powder, Mucuna Pruriens 15% L-Dopa, Polypodium Vulgare Powder, Tongkat Ali Root Powder, Saw Palmetto Berry Powder, Muira Puama Root Powder, L-Arginine HCL, Panax Ginseng Root Powder, Gelatin Capsule, Rice Flour, Vegetable Magnesium Stearate.</p><p><strong>Manufacturer Country: </strong>USA</p><p><strong>Amount:</strong> 60 caps</p><p><strong>Gross Weight:\u00a0</strong>0.25lb (113g)</p><p><strong>Suggested Use:\u00a0</strong>As a dietary supplement, take two (2) capsules once a day. For best results, take 20-30 min before a meal with an 8oz. glass of water or as directed by your healthcare professional.</p><p><strong>Caution:\u00a0</strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong>\u00a0Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 26,
      "name": "Hair, Skin and Nails Essentials",
      "price": 32.9,
 //     "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784088762-generated-label-image-0.jpg?v=1719784107",
      "category": "Vitamins & Minerals",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784088768-generated-label-image-3.jpg?v=1719784107",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784088763-generated-label-image-1.jpg?v=1719784107",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784088766-generated-label-image-2.jpg?v=1719784107",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719784088770-generated-label-image-4.jpg?v=1719784107",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240618173421-vox4hair-sf.png?v=1719784107"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Our Hair, Skin, and Nails Essentials supplement is made to give you that natural glow. In combination, Vitamin B6, Folate, and Biotin work together to maintain elastin in the hair, skin, and nails. Elastin is a major component of body tissues, helping them function correctly.*</p><p><br></p><p><strong>Ingredients: </strong>Vitamin A (as Beta-carotene), Vitamin C (as Ascorbic Acid), Vitamin D (as Cholecalciferol), Vitamin E (as DL-Alpha tocopheryl acetate), Thiamine (B1)(as Thiamine mononitrate), Vitamin B6 (as Pyridoxine HCL), Folate, Vitamin B12 (as Cyanocobalamin), Biotin, Pantothenic Acid (B5)(as D-Calcium pantothenate), Calcium (as Calcium Carbonate), Iron (as Ferrous fumarate), Magnesium (as Magnesium Oxide), Zinc (as Zinc Oxide), Manganese (as Manganese amino acid chelate), Potassium (as Potassium gluconate), Proprietary Blend (PABA, Horsetail extract, Fo-Ti, Bamboo extract, Stinging Nettle, Chinese Peony, Spirulina, Saw palmetto, Plant sterols, Alfalfa, Barley grass), Cellulose (vegetable capsule), Rice Flour, Magnesium Stearate, Silicon dioxide.</p><p><strong>Contains:</strong> Soy.</p><p><strong>Manufacturer Country: </strong>USA</p><p><strong>Product Amount: </strong>60 caps</p><p><strong>Gross Weight:</strong> 0.25lb (113g)</p><p><strong>Suggested Use:\u00a0</strong>For adults only. Take two (2) capsules a day with food. Do not take this supplement within one hour of taking medications. Do not exceed the recommended dose.</p><p><strong>Caution: </strong>Pregnant or lactating women\u00a0and anyone taking medications should consult a healthcare professional before using any nutritional product. If any adverse reactions occur, discontinue use and consult a healthcare professional.\u00a0</p><p><strong>Iron Warning:</strong> Accidental overdose of iron-containing products is a leading cause of fatal poisoning in children under 6. Keep this product out of reach of children. In case of accidental overdose, call a doctor or poison control center immediately.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 27,
      "name": "Ginkgo Biloba + Ginseng",
      "price": 29.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783993750-generated-label-image-0.jpg?v=1719784010",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783993751-generated-label-image-1.jpg?v=1719784010",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783993755-generated-label-image-3.jpg?v=1719784010",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783993753-generated-label-image-2.jpg?v=1719784010",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783993758-generated-label-image-4.jpg?v=1719784010",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240618174952-vox4gink-sf.png?v=1719784010"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Ginkgo Biloba is a plant originating in Asia that was used in ancient Chinese medicine. Usually, the herb's leaves are used, but the seeds are shown to have the highest efficacy. Ginkgo contains numerous flavonoids and terpenoids, which promote blood flow in the body and brain.\u00a0</p><p><br></p><p>Together with Gingko, Ginseng plays a vital role in boosting the body\u2019s immune system. Ginseng also provides energy to the body through compounds known as ginsenosides.*</p><p><br></p><p><strong>Ingredients:\u00a0</strong>Red Panax Ginseng Extract (Standardized to 7% Ginsenosides)(stem)(leaf), Ginkgo Biloba Leaf Powder, Ginkgo Biloba Leaf 24% Flavones, Vegetable Cellulose, Vegetable Stearate, Silicon Dioxide.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount:</strong> 60 caps</p><p><strong>Gross Weight: </strong>0.25lb (133g)</p><p><strong>Suggested Use:</strong>\u00a0As a dietary supplement, take two (2) capsules before bedtime or as directed by your healthcare professional.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png\" alt=\"No fillers\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 28,
      "name": "Digestive Enzyme Pro Blend",
      "price": 28.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783908975-generated-label-image-0.jpg?v=1719783926",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783908979-generated-label-image-2.jpg?v=1719783926",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783908983-generated-label-image-4.jpg?v=1719783927",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783908977-generated-label-image-1.jpg?v=1719783927",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783908980-generated-label-image-3.jpg?v=1719783927",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612125637-vox4dige-sf.png?v=1719783927"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Digestive enzyme supplements help the body break down proteins, lipids, and carbs to aid digestion and assimilation of nutrients to produce more energy and a healthier life force.\u00a0</p><p><br></p><p>This vitamin supplement can help the body regain the nutrients and enzymes it lacks due to a lack of raw foods in most people's diets.*</p><p><br></p><p><strong>Ingredients: </strong>Makzyme-Pro\u2122, Enzyme Blend (Fungal Protease from Aspergillus oryzae, Lactobacillus acidophilus, Lactobacillus cases, Lactobacillus plantarum), Bromelain, Papain, Fungal Lipase, Fungal Lactase, Alpha Galactosidase, Cellulose (Vegetable Capsule), vegetable Magnesium Stearate, Silicon Dioxide.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount:</strong> 60 caps</p><p><strong>Gross Weight:</strong> 0.25lb (133g)</p><p><strong>Suggested Use:</strong>\u00a0Take one (1) capsule twice a day as a dietary supplement. For best results, take 20-30 min before a meal or as directed by your healthcare professional.</p><p><strong>Caution:</strong> Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 29,
      "name": "CoQ10 Ubiquinone",
      "price": 28.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783778793-generated-label-image-0.jpg?v=1719783795",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783778798-generated-label-image-3.jpg?v=1719783795",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783778797-generated-label-image-2.jpg?v=1719783795",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783778799-generated-label-image-4.jpg?v=1719783795",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783778794-generated-label-image-1.jpg?v=1719783795",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612125348-vox4coq1-sf_c15f81ed-9b5f-402d-bae1-6328ca45b363.png?v=1719783795"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>CoQ10 Ubiquinone is found naturally in the body. However, CoQ10 levels might decrease with age, so it has become a popular supplement.\u00a0</p><p><br></p><p>Ubiquinone also contributes to energy production. CoQ10 safeguards cells against oxidative damage. It is also essential for producing ATP, the body's major energy source.*</p><p><br></p><p><strong>Ingredients:</strong>\u00a0Coenzyme Q-10 (Ubiquinone), Cellulose (vegetable capsule), Rice Flour.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount:</strong> 30 capsules</p><p><strong>Gross Weight</strong>: 0.25lb (113g)</p><p><strong>Suggested Use:</strong>\u00a0Take one (1) capsule twice a day as a dietary supplement. For best results, take 20-30 min before a meal or as directed by your healthcare professional.</p><p><strong>Caution:</strong>\u00a0Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 30,
      "name": "Cordyceps Mushroom",
      "price": 39.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783694434-generated-label-image-0.jpg?v=1719783711",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783694436-generated-label-image-1.jpg?v=1719783711",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783694438-generated-label-image-2.jpg?v=1719783711",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783694442-generated-label-image-4.jpg?v=1719783711",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783694440-generated-label-image-3.jpg?v=1719783711",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612113054-rlc3cord-sf.png?v=1719783711"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Cordyceps mushrooms are parasitic fungi that are exceedingly scarce in nature, making them difficult to obtain. Currently, cordyceps vendors get cordyceps cultivated on a vegan substrate, such as grain, rendering them safe for eating while retaining all of their benefits.</p><p><br></p><p>Cordyceps may enhance immunity by stimulating immune system cells and particular molecules and promoting an increase in red blood cells, which transport oxygen and carbon dioxide to and from tissues.*</p><p><br></p><p><strong>Ingredients:</strong> Organic Cordyceps (Cordyceps Sinensis), Mushroom Mycelium Powder (Standardized to 40% polysaccharides [400mg]), Organic capsule (pullulan, water), organic rice hull.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount: </strong>60 vegan capsules.</p><p><strong>Gross Weight: </strong>0.2lb (90g)</p><p><strong>Suggested Use: </strong>As a dietary supplement, adults take two (2) capsules daily or as directed by a healthcare professional. Can be taken with food or on an empty stomach. Store in a cool, dry place and away from direct light.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png\" alt=\"No fillers\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095500-100--organic-2x.png\" alt=\"Organic\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 31,
      "name": "CoQ10 Ubiquinone",
      "price": 28.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783568325-generated-label-image-0.jpg?v=1719783585",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783568327-generated-label-image-1.jpg?v=1719783585",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783568332-generated-label-image-4.jpg?v=1719783585",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783568331-generated-label-image-3.jpg?v=1719783585",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783568329-generated-label-image-2.jpg?v=1719783585",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612125348-vox4coq1-sf.png?v=1719783585"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>CoQ10 Ubiquinone is found naturally in the body. However, CoQ10 levels might decrease with age, so it has become a popular supplement.\u00a0</p><p><br></p><p>Ubiquinone also contributes to energy production. CoQ10 safeguards cells against oxidative damage. It is also essential for producing ATP, the body's major energy source.*</p><p><br></p><p><strong>Ingredients:</strong>\u00a0Coenzyme Q-10 (Ubiquinone), Cellulose (vegetable capsule), Rice Flour.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount:</strong> 30 capsules</p><p><strong>Gross Weight</strong>: 0.25lb (113g)</p><p><strong>Suggested Use:</strong>\u00a0Take one (1) capsule twice a day as a dietary supplement. For best results, take 20-30 min before a meal or as directed by your healthcare professional.</p><p><strong>Caution:</strong>\u00a0Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 32,
      "name": "Complete Multivitamin",
      "price": 32.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783456127-generated-label-image-0.jpg?v=1719783474",
      "category": "Vitamins & Minerals",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783456131-generated-label-image-2.jpg?v=1719783474",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783456132-generated-label-image-3.jpg?v=1719783474",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783456133-generated-label-image-4.jpg?v=1719783474",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783456129-generated-label-image-1.jpg?v=1719783474",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240618175527-vox4comp-sf.png?v=1719783474"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>The word \u201ccomplete\u201d doesn\u2019t do this quality multivitamin justice. That is because our\u00a0multivitamin supplement\u00a0comes loaded with all the crucial vitamins and minerals you need\u2014including a vitamin B complex. But we didn't stop there. This\u00a0daily vitamin\u00a0also offers an entire range of natural antioxidants, like green tea, known for slowing the progression of illness and even aging.</p><p><br></p><p>Plus, we've added\u00a0immune-supporting herbs\u00a0like echinacea and spirulina and metabolic and prostate-supporting herbs like lutein, lycopene, and stinging nettle. Comes in easy-to-swallow capsules.*</p><p><br></p><p><strong>Ingredients:\u00a0</strong>Vitamin A (as Beta-Carotene), Vitamin C (as Ascorbic Acid), Calcium (as Calcium Carbonate), Vitamin D (as Cholecalciferol), Vitamin E (As DL-Alpha Tocopherol Acetate), Vitamin B1 (as Thiamine Mononitrate), Vitamin B2 (as Riboflavin), Vitmin B3 (as Niacin), Vitamin B6 (as Pyridoxine HCL), Folate, Vitamin B12 (as Cyanocobalamin), Biotin, Vitamin B5 (as D-Calcium Pantothenate), Magnesium (as Magnesium Oxide), Zinc (as Zinc Oxide), Selenium (as Selenium Amino Acid Chelate), Copper (as Copper Gluconate), Manganese (as Manganese Amino Acid Chelate), Chromium (as Chromium Picolinate), Molybdenum, Health Support (Lutein, Lycopene, Stinging Nettle Extract, Palmetto), Immune Support (Echinacea Extract, Beta Glucan, Spirulina, Garlic), Antioxidant Fruit &amp; Energy Blend (Green Tea Extract, Hawthorn Berries, Cinnamon Bark Extract, Bilberry Fruit Extract, Grape Seed Extract, Black Currant Fruit Extract, Pomegranate Fruit Extract), Cellulose (Vegetable Capsule), Rice Flour, Magnesium Stearate, Silicon Dioxide.</p><p><strong>Manufacturer Country: </strong>USA</p><p><strong>Amount: </strong>60 caps</p><p><strong>Gross Weight:</strong>\u00a00.25lb (113g)</p><p><strong>Suggested Use:\u00a0</strong>As a dietary supplement, take two (2) Capsules in the morning with a meal.</p><p><strong>Caution:</strong>\u00a0Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:\u00a0</strong>Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png\" alt=\"All natural\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 33,
      "name": "Cognitive Support",
      "price": 29.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783269781-generated-label-image-0.jpg?v=1719783285",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783269787-generated-label-image-3.jpg?v=1719783285",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783269783-generated-label-image-1.jpg?v=1719783285",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783269785-generated-label-image-2.jpg?v=1719783285",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240305165317-jtp0cgni-sf.png?v=1719783285"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>This cognitive enhancement supplement is designed to support brain functions through a blend of natural compounds. It combines Niacin, Vitamin B6, GABA, L-Tyrosine, and other key ingredients like Bacopa monnieri and Huperzine A, aimed at promoting mental clarity, focus, and cognitive performance. Ideal for daily use, this supplement is dedicated to supporting your brain's health and enhancing cognitive functions using high-quality, natural ingredients, without artificial additives.*</p><p><br></p><p><strong>Ingredients:</strong> Niacin (as niacinamide); Vitamin B6 (as pyridoxine hydrochloride); GABA (Gamma-Aminobutyric Acid), L-Tyrosine, Caffeine, Bacopa monnieri Extract (whole herb), Phosphatidylserine 20% (sunflower), Alpha GPC (Alpha -glycerylphosphorylcholine) Powder, L-Theanine, Huperzine A 1% (Huperzia serrata) (whole herb)</p><p><strong>Manufacturer's country: </strong>USA</p><p><strong>Product amount:</strong> 30 capsules</p><p><strong>Gross weight:</strong> 0.12lb (53.87g)</p><p><strong>Suggested use:</strong> As a dietary supplement, adults take one (1) capsule daily. For best results, take with 6-8 oz of water or as directed by healthcare professional.</p><p><strong>Warning:</strong> Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with known medical conditions should consult a physician before using this or any dietary supplement. KEEP OUT OF THE REACH OF CHILDREN. DO NOT USE IF SAFETY SEAL IS DAMAGED OR MISSING. STORE IN A COOL, DRY PLACE.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 34,
      "name": "Chaga Mushroom",
      "price": 29.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783088260-generated-label-image-0.jpg?v=1719783099",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783088263-generated-label-image-2.jpg?v=1719783099",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783088264-generated-label-image-3.jpg?v=1719783099",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719783088261-generated-label-image-1.jpg?v=1719783099",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612112906-rlc3chag-sf_798a4e2c-d2f0-4b9a-8c73-354a97876237.png?v=1719783099"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Chaga Mushroom Capsules are loaded with essential nutrients for optimized body functioning. The most notable of these nutrients are phytochemicals. Phytochemicals are plant-based molecules that stimulate the immunological and hormonal systems and play an essential part in maintaining the balance of our bodies.</p><p><br></p><p>Chaga Mushroom Capsules support the maintenance of a healthy gut microbiome and the absorption and administration of nutrients, antioxidants, fatty acids, and minerals at the cellular level.</p><p><br></p><p>It contains no artificial additives and is ideal for obtaining the phytochemicals necessary for optimum functioning.*</p><p><br></p><p><strong>Ingredients: </strong>Organic Chaga (Inonotus obliquus) Mushroom Mycelium Powder (Standardized to 40% polysaccharides [400mg]), vegan capsule (modified cellulose, water), silica.</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount: </strong>60 vegan capsules</p><p><strong>Gross Weight:</strong> 0.2lb (90g)</p><p><strong>Suggested Use:\u00a0</strong>As a dietary supplement, adults take two (2) capsules daily or as directed by a healthcare professional. Can be taken with food or on an empty stomach.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing.\u00a0Store in a cool, dry place and away from direct light.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095500-100--organic-2x.png\" alt=\"Organic\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 35,
      "name": "Brain & Focus Formula",
      "price": 39.9,
  //    "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719776598662-generated-label-image-0.jpg?v=1719776617",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719776598664-generated-label-image-1.jpg?v=1719776617",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719776598667-generated-label-image-3.jpg?v=1719776617",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719776598666-generated-label-image-2.jpg?v=1719776617",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719776598669-generated-label-image-4.jpg?v=1719776617",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240620133430-vox4noot-sf.png?v=1719776617"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Brain &amp; Focus Formula combines a number of powerful amino acids such as Dimethylaminoethanol (DMAE Bitartrate), L-Glutamine, L-Tyrosine, and GABA, which enhance neuroactivity with plant extracts such as Bacopa that alter neurochemistry to improve focus, learning, and intelligence.\u00a0</p><p><br></p><p>Keep your focus sharp and energy high with our natural Brain and Focus Formula.*</p><p><br></p><p><strong>Ingredients:</strong> Vitamin A (as Beta-Carotene), Vitamin C (as Ascorbic Acid), Calcium (as Calcium Carbonate), Iron (as Ferrous Fumarate), Vitamin D (as Cholecalciferol), Vitamin E (as DL-Alpha-Tocopheryl-acetate), Vitamin B1 (as Thiamine Mononitrate), Vitamin B2 (as Riboflavin), Vitamin B3 (as Niacin), Vitamin B6 (as Pyridoxine HCL), Folate, Biotin, Vitamin B5 (as D-Calcium Pantothenate), Magnesium (as Magnesium Oxide), Zinc (as Zinc Oxide), Selenium (Selenium Amino Acid Chelate), Copper (as Copper Gluconate), Manganese (as Manganese Amino Acid Chelate), Chromium (as Chromium Picolinate), Molybdenum, Potassium (as Potassium Citrate), Choline (as Choline Bitartrate), Proprietary Blend (DMAE Bitartrate, L-Glutamine HCL, Glutamic Acid, Green Tea Extract, Bacopa Extract, Inositol, N-Acetyl L-Tyrosine, Bilberry Fruit Extract, GABA, Grape Seed Extract, Grapefruit Seed Extract, Olive Leaf, Cinnamon Bark Extract, Licorice Root Extract, Boron, DHA 14%, Vanadyl, Phosphatidylserine, Huperzine A, Cellulose (vegetable capsule), Rice Flour, Magnesium Stearate, Silicon Dioxide.</p><p><strong>Contains:</strong> Soy &amp; Fish (Tuna Fish).</p><p><strong>Manufacturer Country:</strong> USA</p><p><strong>Product Amount: </strong>60 caps</p><p><strong>Gross Weight</strong>: 0.25lb (133g)</p><p><strong>Suggested Use: </strong>As a dietary supplement, take two (2) veggie capsules once a day. For best results, take 20-30 min before a meal with an 8oz (236 ml) glass of water or as directed by your healthcare professional</p><p><strong>Caution: </strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Iron Warning:</strong> Accidental overdose of iron-containing products is a leading cause of fatal poisoning in children under 6. Call a doctor or poison control center immediately in case of accidental overdose.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 36,
      "name": "Bone & Heart Support",
      "price": 29.9,
   //   "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719776377393-generated-label-image-0.jpg?v=1719776394",
      "category": "Specialty Supplements",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719776377399-generated-label-image-3.jpg?v=1719776394",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719776377394-generated-label-image-1.jpg?v=1719776394",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719776377398-generated-label-image-2.jpg?v=1719776394",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719776377401-generated-label-image-4.jpg?v=1719776394",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240612124801-vox4bone-sf.png?v=1719776394"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Both vitamins D3 and K2 are essential to the body's function and overall health. Vitamin D3 aids in absorbing calcium and phosphorus, which are essential for bone formation and maintenance.</p><p><br></p><p>In addition to supporting the development of strong bones, Vitamin K2 may also benefit the cardiovascular system since it may promote healthy blood clotting.*</p><p><br></p><p><strong>Ingredients:\u00a0</strong>Calcium (as Calcium Carbonate), Vitamin D3 (Cholecalciferol), Vitamin K2 (mk-7)(as Menaquinone), BioPerine\u00ae (Black Pepper Fruit Extract), Cellulose (vegetable capsule).</p><p><strong>Manufacturer Country</strong>: USA</p><p><strong>Product Amount</strong>: 60 caps</p><p><strong>Gross Weight: </strong>0.25lb (113g)</p><p><strong>Suggested Use:</strong>\u00a0Take one (1) capsule twice a day as a dietary supplement. For best results, take 20-30 min before a meal or as directed by your healthcare professional.</p><p><strong>Caution:\u00a0</strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 37,
      "name": "Birch Chaga Microbiome Wellness Capsules",
      "price": 38.9,
    //  "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719775309627-generated-label-image-0.jpg?v=1719775323",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719775309631-generated-label-image-2.jpg?v=1719775323",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719775309629-generated-label-image-1.jpg?v=1719775323",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240620134058-bls1ca30-sf.png?v=1719775323"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Birch Chaga Capsules are loaded with essential nutrients for optimized body functioning. The most notable of these nutrients are phytochemicals.*</p><p><br></p><p>Phytochemicals are plant-based molecules that stimulate the immunological and hormonal systems and play an essential part in maintaining a normal balance of our bodies.*</p><p><br></p><p>Birch Chaga Capsules support the maintenance of a healthy gut microbiome and the absorption and administration of nutrients, fatty acids, and minerals at the cellular level.*</p><p><br></p><p><strong>Ingredients: </strong>Birch Chaga, Wood extract containing humic substance (25% humic acid, 75% fulvic acid), Cellulose Capsule (plant-based).</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount:</strong> 30 caps</p><p><strong>Gross Weight:</strong> 0.05lb (24g)</p><p><strong>Suggested Use: </strong>We recommend 1 capsule (0.5g) per day. A higher dose is unnecessary, as the body does not consume more than necessary.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png\" alt=\"No fillers\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 38,
      "name": "Beetroot",
      "price": 20.9,
    //  "discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719774926934-generated-label-image-4.jpg?v=1719774945",
      "category": "Natural Extracts",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719774926928-generated-label-image-0.jpg?v=1719774945",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719774926932-generated-label-image-2.jpg?v=1719774945",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719774926933-generated-label-image-3.jpg?v=1719774945",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1719774926930-generated-label-image-1.jpg?v=1719774945",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20240618172039-vox4beet-sf.png?v=1719774945"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p>Contains naturally occuring organic nitrates, beetroot (Beta vulgaris) may support nitric oxide production, promote normal blood pressure, enhancing oxygen supply to active muscles, and possibly improving athletic performance.</p><p><br></p><p>Regular beetroot supplementation might support post-exercise perceived muscle soreness and help maintain better performance during the recovery period.*</p><p><br></p><p><strong>Ingredients: </strong>Organic Beetroot Powder (beta vulgaris), Cellulose (Vegetable Capsule), Microcrystalline Cellulose, Magnesium Stearate.</p><p><strong>Manufacturer Country</strong>: USA</p><p><strong>Product Amount</strong>: 60 caps</p><p><strong>Gross Weight: </strong>0.25lb (133g)</p><p><strong style=\"color: rgb(0, 0, 0);\">Suggested Use:</strong><span style=\"color: rgb(0, 0, 0);\">\u00a0Take two (2) capsules once a day as a dietary supplement. For best results, take 20-30 min before a meal with an 8oz (236 ml) glass of water or as directed by your healthcare professional.</span></p><p><strong>Caution: </strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</strong></p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png\" alt=\"Vegetarian\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png\" alt=\"Lactose-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png\" alt=\"Allergen-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png\" alt=\"Hormone-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png\" alt=\"Corn-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206124358-vegan.png\" alt=\"Vegan friendly\" style=\"height: 6rem; width: auto;\"></p>"
    },
    {
      "id": 39,
      "name": "Collagen Gummies (Adult)",
      "price": 9.5,
      //"discountPrice": 0,
      "image": "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716571709633-generated-label-image-0.jpg?v=1716571742",
      "category": "Proteins & Blends",
      "rating": 4.5,
      "reviews": [
        {
          "user": "Jamie",
          "date": "25 Jun, 2024",
          "comment": "Great product!",
          "rating": 5
        }
      ],
      "additionalImages": [
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716571709635-generated-label-image-1.jpg?v=1716571742",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716571709637-generated-label-image-2.jpg?v=1716571742",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716571709640-generated-label-image-4.jpg?v=1716571742",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716571709638-generated-label-image-3.jpg?v=1716571742",
        "https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220908165707-vox4clgn-sf.png?v=1716571742"
      ],
      "demandText": "294 people bought this in the last 24 hours.",
      "saleEndDate": "06 July",
      "quantity": 1,
      "description": "<p><span style=\"color: rgb(0, 0, 0);\">Collagen Gummies are for those looking for healthy sweet snacks. These are the perfect replacement for traditional sugar gummies on the market since they provide your body with vital protein and collagen while also boosting your immune system with Vitamin C.\u00a0</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0);\">This is a powerful combination because Vitamin C aids collagen absorption into the bones. This greatly improves bone and joint strength and stability.*</span></p><p><br></p><p><strong>Ingredients: </strong>Sodium (as Sodium Citrate), Vitamin C (as Ascorbic Acid), Vitamin E (as DL-Alpha-Tocopheryl Acetate), D-Biotin, Zinc (from Zinc Citrate), Collagen Peptide, Sugar, Glucose Syrup, Dextrose, Glycine, Pectin, Coconut Oil, Citric Acid, Natural Orange Flavor, Sucrose fatty acid ester, Vegetable Oil (contains Carnauba Wax), Sodium Citrate, Purple Carrot Juice Concentrate.</p><p><strong>Contains:</strong> Fish (Tilapia &amp; Cod Fish).</p><p><strong>Flavor: </strong>Orange</p><p><strong>Manufacturer Country</strong>: USA</p><p><strong>Product Amount</strong>: 60 gummies</p><p><strong>Gross Weight: </strong>0.56lb (255g)</p><p><strong style=\"color: rgb(0, 0, 0);\">Suggested Use:</strong><span style=\"color: rgb(0, 0, 0);\"> As a dietary supplement, take two (2) pieces once a day.</span></p><p><strong>Caution: </strong>Do not exceed recommended dose. Pregnant or nursing mothers, children under the age of 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.</p><p><strong>Warning:</strong> Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</p> <p>\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png\" alt=\"Gluten-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100059-antibiotic-free-2x.png\" alt=\"Antibiotic-free\" style=\"height: 6rem; width: auto;\">\n          <img src=\"https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png\" alt=\"Non-GMO\" style=\"height: 6rem; width: auto;\"></p>"
    }
  ]
  
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const [cart, setCart] = useState(loadCartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) => 
        item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
      );
    });
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <ProductContext.Provider value={{ allProducts, cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };

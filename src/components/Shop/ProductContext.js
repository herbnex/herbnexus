import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const allProducts = [
    { 
      id: 1, 
      name: '5-HTP', 
      price: 18.49, 
      discountPrice: 15.99, 
      image: 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088684-generated-label-image-4.jpg?v=1716655113', 
      category: 'Digestive Health', 
      rating: 4.5, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815154310-vox45htp-sf.png?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088681-generated-label-image-2.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088678-generated-label-image-0.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088680-generated-label-image-1.jpg?v=1716655113', 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088683-generated-label-image-3.jpg?v=1716655113'],  
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1,
      description: `<p>Bee Pearl is a pollen, nectar, and enzyme blend. Each capsule contains vitamins, microelements, polyphenols, unsaturated fatty acids, and antioxidants. This natural blend helps maintain your health, immunity, and energy level.</p><p><br></p><p>Bee Pearl contains a variety of naturally occurring vitamins, minerals, and other vital substances:</p><p><br></p><p>- Amino acids (15 from 20 possible)</p><p>- Numerous fatty acids (includes OMEGA-3, OMEGA-6)</p><p>- All Vitamins (a substantial amount of A, E, B3, B1, B, H)</p><p>- Minerals (a substantial amount of Zn, Cu, Fe, K, Na)</p><p>- Microelements and Polyphenolic compounds.</p><p><br></p><p><strong>Ingredients: </strong>Freeze Dried Extract of Bee Bread, Vitamin C.</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount: </strong>30 caps</p><p><strong>Gross Weight: </strong>0.11lb (50g)</p><p><strong>Suggested Use:¬†</strong>One (1) capsule per day during the main meal or immediately after it with a glass of water. Suitable for vegetarians. Gluten-free. Suitable for long-term use.</p><p><strong>Caution:</strong> Recommended to anyone who is not allergic to bee products. If you are prone to allergic reactions, consult a doctor or pharmacist before use. Do not exceed the recommended daily dose. Do not use on an empty stomach.¬†Consult a doctor or pharmacist before using this product during pregnancy or when breastfeeding. Do not use after the expiry of the validity period. Do not use food supplements as a substitute for a diverse and balanced diet. Keep out of reach and sight of children. Store at room temperature from +15C to +25C in a dry place, away from direct sunlight.</p><p><strong>Warning: </strong>This product is not intended to diagnose, treat, cure or prevent any disease. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png" alt="Gluten-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png" alt="Vegetarian" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png" alt="Lactose-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png" alt="Allergen-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png" alt="Hormone-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png" alt="All natural" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png" alt="No fillers" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png" alt="Non-GMO" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png" alt="Corn-free" style="height: 6rem; width: auto;"></p>`
    },
    { 
      id: 2, 
      name: '5-HTP', 
      price: 18.49, 
      discountPrice: 15.99, 
      image: 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088684-generated-label-image-4.jpg?v=1716655113', 
      category: 'Healthy Blood', 
      rating: 4.5, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815154310-vox45htp-sf.png?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088681-generated-label-image-2.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088678-generated-label-image-0.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088680-generated-label-image-1.jpg?v=1716655113', 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088683-generated-label-image-3.jpg?v=1716655113'],  
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1,
      description: `<p>Bee Pearl is a pollen, nectar, and enzyme blend. Each capsule contains vitamins, microelements, polyphenols, unsaturated fatty acids, and antioxidants. This natural blend helps maintain your health, immunity, and energy level.</p><p><br></p><p>Bee Pearl contains a variety of naturally occurring vitamins, minerals, and other vital substances:</p><p><br></p><p>- Amino acids (15 from 20 possible)</p><p>- Numerous fatty acids (includes OMEGA-3, OMEGA-6)</p><p>- All Vitamins (a substantial amount of A, E, B3, B1, B, H)</p><p>- Minerals (a substantial amount of Zn, Cu, Fe, K, Na)</p><p>- Microelements and Polyphenolic compounds.</p><p><br></p><p><strong>Ingredients: </strong>Freeze Dried Extract of Bee Bread, Vitamin C.</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount: </strong>30 caps</p><p><strong>Gross Weight: </strong>0.11lb (50g)</p><p><strong>Suggested Use:¬†</strong>One (1) capsule per day during the main meal or immediately after it with a glass of water. Suitable for vegetarians. Gluten-free. Suitable for long-term use.</p><p><strong>Caution:</strong> Recommended to anyone who is not allergic to bee products. If you are prone to allergic reactions, consult a doctor or pharmacist before use. Do not exceed the recommended daily dose. Do not use on an empty stomach.¬†Consult a doctor or pharmacist before using this product during pregnancy or when breastfeeding. Do not use after the expiry of the validity period. Do not use food supplements as a substitute for a diverse and balanced diet. Keep out of reach and sight of children. Store at room temperature from +15C to +25C in a dry place, away from direct sunlight.</p><p><strong>Warning: </strong>This product is not intended to diagnose, treat, cure or prevent any disease. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png" alt="Gluten-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png" alt="Vegetarian" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png" alt="Lactose-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png" alt="Allergen-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png" alt="Hormone-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png" alt="All natural" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png" alt="No fillers" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png" alt="Non-GMO" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png" alt="Corn-free" style="height: 6rem; width: auto;"></p>`
    },
    { 
      id: 3, 
      name: '5-HTP', 
      price: 18.49, 
      discountPrice: 15.99, 
      image: 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088684-generated-label-image-4.jpg?v=1716655113', 
      category: 'Hormone Health', 
      rating: 4.5, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815154310-vox45htp-sf.png?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088681-generated-label-image-2.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088678-generated-label-image-0.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088680-generated-label-image-1.jpg?v=1716655113', 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088683-generated-label-image-3.jpg?v=1716655113'],  
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1,
      description: `<p>Bee Pearl is a pollen, nectar, and enzyme blend. Each capsule contains vitamins, microelements, polyphenols, unsaturated fatty acids, and antioxidants. This natural blend helps maintain your health, immunity, and energy level.</p><p><br></p><p>Bee Pearl contains a variety of naturally occurring vitamins, minerals, and other vital substances:</p><p><br></p><p>- Amino acids (15 from 20 possible)</p><p>- Numerous fatty acids (includes OMEGA-3, OMEGA-6)</p><p>- All Vitamins (a substantial amount of A, E, B3, B1, B, H)</p><p>- Minerals (a substantial amount of Zn, Cu, Fe, K, Na)</p><p>- Microelements and Polyphenolic compounds.</p><p><br></p><p><strong>Ingredients: </strong>Freeze Dried Extract of Bee Bread, Vitamin C.</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount: </strong>30 caps</p><p><strong>Gross Weight: </strong>0.11lb (50g)</p><p><strong>Suggested Use:¬†</strong>One (1) capsule per day during the main meal or immediately after it with a glass of water. Suitable for vegetarians. Gluten-free. Suitable for long-term use.</p><p><strong>Caution:</strong> Recommended to anyone who is not allergic to bee products. If you are prone to allergic reactions, consult a doctor or pharmacist before use. Do not exceed the recommended daily dose. Do not use on an empty stomach.¬†Consult a doctor or pharmacist before using this product during pregnancy or when breastfeeding. Do not use after the expiry of the validity period. Do not use food supplements as a substitute for a diverse and balanced diet. Keep out of reach and sight of children. Store at room temperature from +15C to +25C in a dry place, away from direct sunlight.</p><p><strong>Warning: </strong>This product is not intended to diagnose, treat, cure or prevent any disease. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png" alt="Gluten-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png" alt="Vegetarian" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png" alt="Lactose-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png" alt="Allergen-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png" alt="Hormone-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png" alt="All natural" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png" alt="No fillers" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png" alt="Non-GMO" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png" alt="Corn-free" style="height: 6rem; width: auto;"></p>`
    },
    { 
      id: 4, 
      name: '5-HTP', 
      price: 18.49, 
      discountPrice: 15.99, 
      image: 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088684-generated-label-image-4.jpg?v=1716655113', 
      category: 'Lung Health', 
      rating: 4.5, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815154310-vox45htp-sf.png?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088681-generated-label-image-2.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088678-generated-label-image-0.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088680-generated-label-image-1.jpg?v=1716655113', 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088683-generated-label-image-3.jpg?v=1716655113'],  
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1,
      description: `<p>Bee Pearl is a pollen, nectar, and enzyme blend. Each capsule contains vitamins, microelements, polyphenols, unsaturated fatty acids, and antioxidants. This natural blend helps maintain your health, immunity, and energy level.</p><p><br></p><p>Bee Pearl contains a variety of naturally occurring vitamins, minerals, and other vital substances:</p><p><br></p><p>- Amino acids (15 from 20 possible)</p><p>- Numerous fatty acids (includes OMEGA-3, OMEGA-6)</p><p>- All Vitamins (a substantial amount of A, E, B3, B1, B, H)</p><p>- Minerals (a substantial amount of Zn, Cu, Fe, K, Na)</p><p>- Microelements and Polyphenolic compounds.</p><p><br></p><p><strong>Ingredients: </strong>Freeze Dried Extract of Bee Bread, Vitamin C.</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount: </strong>30 caps</p><p><strong>Gross Weight: </strong>0.11lb (50g)</p><p><strong>Suggested Use:¬†</strong>One (1) capsule per day during the main meal or immediately after it with a glass of water. Suitable for vegetarians. Gluten-free. Suitable for long-term use.</p><p><strong>Caution:</strong> Recommended to anyone who is not allergic to bee products. If you are prone to allergic reactions, consult a doctor or pharmacist before use. Do not exceed the recommended daily dose. Do not use on an empty stomach.¬†Consult a doctor or pharmacist before using this product during pregnancy or when breastfeeding. Do not use after the expiry of the validity period. Do not use food supplements as a substitute for a diverse and balanced diet. Keep out of reach and sight of children. Store at room temperature from +15C to +25C in a dry place, away from direct sunlight.</p><p><strong>Warning: </strong>This product is not intended to diagnose, treat, cure or prevent any disease. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png" alt="Gluten-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png" alt="Vegetarian" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png" alt="Lactose-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png" alt="Allergen-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png" alt="Hormone-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png" alt="All natural" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png" alt="No fillers" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png" alt="Non-GMO" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png" alt="Corn-free" style="height: 6rem; width: auto;"></p>`
    },
    { 
      id: 5, 
      name: '5-HTP', 
      price: 18.49, 
      discountPrice: 15.99, 
      image: 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088684-generated-label-image-4.jpg?v=1716655113', 
      category: 'Urinary Tract Health', 
      rating: 4.5, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815154310-vox45htp-sf.png?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088681-generated-label-image-2.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088678-generated-label-image-0.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088680-generated-label-image-1.jpg?v=1716655113', 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088683-generated-label-image-3.jpg?v=1716655113'],  
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1,
      description: `<p>Bee Pearl is a pollen, nectar, and enzyme blend. Each capsule contains vitamins, microelements, polyphenols, unsaturated fatty acids, and antioxidants. This natural blend helps maintain your health, immunity, and energy level.</p><p><br></p><p>Bee Pearl contains a variety of naturally occurring vitamins, minerals, and other vital substances:</p><p><br></p><p>- Amino acids (15 from 20 possible)</p><p>- Numerous fatty acids (includes OMEGA-3, OMEGA-6)</p><p>- All Vitamins (a substantial amount of A, E, B3, B1, B, H)</p><p>- Minerals (a substantial amount of Zn, Cu, Fe, K, Na)</p><p>- Microelements and Polyphenolic compounds.</p><p><br></p><p><strong>Ingredients: </strong>Freeze Dried Extract of Bee Bread, Vitamin C.</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount: </strong>30 caps</p><p><strong>Gross Weight: </strong>0.11lb (50g)</p><p><strong>Suggested Use:¬†</strong>One (1) capsule per day during the main meal or immediately after it with a glass of water. Suitable for vegetarians. Gluten-free. Suitable for long-term use.</p><p><strong>Caution:</strong> Recommended to anyone who is not allergic to bee products. If you are prone to allergic reactions, consult a doctor or pharmacist before use. Do not exceed the recommended daily dose. Do not use on an empty stomach.¬†Consult a doctor or pharmacist before using this product during pregnancy or when breastfeeding. Do not use after the expiry of the validity period. Do not use food supplements as a substitute for a diverse and balanced diet. Keep out of reach and sight of children. Store at room temperature from +15C to +25C in a dry place, away from direct sunlight.</p><p><strong>Warning: </strong>This product is not intended to diagnose, treat, cure or prevent any disease. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png" alt="Gluten-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png" alt="Vegetarian" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png" alt="Lactose-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png" alt="Allergen-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png" alt="Hormone-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png" alt="All natural" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png" alt="No fillers" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png" alt="Non-GMO" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png" alt="Corn-free" style="height: 6rem; width: auto;"></p>`
    },
    { 
      id: 6, 
      name: '5-HTP', 
      price: 18.49, 
      discountPrice: 15.99, 
      image: 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088684-generated-label-image-4.jpg?v=1716655113', 
      category: 'Bone And Joint Health', 
      rating: 4.5, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815154310-vox45htp-sf.png?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088681-generated-label-image-2.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088678-generated-label-image-0.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088680-generated-label-image-1.jpg?v=1716655113', 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088683-generated-label-image-3.jpg?v=1716655113'],  
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1,
      description: `<p>Bee Pearl is a pollen, nectar, and enzyme blend. Each capsule contains vitamins, microelements, polyphenols, unsaturated fatty acids, and antioxidants. This natural blend helps maintain your health, immunity, and energy level.</p><p><br></p><p>Bee Pearl contains a variety of naturally occurring vitamins, minerals, and other vital substances:</p><p><br></p><p>- Amino acids (15 from 20 possible)</p><p>- Numerous fatty acids (includes OMEGA-3, OMEGA-6)</p><p>- All Vitamins (a substantial amount of A, E, B3, B1, B, H)</p><p>- Minerals (a substantial amount of Zn, Cu, Fe, K, Na)</p><p>- Microelements and Polyphenolic compounds.</p><p><br></p><p><strong>Ingredients: </strong>Freeze Dried Extract of Bee Bread, Vitamin C.</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount: </strong>30 caps</p><p><strong>Gross Weight: </strong>0.11lb (50g)</p><p><strong>Suggested Use:¬†</strong>One (1) capsule per day during the main meal or immediately after it with a glass of water. Suitable for vegetarians. Gluten-free. Suitable for long-term use.</p><p><strong>Caution:</strong> Recommended to anyone who is not allergic to bee products. If you are prone to allergic reactions, consult a doctor or pharmacist before use. Do not exceed the recommended daily dose. Do not use on an empty stomach.¬†Consult a doctor or pharmacist before using this product during pregnancy or when breastfeeding. Do not use after the expiry of the validity period. Do not use food supplements as a substitute for a diverse and balanced diet. Keep out of reach and sight of children. Store at room temperature from +15C to +25C in a dry place, away from direct sunlight.</p><p><strong>Warning: </strong>This product is not intended to diagnose, treat, cure or prevent any disease. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png" alt="Gluten-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png" alt="Vegetarian" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png" alt="Lactose-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png" alt="Allergen-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png" alt="Hormone-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png" alt="All natural" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png" alt="No fillers" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png" alt="Non-GMO" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png" alt="Corn-free" style="height: 6rem; width: auto;"></p>`
    },
    { 
      id: 7, 
      name: '5-HTP', 
      price: 18.49, 
      discountPrice: 15.99, 
      image: 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088684-generated-label-image-4.jpg?v=1716655113', 
      category: 'Immune Health', 
      rating: 4.5, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815154310-vox45htp-sf.png?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088681-generated-label-image-2.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088678-generated-label-image-0.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088680-generated-label-image-1.jpg?v=1716655113', 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088683-generated-label-image-3.jpg?v=1716655113'],  
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1,
      description: `<p>Bee Pearl is a pollen, nectar, and enzyme blend. Each capsule contains vitamins, microelements, polyphenols, unsaturated fatty acids, and antioxidants. This natural blend helps maintain your health, immunity, and energy level.</p><p><br></p><p>Bee Pearl contains a variety of naturally occurring vitamins, minerals, and other vital substances:</p><p><br></p><p>- Amino acids (15 from 20 possible)</p><p>- Numerous fatty acids (includes OMEGA-3, OMEGA-6)</p><p>- All Vitamins (a substantial amount of A, E, B3, B1, B, H)</p><p>- Minerals (a substantial amount of Zn, Cu, Fe, K, Na)</p><p>- Microelements and Polyphenolic compounds.</p><p><br></p><p><strong>Ingredients: </strong>Freeze Dried Extract of Bee Bread, Vitamin C.</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount: </strong>30 caps</p><p><strong>Gross Weight: </strong>0.11lb (50g)</p><p><strong>Suggested Use:¬†</strong>One (1) capsule per day during the main meal or immediately after it with a glass of water. Suitable for vegetarians. Gluten-free. Suitable for long-term use.</p><p><strong>Caution:</strong> Recommended to anyone who is not allergic to bee products. If you are prone to allergic reactions, consult a doctor or pharmacist before use. Do not exceed the recommended daily dose. Do not use on an empty stomach.¬†Consult a doctor or pharmacist before using this product during pregnancy or when breastfeeding. Do not use after the expiry of the validity period. Do not use food supplements as a substitute for a diverse and balanced diet. Keep out of reach and sight of children. Store at room temperature from +15C to +25C in a dry place, away from direct sunlight.</p><p><strong>Warning: </strong>This product is not intended to diagnose, treat, cure or prevent any disease. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png" alt="Gluten-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png" alt="Vegetarian" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png" alt="Lactose-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png" alt="Allergen-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png" alt="Hormone-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png" alt="All natural" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png" alt="No fillers" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png" alt="Non-GMO" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png" alt="Corn-free" style="height: 6rem; width: auto;"></p>`
    },
    { 
      id: 8, 
      name: '5-HTP', 
      price: 18.49, 
      discountPrice: 15.99, 
      image: 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088684-generated-label-image-4.jpg?v=1716655113', 
      category: 'Holistic Health', 
      rating: 4.5, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815154310-vox45htp-sf.png?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088681-generated-label-image-2.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088678-generated-label-image-0.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088680-generated-label-image-1.jpg?v=1716655113', 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088683-generated-label-image-3.jpg?v=1716655113'],  
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1,
      description: `<p>Bee Pearl is a pollen, nectar, and enzyme blend. Each capsule contains vitamins, microelements, polyphenols, unsaturated fatty acids, and antioxidants. This natural blend helps maintain your health, immunity, and energy level.</p><p><br></p><p>Bee Pearl contains a variety of naturally occurring vitamins, minerals, and other vital substances:</p><p><br></p><p>- Amino acids (15 from 20 possible)</p><p>- Numerous fatty acids (includes OMEGA-3, OMEGA-6)</p><p>- All Vitamins (a substantial amount of A, E, B3, B1, B, H)</p><p>- Minerals (a substantial amount of Zn, Cu, Fe, K, Na)</p><p>- Microelements and Polyphenolic compounds.</p><p><br></p><p><strong>Ingredients: </strong>Freeze Dried Extract of Bee Bread, Vitamin C.</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount: </strong>30 caps</p><p><strong>Gross Weight: </strong>0.11lb (50g)</p><p><strong>Suggested Use:¬†</strong>One (1) capsule per day during the main meal or immediately after it with a glass of water. Suitable for vegetarians. Gluten-free. Suitable for long-term use.</p><p><strong>Caution:</strong> Recommended to anyone who is not allergic to bee products. If you are prone to allergic reactions, consult a doctor or pharmacist before use. Do not exceed the recommended daily dose. Do not use on an empty stomach.¬†Consult a doctor or pharmacist before using this product during pregnancy or when breastfeeding. Do not use after the expiry of the validity period. Do not use food supplements as a substitute for a diverse and balanced diet. Keep out of reach and sight of children. Store at room temperature from +15C to +25C in a dry place, away from direct sunlight.</p><p><strong>Warning: </strong>This product is not intended to diagnose, treat, cure or prevent any disease. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png" alt="Gluten-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png" alt="Vegetarian" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png" alt="Lactose-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png" alt="Allergen-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png" alt="Hormone-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png" alt="All natural" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png" alt="No fillers" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png" alt="Non-GMO" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png" alt="Corn-free" style="height: 6rem; width: auto;"></p>`
    },
    { 
      id: 9, 
      name: '5-HTP', 
      price: 18.49, 
      discountPrice: 15.99, 
      image: 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088684-generated-label-image-4.jpg?v=1716655113', 
      category: 'Neurological Health', 
      rating: 4.5, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815154310-vox45htp-sf.png?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088681-generated-label-image-2.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088678-generated-label-image-0.jpg?v=1716655113','https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088680-generated-label-image-1.jpg?v=1716655113', 'https://cdn.shopify.com/s/files/1/0701/5592/7811/files/1716655088683-generated-label-image-3.jpg?v=1716655113'],  
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1,
      description: `<p>Bee Pearl is a pollen, nectar, and enzyme blend. Each capsule contains vitamins, microelements, polyphenols, unsaturated fatty acids, and antioxidants. This natural blend helps maintain your health, immunity, and energy level.</p><p><br></p><p>Bee Pearl contains a variety of naturally occurring vitamins, minerals, and other vital substances:</p><p><br></p><p>- Amino acids (15 from 20 possible)</p><p>- Numerous fatty acids (includes OMEGA-3, OMEGA-6)</p><p>- All Vitamins (a substantial amount of A, E, B3, B1, B, H)</p><p>- Minerals (a substantial amount of Zn, Cu, Fe, K, Na)</p><p>- Microelements and Polyphenolic compounds.</p><p><br></p><p><strong>Ingredients: </strong>Freeze Dried Extract of Bee Bread, Vitamin C.</p><p><strong>Manufacturer Country: </strong>Latvia</p><p><strong>Product Amount: </strong>30 caps</p><p><strong>Gross Weight: </strong>0.11lb (50g)</p><p><strong>Suggested Use:¬†</strong>One (1) capsule per day during the main meal or immediately after it with a glass of water. Suitable for vegetarians. Gluten-free. Suitable for long-term use.</p><p><strong>Caution:</strong> Recommended to anyone who is not allergic to bee products. If you are prone to allergic reactions, consult a doctor or pharmacist before use. Do not exceed the recommended daily dose. Do not use on an empty stomach.¬†Consult a doctor or pharmacist before using this product during pregnancy or when breastfeeding. Do not use after the expiry of the validity period. Do not use food supplements as a substitute for a diverse and balanced diet. Keep out of reach and sight of children. Store at room temperature from +15C to +25C in a dry place, away from direct sunlight.</p><p><strong>Warning: </strong>This product is not intended to diagnose, treat, cure or prevent any disease. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.</p><p><br></p><p><strong>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</strong></p> <p>
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206094907-gluten-free-2x.png" alt="Gluten-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206124537-vegetarian.png" alt="Vegetarian" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095432-lactose-free-2x.png" alt="Lactose-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095601-allergen-free-2x.png" alt="Allergen-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206095715-hormone-free-2x.png" alt="Hormone-free" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100008-100--natural-2x.png" alt="All natural" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100829-no-fillers-2x.png" alt="No fillers" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206100927-non-gmo-2x.png" alt="Non-GMO" style="height: 6rem; width: auto;">
      <img src="https://supliful.s3.amazonaws.com/categories/images/20221206101002-corn-free-2x.png" alt="Corn-free" style="height: 6rem; width: auto;"></p>`
    },
    // ... other products with similar structure
  ];
  
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

  return (
    <ProductContext.Provider value={{ allProducts, cart, addToCart, removeFromCart, updateCartQuantity }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };

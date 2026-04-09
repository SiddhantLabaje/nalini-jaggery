require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('./models/Product');

const products = [
  { name:"Organic Jaggery 10 Kg",              cat:"organic",       price:"Rs.44/kg",   form:"Solid",  packing:"10 kg",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348309402/GR/DB/VM/196886344/fresh-organic-jaggery-500x500.jpeg",          badge:"Best Seller"   },
  { name:"Solid Jaggery 30 Kg",                cat:"organic",       price:"Rs.40/kg",   form:"Cubes",  packing:"30 kg",     type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348309614/XW/XR/VR/196886344/fresh-modak-500x500.jpeg",                    badge:"Bulk"          },
  { name:"Organic Jaggery 2 kg",               cat:"organic",       price:"Rs.35/kg",   form:"Solid",  packing:"2 kg",      type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348824931/GR/EX/FJ/196886344/solid-jaggery-2-kg-500x500.jpeg",             badge:""              },
  { name:"Solid Jaggery 5 kg",                 cat:"organic",       price:"Rs.44/kg",   form:"Solid",  packing:"5 kg",      type:"Refined",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348825028/NC/GN/HF/196886344/solid-jaggery-5-kg-500x500.jpeg",             badge:""              },
  { name:"Solid Jaggery 10 Kg",                cat:"organic",       price:"Rs.40/kg",   form:"Solid",  packing:"10 kg",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348824526/VS/EH/DV/196886344/solid-jaggery-10-kg-500x500.jpeg",            badge:""              },
  { name:"16 Gm Jaggery Cubes 1 Kg",           cat:"organic",       price:"Rs.55/kg",   form:"Cubes",  packing:"1 kg",      type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348817396/AJ/MV/QO/196886344/16-gm-jaggery-cubes-1-kg-500x500.jpeg",       badge:""              },
  { name:"Natural Organic Jaggery Powder",     cat:"powder",        price:"Rs.90/kg",   form:"Powder", packing:"500 g Jar", type:"Sugarcane",             img:"https://5.imimg.com/data5/ANDROID/Default/2023/10/349854615/ZW/SU/GU/196886344/whatsapp-image-2023-09-30-at-10-16-31-pm-1-500x500.jpeg", badge:"Premium" },
  { name:"Pure Sugarcane Jaggery Powder",      cat:"powder",        price:"Rs.55/kg",   form:"Powder", packing:"500 g",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348781735/SE/TJ/JE/196886344/jaggery-powder-500-gm-500x500.jpeg",          badge:""              },
  { name:"Nalini Jaggery Powder",              cat:"powder",        price:"Rs.55/pack", form:"Powder", packing:"50 kg Bag", type:"No Artificial Flavour", img:"https://5.imimg.com/data5/SELLER/Default/2023/10/352015607/IO/LH/MX/196886344/jaggery-powder-500x500.jpeg",               badge:""              },
  { name:"Jaggery Powder 2 Kg",                cat:"powder",        price:"Rs.55/pack", form:"Powder", packing:"2 kg",      type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/352016361/KA/YD/NT/196886344/pure-sugarcane-jaggery-powder-500x500.jpeg",  badge:"Bulk"          },
  { name:"Natural Brown Fresh Jaggery Cube",   cat:"sugarcane",     price:"Rs.55/kg",   form:"Cubes",  packing:"500 g",     type:"FSSAI Certified",       img:"https://5.imimg.com/data5/SELLER/Default/2023/10/350529197/OQ/EZ/XE/196886344/export-quality-sugarcane-jaggery-cube-500x500.jpeg", badge:"FSSAI" },
  { name:"Export Quality Sugarcane Jaggery",   cat:"sugarcane",     price:"Rs.45/kg",   form:"Cubes",  packing:"1 kg",      type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/350487961/CX/NZ/JC/196886344/export-quality-sugarcane-jaggery-500x500.jpeg", badge:"Export" },
  { name:"Sugarcane Jaggery Cubes",            cat:"sugarcane",     price:"Rs.80/kg",   form:"Cubes",  packing:"500 g Jar", type:"Sugarcane",             img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349195913/PT/IN/TT/196886344/whatsapp-image-2023-09-30-at-10-16-40-pm-500x500.jpeg", badge:"" },
  { name:"Kolhapuri Sugarcane White Jaggery",  cat:"sugarcane",     price:"Rs.40/kg",   form:"Cubes",  packing:"500 g",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349834005/OA/ZO/UP/196886344/kolhapuri-sugarcane-white-jaggery-10-30kg-500x500.jpeg", badge:"Special" },
  { name:"8 Gm Jaggery Cube",                  cat:"sugarcane",     price:"Rs.55/kg",   form:"Cubes",  packing:"1 kg Jar",  type:"Sugarcane",             img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348817022/IT/JY/MO/196886344/16-gm-jaggery-cubes-500-g-500x500.jpeg",       badge:""              },
  { name:"Ball Natural Pure Organic Jaggery",  cat:"chemical-free", price:"Rs.40/kg",   form:"Ball",   packing:"250 g",     type:"Organic",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193117/SB/RP/TF/196886344/20191227-220317-500x500.jpg",                  badge:"Chemical Free" },
  { name:"Natural Karad Jaggery",              cat:"chemical-free", price:"Rs.44/kg",   form:"Solid",  packing:"1 kg",      type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193121/FN/OI/JY/196886344/20201123-153437-500x500.jpg",                  badge:""              },
  { name:"Pure Sugarcane Jaggery",             cat:"chemical-free", price:"Rs.45/kg",   form:"Ball",   packing:"1 kg",      type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193136/HH/CV/OM/196886344/20201123-153500-500x500.jpg",                  badge:""              },
  { name:"Dark Brown Jaggery Cube",            cat:"chemical-free", price:"Rs.50/kg",   form:"Solid",  packing:"1 kg",      type:"FSSAI Certified",       img:"https://5.imimg.com/data5/SELLER/Default/2023/10/349193972/CM/LK/CM/196886344/20201126-190307-500x500.jpeg",                 badge:"FSSAI"         },
  { name:"Organic Sugarcane Jaggery Cubes",    cat:"natural",       price:"Rs.50/kg",   form:"Cubes",  packing:"500 g",     type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/10/350549098/UT/JC/TQ/196886344/natural-solid-jaggery-10-kg-500x500.jpeg",    badge:""              },
  { name:"Karad Natural Chemical Free Jaggery",cat:"natural",       price:"Rs.50/kg",   form:"Solid",  packing:"5-30 kg",   type:"Natural",               img:"https://5.imimg.com/data5/SELLER/Default/2023/9/348310013/NS/MK/LC/196886344/fresh-jaggery-cube-500x500.jpeg",              badge:""              }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`DB already has ${count} products. Skipping seed.`);
    process.exit(0);
  }
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products successfully.`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });

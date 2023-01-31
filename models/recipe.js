const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Введіть, будь ласка, назву!'],
    },
    level:{
        type: String,
        enum:['Легко приготувати','Середня складність','Складно'],
    },
    duration: { type: Number, min: 0 },
    portions: { type: Number, min: 0 },
    ingredients: { 
        type: Array,
        required: [true, 'Вкажіть інгідієнти!'],
    },
    cuisine: { type: String },
    dishType: {
        type: String,
        enum: ['Сніданок', 'Основні страви', 'Закуски', 'Напої безалкогольні','Напої алкогольні', 'Десерти', 'Обід','Вечеря','Перші страви','Шашлик','Гарніри','Випічка','М`ясні страви','Пироги','Піца','Тісто','Вареники'],
      },
      image: {
        type: String,
        default: 'https://images.media-allrecipes.com/images/75131.jpg',
      },
    rating: {
      type: Number,
      enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      min: 0,
      max: 5,
      default: 0,
    },
    resume: {
      type: String,
      maxLength: 100000,
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);





module.exports = mongoose.model('Recipe', recipeSchema);
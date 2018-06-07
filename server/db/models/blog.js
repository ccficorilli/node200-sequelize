'use strict';
// const Author = require('./author');
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    article: DataTypes.TEXT,
    featured: DataTypes.BOOLEAN,
    published: {
      type: DataTypes.DATE,
      allowNull: true
    },
    authorId: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Blog.associate = function(models) {
    // associations can be defined here
    models.Blog.belongsTo(models.Author, {foreignKey: 'authorId'});  
  };
  return Blog;
}